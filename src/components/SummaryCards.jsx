import React from 'react';
import { useInvoice } from '../hooks/useInvoice';
import { Card } from './BaseComponents';

const SummaryCards = () => {
    const { metrics } = useInvoice();

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const cards = [
        { 
            title: 'Total Invoices', 
            count: metrics.totalCount, 
            amount: metrics.totalAmount, 
            colorClass: 'text-indigo-600',
            bgClass: 'bg-indigo-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            )
        },
        { 
            title: 'Paid', 
            count: metrics.paidCount, 
            amount: metrics.paidAmount, 
            colorClass: 'text-emerald-600',
            bgClass: 'bg-emerald-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        { 
            title: 'Pending', 
            count: metrics.pendingCount, 
            amount: metrics.pendingAmount, 
            colorClass: 'text-amber-600',
            bgClass: 'bg-amber-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        { 
            title: 'Overdue', 
            count: metrics.overdueCount, 
            amount: metrics.overdueAmount, 
            colorClass: 'text-rose-600',
            bgClass: 'bg-rose-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            )
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => (
                <Card key={card.title} className="relative hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{card.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{card.count}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${card.bgClass} ${card.colorClass} bg-opacity-50`}>
                            {card.icon}
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline">
                        <p className={`text-lg font-semibold ${card.colorClass}`}>
                            {formatMoney(card.amount)}
                        </p>
                        <span className="ml-2 text-xs text-gray-400">total value</span>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default SummaryCards;
