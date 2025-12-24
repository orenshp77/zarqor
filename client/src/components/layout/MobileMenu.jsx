import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const MobileMenu = ({ navLinks, onClose }) => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 lg:hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl"
      >
        <div className="flex flex-col h-full pt-24 pb-8">
          {/* Navigation Links */}
          <nav className="flex-1 px-6">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`block py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="px-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">יצירת קשר</h3>
            <div className="space-y-3">
              <a
                href="tel:03-1234567"
                className="flex items-center gap-3 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <Phone size={18} />
                <span>03-1234567</span>
              </a>
              <a
                href="mailto:info@zarkor.co.il"
                className="flex items-center gap-3 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <Mail size={18} />
                <span>info@zarkor.co.il</span>
              </a>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={18} />
                <span>תל אביב, ישראל</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/quote"
              onClick={onClose}
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-primary-500 text-white rounded-xl font-medium"
            >
              קבלת הצעת מחיר
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
