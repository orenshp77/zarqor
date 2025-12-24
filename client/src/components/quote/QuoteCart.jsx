import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Send, Loader2 } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';
import QuoteItem from './QuoteItem';
import Button from '../ui/Button';
import { submitQuote } from '../../utils/api';

const QuoteCart = ({ onSuccess }) => {
  const { items, clearCart } = useQuote();
  const [notes, setNotes] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!contactInfo.name || contactInfo.name.trim().length < 2) {
      newErrors.name = 'שם חייב להכיל לפחות 2 תווים';
    }

    const phoneRegex = /^0(5[0-9]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
    if (!contactInfo.phone || !phoneRegex.test(contactInfo.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email || !emailRegex.test(contactInfo.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await submitQuote({
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          priceRange: item.priceRange
        })),
        contactInfo,
        notes
      });

      clearCart();
      onSuccess();
    } catch (error) {
      console.error('Error submitting quote:', error);
      setErrors({ submit: 'שגיאה בשליחת הבקשה. אנא נסו שוב.' });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          הסל ריק
        </h3>
        <p className="text-gray-600 mb-6">
          הוסיפו מוצרים מהקטלוג כדי לקבל הצעת מחיר
        </p>
        <a
          href="/products"
          className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          לקטלוג המוצרים
        </a>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <QuoteItem key={item.productId} item={item} />
          ))}
        </AnimatePresence>

        {/* Notes */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <label className="block font-medium text-gray-900 mb-3">
            הערות להזמנה (אופציונלי)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="הוסיפו הערות, בקשות מיוחדות או פרטים נוספים..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-right"
          />
        </div>
      </div>

      {/* Contact Form & Submit */}
      <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-24">
        <h3 className="text-xl font-bold text-gray-900 mb-6">פרטי התקשרות</h3>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              שם מלא *
            </label>
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              טלפון *
            </label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              אימייל *
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              שם חברה
            </label>
            <input
              type="text"
              value={contactInfo.company}
              onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-100 pt-4 mb-6">
          <div className="flex items-center justify-between text-gray-600 mb-2">
            <span>סה״כ פריטים:</span>
            <span className="font-medium">{items.length}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span>סה״כ יחידות:</span>
            <span className="font-medium">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.submit}</p>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              שולח...
            </>
          ) : (
            <>
              <Send size={20} />
              שלח בקשה להצעת מחיר
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-3">
          נחזור אליכם עם הצעה מפורטת תוך 24 שעות
        </p>
      </div>
    </div>
  );
};

export default QuoteCart;
