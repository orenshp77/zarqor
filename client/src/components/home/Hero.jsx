import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-bl from-primary-50 via-white to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-100 text-primary-600 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles size={18} />
              <span className="font-medium">מומחים במיתוג עסקי</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6"
            >
              מוצרי קד״מ
              <br />
              <span className="text-primary-500">שמייצגים אתכם</span>
              <br />
              בצורה הטובה ביותר
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              אנחנו זרקור - השותפים שלכם למיתוג עסקי מנצח. מאות מוצרי קידום מכירות,
              כלי כתיבה וציוד משרדי ממותג, עם שירות אישי ואיכות ללא פשרות.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <Button size="lg" className="gap-2">
                  גלו את הקטלוג
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <Link to="/quote">
                <Button variant="outline" size="lg">
                  קבלו הצעת מחיר
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              <div>
                <p className="text-3xl font-black text-primary-500">500+</p>
                <p className="text-gray-600">מוצרים בקטלוג</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary-500">15+</p>
                <p className="text-gray-600">שנות ניסיון</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary-500">2,000+</p>
                <p className="text-gray-600">לקוחות מרוצים</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl rotate-6 opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl -rotate-3 opacity-10" />

              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Sparkles className="text-primary-500" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">מוצרים ממותגים</h3>
                  <p className="text-gray-600">איכות שמדברת בעד עצמה</p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
              >
                <p className="text-sm font-medium text-gray-600">משלוח מהיר</p>
                <p className="text-lg font-bold text-primary-500">עד 5 ימי עסקים</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl"
              >
                <p className="text-sm font-medium text-gray-600">אחריות מלאה</p>
                <p className="text-lg font-bold text-primary-500">100% שביעות רצון</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
