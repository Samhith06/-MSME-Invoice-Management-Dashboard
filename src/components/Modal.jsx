import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './BaseComponents';

const Modal = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] overflow-y-auto animate-fadeIn" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div 
                    className="fixed inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 backdrop-blur-sm transition-opacity animate-fadeIn" 
                    aria-hidden="true" 
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div 
                    ref={modalRef}
                    className="relative z-50 inline-block align-bottom bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 pt-5 sm:pt-6 pb-5 sm:pb-6 text-left overflow-hidden shadow-2xl shadow-gray-900/20 transform transition-all animate-scaleIn sm:my-8 sm:align-middle sm:max-w-lg w-full max-w-[calc(100vw-2rem)] sm:max-w-lg border border-white/20"
                >
                    {/* Decorative gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600"></div>
                    
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="sm:flex sm:items-start">
                        <div className="mt-2 text-center sm:mt-0 sm:text-left w-full">
                            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-1 pr-8" id="modal-title">
                                {title}
                            </h3>
                            <div className="mt-4 sm:mt-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
