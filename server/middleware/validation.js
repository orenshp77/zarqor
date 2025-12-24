// Validation middleware functions

export const validateContact = (req, res, next) => {
  const { name, phone, email, message } = req.body;
  const errors = [];

  // Name validation - minimum 2 characters
  if (!name || name.trim().length < 2) {
    errors.push('שם חייב להכיל לפחות 2 תווים');
  }

  // Phone validation - Israeli phone number (basic)
  const phoneRegex = /^0(5[0-9]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
  if (!phone || !phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
    errors.push('מספר טלפון לא תקין (יש להזין מספר ישראלי)');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('כתובת אימייל לא תקינה');
  }

  // Message validation - minimum 10 characters
  if (!message || message.trim().length < 10) {
    errors.push('הודעה חייבת להכיל לפחות 10 תווים');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

export const validateQuote = (req, res, next) => {
  const { items, contactInfo } = req.body;
  const errors = [];

  // Items validation
  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('יש להוסיף לפחות מוצר אחד להצעת המחיר');
  }

  // Contact info validation
  if (!contactInfo) {
    errors.push('יש למלא פרטי התקשרות');
  } else {
    const { name, phone, email } = contactInfo;

    if (!name || name.trim().length < 2) {
      errors.push('שם חייב להכיל לפחות 2 תווים');
    }

    const phoneRegex = /^0(5[0-9]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
    if (!phone || !phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
      errors.push('מספר טלפון לא תקין');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('כתובת אימייל לא תקינה');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};
