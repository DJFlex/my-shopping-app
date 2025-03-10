import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, Store as StoreIcon, Share2 } from 'lucide-react';
import { ShoppingList } from '../../types';

type ListCardProps = {
  list: ShoppingList;
};

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const totalItems = list.items.length;
  const purchasedItems = list.items.filter(item => item.purchased).length;
  const progress = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0;
  
  // Format date to be more readable
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-AU', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <Link to={`/lists/${list.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="bg-emerald-100 p-2 rounded-full mr-3">
              <ShoppingBag size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-medium text-lg text-gray-900">{list.name}</h3>
            {list.shared && (
              <div className="ml-auto flex items-center text-gray-500 text-sm">
                <Share2 size={14} className="mr-1" />
                Shared
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            {list.store && (
              <div className="flex items-center text-sm text-gray-500">
                <StoreIcon size={16} className="mr-2" />
                {list.store}
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2" />
              Updated {formatDate(list.updatedAt)}
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{purchasedItems} of {totalItems} items</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
