import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Heart,
  Award,
  Users,
  CheckCircle,
  ArrowLeft,
  Lightbulb,
  Palette,
  Truck
} from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const { ref: valuesRef, controls: valuesControls } = useScrollReveal();
  const { ref: processRef, controls: processControls } = useScrollReveal();
  const { ref: whyRef, controls: whyControls } = useScrollReveal();

  const values = [
    {
      icon: Target,
      title: 'מקצועיות',
      description: 'צוות מומחים עם ניסיון של למעלה מ-15 שנה בתעשיית מוצרי הפרסום והקד״מ.'
    },
    {
      icon: Heart,
      title: 'שירות אישי',
      description: 'כל לקוח מקבל מנהל לקוח אישי שמלווה אותו מהרגע הראשון ועד לאספקה.'
    },
    {
      icon: Award,
      title: 'איכות ללא פשרות',
      description: 'בקרת איכות קפדנית על כל מוצר. אנחנו עומדים מאחורי כל פריט שאנחנו מספקים.'
    },
    {
      icon: Users,
      title: 'שותפות אמיתית',
      description: 'אנחנו לא סתם ספקים - אנחנו שותפים להצלחה שלכם ומחויבים לתוצאות.'
    }
  ];

  const processSteps = [
    {
      icon: Lightbulb,
      step: '01',
      title: 'אפיון צרכים',
      description: 'בפגישת ייעוץ אישית נבין את הצרכים שלכם, את קהל היעד ואת המסרים שאתם רוצים להעביר. נתאים את המוצרים המושלמים לתקציב ולמטרות שלכם.'
    },
    {
      icon: Palette,
      step: '02',
      title: 'עיצוב ומיתוג',
      description: 'צוות העיצוב שלנו יכין עבורכם הדמיות מדויקות של המוצרים עם הלוגו שלכם. נוודא שהמיתוג נראה מושלם לפני שנכנס לייצור.'
    },
    {
      icon: Truck,
      step: '03',
      title: 'ייצור ואספקה',
      description: 'לאחר אישורכם, נכנס לייצור עם פיקוח איכות צמוד. המוצרים יגיעו אליכם ארוזים ומוכנים לשימוש, ישירות למשרד או לאירוע.'
    }
  ];

  const whyChooseUs = [
    'מגוון עצום של למעלה מ-500 מוצרים שונים',
    'מחירים תחרותיים עם אפשרות להתאמה לכל תקציב',
    'זמני אספקה מהירים - עד 5 ימי עסקים',
    'אפשרויות מיתוג מגוונות: הדפסה, חריטה, רקמה',
    'ייעוץ מקצועי ללא עלות וללא התחייבות',
    'אחריות מלאה ושירות לאחר מכירה'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-primary-50 via-white to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'אודות' }]} />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                אנחנו <span className="text-primary-500">זרקור</span>
                <br />
                השותפים שלכם למיתוג מנצח
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                זרקור פרסום ושיווק היא חברה מובילה בתחום מוצרי הקידום, כלי הכתיבה
                והציוד המשרדי הממותג. אנחנו מאמינים שכל עסק, קטן כגדול, ראוי למוצרי
                פרסום איכותיים שמייצגים אותו בצורה הטובה ביותר.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                מאז הקמתנו לפני למעלה מ-15 שנה, ליווינו אלפי לקוחות עסקיים - מסטארטאפים
                צעירים ועד תאגידים גדולים. הניסיון שלנו מאפשר לנו להציע פתרונות מותאמים
                אישית לכל צורך ותקציב.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-black text-primary-500 mb-4">15+</div>
                  <p className="text-xl font-medium text-gray-800">שנות ניסיון</p>
                  <p className="text-gray-600">באלפי פרויקטים מוצלחים</p>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
                >
                  <p className="text-2xl font-bold text-primary-500">2,000+</p>
                  <p className="text-sm text-gray-600">לקוחות מרוצים</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl"
                >
                  <p className="text-2xl font-bold text-primary-500">500+</p>
                  <p className="text-sm text-gray-600">מוצרים בקטלוג</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesControls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              הערכים שמנחים אותנו
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ארבעת העמודים שעליהם בנויה החברה שלנו
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesControls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.1 }
                  }
                }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-100 flex items-center justify-center">
                  <value.icon className="text-primary-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processControls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              תהליך העבודה שלנו
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              שלושה שלבים פשוטים מהרעיון למוצר המוגמר
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={processControls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.15 }
                  }
                }}
                className="relative bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                <div className="w-14 h-14 mb-6 rounded-xl bg-primary-50 flex items-center justify-center">
                  <step.icon className="text-primary-500" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={whyControls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                למה לבחור בזרקור?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                אנחנו לא סתם עוד ספק מוצרי קד״מ. אנחנו שותפים אמיתיים להצלחה שלכם,
                עם המחויבות, הניסיון והיכולות להפוך כל רעיון למציאות.
              </p>

              <ul className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={whyControls}
                    variants={{
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4, delay: index * 0.1 }
                      }
                    }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="text-primary-500 shrink-0" size={22} />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={whyControls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="bg-gray-900 rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">מוכנים להתחיל?</h3>
              <p className="text-gray-300 mb-6">
                צרו איתנו קשר לייעוץ חינם. נשמח לעזור לכם לבחור את המוצרים המושלמים
                לצרכים שלכם.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="gap-2">
                    לקטלוג המוצרים
                    <ArrowLeft size={18} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                    צרו קשר
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
