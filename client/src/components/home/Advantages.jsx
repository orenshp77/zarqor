import { motion } from 'framer-motion';
import {
  Award,
  Truck,
  Headphones,
  Palette,
  Shield,
  Users
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const advantages = [
  {
    icon: Award,
    title: 'איכות מעולה',
    description: 'מוצרים איכותיים בלבד מיצרנים מובילים, עם בקרת איכות קפדנית לפני כל משלוח.'
  },
  {
    icon: Palette,
    title: 'מיתוג מקצועי',
    description: 'צוות עיצוב מנוסה שידאג שהלוגו שלכם יראה מושלם על כל מוצר.'
  },
  {
    icon: Truck,
    title: 'משלוחים מהירים',
    description: 'זמני אספקה קצרים עם אפשרות למשלוח אקספרס. אנחנו עומדים בלוחות זמנים.'
  },
  {
    icon: Headphones,
    title: 'שירות אישי',
    description: 'מנהל לקוח אישי שמלווה אתכם מהרגע הראשון ועד לקבלת ההזמנה.'
  },
  {
    icon: Shield,
    title: 'אחריות מלאה',
    description: 'אחריות על כל המוצרים. לא מרוצים? נתקן או נחליף - ללא שאלות.'
  },
  {
    icon: Users,
    title: '15+ שנות ניסיון',
    description: 'מאות לקוחות עסקיים מרוצים, מסטארטאפים ועד חברות ענק.'
  }
];

const Advantages = () => {
  const { ref, controls } = useScrollReveal();

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
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            למה לבחור ב<span className="text-primary-500">זרקור</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            אנחנו לא סתם עוד ספק מוצרי קד״מ. אנחנו השותפים שלכם להצלחה עסקית.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1 }
                }
              }}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <advantage.icon className="text-primary-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
