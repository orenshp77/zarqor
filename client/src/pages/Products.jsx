import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, Grid3X3, List } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import SearchBar from '../components/products/SearchBar';
import { getProducts } from '../utils/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'הכל');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'הכל') {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  // Get category from URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.shortDesc?.toLowerCase().includes(query) ||
          (product.tags || []).some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'הכל') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter((product) => {
        // Extract the minimum price from the price range string
        const priceMatch = product.priceRange.match(/₪(\d+)/);
        if (!priceMatch) return true;
        const minPrice = parseInt(priceMatch[1]);

        switch (selectedPriceRange) {
          case '0-20':
            return minPrice <= 20;
          case '20-50':
            return minPrice >= 20 && minPrice <= 50;
          case '50-100':
            return minPrice >= 50 && minPrice <= 100;
          case '100+':
            return minPrice >= 100;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedPriceRange]);

  const handleClearFilters = () => {
    setSelectedCategory('הכל');
    setSelectedPriceRange('all');
    setSearchQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'מוצרים' }]} />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                קטלוג המוצרים שלנו
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} מוצרים
                {selectedCategory !== 'הכל' && ` בקטגוריה "${selectedCategory}"`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1 lg:w-80">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl font-medium text-gray-700"
              >
                <SlidersHorizontal size={20} />
                <span>סינון</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <ProductFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Category description for SEO */}
              {selectedCategory !== 'הכל' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedCategory}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCategory === 'כלי כתיבה' &&
                      'מגוון רחב של כלי כתיבה ממותגים - עטים, מחברות, עפרונות ועוד. כלי כתיבה איכותיים הם דרך מצוינת להעביר את המסר שלכם ולשמור על נוכחות מתמדת אצל הלקוחות והעובדים.'}
                    {selectedCategory === 'סביבת משרד' &&
                      'פתרונות מיתוג לסביבת העבודה - מעמדים, לוחות, פדים לעכבר ועוד. הפכו את המשרד שלכם למרחב ממותג שמעביר את ערכי החברה בכל פינה.'}
                    {selectedCategory === 'מוצרי קד״מ' &&
                      'מוצרי קידום מכירות יצירתיים שיעזרו לכם לבלוט בשוק. מכוסות ממותגות ועד שקיות אקולוגיות - כל מה שצריך כדי להשאיר רושם.'}
                    {selectedCategory === 'מתנות לעובדים' &&
                      'סטים ומתנות מיוחדות לעובדים ושותפים עסקיים. הראו הערכה לצוות שלכם עם מתנות איכותיות וממותגות שישמחו לקבל.'}
                    {selectedCategory === 'טכנולוגיה וגאדג׳טים' &&
                      'גאדג׳טים חכמים ומוצרי טכנולוגיה ממותגים - פאוור בנקים, אוזניות, רמקולים ועוד. מוצרים שימושיים שילוו את הלקוחות שלכם לכל מקום.'}
                  </p>
                </motion.div>
              )}

              <ProductGrid products={filteredProducts} loading={loading} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-80 bg-gray-50 shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg">סינון מוצרים</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <ProductFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={(cat) => {
                  setSelectedCategory(cat);
                  setShowMobileFilters(false);
                }}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={(range) => {
                  setSelectedPriceRange(range);
                  setShowMobileFilters(false);
                }}
                onClearFilters={() => {
                  handleClearFilters();
                  setShowMobileFilters(false);
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Products;
