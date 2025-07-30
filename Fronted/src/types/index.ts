export interface User {
  id: string;
  _id: string; // Optional for frontend compatibility
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
  phone?: string;
  address?: string;
  createdAt: Date;
}

// export interface Product {
//   _id: Key | null | undefined;
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   quantity: number;
//   sellerId: string;
//   sellerName: string;
//   inStock: boolean;
//   createdAt: Date;
// }
export interface Product {
  id: string;
  _id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  inStock: boolean;
  sellerId?: string; // ✅ optional (frontend doesn't send)
  sellerName?: string;
  createdAt: Date;
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  _id?: string; 
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'cod' | 'upi';
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const CATEGORIES = [
  'Fresh Produce',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Bakery',
  'Snacks',
  'Beverages',
  'Frozen Foods',
  'Pantry Staples',
  'Health & Beauty',
  'Household'
] as const;

export type Category = typeof CATEGORIES[number];