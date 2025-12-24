import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, FileText } from 'lucide-react';
import Button from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CTASection = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
            }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              מוכנים להתחיל?
              <br />
              <span className="text-primary-400">בואו נדבר על הפרויקט שלכם</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              צרו איתנו קשר לייעוץ חינם ללא התחייבות. נשמח לעזור לכם לבחור את המוצרים
              המתאימים ביותר לצרכים שלכם ולתקציב שלכם.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="gap-2">
                  <FileText size={20} />
                  פתחו את הקטלוג
                </Button>
              </Link>
              <Link to="/quote">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 gap-2">
                  קבלו הצעת מחיר
                  <ArrowLeft size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                דברו איתנו עכשיו
              </h3>

              <div className="space-y-6">
                <a
                  href="tel:03-1234567"
                  className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                    <Phone className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">חייגו עכשיו</p>
                    <p className="text-xl font-bold text-gray-900">03-1234567</p>
                  </div>
                </a>

                <div className="text-center py-4">
                  <p className="text-gray-500">או</p>
                </div>

                <Link
                  to="/contact"
                  className="block w-full py-4 text-center bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  השאירו פרטים ונחזור אליכם
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>זמינים עכשיו</span>
                  </div>
                  <span>ימים א׳-ה׳ 09:00-18:00</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
