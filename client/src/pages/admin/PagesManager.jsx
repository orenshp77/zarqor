import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Upload,
  FileText,
  Home,
  Users,
  BookOpen,
  Mail,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PagesManager() {
  const { token } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activePage, setActivePage] = useState('about');

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
        setMessage({ type: 'success', text: 'העמוד נשמר בהצלחה' });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error saving:', error);
      setMessage({ type: 'error', text: 'שגיאה בשמירה' });
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

  const pages = [
    { id: 'about', label: 'אודות', icon: Users },
    { id: 'story', label: 'הסיפור שלנו', icon: BookOpen },
    { id: 'contact', label: 'צור קשר', icon: Mail }
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
          <h1 className="text-2xl font-bold text-gray-900">ניהול עמודים</h1>
          <p className="text-gray-500">עריכת תוכן העמודים באתר</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="font-bold text-gray-900 mb-4">עמודים</h2>
            <div className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activePage === page.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <page.icon className="w-5 h-5" />
                  {page.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* About Page */}
            {activePage === 'about' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  עמוד אודות
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    כותרת העמוד
                  </label>
                  <input
                    type="text"
                    value={settings?.about?.title || ''}
                    onChange={(e) => updateSetting('about', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תוכן העמוד
                  </label>
                  <textarea
                    value={settings?.about?.content || ''}
                    onChange={(e) => updateSetting('about', 'content', e.target.value)}
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תמונה
                  </label>
                  <div className="flex items-start gap-4">
                    {settings?.about?.image && (
                      <img
                        src={settings.about.image}
                        alt="About"
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">העלה תמונה</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'about.image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Story Page */}
            {activePage === 'story' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  עמוד הסיפור שלנו
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    כותרת העמוד
                  </label>
                  <input
                    type="text"
                    value={settings?.story?.title || ''}
                    onChange={(e) => updateSetting('story', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תוכן העמוד
                  </label>
                  <textarea
                    value={settings?.story?.content || ''}
                    onChange={(e) => updateSetting('story', 'content', e.target.value)}
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תמונה
                  </label>
                  <div className="flex items-start gap-4">
                    {settings?.story?.image && (
                      <img
                        src={settings.story.image}
                        alt="Story"
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">העלה תמונה</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'story.image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Page */}
            {activePage === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  עמוד צור קשר
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    כותרת העמוד
                  </label>
                  <input
                    type="text"
                    value={settings?.contact?.title || ''}
                    onChange={(e) => updateSetting('contact', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תת כותרת
                  </label>
                  <input
                    type="text"
                    value={settings?.contact?.subtitle || ''}
                    onChange={(e) => updateSetting('contact', 'subtitle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    קוד הטמעת מפה (Google Maps Embed)
                  </label>
                  <textarea
                    value={settings?.contact?.mapEmbed || ''}
                    onChange={(e) => updateSetting('contact', 'mapEmbed', e.target.value)}
                    rows={4}
                    placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
