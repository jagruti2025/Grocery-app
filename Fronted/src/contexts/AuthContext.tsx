import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import api from '../api';

interface AuthContextType extends AuthState {
  token: string;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // useEffect(() => {
  //   const savedUser = localStorage.getItem('currentUser');
  //   const savedToken = localStorage.getItem('token');
  //   if (savedUser && savedToken) {
  //     setAuthState({ user: JSON.parse(savedUser), isAuthenticated: true });
  //   }
  // }, []);
useEffect(() => {
  const savedUser = localStorage.getItem('currentUser');
  const savedToken = localStorage.getItem('token');
  if (savedUser && savedToken) {
    const parsedUser = JSON.parse(savedUser);
    const mappedUser = { ...parsedUser, id: parsedUser._id };
    setAuthState({ user: mappedUser, isAuthenticated: true });
  }
}, []);

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await api.post('/auth/login', { email, password });
    const { user, token } = res.data;

    // ✅ map _id → id
    const mappedUser = { ...user, id: user._id };

    localStorage.setItem('currentUser', JSON.stringify(mappedUser));
    localStorage.setItem('token', token);
    setAuthState({ user: mappedUser, isAuthenticated: true });
    return true;
  } catch {
    return false;
  }
};

 

//   const login = async (email: string, password: string): Promise<boolean> => {
//   try {
//     const res = await api.post('/auth/login', { email, password });
//     const { user, token } = res.data;

//     const mappedUser = { ...user, id: user._id }; // ✅ Map _id -> id
//     localStorage.setItem('currentUser', JSON.stringify(mappedUser));
//     localStorage.setItem('token', token);
//     setAuthState({ user: mappedUser, isAuthenticated: true });
//     return true;
//   } catch {
//     return false;
//   }
// };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
  try {
    const res = await api.post('/auth/register', userData);
    const { user, token } = res.data;

    const mappedUser = { ...user, id: user._id };

    localStorage.setItem('currentUser', JSON.stringify(mappedUser));
    localStorage.setItem('token', token);
    setAuthState({ user: mappedUser, isAuthenticated: true });
    return true;
  } catch {
    return false;
  }
};

// const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
//   try {
//     const res = await api.post('/auth/register', userData);
//     const { user, token } = res.data;

//     const mappedUser = { ...user, id: user._id }; // ✅ Map _id -> id
//     localStorage.setItem('currentUser', JSON.stringify(mappedUser));
//     localStorage.setItem('token', token);
//     setAuthState({ user: mappedUser, isAuthenticated: true });
//     return true;
//   } catch {
//     return false;
//   }
// };

  // const login = async (email: string, password: string): Promise<boolean> => {
  //   try {
  //     const res = await api.post('/auth/login', { email, password });
  //     const { user, token } = res.data;
  //     localStorage.setItem('currentUser', JSON.stringify(user));
  //     localStorage.setItem('token', token);
  //     setAuthState({ user, isAuthenticated: true });
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };

  // const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
  //   try {
  //     const res = await api.post('/auth/register', userData);
  //     const { user, token } = res.data;
  //     localStorage.setItem('currentUser', JSON.stringify(user));
  //     localStorage.setItem('token', token);
  //     setAuthState({ user, isAuthenticated: true });
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register ,token: localStorage.getItem('token') || '', isAuthenticated: !!authState.user}}>
      {children}
    </AuthContext.Provider>
  );
};
