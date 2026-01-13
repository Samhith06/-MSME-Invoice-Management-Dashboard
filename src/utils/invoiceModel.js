/**
 * Invoice data model and validation functions
 * Implements status calculation logic according to requirements 1.2, 1.3, 1.4
 */

/**
 * Invoice object structure
 * @typedef {Object} Invoice
 * @property {string} id - Unique identifier
 * @property {string} invoiceNumber - Invoice number
 * @property {string} customerName - Customer name
 * @property {number} amount - Invoice amount
 * @property {Date} invoiceDate - Invoice creation date
 * @property {Date} dueDate - Payment due date
 * @property {Date|null} paymentDate - Payment date (null if unpaid)
 * @property {number} paymentTerms - Payment terms in days (7, 15, 30, 45, or 60)
 * @property {string} status - Invoice status ('Paid', 'Pending', or 'Overdue')
 */

/**
 * Calculate invoice status based on payment date and due date
 * Requirements: 1.2, 1.3, 1.4
 *
 * @param {Invoice} invoice - Invoice object
 * @returns {string} Status - 'Paid', 'Pending', or 'Overdue'
 */
export const calculateStatus = (invoice) => {
  // If payment date exists, invoice is paid (Requirement 1.4)
  if (invoice.paymentDate) {
    return "Paid";
  }

  // If no payment date and due date is past today, invoice is overdue (Requirement 1.3)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

  const dueDate = new Date(invoice.dueDate);
  dueDate.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

  if (dueDate < today) {
    return "Overdue";
  }

  // If no payment date and due date is today or future, invoice is pending (Requirement 1.2)
  return "Pending";
};

/**
 * Validate invoice object structure
 * @param {Object} invoice - Invoice object to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateInvoice = (invoice) => {
  const errors = [];

  if (
    !invoice.customerName ||
    typeof invoice.customerName !== "string" ||
    invoice.customerName.trim() === ""
  ) {
    errors.push("Customer name is required");
  }

  if (
    !invoice.amount ||
    typeof invoice.amount !== "number" ||
    invoice.amount <= 0
  ) {
    errors.push("Amount must be a positive number");
  }

  if (
    !invoice.invoiceDate ||
    !(invoice.invoiceDate instanceof Date) ||
    isNaN(invoice.invoiceDate)
  ) {
    errors.push("Valid invoice date is required");
  }

  if (
    !invoice.paymentTerms ||
    ![7, 15, 30, 45, 60].includes(invoice.paymentTerms)
  ) {
    errors.push("Payment terms must be 7, 15, 30, 45, or 60 days");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Create a new invoice with calculated fields
 * @param {Object} invoiceData - Basic invoice data
 * @returns {Invoice} Complete invoice object with calculated status and due date
 */
export const createInvoice = (invoiceData) => {
  const invoice = {
    id: invoiceData.id || generateInvoiceId(),
    invoiceNumber: invoiceData.invoiceNumber || generateInvoiceNumber(),
    customerName: invoiceData.customerName,
    amount: invoiceData.amount,
    invoiceDate: invoiceData.invoiceDate,
    dueDate:
      invoiceData.dueDate ||
      calculateDueDate(invoiceData.invoiceDate, invoiceData.paymentTerms),
    paymentDate: invoiceData.paymentDate || null,
    paymentTerms: invoiceData.paymentTerms,
  };

  // Calculate status based on the current state
  invoice.status = calculateStatus(invoice);

  return invoice;
};

/**
 * Calculate due date from invoice date and payment terms
 * @param {Date} invoiceDate - Invoice creation date
 * @param {number} paymentTerms - Payment terms in days
 * @returns {Date} Due date
 */
export const calculateDueDate = (invoiceDate, paymentTerms) => {
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + paymentTerms);
  return dueDate;
};

/**
 * Generate unique invoice ID
 * @returns {string} Unique ID
 */
const generateInvoiceId = () => {
  return "inv_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
};

/**
 * Generate invoice number
 * @returns {string} Invoice number
 */
const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  return "INV-" + timestamp;
};
