import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useAppStore } from '../../store';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { ShoppingItem, Unit, Product } from '../../types';
import { CATEGORIES } from '../../data/mockData';

type AddItemFormProps = {
  listId: string;
  onAddItem?: (item: ShoppingItem) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ listId, onAddItem }) => {
  const products = useAppStore((state) => state.products);
  const addItemToList = useAppStore((state) => state.addItemToList);
  const addProduct = useAppStore((state) => state.addProduct);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<Unit>('each');
  const [notes, setNotes] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductBrand, setNewProductBrand] = useState('');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    
    // Create a fuzzy search function that handles misspellings
    const fuzzyMatch = (text: string, pattern: string): boolean => {
      pattern = pattern.toLowerCase();
      text = text.toLowerCase();
      
      // Exact match
      if (text.includes(pattern)) return true;
      
      // Check for common misspellings by allowing one character difference
      const maxDistance = Math.min(2, Math.floor(pattern.length / 3));
      let distance = 0;
      
      let j = 0;
      for (let i = 0; i < pattern.length && j < text.length; j++) {
        if (pattern[i] === text[j]) {
          i++;
        } else {
          distance++;
          if (distance > maxDistance) return false;
        }
      }
      
      return true;
    };
    
    let filtered = products.filter(product => {
      // Match by name or brand
      const nameMatch = fuzzyMatch(product.name, searchTerm);
      const categoryMatch = product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const brandMatch = product.brands?.some(brand => 
        brand.toLowerCase().includes(searchTerm.toLowerCase())
      ) || false;
      const tagMatch = product.tags?.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) || false;
      
      return nameMatch || categoryMatch || brandMatch || tagMatch;
    });
    
    // Apply category filter if active
    if (activeFilterCategory) {
      filtered = filtered.filter(product => product.category === activeFilterCategory);
    }
    
    // Sort results by relevance (exact matches first)
    filtered.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });
    
    setFilteredProducts(filtered);
    setShowDropdown(true);
  }, [searchTerm, products, activeFilterCategory]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleProductSelect = (product: Product) => {
    setProductId(product.id);
    setSearchTerm(product.name);
    setShowDropdown(false);
    
    // Set default unit based on the product's most common unit
    const storeEntries = Object.values(product.stores);
    if (storeEntries.length > 0) {
      const firstStoreUnit = storeEntries[0]?.unit;
      if (firstStoreUnit) {
        setUnit(firstStoreUnit);
      }
    }
  };
  
  const handleAddNewItem = () => {
    setShowAddNewForm(true);
    setShowDropdown(false);
    setNewProductName(searchTerm);
  };
  
  const handleCancelAddNew = () => {
    setShowAddNewForm(false);
  };
  
  const handleSubmitNewProduct = () => {
    if (!newProductName.trim()) return;
    
    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: newProductName.trim(),
      category: selectedCategory,
      brands: newProductBrand ? [newProductBrand] : undefined,
      stores: {
        Woolworths: { price: 0, unit, inStock: true },
        Coles: { price: 0, unit, inStock: true },
        Aldi: { price: 0, unit, inStock: true },
        IGA: { price: 0, unit, inStock: true }
      },
      tags: [selectedCategory.toLowerCase()]
    };
    
    addProduct(newProduct);
    setProductId(newProduct.id);
    setSearchTerm(newProduct.name);
    setShowAddNewForm(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productId) return;
    
    const newItem: ShoppingItem = {
      id: uuidv4(),
      productId,
      quantity,
      unit,
      purchased: false,
      notes: notes || undefined
    };
    
    addItemToList(listId, newItem);
    
    if (onAddItem) {
      onAddItem(newItem);
    }
    
    // Reset form
    setProductId('');
    setSearchTerm('');
    setQuantity(1);
    setUnit('each');
    setNotes('');
  };
  
  const handleCategoryFilter = (category: string) => {
    if (activeFilterCategory === category) {
      setActiveFilterCategory(null);
    } else {
      setActiveFilterCategory(category);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-3">Add Item</h3>
      
      <div className="space-y-3">
        {!showAddNewForm ? (
          <div className="relative">
            <label htmlFor="product-search" className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input
                id="product-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.trim() !== '' && setShowDropdown(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search for a product..."
                className="pl-10"
                required
                ref={searchInputRef}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setSearchTerm('');
                    setProductId('');
                    searchInputRef.current?.focus();
                  }}
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
            
            {showDropdown && (
              <div 
                ref={dropdownRef}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-gray-200"
              >
                {/* Category filters */}
                {searchTerm.length > 1 && (
                  <div className="px-2 py-1 border-b border-gray-200">
                    <div className="flex flex-wrap gap-1 text-xs">
                      {CATEGORIES.slice(0, 6).map(category => (
                        <button
                          key={category}
                          type="button"
                          className={`px-2 py-1 rounded-full ${
                            activeFilterCategory === category 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                          onClick={() => handleCategoryFilter(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {filteredProducts.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {filteredProducts.map(product => (
                      <li 
                        key={product.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleProductSelect(product)}
                      >
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded">{product.category}</span>
                          {product.brands && product.brands.length > 0 && (
                            <span>{product.brands[0]}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-700">
                    <p>No products found matching "{searchTerm}"</p>
                    <button
                      type="button"
                      className="mt-2 text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
                      onClick={handleAddNewItem}
                    >
                      <Plus size={16} />
                      Add "{searchTerm}" as a new product
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Add New Product</h4>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="new-product-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <Input
                  id="new-product-name"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="new-product-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select
                  id="new-product-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label htmlFor="new-product-brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand (optional)
                </label>
                <Input
                  id="new-product-brand"
                  value={newProductBrand}
                  onChange={(e) => setNewProductBrand(e.target.value)}
                  placeholder="E.g., Woolworths, Coles, etc."
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={handleCancelAddNew}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="flex-1"
                  onClick={handleSubmitNewProduct}
                  disabled={!newProductName.trim()}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              min="0.01"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              required
            />
          </div>
          
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <Select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
            >
              <option value="each">each</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="pack">pack</option>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g., Get the ripe ones"
          />
        </div>
        
        <Button 
          type="submit" 
          icon={<Plus size={16} />} 
          className="w-full"
          disabled={!productId}
        >
          Add to List
        </Button>
      </div>
    </form>
  );
};

export default AddItemForm;
