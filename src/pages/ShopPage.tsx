import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ShoppingCart, Filter, Search, SortAsc, Tag, Percent } from 'lucide-react';
import { useAppStore } from '../store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Product, Store } from '../types';
import { CATEGORIES, STORES } from '../data/mockData';

const ShopPage: React.FC = () => {
  const products = useAppStore((state) => state.products);
  const user = useAppStore((state) => state.user);
  const addToCart = useAppStore((state) => state.addToCart);
  const selectedStore = useAppStore((state) => state.selectedStore);
  const setSelectedStore = useAppStore((state) => state.setSelectedStore);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<'name' | 'price' | 'popularity'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Simulate loading products from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize the store to use to prevent recalculations
  const storeToUse = useMemo(() => 
    selectedStore || user.preferredStore || 'Woolworths', 
    [selectedStore, user.preferredStore]
  );
  
  // Memoize the filtering and sorting logic to prevent unnecessary recalculations
  const filterAndSortProducts = useCallback(() => {
    if (isLoading) return [];
    
    try {
      let filtered = [...products];
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(term) || 
          product.category.toLowerCase().includes(term) ||
          product.brands?.some(brand => brand.toLowerCase().includes(term)) ||
          product.tags?.some(tag => tag.toLowerCase().includes(term))
        );
      }
      
      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Apply store filter
      if (selectedStore) {
        filtered = filtered.filter(product => 
          product.stores[selectedStore] && product.stores[selectedStore]?.inStock
        );
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        if (sortOption === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortOption === 'price') {
          const priceA = a.stores[storeToUse]?.price || 0;
          const priceB = b.stores[storeToUse]?.price || 0;
          
          return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
        } else { // popularity - using a simple algorithm based on store availability
          const availabilityA = Object.values(a.stores).filter(s => s.inStock).length;
          const availabilityB = Object.values(b.stores).filter(s => s.inStock).length;
          
          return sortDirection === 'asc' 
            ? availabilityA - availabilityB
            : availabilityB - availabilityA;
        }
      });
      
      return filtered;
    } catch (error) {
      console.error('Error filtering products:', error);
      setLoadError('Failed to process products. Please try again.');
      return [];
    }
  }, [
    products, 
    searchTerm, 
    selectedCategory, 
    selectedStore, 
    sortOption, 
    sortDirection, 
    isLoading, 
    storeToUse
  ]);
  
  // Update filtered products when dependencies change
  useEffect(() => {
    // Only update if not loading
    if (!isLoading) {
      const result = filterAndSortProducts();
      setFilteredProducts(result);
    }
  }, [filterAndSortProducts, isLoading]);
  
  const handleAddToCart = (product: Product) => {
    const unit = product.stores[storeToUse]?.unit || 'each';
    
    addToCart({
      id: `cart-${Date.now()}`,
      productId: product.id,
      quantity: 1,
      unit,
      purchased: false
    });
  };
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSortOption('name');
    setSortDirection('asc');
    
    // Use a timeout to avoid nested updates
    setTimeout(() => {
      setSelectedStore(null);
    }, 0);
  };
  
  const getDiscountedPrice = (product: Product): { original: number, discounted: number | null } => {
    const price = product.stores[storeToUse]?.price || 0;
    
    // Simulate discounts for some products (in a real app, this would come from the API)
    const isDiscounted = product.id.charCodeAt(1) % 5 === 0; // Just a way to randomly assign discounts
    
    if (isDiscounted) {
      return {
        original: price,
        discounted: parseFloat((price * 0.8).toFixed(2)) // 20% discount
      };
    }
    
    return {
      original: price,
      discounted: null
    };
  };
  
  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold flex items-center mb-6">
          <ShoppingCart size={24} className="mr-2 text-emerald-600" />
          Shop
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (loadError) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold flex items-center mb-6">
          <ShoppingCart size={24} className="mr-2 text-emerald-600" />
          Shop
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 mb-2">{loadError}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }
  
  // Memoize the store selector handler to prevent unnecessary re-renders
  const handleStoreChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setSelectedStore(value as Store | null);
  }, [setSelectedStore]);
  
  return (
    <div className="pb-6">
      <h1 className="text-2xl font-bold flex items-center mb-6">
        <ShoppingCart size={24} className="mr-2 text-emerald-600" />
        Shop
      </h1>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-10"
              aria-label="Search products"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
            aria-expanded={showFilters}
          >
            <Filter size={18} className={showFilters ? "text-emerald-600" : "text-gray-600"} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleSortDirection}
            aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
          >
            <SortAsc size={18} className={`text-gray-600 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {showFilters && (
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select
                  id="category-filter"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label htmlFor="store-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Store
                </label>
                <Select
                  id="store-filter"
                  value={selectedStore || ''}
                  onChange={handleStoreChange}
                  aria-label="Filter by store"
                >
                  <option value="">All Stores</option>
                  {STORES.map(store => (
                    <option key={store} value={store}>{store}</option>
                  ))}
                </Select>
              </div>
            </div>
            
            <div>
              <label htmlFor="sort-option" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <Select
                id="sort-option"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as 'name' | 'price' | 'popularity')}
                aria-label="Sort by"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="popularity">Popularity</option>
              </Select>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
                className="text-gray-600"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => {
            const pricing = getDiscountedPrice(product);
            const unit = product.stores[storeToUse]?.unit || 'each';
            
            return (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                aria-label={`Product: ${product.name}`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  {product.brands && product.brands.length > 0 && (
                    <p className="text-sm text-gray-500 mb-2">
                      {product.brands[0]}
                    </p>
                  )}
                  
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded"
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      {pricing.discounted ? (
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-emerald-600">
                            ${pricing.discounted.toFixed(2)}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${pricing.original.toFixed(2)}
                          </span>
                          <span className="ml-2 bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded flex items-center">
                            <Percent size={10} className="mr-0.5" />
                            20% OFF
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ${pricing.original.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        per {unit}
                      </span>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                  {product.stores[storeToUse]?.inStock ? (
                    <span className="text-emerald-600">In stock at {storeToUse}</span>
                  ) : (
                    <span className="text-red-500">Out of stock at {storeToUse}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingCart size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
