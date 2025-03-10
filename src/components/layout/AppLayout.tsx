import React from 'react';
import { Outlet } from 'react-router-dom';
import { Home, ShoppingBag, Search, User, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CartIndicator from '../shopping/CartIndicator';

const AppLayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container mx-auto px-4 pt-6 pb-24">
        <Outlet />
      </main>
      
      <CartIndicator />
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <ul className="flex justify-around items-center">
          <li>
            <Link 
              to="/" 
              className={`flex flex-col items-center p-2 ${
                isActive('/') ? 'text-emerald-600' : 'text-gray-600'
              }`}
              aria-label="Home"
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/lists" 
              className={`flex flex-col items-center p-2 ${
                isActive('/lists') ? 'text-emerald-600' : 'text-gray-600'
              }`}
              aria-label="Lists"
            >
              <ShoppingBag size={20} />
              <span className="text-xs mt-1">Lists</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/shop" 
              className={`flex flex-col items-center p-2 ${
                isActive('/shop') ? 'text-emerald-600' : 'text-gray-600'
              }`}
              aria-label="Shop"
            >
              <ShoppingCart size={20} />
              <span className="text-xs mt-1">Shop</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              className={`flex flex-col items-center p-2 ${
                isActive('/search') ? 'text-emerald-600' : 'text-gray-600'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
              <span className="text-xs mt-1">Search</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`flex flex-col items-center p-2 ${
                isActive('/profile') ? 'text-emerald-600' : 'text-gray-600'
              }`}
              aria-label="Profile"
            >
              <User size={20} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AppLayout;
