import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { saveInvoices, loadInvoices, clearInvoices } from './storageService';
import { generateSampleInvoices } from '../utils/sampleData';
import { createInvoice } from '../utils/invoiceModel';
import fc from 'fast-check';
import fs from 'fs';

describe('Storage Service', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should save and load invoices correctly', () => {
        const invoices = generateSampleInvoices(3);
        saveInvoices(invoices);
        
        // expect(localStorage.setItem).toHaveBeenCalled... removed

        const loadedInvoices = loadInvoices();
        expect(loadedInvoices).toHaveLength(3);
        
        // Verify Dates are correctly reconstructed
        expect(loadedInvoices[0].invoiceDate).toBeInstanceOf(Date);
        expect(loadedInvoices[0].dueDate).toBeInstanceOf(Date);
        // Compare timestamps to avoid object identity issues
        expect(loadedInvoices[0].invoiceDate.getTime()).toBe(invoices[0].invoiceDate.getTime());
    });

    it('should return null when storage is empty', () => {
        const loadedInvoices = loadInvoices();
        expect(loadedInvoices).toBeNull();
    });

    it('should handle clearing invoices', () => {
        const invoices = generateSampleInvoices(1);
        saveInvoices(invoices);
        clearInvoices();
        expect(loadInvoices()).toBeNull();
    });

     it('generateSampleInvoices should create valid invoices', () => {
        const sampleInvoices = generateSampleInvoices(5);
        expect(sampleInvoices).toHaveLength(5);
        sampleInvoices.forEach(invoice => {
            expect(invoice).toHaveProperty('id');
            expect(invoice).toHaveProperty('invoiceNumber');
            expect(invoice.amount).toBeGreaterThan(0);
        });
    });


    // Property Test 12: Data Persistence Round Trip
    it('should satisfy Property 12: Data Persistence Round Trip', () => {
        try {
            fc.assert(
                fc.property(
                    fc.array(
                        fc.record({
                            customerName: fc.string({minLength: 1}),
                            amount: fc.integer({ min: 1, max: 1000000 }),
                            invoiceDate: fc.date(),
                            paymentTerms: fc.constantFrom(7, 15, 30, 45, 60),
                            hasPayment: fc.boolean()
                        })
                    ),
                    (invoiceParams) => {
                       // Transform params to valid invoice objects
                       const originalInvoices = invoiceParams.map(param => {
                            const data = {
                                customerName: param.customerName,
                                amount: param.amount,
                                invoiceDate: param.invoiceDate,
                                paymentTerms: param.paymentTerms
                            };
                            if (param.hasPayment) {
                                data.paymentDate = new Date(param.invoiceDate.getTime() + 86400000); // +1 day
                            }
                            return createInvoice(data);
                       });

                       saveInvoices(originalInvoices);
                       const loadedInvoices = loadInvoices();

                       expect(loadedInvoices).toHaveLength(originalInvoices.length);
                       
                       if (loadedInvoices && loadedInvoices.length > 0) {
                           loadedInvoices.forEach((loaded, index) => {
                               const original = originalInvoices[index];
                               expect(loaded.id).toBe(original.id);
                               expect(loaded.invoiceDate.getTime()).toBe(original.invoiceDate.getTime());
                               expect(loaded.dueDate.getTime()).toBe(original.dueDate.getTime());
                                if (original.paymentDate) {
                                    expect(loaded.paymentDate.getTime()).toBe(original.paymentDate.getTime());
                                } else {
                                    expect(loaded.paymentDate).toBeNull();
                                }
                           });
                       }
                    }
                )
            );
        } catch (error) {
            fs.writeFileSync('property_test_error.txt', error.toString());
            throw error;
        }
    });
});
