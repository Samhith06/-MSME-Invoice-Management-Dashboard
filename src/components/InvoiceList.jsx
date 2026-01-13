import React from 'react';
import { useInvoice } from '../hooks/useInvoice';
import { Badge, Button } from './BaseComponents';
import { formatDate } from '../utils/dateUtils';

const InvoiceList = ({ onMarkPaid, onEdit, onDelete }) => {
    const { filteredInvoices, filters, updateFilters } = useInvoice();

    const handleSort = (field) => {
        const order = filters.sortBy === field && filters.sortOrder === 'asc' ? 'desc' : 'asc';
        updateFilters({ sortBy: field, sortOrder: order });
    };

    const SortIcon = ({ field }) => {
        if (filters.sortBy !== field) return <span className="text-gray-300 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">⇅</span>;
        return <span className="ml-1 text-indigo-600 font-bold">{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>;
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    if (filteredInvoices.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto min-h-[400px]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th 
                                className="group px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50/80 transition-colors"
                                onClick={() => handleSort('invoiceNumber')}
                            >
                                <div className="flex items-center">
                                Invoice # <SortIcon field="invoiceNumber" />
                                </div>
                            </th>
                             <th 
                                className="group px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50/80 transition-colors"
                                onClick={() => handleSort('customerName')}
                            >
                                <div className="flex items-center">
                                Customer <SortIcon field="customerName" />
                                </div>
                            </th>
                            <th 
                                className="group px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50/80 transition-colors"
                                onClick={() => handleSort('amount')}
                            >
                                <div className="flex items-center">
                                Amount <SortIcon field="amount" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Timeline
                            </th>
                            <th 
                                className="group px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50/80 transition-colors"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center">
                                Status <SortIcon field="status" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {filteredInvoices.map((invoice, idx) => (
                            <tr 
                                key={invoice.id} 
                                className={`hover:bg-gray-50/80 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`} 
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                                    {invoice.invoiceNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{invoice.customerName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold tabular-nums">
                                    {formatMoney(invoice.amount)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="w-12 text-xs text-gray-400 font-medium">Issued:</span> 
                                            <span className="text-gray-700">{formatDate(invoice.invoiceDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-12 text-xs text-rose-400 font-medium">Due:</span> 
                                            <span className="text-gray-700">{formatDate(invoice.dueDate)}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge status={invoice.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        {invoice.status !== 'Paid' && (
                                            <button 
                                                className="text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-full transition-colors"
                                                onClick={() => onMarkPaid(invoice)}
                                                title="Mark as Paid"
                                            >
                                                Mark Paid
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => onEdit(invoice)}
                                            className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                                            title="Edit Invoice"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => onDelete(invoice)}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                            title="Delete Invoice"
                                        >
                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceList;
