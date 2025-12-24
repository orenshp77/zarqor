# זרקור פרסום ושיווק - אתר קטלוג

אתר קטלוג/תדמית פרימיום עבור חברת "זרקור פרסום ושיווק" - מוצרי קד"מ, כלי כתיבה וציוד משרדי.

## תכונות עיקריות

- קטלוג מוצרים מלא עם חיפוש וסינון
- סל הצעת מחיר (לא רכישה אונליין)
- עיצוב פרימיום RTL מלא
- אנימציות חלקות עם Framer Motion
- תמיכה מלאה במובייל (Responsive)
- כפתור WhatsApp צף

## טכנולוגיות

### Frontend
- React + Vite
- React Router
- TailwindCSS
- Framer Motion
- Lucide React Icons

### Backend
- Node.js + Express
- שמירת נתונים לקבצי JSON

## הרצה מקומית

### דרישות מקדימות
- Node.js 18+
- npm או yarn

### שרת (Backend)
```bash
cd server
npm install
npm run dev
```
השרת יעלה בכתובת: http://localhost:3001

### לקוח (Frontend)
```bash
cd client
npm install
npm run dev
```
האתר יעלה בכתובת: http://localhost:5173

## הרצה עם Docker

```bash
docker-compose up --build
```

לאחר ההרצה:
- האתר זמין בכתובת: http://localhost:5173
- השרת זמין בכתובת: http://localhost:3001

## מבנה הפרויקט

```
zarkor-catalog/
├── client/                 # Frontend React
│   ├── public/            # קבצים סטטיים
│   ├── src/
│   │   ├── components/    # רכיבי UI
│   │   │   ├── layout/    # Navbar, Footer, WhatsApp
│   │   │   ├── ui/        # Button, Card, Toast
│   │   │   ├── home/      # רכיבי דף הבית
│   │   │   ├── products/  # רכיבי מוצרים
│   │   │   └── quote/     # רכיבי סל הצעת מחיר
│   │   ├── pages/         # דפי האתר
│   │   ├── context/       # React Context
│   │   ├── hooks/         # Custom Hooks
│   │   └── utils/         # פונקציות עזר
│   └── ...
├── server/                 # Backend Express
│   ├── data/              # קבצי JSON לאחסון
│   ├── routes/            # נתיבי API
│   └── middleware/        # Validation
└── docker-compose.yml
```

## API Endpoints

### בריאות
- `GET /api/health` - בדיקת תקינות השרת

### מוצרים
- `GET /api/products` - קבלת כל המוצרים
- `GET /api/products/:id` - קבלת מוצר בודד

### יצירת קשר
- `POST /api/contact` - שליחת טופס יצירת קשר
  - שדות: name, phone, email, company, message

### הצעת מחיר
- `POST /api/quote` - שליחת בקשה להצעת מחיר
  - שדות: items[], contactInfo{}

## צבעים ועיצוב

- צבע ראשי: לבן (#FFFFFF)
- צבע Accent: ורוד (#EC4899)
- רקע: גווני אפור בהיר
- טיפוגרפיה: חזקה ונקייה
- הרבה whitespace

## רישיון

פרויקט פרטי - כל הזכויות שמורות לזרקור פרסום ושיווק
