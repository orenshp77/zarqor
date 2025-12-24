import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Upload,
  X,
  Globe,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Image,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SiteSettings() {
  const { token } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'ההגדרות נשמרו בהצלחה' });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'שגיאה בשמירת ההגדרות' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/settings/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        const [section, key] = field.split('.');
        setSettings({
          ...settings,
          [section]: {
            ...settings[section],
            [key]: data.data.url
          }
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const updateSetting = (section, key, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value
      }
    });
  };

  const tabs = [
    { id: 'general', label: 'כללי', icon: Globe },
    { id: 'contact', label: 'פרטי קשר', icon: Phone },
    { id: 'images', label: 'תמונות', icon: Image },
    { id: 'footer', label: 'פוטר', icon: MapPin }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">הגדרות האתר</h1>
          <p className="text-gray-500">ניהול פרטים כלליים והגדרות</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? 'שומר...' : 'שמור שינויים'}
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}
        >
          {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    שם האתר
                  </label>
                  <input
                    type="text"
                    value={settings?.site?.name || ''}
                    onChange={(e) => updateSetting('site', 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    סלוגן
                  </label>
                  <input
                    type="text"
                    value={settings?.site?.tagline || ''}
                    onChange={(e) => updateSetting('site', 'tagline', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כותרת ראשית (Hero)
                </label>
                <input
                  type="text"
                  value={settings?.homepage?.heroTitle || ''}
                  onChange={(e) => updateSetting('homepage', 'heroTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תת כותרת (Hero)
                </label>
                <textarea
                  value={settings?.homepage?.heroSubtitle || ''}
                  onChange={(e) => updateSetting('homepage', 'heroSubtitle', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings?.homepage?.showBestSellers || false}
                    onChange={(e) => updateSetting('homepage', 'showBestSellers', e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">הצג מוצרים מומלצים</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings?.homepage?.showCategories || false}
                    onChange={(e) => updateSetting('homepage', 'showCategories', e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">הצג קטגוריות</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings?.homepage?.showAdvantages || false}
                    onChange={(e) => updateSetting('homepage', 'showAdvantages', e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">הצג יתרונות</span>
                </label>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline ml-1" />
                    אימייל
                  </label>
                  <input
                    type="email"
                    value={settings?.site?.email || ''}
                    onChange={(e) => updateSetting('site', 'email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline ml-1" />
                    טלפון
                  </label>
                  <input
                    type="tel"
                    value={settings?.site?.phone || ''}
                    onChange={(e) => updateSetting('site', 'phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline ml-1" />
                    וואטסאפ (מספר בינלאומי)
                  </label>
                  <input
                    type="text"
                    value={settings?.site?.whatsapp || ''}
                    onChange={(e) => updateSetting('site', 'whatsapp', e.target.value)}
                    placeholder="972501234567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline ml-1" />
                    כתובת
                  </label>
                  <input
                    type="text"
                    value={settings?.site?.address || ''}
                    onChange={(e) => updateSetting('site', 'address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              {/* Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  לוגו
                </label>
                <div className="flex items-center gap-4">
                  {settings?.site?.logo && (
                    <img
                      src={settings.site.logo}
                      alt="Logo"
                      className="h-16 object-contain bg-gray-100 rounded-lg p-2"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">העלה לוגו</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'site.logo')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תמונת Hero
                </label>
                <div className="flex items-start gap-4">
                  {settings?.homepage?.heroImage && (
                    <img
                      src={settings.homepage.heroImage}
                      alt="Hero"
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">העלה תמונה</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'homepage.heroImage')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Footer Tab */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  טקסט זכויות יוצרים
                </label>
                <input
                  type="text"
                  value={settings?.footer?.copyright || ''}
                  onChange={(e) => updateSetting('footer', 'copyright', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    קישור לפייסבוק
                  </label>
                  <input
                    type="url"
                    value={settings?.footer?.socialLinks?.facebook || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      footer: {
                        ...settings.footer,
                        socialLinks: {
                          ...settings.footer?.socialLinks,
                          facebook: e.target.value
                        }
                      }
                    })}
                    placeholder="https://facebook.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    קישור לאינסטגרם
                  </label>
                  <input
                    type="url"
                    value={settings?.footer?.socialLinks?.instagram || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      footer: {
                        ...settings.footer,
                        socialLinks: {
                          ...settings.footer?.socialLinks,
                          instagram: e.target.value
                        }
                      }
                    })}
                    placeholder="https://instagram.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    קישור ללינקדאין
                  </label>
                  <input
                    type="url"
                    value={settings?.footer?.socialLinks?.linkedin || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      footer: {
                        ...settings.footer,
                        socialLinks: {
                          ...settings.footer?.socialLinks,
                          linkedin: e.target.value
                        }
                      }
                    })}
                    placeholder="https://linkedin.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
