import React, { useState } from 'react';
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import Button from '../components/ui/Button';
import { ShoppingItem } from '../types';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cart = useAppStore((state) => state.user.cart || []);
  const products = useAppStore((state) => state.products);
  const user = useAppStore((state) => state.user);
  const updateCartItem = useAppStore((state) => state.updateCartItem);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const clearCart = useAppStore((state) => state.clearCart);
  const addShoppingList = useAppStore((state) => state.addShoppingList);
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const getProductDetails = (item: ShoppingItem) => {
    return products.find(p => p.id === item.productId);
  };
  
  const handleQuantityChange = (item: ShoppingItem, change: number) => {
    const newQuantity = Math.max(0.01, item.quantity + change);
    
    if (newQuantity <= 0.01) {
      removeFromCart(item.id);
    } else {
      updateCartItem(item.id, { quantity: newQuantity });
    }
  };
  
  const calculateSubtotal = () => {
    const storeToUse = user.preferredStore || 'Woolworths';
    
    return cart.reduce((total, item) => {
      const product = getProductDetails(item);
      if (!product) return total;
      
      const price = product.stores[storeToUse]?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a new shopping list from cart
      const newList = {
        id: `list-${Date.now()}`,
        name: `Shopping - ${new Date().toLocaleDateString()}`,
        store: user.preferredStore,
        items: [...cart],
        createdAt: new Date(),
        updatedAt: new Date(),
        shared: false
      };
      
      addShoppingList(newList);
      clearCart();
      
      // Navigate to the new list
      navigate(`/lists/${newList.id}`);
    }, 1500);
  };
  
  if (cart.length === 0) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingCart size={24} className="mr-2 text-emerald-600" />
            Cart
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingCart size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-4">
            Add items from the shop to get started.
          </p>
          <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <ShoppingCart size={24} className="mr-2 text-emerald-600" />
          Cart
        </h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <ul className="divide-y divide-gray-200">
          {cart.map(item => {
            const product = getProductDetails(item);
            if (!product) return null;
            
            const storeToUse = user.preferredStore || 'Woolworths';
            const price = product.stores[storeToUse]?.price || 0;
            const totalPrice = price * item.quantity;
            
            return (
              <li key={item.id} className="p-4">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${price.toFixed(2)} per {item.unit}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border border-gray-200 rounded">
                    <button
                      onClick={() => handleQuantityChange(item, -0.1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 min-w-[40px] text-center">
                      {item.quantity.toFixed(1)}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, 0.1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between mb-4">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-bold text-gray-900">${calculateSubtotal().toFixed(2)}</span>
          </div>
          
          <Button 
            className="w-full"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Checkout'}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full mt-2 text-gray-600"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
