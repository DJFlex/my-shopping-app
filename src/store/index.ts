import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ShoppingItem, ShoppingList, Store, User } from '../types';
import { mockProducts, mockShoppingLists, mockUser } from '../data/mockData';

interface AppState {
  // Data
  products: Product[];
  shoppingLists: ShoppingList[];
  user: User;
  
  // UI State
  isOffline: boolean;
  activeListId: string | null;
  selectedStore: Store | null;
  searchQuery: string;
  
  // Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  
  setShoppingLists: (lists: ShoppingList[]) => void;
  addShoppingList: (list: ShoppingList) => void;
  updateShoppingList: (listId: string, updates: Partial<ShoppingList>) => void;
  deleteShoppingList: (listId: string) => void;
  
  addItemToList: (listId: string, item: ShoppingItem) => void;
  updateItemInList: (listId: string, itemId: string, updates: Partial<ShoppingItem>) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  toggleItemPurchased: (listId: string, itemId: string) => void;
  
  setActiveList: (listId: string | null) => void;
  setSelectedStore: (store: Store | null) => void;
  setSearchQuery: (query: string) => void;
  
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  
  // Cart functionality
  addToCart: (item: ShoppingItem) => void;
  updateCartItem: (itemId: string, updates: Partial<ShoppingItem>) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  setOfflineStatus: (isOffline: boolean) => void;
  
  shareList: (listId: string, email: string) => void;
  unshareList: (listId: string, email: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial Data
      products: mockProducts,
      shoppingLists: mockShoppingLists,
      user: {
        ...mockUser,
        cart: [] // Initialize empty cart
      },
      
      // Initial UI State
      isOffline: false,
      activeListId: mockShoppingLists.length > 0 ? mockShoppingLists[0].id : null,
      selectedStore: null,
      searchQuery: '',
      
      // Actions
      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({ 
        products: [...state.products, product] 
      })),
      updateProduct: (productId, updates) => set((state) => ({
        products: state.products.map(product => 
          product.id === productId ? { ...product, ...updates } : product
        )
      })),
      
      setShoppingLists: (shoppingLists) => set({ shoppingLists }),
      addShoppingList: (list) => set((state) => ({ 
        shoppingLists: [...state.shoppingLists, list] 
      })),
      updateShoppingList: (listId, updates) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId ? { ...list, ...updates, updatedAt: new Date() } : list
        )
      })),
      deleteShoppingList: (listId) => set((state) => ({
        shoppingLists: state.shoppingLists.filter(list => list.id !== listId),
        activeListId: state.activeListId === listId ? 
          (state.shoppingLists.length > 1 ? 
            state.shoppingLists.find(l => l.id !== listId)?.id || null : null) 
          : state.activeListId
      })),
      
      addItemToList: (listId, item) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId ? 
            { 
              ...list, 
              items: [...list.items, item],
              updatedAt: new Date()
            } : list
        )
      })),
      updateItemInList: (listId, itemId, updates) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId ? 
            { 
              ...list, 
              items: list.items.map(item => 
                item.id === itemId ? { ...item, ...updates } : item
              ),
              updatedAt: new Date()
            } : list
        )
      })),
      removeItemFromList: (listId, itemId) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId ? 
            { 
              ...list, 
              items: list.items.filter(item => item.id !== itemId),
              updatedAt: new Date()
            } : list
        )
      })),
      toggleItemPurchased: (listId, itemId) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId ? 
            { 
              ...list, 
              items: list.items.map(item => 
                item.id === itemId ? { ...item, purchased: !item.purchased } : item
              ),
              updatedAt: new Date()
            } : list
        )
      })),
      
      setActiveList: (listId) => set({ activeListId: listId }),
      setSelectedStore: (store) => set({ selectedStore: store }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      addToFavorites: (productId) => set((state) => ({
        user: {
          ...state.user,
          favorites: [...state.user.favorites, productId]
        }
      })),
      removeFromFavorites: (productId) => set((state) => ({
        user: {
          ...state.user,
          favorites: state.user.favorites.filter(id => id !== productId)
        }
      })),
      
      // Cart functionality
      addToCart: (item) => set((state) => {
        // Check if item already exists in cart
        const existingItemIndex = state.user.cart?.findIndex(
          cartItem => cartItem.productId === item.productId
        );
        
        if (existingItemIndex !== undefined && existingItemIndex >= 0 && state.user.cart) {
          // Update quantity if item exists
          const updatedCart = [...state.user.cart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + item.quantity
          };
          
          return {
            user: {
              ...state.user,
              cart: updatedCart
            }
          };
        } else {
          // Add new item if it doesn't exist
          return {
            user: {
              ...state.user,
              cart: [...(state.user.cart || []), item]
            }
          };
        }
      }),
      
      updateCartItem: (itemId, updates) => set((state) => ({
        user: {
          ...state.user,
          cart: state.user.cart?.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        }
      })),
      
      removeFromCart: (itemId) => set((state) => ({
        user: {
          ...state.user,
          cart: state.user.cart?.filter(item => item.id !== itemId)
        }
      })),
      
      clearCart: () => set((state) => ({
        user: {
          ...state.user,
          cart: []
        }
      })),
      
      setOfflineStatus: (isOffline) => set({ isOffline }),
      
      shareList: (listId, email) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId ? 
            { 
              ...list, 
              shared: true,
              sharedWith: [...(list.sharedWith || []), email],
              updatedAt: new Date()
            } : list
        )
      })),
      unshareList: (listId, email) => set((state) => ({
        shoppingLists: state.shoppingLists.map(list => 
          list.id === listId ? 
            { 
              ...list, 
              sharedWith: list.sharedWith?.filter(e => e !== email),
              shared: (list.sharedWith?.filter(e => e !== email).length || 0) > 0,
              updatedAt: new Date()
            } : list
        )
      })),
    }),
    {
      name: 'aussie-grocery-app-storage',
    }
  )
);
