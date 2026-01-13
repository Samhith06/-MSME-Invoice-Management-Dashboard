/**
 * Property-based tests for invoice model
 * Feature: invoice-management-dashboard
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  calculateStatus,
  validateInvoice,
  createInvoice,
  calculateDueDate,
} from "./invoiceModel.js";

describe("Invoice Model Property Tests", () => {
  /**
   * Property 1: Invoice Status Calculation
   * Feature: invoice-management-dashboard, Property 1: Invoice Status Calculation
   * Validates: Requirements 1.2, 1.3, 1.4
   */
  it("Property 1: Invoice status calculation should be correct for any invoice", () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          invoiceNumber: fc.string(),
          customerName: fc.string({ minLength: 1 }),
          amount: fc.float({
            min: Math.fround(0.01),
            max: Math.fround(100000),
          }),
          invoiceDate: fc.date({
            min: new Date("2020-01-01"),
            max: new Date("2030-12-31"),
          }),
          dueDate: fc.date({
            min: new Date("2020-01-01"),
            max: new Date("2030-12-31"),
          }),
          paymentDate: fc.option(
            fc.date({
              min: new Date("2020-01-01"),
              max: new Date("2030-12-31"),
            }),
            { nil: null }
          ),
          paymentTerms: fc.constantFrom(7, 15, 30, 45, 60),
        }),
        (invoice) => {
          const status = calculateStatus(invoice);

          // If payment date exists, status should be 'Paid' (Requirement 1.4)
          if (invoice.paymentDate) {
            expect(status).toBe("Paid");
            return;
          }

          // If no payment date, check due date vs today
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const dueDate = new Date(invoice.dueDate);
          dueDate.setHours(0, 0, 0, 0);

          if (dueDate < today) {
            // Due date is past, should be 'Overdue' (Requirement 1.3)
            expect(status).toBe("Overdue");
          } else {
            // Due date is today or future, should be 'Pending' (Requirement 1.2)
            expect(status).toBe("Pending");
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Unit tests for specific examples and edge cases
  describe("Invoice Status Calculation - Unit Tests", () => {
    it("should return Paid when payment date exists", () => {
      const invoice = {
        paymentDate: new Date("2024-01-15"),
        dueDate: new Date("2024-01-20"),
      };
      expect(calculateStatus(invoice)).toBe("Paid");
    });

    it("should return Overdue when no payment date and due date is past", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const invoice = {
        paymentDate: null,
        dueDate: yesterday,
      };
      expect(calculateStatus(invoice)).toBe("Overdue");
    });

    it("should return Pending when no payment date and due date is today", () => {
      const today = new Date();

      const invoice = {
        paymentDate: null,
        dueDate: today,
      };
      expect(calculateStatus(invoice)).toBe("Pending");
    });

    it("should return Pending when no payment date and due date is future", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const invoice = {
        paymentDate: null,
        dueDate: tomorrow,
      };
      expect(calculateStatus(invoice)).toBe("Pending");
    });
  });

  describe("Invoice Validation - Unit Tests", () => {
    it("should validate a correct invoice", () => {
      const invoice = {
        customerName: "Test Customer",
        amount: 100.5,
        invoiceDate: new Date(),
        paymentTerms: 30,
      };

      const result = validateInvoice(invoice);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invoice with empty customer name", () => {
      const invoice = {
        customerName: "",
        amount: 100.5,
        invoiceDate: new Date(),
        paymentTerms: 30,
      };

      const result = validateInvoice(invoice);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Customer name is required");
    });

    it("should reject invoice with invalid amount", () => {
      const invoice = {
        customerName: "Test Customer",
        amount: -50,
        invoiceDate: new Date(),
        paymentTerms: 30,
      };

      const result = validateInvoice(invoice);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Amount must be a positive number");
    });

    it("should reject invoice with invalid payment terms", () => {
      const invoice = {
        customerName: "Test Customer",
        amount: 100.5,
        invoiceDate: new Date(),
        paymentTerms: 25, // Invalid payment terms
      };

      const result = validateInvoice(invoice);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Payment terms must be 7, 15, 30, 45, or 60 days"
      );
    });
  });

  describe("Due Date Calculation - Unit Tests", () => {
    it("should calculate due date correctly", () => {
      const invoiceDate = new Date("2024-01-01");
      const paymentTerms = 30;

      const dueDate = calculateDueDate(invoiceDate, paymentTerms);
      const expectedDueDate = new Date("2024-01-31");

      expect(dueDate.getTime()).toBe(expectedDueDate.getTime());
    });
  });
});
