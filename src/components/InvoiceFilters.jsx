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
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-1">
                <Input
                    id="search"
                    placeholder="Search customer or invoice #..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="w-full sm:w-48">
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
