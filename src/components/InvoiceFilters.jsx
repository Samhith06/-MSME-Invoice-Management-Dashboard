import React, { useState, useEffect } from 'react';
import { useInvoice } from '../hooks/useInvoice';
import { Input, Select } from './BaseComponents';

const InvoiceFilters = () => {
    const { filters, updateFilters } = useInvoice();
    const [searchTerm, setSearchTerm] = useState(filters.search);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            updateFilters({ search: searchTerm });
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, updateFilters]);

    const handleStatusChange = (e) => {
        updateFilters({ status: e.target.value });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-indigo-50/30 via-violet-50/20 to-purple-50/30 rounded-lg sm:rounded-xl border border-indigo-100/50 backdrop-blur-sm">
            <div className="flex-1 min-w-0">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <Input
                        id="search"
                        placeholder="Search customer or invoice #..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 sm:pl-12"
                    />
                </div>
            </div>
            <div className="w-full sm:w-48 lg:w-52">
                <Select
                    id="status-filter"
                    value={filters.status}
                    onChange={handleStatusChange}
                    options={[
                        { value: 'All', label: 'All Status' },
                        { value: 'Paid', label: 'Paid' },
                        { value: 'Pending', label: 'Pending' },
                        { value: 'Overdue', label: 'Overdue' }
                    ]}
                />
            </div>
        </div>
    );
};

export default InvoiceFilters;
