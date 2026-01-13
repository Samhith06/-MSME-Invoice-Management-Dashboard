import React from 'react';

// Helper for conditional classNames
const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-2.5 border text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out transform active:scale-95";
  
  const variants = {
    primary: "border-transparent text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:ring-indigo-500 shadow-indigo-200",
    secondary: "border-gray-200 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-200 hover:border-gray-300",
    danger: "border-transparent text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:ring-red-500 shadow-red-200",
    success: "border-transparent text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:ring-emerald-500 shadow-emerald-200"
  };

  return (
    <button 
      className={classNames(baseStyles, variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className, noPadding = false, ...props }) => {
  return (
    <div 
        className={classNames(
            "bg-white border border-gray-100 shadow-lg shadow-gray-100/50 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-200/50",
            className
        )} 
        {...props}
    >
      <div className={noPadding ? "" : "px-6 py-6"}>
        {children}
      </div>
    </div>
  );
};

export const Input = ({ label, id, error, className, ...props }) => {
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>}
      <input
        id={id}
        className={classNames(
          "block w-full text-sm rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 py-2.5 px-3",
          error 
            ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500/20 focus:border-red-500" 
            : "border-gray-200 hover:border-gray-300"
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  );
};

export const Select = ({ label, id, options, error, className, ...props }) => {
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>}
      <select
        id={id}
        className={classNames(
          "block w-full py-2.5 px-3 border border-gray-200 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-gray-300",
           error ? "border-red-300" : ""
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
       {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const Badge = ({ status }) => {
    const styles = {
        Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
        Overdue: "bg-rose-50 text-rose-700 ring-rose-600/20"
    };

    const dots = {
        Paid: "bg-emerald-600",
        Pending: "bg-amber-600",
        Overdue: "bg-rose-600"
    };

    return (
        <span className={classNames(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset",
            styles[status] || "bg-gray-50 text-gray-600 ring-gray-500/10"
        )}>
            <span className={classNames("h-1.5 w-1.5 rounded-full", dots[status] || "bg-gray-400")} />
            {status}
        </span>
    );
};
