import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'דף הבית' },
    { path: '/products', label: 'קטלוג מוצרים' },
    { path: '/about', label: 'אודות החברה' },
    { path: '/story', label: 'הסיפור שלנו' },
    { path: '/contact', label: 'צור קשר' },
    { path: '/quote', label: 'הצעת מחיר' },
  ];

  const categories = [
    { path: '/products?category=כלי כתיבה', label: 'כלי כתיבה' },
    { path: '/products?category=סביבת משרד', label: 'סביבת משרד' },
    { path: '/products?category=מוצרי קד״מ', label: 'מוצרי קד״מ' },
    { path: '/products?category=מתנות לעובדים', label: 'מתנות לעובדים' },
    { path: '/products?category=טכנולוגיה וגאדג׳טים', label: 'טכנולוגיה וגאדג׳טים' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-black">
                <span className="text-primary-400">זרקור</span>
                <span className="text-gray-300 text-lg font-medium mr-1">פרסום ושיווק</span>
              </h2>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              אנחנו מתמחים באספקת מוצרי קידום מכירות, כלי כתיבה וציוד משרדי ממותג
              לעסקים בכל הגדלים. איכות, מקצועיות ושירות אישי.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">קישורים מהירים</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6">קטגוריות</h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">יצירת קשר</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0507229966"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Phone size={18} className="text-primary-400" />
                  <span>050-7229966</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:telaviv2u@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Mail size={18} className="text-primary-400" />
                  <span>telaviv2u@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-primary-400 mt-1" />
                <span>דרך חיפה 19, קרית אתא</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock size={18} className="text-primary-400 mt-1" />
                <div>
                  <p>ימים א׳-ה׳: 09:00-18:00</p>
                  <p>יום ו׳: 09:00-13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} זרקור פרסום ושיווק. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary-400 transition-colors">
                תנאי שימוש
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                מדיניות פרטיות
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                נגישות
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
