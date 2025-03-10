import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Share } from 'lucide-react';
import { useAppStore } from '../store';
import Button from '../components/ui/Button';
import AddItemForm from '../components/shopping/AddItemForm';
import ListItem from '../components/shopping/ListItem';
import { StoreSelector } from '../components/shopping/StoreSelector';
import { ShoppingList, Store } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ListDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewList = id === 'new';
  
  const shoppingLists = useAppStore((state) => state.shoppingLists);
  const addShoppingList = useAppStore((state) => state.addShoppingList);
  const updateShoppingList = useAppStore((state) => state.updateShoppingList);
  const deleteShoppingList = useAppStore((state) => state.deleteShoppingList);
  
  const existingList = shoppingLists.find(list => list.id === id);
  
  const [listName, setListName] = useState(existingList?.name || 'New Shopping List');
  const [selectedStore, setSelectedStore] = useState<Store | undefined>(existingList?.store);
  const [items, setItems] = useState(existingList?.items || []);
  
  // Create a new list if we're on the new list page
  useEffect(() => {
    if (isNewList && !existingList) {
      const newList: ShoppingList = {
        id: uuidv4(),
        name: listName,
        store: selectedStore,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        shared: false
      };
      
      addShoppingList(newList);
      navigate(`/lists/${newList.id}`, { replace: true });
    }
  }, [isNewList, existingList, addShoppingList, navigate, listName, selectedStore]);
  
  // Update local state when the list changes
  useEffect(() => {
    if (existingList) {
      setListName(existingList.name);
      setSelectedStore(existingList.store);
      setItems(existingList.items);
    }
  }, [existingList]);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setListName(newName);
    if (!isNewList && existingList) {
      updateShoppingList(existingList.id, { name: newName });
    }
  };
  
  const handleStoreChange = (store: Store | null) => {
    const newStore = store || undefined;
    setSelectedStore(newStore);
    if (!isNewList && existingList) {
      updateShoppingList(existingList.id, { store: newStore });
    }
  };
  
  const handleDeleteList = () => {
    if (existingList) {
      deleteShoppingList(existingList.id);
      navigate('/lists', { replace: true });
    }
  };
  
  const purchasedItems = items.filter(item => item.purchased);
  const unpurchasedItems = items.filter(item => !item.purchased);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/lists')}
            icon={<ArrowLeft size={20} />}
          />
          <div className="flex items-center ml-2">
            <div className="bg-emerald-100 p-2 rounded-full mr-3">
              <ShoppingBag size={20} className="text-emerald-600" />
            </div>
            <input
              type="text"
              value={listName}
              onChange={handleNameChange}
              className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 p-0"
              placeholder="List Name"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Share size={16} />}
            onClick={() => alert('Sharing functionality coming soon!')}
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            icon={<Trash2 size={16} className="text-red-500" />}
            onClick={handleDeleteList}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Store</label>
        <StoreSelector 
          selectedStore={selectedStore || null} 
          onSelectStore={handleStoreChange} 
        />
      </div>
      
      <AddItemForm 
        listId={existingList?.id || ''} 
        onAddItem={(item) => {
          if (existingList) {
            updateShoppingList(existingList.id, {
              items: [...existingList.items, item]
            });
          }
        }}
      />
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-3">Items to Buy ({unpurchasedItems.length})</h3>
        {unpurchasedItems.length > 0 ? (
          <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm border border-gray-200">
            {unpurchasedItems.map(item => (
              <ListItem 
                key={item.id} 
                item={item} 
                listId={existingList?.id || ''} 
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500">No items added yet</p>
          </div>
        )}
      </div>
      
      {purchasedItems.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-3">Purchased ({purchasedItems.length})</h3>
          <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm border border-gray-200">
            {purchasedItems.map(item => (
              <ListItem 
                key={item.id} 
                item={item} 
                listId={existingList?.id || ''} 
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListDetailPage;
