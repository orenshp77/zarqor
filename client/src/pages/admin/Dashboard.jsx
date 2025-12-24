import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Tag,
  Settings,
  FileText,
  Users,
  TrendingUp,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    contacts: 0,
    quotes: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, settingsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/settings')
      ]);

      const productsData = await productsRes.json();
      const settingsData = await settingsRes.json();

      setStats({
        products: productsData.data?.length || 0,
        categories: settingsData.data?.categories?.length || 0,
        contacts: 0,
        quotes: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const menuItems = [
    {
      title: 'ניהול מוצרים',
      description: 'הוספה, עריכה ומחיקה של מוצרים',
      icon: Package,
      link: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      title: 'ניהול קטגוריות',
      description: 'ניהול קטגוריות המוצרים',
      icon: Tag,
      link: '/admin/categories',
      color: 'bg-purple-500'
    },
    {
      title: 'הגדרות האתר',
      description: 'לוגו, פרטי קשר ועוד',
      icon: Settings,
      link: '/admin/settings',
      color: 'bg-green-500'
    },
    {
      title: 'ניהול עמודים',
      description: 'עריכת תוכן העמודים',
      icon: FileText,
      link: '/admin/pages',
      color: 'bg-orange-500'
    }
  ];

  const statCards = [
    { title: 'מוצרים', value: stats.products, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'קטגוריות', value: stats.categories, icon: Tag, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'פניות', value: stats.contacts, icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'בקשות הצעת מחיר', value: stats.quotes, icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">לוח בקרה</h1>
        <p className="text-gray-500 mt-1">ברוך הבא לאזור הניהול</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">פעולות מהירות</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link
                to={item.link}
                className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
