/**
 * Date utility functions for invoice management
 * Implements days calculation logic according to requirements 1.5, 1.6, 1.7
 */

/**
 * Calculate the difference in days between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Difference in days (date1 - date2)
 */
export const differenceInDays = (date1, date2) => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const normalizedDate1 = new Date(date1);
  const normalizedDate2 = new Date(date2);

  // Normalize to start of day for accurate day comparison
  normalizedDate1.setHours(0, 0, 0, 0);
  normalizedDate2.setHours(0, 0, 0, 0);

  return Math.round(
    (normalizedDate1.getTime() - normalizedDate2.getTime()) / msPerDay
  );
};

/**
 * Check if two dates are in the same month and year
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} True if dates are in the same month
 */
export const isSameMonth = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
};

/**
 * Calculate days information display text for an invoice
 * Requirements: 1.5, 1.6, 1.7
 *
 * @param {Object} invoice - Invoice object with status, paymentDate, and dueDate
 * @returns {string} Days information text
 */
export const calculateDaysInfo = (invoice) => {
  const today = new Date();

  // For paid invoices, show payment timing relative to due date (Requirement 1.7)
  if (invoice.status === "Paid" && invoice.paymentDate) {
    const daysDiff = differenceInDays(invoice.paymentDate, invoice.dueDate);

    if (daysDiff > 0) {
      return `Paid ${daysDiff} days late`;
    } else if (daysDiff < 0) {
      return `Paid ${Math.abs(daysDiff)} days early`;
    } else {
      return "Paid on time";
    }
  }

  // For overdue invoices, show days overdue in red (Requirement 1.6)
  if (invoice.status === "Overdue") {
    const daysOverdue = differenceInDays(today, invoice.dueDate);
    return `Overdue by ${daysOverdue} days`;
  }

  // For pending invoices, show days until due (Requirement 1.5)
  if (invoice.status === "Pending") {
    const daysToDue = differenceInDays(invoice.dueDate, today);
    return `Due in ${daysToDue} days`;
  }

  return "";
};

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string (MM/DD/YYYY)
 */
export const formatDate = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

/**
 * Format currency amount for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Get the start of the current month
 * @returns {Date} Start of current month
 */
export const getStartOfCurrentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

/**
 * Get the end of the current month
 * @returns {Date} End of current month
 */
export const getEndOfCurrentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
};

/**
 * Check if a date is in the current month
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in current month
 */
export const isCurrentMonth = (date) => {
  return isSameMonth(date, new Date());
};
