import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, User } from '../types';
import api from '../api';
import { useAuth } from './AuthContext';

interface DataContextType {
  products: Product[];
  orders: Order[];
  users: User[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Promise<void>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const refreshData = async () => {
    try {
      if (user?.role === 'admin') {
        const userRes = await api.get('/users');
        setUsers(userRes.data);
      }

      const productRes = await api.get('/products');
      setProducts(productRes.data);

      if (user?.role === 'admin') {
        const orderRes = await api.get('/orders');
        setOrders(orderRes.data);
      } else if (user?.role === 'customer') {
        const myOrderRes = await api.get('/orders/me');
        setOrders(myOrderRes.data);
      }
    } catch (err) {
      console.error('refreshData error:', err);
    }
  };

  useEffect(() => {
    if (user) refreshData();
  }, [user]);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const payload = {
      ...productData,
      inStock: productData.quantity > 0,
      sellerId: user?.id,       // ✅ Using mapped `id` from AuthContext
      sellerName: user?.name,
    };

    console.log('✅ Payload being sent:', payload);

    const res = await api.post('/products', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(prev => [...prev, res.data]);
    await refreshData();
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    const res = await api.put(`/products/${id}`, productData);
    setProducts(prev => prev.map(p => (p.id === id ? res.data : p)));
  };

  const deleteProduct = async (id: string) => {
    await api.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const res = await api.post('/orders', orderData);
    setOrders(prev => [...prev, res.data]);
  };

  const updateOrder = async (id: string, orderData: Partial<Order>) => {
    const res = await api.put(`/orders/${id}`, orderData);
    setOrders(prev => prev.map(o => (o.id === id || o._id === id? res.data : o)));
  };

  const deleteUser = async (id: string) => {
    await api.delete(`/users/${id}`);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        users,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrder,
        deleteUser,
        refreshData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
