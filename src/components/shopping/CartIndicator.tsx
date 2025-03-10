import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAppStore } from '../../store';
import { Link } from 'react-router-dom';

const CartIndicator: React.FC = () => {
  const cart = useAppStore((state) => state.user.cart || []);
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  if (itemCount === 0) return null;
  
  return (
    <Link 
      to="/cart" 
      className="fixed bottom-20 right-4 bg-emerald-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
      aria-label={`View cart with ${itemCount} items`}
    >
      <ShoppingCart size={20} />
      <span className="ml-2 font-medium">{itemCount}</span>
    </Link>
  );
};

export default CartIndicator;
