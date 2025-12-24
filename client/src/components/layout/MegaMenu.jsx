import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Pen,
  Briefcase,
  Gift,
  Users,
  Cpu,
  Star
} from 'lucide-react';

const categories = [
  {
    name: 'כלי כתיבה',
    description: 'עטים, מחברות ועוד',
    icon: Pen,
    path: '/products?category=כלי כתיבה'
  },
  {
    name: 'סביבת משרד',
    description: 'פתרונות לשולחן העבודה',
    icon: Briefcase,
    path: '/products?category=סביבת משרד'
  },
  {
    name: 'מוצרי קד״מ',
    description: 'פריטי פרסום ומיתוג',
    icon: Gift,
    path: '/products?category=מוצרי קד״מ'
  },
  {
    name: 'מתנות לעובדים',
    description: 'סטים ומתנות מיוחדות',
    icon: Users,
    path: '/products?category=מתנות לעובדים'
  },
  {
    name: 'טכנולוגיה וגאדג׳טים',
    description: 'גאדג׳טים חכמים',
    icon: Cpu,
    path: '/products?category=טכנולוגיה וגאדג׳טים'
  }
];

const MegaMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full right-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="text-primary-500" size={20} />
          <h3 className="text-lg font-bold text-gray-900">קטגוריות מוצרים</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <category.icon className="text-primary-500" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
          >
            צפייה בכל המוצרים
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
