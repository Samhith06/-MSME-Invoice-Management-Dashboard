import React, { useState } from 'react';
import { InvoiceProvider, useInvoice } from './contexts/InvoiceContext';
import SummaryCards from './components/SummaryCards';
import InvoiceList from './components/InvoiceList';
import InvoiceFilters from './components/InvoiceFilters';
import InvoiceForm from './components/InvoiceForm';
import Modal from './components/Modal';
import { Button } from './components/BaseComponents';
import './App.css';

const Dashboard = () => {
  const { markAsPaid, deleteInvoice } = useInvoice();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, invoice: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, invoice: null });

  const handleCreateOpen = () => {
      setEditingInvoice(null);
      setIsFormOpen(true);
  };

  const handleEdit = (invoice) => {
      setEditingInvoice(invoice);
      setIsFormOpen(true);
  };

  const handleDelete = (invoice) => {
      setDeleteModal({ isOpen: true, invoice });
  };

  const confirmDelete = () => {
      if (deleteModal.invoice) {
          deleteInvoice(deleteModal.invoice.id);
          setDeleteModal({ isOpen: false, invoice: null });
      }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingInvoice(null);
  };

  const openPaymentModal = (invoice) => {
    setPaymentModal({ isOpen: true, invoice });
  };

  const confirmPayment = () => {
    if (paymentModal.invoice) {
      markAsPaid(paymentModal.invoice.id);
      setPaymentModal({ isOpen: false, invoice: null });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-violet-200/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-blue-100/30 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-slate-200/30 supports-[backdrop-filter]:bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-300/50 hover:scale-110 transition-transform duration-200 text-sm sm:text-base">
                        Q
                    </div>
                    <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">
                        <span className="hidden sm:inline">Invoice</span><span className="sm:hidden">Inv</span><span className="font-light text-slate-400 hidden sm:inline">Dashboard</span>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-sm text-slate-500 text-right">
                        <p className="font-semibold text-slate-700">Intern Admin</p>
                        <p className="text-xs text-slate-400">admin@qistonpe.com</p>
                    </div>
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 border-2 border-white shadow-md overflow-hidden ring-2 ring-indigo-200/50 hover:ring-indigo-300 transition-all duration-200">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="User" className="w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">Welcome back! Here's your financial summary.</p>
          </div>
          <Button onClick={handleCreateOpen} className="w-full sm:w-auto shadow-lg shadow-indigo-300/50 hover:shadow-indigo-400/60 transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 border-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden sm:inline">Create New Invoice</span>
            <span className="sm:hidden">New Invoice</span>
          </Button>
        </div>

        <SummaryCards />
        
        <div className="bg-white/80 backdrop-blur-md shadow-2xl shadow-slate-300/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/60 animate-fadeIn">
            <InvoiceFilters />
            <InvoiceList 
                onMarkPaid={openPaymentModal} 
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>

        {/* Create/Edit Invoice Modal */}
        <Modal 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
            title={editingInvoice ? "Edit Invoice" : "Create New Invoice"}
        >
            <InvoiceForm 
                initialData={editingInvoice}
                onSuccess={handleFormSuccess} 
                onCancel={() => setIsFormOpen(false)} 
            />
        </Modal>

        {/* Payment Confirmation Modal */}
        <Modal
            isOpen={paymentModal.isOpen}
            onClose={() => setPaymentModal({ isOpen: false, invoice: null })}
            title="Confirm Payment"
        >
            <div className="space-y-4">
                <p className="text-gray-600">
                    Are you sure you want to mark invoice <span className="font-semibold text-gray-900">{paymentModal.invoice?.invoiceNumber}</span> as paid?
                </p>
                <p className="text-sm text-gray-500">This action will update the status to Paid and record payment date as today.</p>
                
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                    <Button 
                        variant="secondary" 
                        onClick={() => setPaymentModal({ isOpen: false, invoice: null })}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="success" 
                        onClick={confirmPayment}
                        className="w-full sm:w-auto"
                    >
                        Confirm Payment
                    </Button>
                </div>
            </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
            isOpen={deleteModal.isOpen}
            onClose={() => setDeleteModal({ isOpen: false, invoice: null })}
            title="Delete Invoice"
        >
            <div className="space-y-4">
                <p className="text-gray-600">
                    Are you sure you want to delete invoice <span className="font-semibold text-gray-900">{deleteModal.invoice?.invoiceNumber}</span>?
                </p>
                <p className="text-sm text-red-500 font-medium">This action cannot be undone.</p>
                
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                    <Button 
                        variant="secondary" 
                        onClick={() => setDeleteModal({ isOpen: false, invoice: null })}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={confirmDelete}
                        className="w-full sm:w-auto"
                    >
                        Delete Invoice
                    </Button>
                </div>
            </div>
        </Modal>
      </main>
    </div>
  );
};

function App() {
  return (
    <InvoiceProvider>
      <Dashboard />
    </InvoiceProvider>
  );
}

export default App;
