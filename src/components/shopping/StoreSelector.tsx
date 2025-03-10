import React from 'react';
import { Store as StoreIcon } from 'lucide-react';
import { Store } from '../../types';
import { STORES } from '../../data/mockData';
import { useAppStore } from '../../store';

type StoreSelectorProps = {
  selectedStore: Store | null;
  onSelectStore: (store: Store | null) => void;
};

export const StoreSelector: React.FC<StoreSelectorProps> = ({ 
  selectedStore, 
  onSelectStore 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {STORES.map((store) => (
        <button
          key={store}
          onClick={() => onSelectStore(store)}
          className={`
            flex items-center px-3 py-2 rounded-lg border
            ${selectedStore === store 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}
          `}
        >
          <StoreIcon size={16} className="mr-2" />
          {store}
        </button>
      ))}
      
      {selectedStore && (
        <button
          onClick={() => onSelectStore(null)}
          className="flex items-center px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
      )}
    </div>
  );
};

type StoreFilterProps = {
  className?: string;
};

export const StoreFilter: React.FC<StoreFilterProps> = ({ className = '' }) => {
  const selectedStore = useAppStore((state) => state.selectedStore);
  const setSelectedStore = useAppStore((state) => state.setSelectedStore);
  
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Store
      </label>
      <StoreSelector
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
      />
    </div>
  );
};
