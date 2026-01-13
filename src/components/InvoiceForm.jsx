import React, { useState, useEffect } from 'react';
import { useInvoice } from '../hooks/useInvoice';
import { createInvoice, validateInvoice, calculateDueDate } from '../utils/invoiceModel';
import { Input, Select, Button } from './BaseComponents';
import { formatDate } from '../utils/dateUtils';

const InvoiceForm = ({ initialData, onSuccess, onCancel }) => {
    const { addInvoice, updateInvoice } = useInvoice(); // Need updateInvoice from context
    const [formData, setFormData] = useState({
        customerName: initialData ? initialData.customerName : '',
        amount: initialData ? initialData.amount : '',
        invoiceDate: initialData ? new Date(initialData.invoiceDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        paymentTerms: initialData ? String(initialData.paymentTerms) : '30'
    });
    const [calculatedDue, setCalculatedDue] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (formData.invoiceDate && formData.paymentTerms) {
            const due = calculateDueDate(new Date(formData.invoiceDate), parseInt(formData.paymentTerms));
            setCalculatedDue(formatDate(due));
        }
    }, [formData.invoiceDate, formData.paymentTerms]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const invoiceData = {
            customerName: formData.customerName,
            amount: parseFloat(formData.amount),
            invoiceDate: new Date(formData.invoiceDate),
            paymentTerms: parseInt(formData.paymentTerms)
        };

        const validation = validateInvoice(invoiceData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        if (initialData) {
            const updatedInvoice = {
                ...initialData,
                ...invoiceData,
                // Recalculate due date as it might have changed
                dueDate: calculateDueDate(invoiceData.invoiceDate, invoiceData.paymentTerms) 
            };
            // Note: Status is automatically recalculated in Context or should be refreshed here if dependent on Date. 
            // Ideally, we let the context or model handle full update logic, but for now we pass the spread object.
             updateInvoice(updatedInvoice);
        } else {
            const newInvoice = createInvoice(invoiceData);
            addInvoice(newInvoice);
        }
        onSuccess();
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors([]); // Clear errors on change
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errors.length > 0 && (
                <div className="bg-red-50 p-4 rounded-md">
                    <ul className="list-disc list-inside text-sm text-red-600">
                        {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                    </ul>
                </div>
            )}

            <Input
                id="customerName"
                label="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
            />

            <Input
                id="amount"
                label="Amount (INR)"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    id="invoiceDate"
                    label="Invoice Date"
                    type="date"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    required
                />
                
                <Select
                    id="paymentTerms"
                    label="Payment Terms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    options={[
                        { value: '7', label: 'Net 7' },
                        { value: '15', label: 'Net 15' },
                        { value: '30', label: 'Net 30' },
                        { value: '45', label: 'Net 45' },
                        { value: '60', label: 'Net 60' }
                    ]}
                />
            </div>

            <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                Estimated Due Date: <span className="font-medium text-gray-900">{calculatedDue}</span>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    {initialData ? 'Update Invoice' : 'Create Invoice'}
                </Button>
            </div>
        </form>
    );
};

export default InvoiceForm;
