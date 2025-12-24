import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle
} from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import { submitContact } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'שם חייב להכיל לפחות 2 תווים';
    }

    const phoneRegex = /^0(5[0-9]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין (יש להזין מספר ישראלי)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'הודעה חייבת להכיל לפחות 10 תווים';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await submitContact(formData);
      setSuccess(true);
      setToast({
        type: 'success',
        message: 'הפנייה נשלחה בהצלחה! ניצור איתך קשר בהקדם.'
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      setToast({
        type: 'error',
        message: 'שגיאה בשליחת הפנייה. אנא נסו שוב.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'טלפון',
      details: ['050-7229966'],
      action: 'tel:0507229966'
    },
    {
      icon: Mail,
      title: 'אימייל',
      details: ['telaviv2u@gmail.com'],
      action: 'mailto:telaviv2u@gmail.com'
    },
    {
      icon: MapPin,
      title: 'כתובת',
      details: ['דרך חיפה 19', 'קרית אתא'],
      action: null
    },
    {
      icon: Clock,
      title: 'שעות פעילות',
      details: ['א׳-ה׳: 09:00-18:00', 'ו׳: 09:00-13:00'],
      action: null
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'יצירת קשר' }]} />

          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              צרו איתנו קשר
            </h1>
            <p className="text-xl text-gray-600">
              נשמח לשמוע מכם! מלאו את הטופס או פנו אלינו ישירות באחת הדרכים הבאות.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      {item.details.map((detail, index) => (
                        item.action ? (
                          <a
                            key={index}
                            href={item.action}
                            className="block text-gray-600 hover:text-primary-500 transition-colors"
                          >
                            {detail}
                          </a>
                        ) : (
                          <p key={index} className="text-gray-600">{detail}</p>
                        )
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-green-500" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      תודה על פנייתך!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      הפנייה שלך התקבלה בהצלחה. ניצור איתך קשר בהקדם האפשרי.
                    </p>
                    <Button onClick={() => setSuccess(false)}>
                      שלח פנייה נוספת
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      השאירו פרטים ונחזור אליכם
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            שם מלא *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right ${
                              errors.name ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="הזינו את שמכם"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            טלפון *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right ${
                              errors.phone ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="050-1234567"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            אימייל *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right ${
                              errors.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="your@email.com"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>

                        {/* Company */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            שם חברה
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right"
                            placeholder="שם החברה (אופציונלי)"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          הודעה *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-right ${
                            errors.message ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="ספרו לנו במה נוכל לעזור..."
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full sm:w-auto"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            שולח...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            שליחת הפנייה
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            שאלות נפוצות
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'מהי כמות ההזמנה המינימלית?',
                a: 'כמות ההזמנה המינימלית משתנה בהתאם למוצר ולסוג המיתוג. בדרך כלל המינימום הוא 50 יחידות, אך למוצרים מסוימים ניתן להזמין כמויות קטנות יותר. צרו איתנו קשר לפרטים.'
              },
              {
                q: 'כמה זמן לוקח לקבל הצעת מחיר?',
                a: 'אנחנו מתחייבים לחזור עם הצעת מחיר מפורטת תוך 24 שעות עסקים לכל היותר. בדרך כלל זה לוקח אפילו פחות.'
              },
              {
                q: 'מה זמני האספקה?',
                a: 'זמני האספקה הסטנדרטיים הם 5-10 ימי עסקים מרגע אישור ההזמנה. למקרים דחופים יש אפשרות לאספקה מהירה בתוספת תשלום.'
              },
              {
                q: 'האם יש אחריות על המוצרים?',
                a: 'בהחלט! אנחנו עומדים מאחורי כל מוצר שאנחנו מספקים. אם משהו לא בסדר - נתקן או נחליף ללא שאלות.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
