export type Store = 'Woolworths' | 'Coles' | 'Aldi' | 'IGA';

export type Unit = 'each' | 'kg' | 'g' | 'L' | 'ml' | 'pack';

export interface Product {
  id: string;
  name: string;
  category: string;
  brands?: string[];
  stores: {
    [key in Store]?: {
      price: number;
      unit: Unit;
      inStock: boolean;
    };
  };
  image?: string;
  tags?: string[];
}

export interface ShoppingItem {
  id: string;
  productId: string;
  quantity: number;
  unit: Unit;
  purchased: boolean;
  notes?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  store?: Store;
  items: ShoppingItem[];
  createdAt: Date;
  updatedAt: Date;
  shared: boolean;
  sharedWith?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  preferredStore?: Store;
  cart?: ShoppingItem[];
}
