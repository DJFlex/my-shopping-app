import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, List, Plus, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store';
import ListCard from '../components/shopping/ListCard';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const shoppingLists = useAppStore((state) => state.shoppingLists);
  const products = useAppStore((state) => state.products);
  const user = useAppStore((state) => state.user);
  
  // Get favorite products
  const favoriteProducts = products.filter(product => 
    user.favorites.includes(product.id)
  );
  
  // Sort lists by updated date (most recent first)
  const sortedLists = [...shoppingLists].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  // Get recent lists (up to 2)
  const recentLists = sortedLists.slice(0, 2);
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">G'day, {user.name}!</h1>
        <p className="mb-4 opacity-90">Ready to make your shopping easier?</p>
        
        <div className="flex flex-wrap gap-3">
          <Link to="/lists/new">
            <Button variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30" icon={<Plus size={18} />}>
              New List
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30" icon={<ShoppingCart size={18} />}>
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Recent lists section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <List size={20} className="mr-2 text-emerald-600" />
            Recent Lists
          </h2>
          <Link to="/lists" className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
            View All
          </Link>
        </div>
        
        {recentLists.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {recentLists.map(list => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <List size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No lists yet</h3>
            <p className="text-gray-500 mb-4">Create your first shopping list to get started</p>
            <Link to="/lists/new">
              <Button icon={<Plus size={18} />}>Create List</Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Favorites section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <TrendingUp size={20} className="mr-2 text-emerald-600" />
            Your Favorites
          </h2>
          <Link to="/search" className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
            Browse Products
          </Link>
        </div>
        
        {favoriteProducts.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {favoriteProducts.map(product => (
                <li key={product.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">
                        From ${Math.min(...Object.values(product.stores).map(s => s?.price || Infinity)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-500">You haven't added any favorites yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
