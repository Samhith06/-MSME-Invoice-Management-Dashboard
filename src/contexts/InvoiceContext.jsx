import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { saveInvoices, loadInvoices } from '../services/storageService';
import { generateSampleInvoices } from '../utils/sampleData';
import { calculateStatus } from '../utils/invoiceModel';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'All', // All, Paid, Pending, Overdue
    search: '',
    sortBy: 'invoiceDate', // invoiceDate, amount, customerName
    sortOrder: 'desc', // asc, desc
  });

  // Load initial data
  useEffect(() => {
    const loadData = () => {
      let loaded = loadInvoices();
      if (!loaded || loaded.length === 0) {
        loaded = generateSampleInvoices(5);
        saveInvoices(loaded);
      }
      setInvoices(loaded);
      setLoading(false);
    };
    loadData();
  }, []);

  // Save changes to storage
  useEffect(() => {
    if (!loading) {
      saveInvoices(invoices);
    }
  }, [invoices, loading]);

  // Actions
  const addInvoice = useCallback((newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
  }, []);

  const updateInvoice = useCallback((updatedInvoice) => {
    setInvoices(prev => prev.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
  }, []);

  const markAsPaid = useCallback((invoiceId, paymentDate = new Date()) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const updated = { ...inv, paymentDate: paymentDate };
        updated.status = calculateStatus(updated);
        return updated;
      }
      return inv;
    }));
  }, []);

  const deleteInvoice = useCallback((invoiceId) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Derived State (Metrics & Filtered List)
  const metrics = useMemo(() => {
    const total = invoices.length;
    const paid = invoices.filter(inv => inv.status === 'Paid');
    const pending = invoices.filter(inv => inv.status === 'Pending');
    const overdue = invoices.filter(inv => inv.status === 'Overdue'); // Note: 'Overdue' is case-sensitive based on calculateStatus

    const sumAmount = (arr) => arr.reduce((sum, inv) => sum + inv.amount, 0);

    return {
      totalCount: total,
      totalAmount: sumAmount(invoices),
      paidCount: paid.length,
      paidAmount: sumAmount(paid),
      pendingCount: pending.length,
      pendingAmount: sumAmount(pending),
      overdueCount: overdue.length,
      overdueAmount: sumAmount(overdue)
    };
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices
      .filter(inv => {
        const matchesStatus = filters.status === 'All' || inv.status === filters.status;
        const matchesSearch = inv.customerName.toLowerCase().includes(filters.search.toLowerCase()) || 
                              inv.invoiceNumber.toLowerCase().includes(filters.search.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const valA = a[filters.sortBy];
        const valB = b[filters.sortBy];
        
        if (valA < valB) return filters.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [invoices, filters]);

  const value = {
    invoices,
    filteredInvoices,
    metrics,
    filters,
    loading,
    addInvoice,
    updateInvoice,
    markAsPaid,
    deleteInvoice,
    updateFilters
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
