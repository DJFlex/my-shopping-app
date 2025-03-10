import React, { useState } from 'react';
import { Plus, List, Filter } from 'lucide-react';
import { useAppStore } from '../store';
import ListCard from '../components/shopping/ListCard';
import Button from '../components/ui/Button';
import { StoreFilter } from '../components/shopping/StoreSelector';
import { Link } from 'react-router-dom';

const ListsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const shoppingLists = useAppStore((state) => state.shoppingLists);
  const selectedStore = useAppStore((state) => state.selectedStore);
  
  // Filter lists by selected store
  const filteredLists = selectedStore
    ? shoppingLists.filter(list => list.store === selectedStore)
    : shoppingLists;
  
  // Sort lists by updated date (most recent first)
  const sortedLists = [...filteredLists].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <List size={24} className="mr-2 text-emerald-600" />
          My Shopping Lists
        </h1>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Filter size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter
          </Button>
          
          <Link to="/lists/new">
            <Button size="sm" icon={<Plus size={16} />}>
              New List
            </Button>
          </Link>
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-6">
          <StoreFilter />
        </div>
      )}
      
      {sortedLists.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedLists.map(list => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <List size={32} className="text-gray-400" />
          </div>
          
          {selectedStore ? (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No lists for {selectedStore}
              </h3>
              <p className="text-gray-500 mb-4">
                Try selecting a different store or create a new list
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No shopping lists yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first shopping list to get started
              </p>
            </>
          )}
          
          <Link to="/lists/new">
            <Button icon={<Plus size={18} />}>Create List</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListsPage;
