import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Check } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, isInCart } = useQuote();

  const inCart = isInCart(product.id);

  const handleAddToQuote = (e) => {
    e.stopPropagation();
    if (!inCart) {
      addItem(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center gap-2 text-white font-medium">
              <Eye size={20} />
              <span>צפייה מהירה</span>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(product.tags || []).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-primary-500 font-bold">{product.priceRange}</span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToQuote}
              disabled={inCart}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all ${
                inCart || justAdded
                  ? 'bg-green-100 text-green-600'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              {inCart || justAdded ? (
                <>
                  <Check size={16} />
                  <span className="text-sm">נוסף</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span className="text-sm">להצעה</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
