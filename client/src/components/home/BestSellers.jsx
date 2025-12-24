import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { getProducts } from '../../utils/api';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, controls } = useScrollReveal();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Take first 8 products as "best sellers"
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 8));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="text-yellow-500 fill-yellow-500" size={24} />
              <span className="text-primary-500 font-medium">הנמכרים ביותר</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              המוצרים הפופולריים שלנו
            </h2>
            <p className="text-xl text-gray-600">
              מוצרים שהלקוחות שלנו אוהבים במיוחד
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
          >
            לקטלוג המלא
            <ArrowLeft size={18} />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 }
                }
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
