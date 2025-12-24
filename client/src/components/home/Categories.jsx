import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pen, Briefcase, Gift, Users, Cpu } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const categories = [
  {
    name: 'כלי כתיבה',
    description: 'עטים, מחברות ועפרונות ממותגים לכל צורך',
    icon: Pen,
    count: 45,
    color: 'from-blue-400 to-blue-600',
    path: '/products?category=כלי כתיבה'
  },
  {
    name: 'סביבת משרד',
    description: 'פתרונות מיתוג לשולחן העבודה והמשרד',
    icon: Briefcase,
    count: 38,
    color: 'from-purple-400 to-purple-600',
    path: '/products?category=סביבת משרד'
  },
  {
    name: 'מוצרי קד״מ',
    description: 'פריטי פרסום יצירתיים שנשארים בזיכרון',
    icon: Gift,
    count: 120,
    color: 'from-primary-400 to-primary-600',
    path: '/products?category=מוצרי קד״מ'
  },
  {
    name: 'מתנות לעובדים',
    description: 'סטים ומתנות מיוחדות לצוות שלכם',
    icon: Users,
    count: 52,
    color: 'from-green-400 to-green-600',
    path: '/products?category=מתנות לעובדים'
  },
  {
    name: 'טכנולוגיה וגאדג׳טים',
    description: 'גאדג׳טים חכמים ומוצרי טכנולוגיה',
    icon: Cpu,
    count: 67,
    color: 'from-orange-400 to-orange-600',
    path: '/products?category=טכנולוגיה וגאדג׳טים'
  }
];

const Categories = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-gray-50">
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
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              קטגוריות מובילות
            </h2>
            <p className="text-xl text-gray-600">
              מגוון רחב של מוצרים בכל קטגוריה לבחירתכם
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
          >
            לכל המוצרים
            <ArrowLeft size={18} />
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1 }
                }
              }}
            >
              <Link
                to={category.path}
                className="group block relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0`}
                  >
                    <category.icon className="text-white" size={26} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {category.description}
                    </p>
                    <span className="text-sm text-gray-500">
                      {category.count} מוצרים
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowLeft
                    size={20}
                    className="text-gray-400 group-hover:text-primary-500 group-hover:-translate-x-1 transition-all shrink-0"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
