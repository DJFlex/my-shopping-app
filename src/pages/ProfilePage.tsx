import React from 'react';
import { User, Heart, Settings, LogOut } from 'lucide-react';
import { useAppStore } from '../store';
import Button from '../components/ui/Button';
import { StoreSelector } from '../components/shopping/StoreSelector';

const ProfilePage: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const products = useAppStore((state) => state.products);
  const removeFromFavorites = useAppStore((state) => state.removeFromFavorites);
  
  // Get favorite products
  const favoriteProducts = products.filter(product => 
    user.favorites.includes(product.id)
  );
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold flex items-center mb-6">
        <User size={24} className="mr-2 text-emerald-600" />
        My Profile
      </h1>
      
      {/* User info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="bg-emerald-100 p-4 rounded-full mr-4">
            <User size={32} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
      
      {/* Preferred store */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Preferred Store</h2>
        <StoreSelector 
          selectedStore={user.preferredStore || null} 
          onSelectStore={() => {}} // This would update user's preferred store
        />
      </div>
      
      {/* Favorites */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Heart size={18} className="mr-2 text-emerald-600" />
          Favorite Products
        </h2>
        
        {favoriteProducts.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {favoriteProducts.map(product => (
              <li key={product.id} className="py-3 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromFavorites(product.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">
            You haven't added any favorites yet
          </p>
        )}
      </div>
      
      {/* Account actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            icon={<Settings size={18} />}
            onClick={() => alert('Settings functionality coming soon!')}
          >
            Settings
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            icon={<LogOut size={18} />}
            onClick={() => alert('Logout functionality coming soon!')}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
