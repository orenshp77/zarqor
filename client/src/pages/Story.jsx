import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Quote, Heart, Target, Star, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Story = () => {
  const { ref: missionRef, controls: missionControls } = useScrollReveal();
  const { ref: differenceRef, controls: differenceControls } = useScrollReveal();

  const milestones = [
    { year: '2008', title: 'ההתחלה', description: 'הקמנו את זרקור מתוך חזון לשנות את תעשיית מוצרי הקד״מ בישראל' },
    { year: '2012', title: '500 לקוחות', description: 'הגענו לאבן דרך משמעותית - 500 לקוחות עסקיים מרוצים' },
    { year: '2016', title: 'הרחבה', description: 'הרחבנו את מגוון המוצרים והשירותים, ופתחנו מחסן לוגיסטי חדש' },
    { year: '2020', title: 'דיגיטל', description: 'השקנו את הקטלוג הדיגיטלי והמערכת המקוונת להזמנות' },
    { year: '2024', title: 'היום', description: 'ממשיכים לצמוח עם למעלה מ-2,000 לקוחות פעילים' }
  ];

  const differentiators = [
    {
      title: 'מומחיות אמיתית',
      description: 'אנחנו לא סתם מפיצים - אנחנו מומחים בתחום. יש לנו את הידע לייעץ לכם איזה מוצר יעבוד הכי טוב עבור הקהל שלכם.'
    },
    {
      title: 'גמישות מלאה',
      description: 'מהזמנה קטנה של 50 יחידות ועד אלפי פריטים - אנחנו מתאימים את עצמנו לגודל ולצרכים שלכם.'
    },
    {
      title: 'איכות ללא פשרות',
      description: 'אנחנו בודקים כל מוצר לפני שהוא יוצא אליכם. אם משהו לא בסדר - אנחנו מתקנים את זה על חשבוננו.'
    },
    {
      title: 'מחויבות לתוצאות',
      description: 'ההצלחה שלכם היא ההצלחה שלנו. אנחנו לא נרגעים עד שתהיו מרוצים לחלוטין מהתוצאה.'
    }
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
          <Breadcrumbs items={[{ label: 'הסיפור שלנו' }]} />

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                הסיפור מאחורי
                <span className="text-primary-500"> זרקור</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                לפני למעלה מ-15 שנה, יצאנו לדרך עם חזון פשוט: להפוך את המיתוג העסקי לנגיש,
                איכותי ומותאם אישית לכל עסק בישראל. הדרך לא הייתה קלה, אבל כל אתגר לימד
                אותנו משהו חדש.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-white rounded-2xl p-8 shadow-lg border-r-4 border-primary-500"
            >
              <Quote className="absolute top-4 right-4 text-primary-200" size={40} />
              <p className="text-lg text-gray-700 italic leading-relaxed pr-12">
                "התחלנו בחדר קטן עם שולחן אחד וחלום גדול. היום, כשאני רואה את הלוגו של
                הלקוחות שלנו על מוצרים ברחבי הארץ, אני יודע שעשינו את הדבר הנכון. זה לא
                רק עסק - זו שליחות."
              </p>
              <p className="mt-4 font-bold text-gray-900">— מייסד זרקור</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ציוני הדרך שלנו
            </h2>
            <p className="text-xl text-gray-600">
              המסע שלנו מההתחלה ועד היום
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 right-1/2 w-0.5 bg-primary-100 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <span className="text-primary-500 font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-md z-10" />

                  {/* Empty space for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionControls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-primary-400" size={32} />
                <h2 className="text-3xl sm:text-4xl font-black">המשימה שלנו</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                להפוך כל עסק בישראל לבולט יותר, זכיר יותר, ומצליח יותר - דרך מוצרי
                מיתוג איכותיים שמעבירים את המסר הנכון לקהל הנכון.
              </p>
              <p className="text-gray-400 leading-relaxed">
                אנחנו מאמינים שמיתוג טוב הוא לא רק לוגו על מוצר. זה סיפור שאתם מספרים,
                רושם שאתם משאירים, וערך שאתם מעבירים. המשימה שלנו היא לעזור לכם לספר
                את הסיפור הזה בצורה הטובה ביותר.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionControls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-primary-400 mb-2">15+</div>
                <p className="text-gray-400">שנות ניסיון</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-primary-400 mb-2">2K+</div>
                <p className="text-gray-400">לקוחות פעילים</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-primary-400 mb-2">500+</div>
                <p className="text-gray-400">מוצרים שונים</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-primary-400 mb-2">99%</div>
                <p className="text-gray-400">שביעות רצון</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section ref={differenceRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={differenceControls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="text-primary-500" size={28} />
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                מה מבדל אותנו
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              לא סתם עוד ספק - שותפים אמיתיים להצלחה שלכם
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={differenceControls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 }
                  }
                }}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-primary-50 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="text-primary-500" size={24} />
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              מוכנים להיות חלק מהסיפור?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              הצטרפו לאלפי עסקים שכבר סומכים עלינו למיתוג שלהם
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-white text-primary-500 hover:bg-gray-100 gap-2"
                >
                  גלו את הקטלוג
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-500"
                >
                  דברו איתנו
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Story;
