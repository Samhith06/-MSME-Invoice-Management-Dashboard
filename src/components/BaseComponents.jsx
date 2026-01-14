import React from 'react';

// Helper for conditional classNames
const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-sm font-semibold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-xl";
  
  const variants = {
    primary: "border-transparent text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 focus:ring-indigo-500 shadow-indigo-300/50 hover:shadow-indigo-400/60",
    secondary: "border-gray-200 text-gray-700 bg-white/90 backdrop-blur-sm hover:bg-white hover:border-gray-300 focus:ring-gray-200 shadow-gray-200/50 hover:shadow-gray-300/60",
    danger: "border-transparent text-white bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 hover:from-red-600 hover:via-rose-600 hover:to-pink-700 focus:ring-red-500 shadow-red-300/50 hover:shadow-red-400/60",
    success: "border-transparent text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 focus:ring-emerald-500 shadow-emerald-300/50 hover:shadow-emerald-400/60"
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
            "bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 hover:-translate-y-1",
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
      {label && <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}
      <input
        id={id}
        className={classNames(
          "block w-full text-sm rounded-xl shadow-sm bg-white/90 backdrop-blur-sm border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 py-3 px-4 placeholder:text-gray-400",
          error 
            ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500/10 focus:border-red-500" 
            : "border-gray-200 hover:border-indigo-300 focus:shadow-md"
        )}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 font-medium">
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
      {label && <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}
      <select
        id={id}
        className={classNames(
          "block w-full py-3 px-4 border-2 border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-indigo-300 focus:shadow-md cursor-pointer",
           error ? "border-red-300 focus:ring-red-500/10 focus:border-red-500" : ""
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
       {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export const Badge = ({ status }) => {
    const styles = {
        Paid: "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 ring-emerald-600/30 shadow-emerald-100/50",
        Pending: "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 ring-amber-600/30 shadow-amber-100/50",
        Overdue: "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 ring-rose-600/30 shadow-rose-100/50"
    };

    const dots = {
        Paid: "bg-emerald-600 shadow-sm shadow-emerald-400/50",
        Pending: "bg-amber-600 shadow-sm shadow-amber-400/50",
        Overdue: "bg-rose-600 shadow-sm shadow-rose-400/50"
    };

    return (
        <span className={classNames(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ring-2 ring-inset shadow-sm transition-all duration-200 hover:scale-105",
            styles[status] || "bg-gray-50 text-gray-600 ring-gray-500/20"
        )}>
            <span className={classNames("h-2 w-2 rounded-full animate-pulse", dots[status] || "bg-gray-400")} />
            {status}
        </span>
    );
};
