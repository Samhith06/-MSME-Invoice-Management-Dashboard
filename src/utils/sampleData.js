/**
 * Sample data generation for invoices
 * Requirements: 6.3
 */

import { createInvoice } from './invoiceModel.js';

/**
 * Generate a specified number of sample invoices
 * @param {number} count - Number of invoices to generate
 * @returns {Array} Array of invoice objects
 */
export const generateSampleInvoices = (count = 5) => {
  const invoices = [];
  const statusTypes = ['Paid', 'Pending', 'Overdue']; // Although status is calculated, we simulate different dates to achieve this

  for (let i = 0; i < count; i++) {
    const today = new Date();
    // Random date within last 60 days to next 30 days
    const dateOffset = Math.floor(Math.random() * 90) - 60;
    const invoiceDate = new Date(today);
    invoiceDate.setDate(today.getDate() + dateOffset);

    // Random payment terms
    const termsOptions = [7, 15, 30, 45, 60];
    const paymentTerms = termsOptions[Math.floor(Math.random() * termsOptions.length)];

    // Random amount
    const amount = Math.floor(Math.random() * 5000) + 100;

    const invoiceData = {
      customerName: `Customer ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
      amount: amount,
      invoiceDate: invoiceDate,
      paymentTerms: paymentTerms,
    };

    // Randomly decide if it has a payment date (to be Paid)
    // We'll simulate roughly 1/3 updated with payment
    if (Math.random() > 0.6) {
        const paymentDate = new Date(invoiceDate);
        paymentDate.setDate(invoiceDate.getDate() + Math.random() * 10);
        invoiceData.paymentDate = paymentDate;
    }

    invoices.push(createInvoice(invoiceData));
  }

  return invoices;
};
