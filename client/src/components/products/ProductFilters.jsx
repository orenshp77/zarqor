import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

const categories = [
  'הכל',
  'כלי כתיבה',
  'סביבת משרד',
  'מוצרי קד״מ',
  'מתנות לעובדים',
  'טכנולוגיה וגאדג׳טים'
];

const priceRanges = [
  { label: 'הכל', value: 'all' },
  { label: 'עד ₪20', value: '0-20' },
  { label: '₪20-50', value: '20-50' },
  { label: '₪50-100', value: '50-100' },
  { label: 'מעל ₪100', value: '100+' }
];

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  onClearFilters
}) => {
  const hasActiveFilters = selectedCategory !== 'הכל' || selectedPriceRange !== 'all';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-primary-500" />
          <h3 className="font-bold text-gray-900">סינון</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors"
          >
            <X size={16} />
            נקה הכל
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">קטגוריה</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ x: -4 }}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-right px-4 py-2.5 rounded-xl transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white font-medium'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">טווח מחירים</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <motion.button
              key={range.value}
              whileHover={{ x: -4 }}
              onClick={() => setSelectedPriceRange(range.value)}
              className={`w-full text-right px-4 py-2.5 rounded-xl transition-all ${
                selectedPriceRange === range.value
                  ? 'bg-primary-500 text-white font-medium'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
