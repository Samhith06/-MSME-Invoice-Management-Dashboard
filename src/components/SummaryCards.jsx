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
            gradient: 'from-indigo-500 to-violet-500',
            shadowClass: 'shadow-indigo-100',
            bgClass: 'bg-indigo-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            )
        },
        { 
            title: 'Paid', 
            count: metrics.paidCount, 
            amount: metrics.paidAmount, 
            colorClass: 'text-emerald-600',
             gradient: 'from-emerald-400 to-teal-500',
            shadowClass: 'shadow-emerald-100',
            bgClass: 'bg-emerald-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        { 
            title: 'Pending', 
            count: metrics.pendingCount, 
            amount: metrics.pendingAmount, 
            colorClass: 'text-amber-600',
            gradient: 'from-amber-400 to-orange-500',
            shadowClass: 'shadow-amber-100',
            bgClass: 'bg-amber-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        { 
            title: 'Overdue', 
            count: metrics.overdueCount, 
            amount: metrics.overdueAmount, 
            colorClass: 'text-rose-600',
             gradient: 'from-rose-500 to-pink-600',
            shadowClass: 'shadow-rose-100',
            bgClass: 'bg-rose-50',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            )
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {cards.map((card) => (
                <Card key={card.title} className={`relative group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${card.shadowClass}`}>
                    <div className="flex items-start justify-between relative z-10">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider truncate">{card.title}</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 tracking-tight">{card.count}</h3>
                        </div>
                        <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-2`}>
                            <div className="w-5 h-5 sm:w-6 sm:h-6">
                                {card.icon}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-50 flex items-baseline justify-between transition-colors">
                        <div className="min-w-0 flex-1">
                            <span className="text-xs text-gray-400 font-medium uppercase">Value</span>
                            <p className={`text-base sm:text-lg font-bold ${card.colorClass} tabular-nums truncate`}>
                                {formatMoney(card.amount)}
                            </p>
                        </div>
                         {/* Decorative Element */}
                         <div className={`hidden sm:block h-1.5 w-16 rounded-full bg-gradient-to-r ${card.gradient} opacity-20 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2`}></div>
                    </div>
                    
                    {/* Background blob for fun */}
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity hidden sm:block`}></div>
                </Card>
            ))}
        </div>
    );
};

export default SummaryCards;
