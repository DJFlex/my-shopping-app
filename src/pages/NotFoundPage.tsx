import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-amber-100 p-4 rounded-full mb-6">
        <AlertTriangle size={48} className="text-amber-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button icon={<Home size={18} />}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
