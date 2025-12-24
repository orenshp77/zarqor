import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';

const QuoteItem = ({ item }) => {
  const { updateQuantity, removeItem } = useQuote();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 p-4 bg-white rounded-xl shadow-sm"
    >
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 mb-1 truncate">{item.name}</h4>
        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
        <p className="text-primary-500 font-medium">{item.priceRange}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeItem(item.productId)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 size={18} />
        </button>

        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteItem;
