import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary-500 transition-colors"
      >
        <Home size={16} />
        <span>דף הבית</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronLeft size={16} className="text-gray-400" />
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-primary-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
