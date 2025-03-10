import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useAppStore } from '../store';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { StoreFilter } from '../components/shopping/StoreSelector';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const products = useAppStore((state) => state.products);
  const selectedStore = useAppStore((state) => state.selectedStore);
  
  // Filter products by search term and selected store
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStore = !selectedStore || 
                         (product.stores[selectedStore] && product.stores[selectedStore]?.inStock);
    
    return matchesSearch && matchesStore;
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center mb-6">
        <Search size={24} className="mr-2 text-emerald-600" />
        Search Products
      </h1>
      
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-grow">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="w-full"
            />
          </div>
          
          <Button
            variant="outline"
            icon={<Filter size={18} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter
          </Button>
        </div>
        
        {showFilters && (
          <div className="mt-4">
            <StoreFilter />
          </div>
        )}
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredProducts.map(product => (
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
                    {selectedStore && product.stores[selectedStore] && (
                      <p className="text-xs text-gray-500">
                        ${product.stores[selectedStore]?.price.toFixed(2)} at {selectedStore}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            {searchTerm ? 'No products found matching your search' : 'Enter a search term to find products'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
