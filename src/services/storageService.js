/**
 * localStorage service for data persistence
 * Requirements: 6.1, 6.2
 */

const STORAGE_KEY = 'invoice-dashboard-data';

/**
 * Save invoices to localStorage
 * @param {Array} invoices - Array of invoice objects
 * @returns {boolean} Success status
 */
export const saveInvoices = (invoices) => {
  try {
    const serializedData = JSON.stringify(invoices);
    localStorage.setItem(STORAGE_KEY, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving invoices to localStorage:', error);
    return false;
  }
};

/**
 * Load invoices from localStorage
 * Handles Date object reconstruction
 * @returns {Array|null} Array of invoice objects or null if empty/error
 */
export const loadInvoices = () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (!serializedData) return null;

    const parsedData = JSON.parse(serializedData);

    // Reconstruct Date objects
    return parsedData.map(invoice => ({
      ...invoice,
      invoiceDate: new Date(invoice.invoiceDate),
      dueDate: new Date(invoice.dueDate),
      paymentDate: invoice.paymentDate ? new Date(invoice.paymentDate) : null
    }));
  } catch (error) {
    console.error('Error loading invoices from localStorage:', error);
    return null;
  }
};

/**
 * Clear all invoices from localStorage
 */
export const clearInvoices = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing invoices from localStorage:', error);
  }
};
