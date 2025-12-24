const API_BASE = '/api';

// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'שגיאה בטעינת המוצרים');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'שגיאה בטעינת המוצר');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Submit contact form
export const submitContact = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.join(', ') || data.message || 'שגיאה בשליחת הטופס');
    }

    return data;
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
};

// Submit quote request
export const submitQuote = async (quoteData) => {
  try {
    const response = await fetch(`${API_BASE}/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.join(', ') || data.message || 'שגיאה בשליחת הבקשה');
    }

    return data;
  } catch (error) {
    console.error('Error submitting quote:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};
