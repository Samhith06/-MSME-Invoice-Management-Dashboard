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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Invoice Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your MSME invoices and tracking.</p>
          </div>
          <Button onClick={handleCreateOpen} className="shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform transition-all duration-200 hover:-translate-y-0.5">
            + Create Invoice
          </Button>
        </div>

        <SummaryCards />
        
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-6 border border-gray-100">
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
                
                <div className="flex justify-end space-x-3 mt-6">
                    <Button 
                        variant="secondary" 
                        onClick={() => setPaymentModal({ isOpen: false, invoice: null })}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="success" 
                        onClick={confirmPayment}
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
                
                <div className="flex justify-end space-x-3 mt-6">
                    <Button 
                        variant="secondary" 
                        onClick={() => setDeleteModal({ isOpen: false, invoice: null })}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={confirmDelete}
                    >
                        Delete Invoice
                    </Button>
                </div>
            </div>
        </Modal>
      </div>
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
