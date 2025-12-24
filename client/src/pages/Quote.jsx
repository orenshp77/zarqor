import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import QuoteCart from '../components/quote/QuoteCart';
import Button from '../components/ui/Button';

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center py-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 max-w-lg text-center shadow-lg"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            הבקשה נשלחה בהצלחה!
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            תודה על פנייתך! צוות זרקור יבחן את בקשתך ויחזור אליך
            עם הצעת מחיר מפורטת תוך 24 שעות עסקים.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button className="gap-2">
                חזרה לקטלוג
                <ArrowLeft size={18} />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="secondary">
                לדף הבית
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    );
  }

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
          <Breadcrumbs items={[{ label: 'הצעת מחיר' }]} />

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
              <ShoppingBag className="text-primary-500" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">
                סל הצעת מחיר
              </h1>
              <p className="text-gray-600">
                בחרו את המוצרים ושלחו בקשה להצעת מחיר מותאמת אישית
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteCart onSuccess={() => setSubmitted(true)} />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-primary-500 mb-2">24h</div>
              <p className="text-gray-600">זמן תגובה מקסימלי להצעת מחיר</p>
            </div>
            <div>
              <div className="text-3xl font-black text-primary-500 mb-2">100%</div>
              <p className="text-gray-600">ללא התחייבות מצידכם</p>
            </div>
            <div>
              <div className="text-3xl font-black text-primary-500 mb-2">חינם</div>
              <p className="text-gray-600">הייעוץ וההצעה ללא עלות</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Quote;
