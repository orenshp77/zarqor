import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check, Tag, Package, Palette } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';
import Button from '../ui/Button';

const ProductModal = ({ product, onClose }) => {
  const { addItem, isInCart } = useQuote();
  const inCart = isInCart(product.id);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleAddToQuote = () => {
    if (!inCart) {
      addItem(product);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square md:aspect-auto bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Category badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-medium text-gray-700">
                {product.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
              <h2 className="text-2xl font-black text-gray-900 mb-3">
                {product.name}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.fullDesc || product.shortDesc}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-6">
                <Tag className="text-primary-500" size={20} />
                <span className="text-2xl font-bold text-primary-500">
                  {product.priceRange}
                </span>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">תגיות:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-3">מפרט קצר:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Package size={16} className="text-primary-500" />
                    <span>מינימום הזמנה: 50 יחידות</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Palette size={16} className="text-primary-500" />
                    <span>אפשרויות מיתוג: הדפסה / חריטה / רקמה</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-6 border-t border-gray-100">
                <Button
                  onClick={handleAddToQuote}
                  disabled={inCart}
                  className="w-full"
                  size="lg"
                >
                  {inCart ? (
                    <>
                      <Check size={20} />
                      נוסף להצעת מחיר
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      הוסף להצעת מחיר
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  * המחיר הסופי ייקבע בהתאם לכמות ולסוג המיתוג
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
