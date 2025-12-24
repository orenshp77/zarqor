import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Phone, User } from 'lucide-react';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { useQuote } from '../../context/QuoteContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'דף הבית' },
    { path: '/products', label: 'מוצרים', hasMegaMenu: true },
    { path: '/about', label: 'אודות' },
    { path: '/story', label: 'הסיפור שלנו' },
    { path: '/contact', label: 'צור קשר' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-black text-gray-900"
              >
                <span className="text-primary-500">זרקור</span>
                <span className="text-gray-700 text-lg font-medium mr-1">פרסום ושיווק</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`text-base font-medium transition-colors hover:text-primary-500 ${
                      location.pathname === link.path
                        ? 'text-primary-500'
                        : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.hasMegaMenu && (
                    <AnimatePresence>
                      {isMegaMenuOpen && <MegaMenu />}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/quote"
                className="relative flex items-center gap-2 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <ShoppingBag size={22} />
                <span className="font-medium">הצעת מחיר</span>
                {items.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {items.length}
                  </motion.span>
                )}
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-2 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <User size={20} />
                <span className="font-medium">אזור אישי</span>
              </Link>
              <a
                href="tel:0507229966"
                className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-600 transition-colors"
              >
                <Phone size={18} />
                <span>050-7229966</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-4">
              <Link to="/quote" className="relative">
                <ShoppingBag size={24} className="text-gray-700" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {items.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-primary-500 transition-colors"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            navLinks={navLinks}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
