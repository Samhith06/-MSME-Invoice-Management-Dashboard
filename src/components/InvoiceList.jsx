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
        if (filters.sortBy !== field) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V3" />
                </svg>
            );
        }
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3.5 h-3.5 text-indigo-600 ${filters.sortOrder === 'asc' ? '' : 'rotate-180'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5" />
            </svg>
        );
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    if (filteredInvoices.length === 0) {
        return (
            <div className="text-center py-12 sm:py-20 bg-gradient-to-br from-gray-50/50 to-white/50 rounded-xl border-2 border-dashed border-gray-300/60 backdrop-blur-sm">
                <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-gray-900">No invoices found</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto px-4">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        );
    }

    // Mobile Card View
    const MobileCardView = () => (
        <div className="space-y-4 sm:hidden">
            {filteredInvoices.map((invoice) => (
                <div 
                    key={invoice.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                                    {invoice.invoiceNumber}
                                </span>
                                <Badge status={invoice.status} />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{invoice.customerName}</h3>
                        </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Amount</span>
                            <span className="text-sm font-bold text-gray-900 tabular-nums">
                                {formatMoney(invoice.amount)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Issued:</span>
                            <span className="text-xs text-gray-700 font-medium">{formatDate(invoice.invoiceDate)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-rose-500">Due:</span>
                            <span className="text-xs text-gray-700 font-medium">{formatDate(invoice.dueDate)}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                        {invoice.status !== 'Paid' && (
                            <button 
                                className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all duration-200"
                                onClick={() => onMarkPaid(invoice)}
                            >
                                Mark Paid
                            </button>
                        )}
                        <button 
                            onClick={() => onEdit(invoice)}
                            className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 p-2 rounded-lg"
                            title="Edit Invoice"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => onDelete(invoice)}
                            className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 p-2 rounded-lg"
                            title="Delete Invoice"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="overflow-hidden rounded-xl">
            {/* Mobile Card View */}
            <MobileCardView />
            
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto min-h-[400px]">
                <table className="min-w-full divide-y divide-gray-200/60">
                    <thead className="bg-gradient-to-r from-gray-50/80 to-gray-50/40 backdrop-blur-sm">
                        <tr>
                            <th 
                                className="group px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-50/50 transition-all duration-200"
                                onClick={() => handleSort('invoiceNumber')}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="hidden sm:inline">Invoice #</span>
                                    <span className="sm:hidden">#</span>
                                    <SortIcon field="invoiceNumber" />
                                </div>
                            </th>
                             <th 
                                className="group px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-50/50 transition-all duration-200 hidden md:table-cell"
                                onClick={() => handleSort('customerName')}
                            >
                                <div className="flex items-center gap-2">
                                    <span>Customer</span>
                                    <SortIcon field="customerName" />
                                </div>
                            </th>
                            <th 
                                className="group px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-50/50 transition-all duration-200"
                                onClick={() => handleSort('amount')}
                            >
                                <div className="flex items-center gap-2">
                                    <span>Amount</span>
                                    <SortIcon field="amount" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                                Timeline
                            </th>
                            <th 
                                className="group px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-50/50 transition-all duration-200"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center gap-2">
                                    <span>Status</span>
                                    <SortIcon field="status" />
                                </div>
                            </th>
                            <th className="px-4 sm:px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/60 backdrop-blur-sm divide-y divide-gray-100/50">
                        {filteredInvoices.map((invoice, idx) => (
                            <tr 
                                key={invoice.id} 
                                className={`hover:bg-indigo-50/30 transition-all duration-200 hover:shadow-sm ${idx % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/20'}`} 
                            >
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                    <span className="text-xs sm:text-sm font-bold text-indigo-600 bg-indigo-50 px-2 sm:px-2.5 py-1 rounded-lg inline-block">
                                        {invoice.invoiceNumber}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm font-semibold text-gray-900">{invoice.customerName}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                    <span className="text-xs sm:text-sm text-gray-900 font-bold tabular-nums bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                        {formatMoney(invoice.amount)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="w-14 text-xs text-gray-400 font-medium">Issued:</span> 
                                            <span className="text-gray-700 font-medium">{formatDate(invoice.invoiceDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-14 text-xs text-rose-500 font-medium">Due:</span> 
                                            <span className="text-gray-700 font-medium">{formatDate(invoice.dueDate)}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                    <Badge status={invoice.status} />
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                                        {invoice.status !== 'Paid' && (
                                            <button 
                                                className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:shadow-md px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                                                onClick={() => onMarkPaid(invoice)}
                                                title="Mark as Paid"
                                            >
                                                Mark Paid
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => onEdit(invoice)}
                                            className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 p-2 rounded-lg hover:shadow-sm"
                                            title="Edit Invoice"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => onDelete(invoice)}
                                            className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 p-2 rounded-lg hover:shadow-sm"
                                            title="Delete Invoice"
                                        >
                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
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
