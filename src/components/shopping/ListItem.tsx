import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store';
import { ShoppingItem } from '../../types';
import Button from '../ui/Button';

type ListItemProps = {
  item: ShoppingItem;
  listId: string;
};

const ListItem: React.FC<ListItemProps> = ({ item, listId }) => {
  const products = useAppStore((state) => state.products);
  const toggleItemPurchased = useAppStore((state) => state.toggleItemPurchased);
  const removeItemFromList = useAppStore((state) => state.removeItemFromList);
  
  const product = products.find(p => p.id === item.productId);
  
  if (!product) return null;
  
  return (
    <li className={`p-4 flex items-center justify-between ${item.purchased ? 'bg-gray-50' : ''}`}>
      <div className="flex items-center">
        <button
          onClick={() => toggleItemPurchased(listId, item.id)}
          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
            item.purchased 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-gray-300 hover:border-emerald-500'
          }`}
        >
          {item.purchased && <Check size={12} />}
        </button>
        
        <div>
          <h4 className={`font-medium ${item.purchased ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {product.name}
          </h4>
          <p className="text-sm text-gray-500">
            {item.quantity} {item.unit}
            {item.notes && ` • ${item.notes}`}
          </p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        icon={<Trash2 size={16} className="text-gray-400 hover:text-red-500" />}
        onClick={() => removeItemFromList(listId, item.id)}
      />
    </li>
  );
};

export default ListItem;
