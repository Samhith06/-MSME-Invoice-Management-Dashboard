/**
 * Property-based tests for date utilities
 * Feature: invoice-management-dashboard
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  calculateDaysInfo,
  differenceInDays,
  isSameMonth,
  formatDate,
  formatCurrency,
  isCurrentMonth,
} from "./dateUtils.js";

describe("Date Utils Property Tests", () => {
  /**
   * Property 2: Days Display Formatting
   * Feature: invoice-management-dashboard, Property 2: Days Display Formatting
   * Validates: Requirements 1.5, 1.6, 1.7
   */
  it("Property 2: Days display formatting should be correct for any invoice", () => {
    fc.assert(
      fc.property(
        fc.record({
          status: fc.constantFrom("Paid", "Pending", "Overdue"),
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
        }),
        (invoice) => {
          const daysInfo = calculateDaysInfo(invoice);

          if (invoice.status === "Paid" && invoice.paymentDate) {
            // For paid invoices, should show payment timing (Requirement 1.7)
            const daysDiff = differenceInDays(
              invoice.paymentDate,
              invoice.dueDate
            );

            if (daysDiff > 0) {
              expect(daysInfo).toBe(`Paid ${daysDiff} days late`);
            } else if (daysDiff < 0) {
              expect(daysInfo).toBe(`Paid ${Math.abs(daysDiff)} days early`);
            } else {
              expect(daysInfo).toBe("Paid on time");
            }
          } else if (invoice.status === "Overdue") {
            // For overdue invoices, should show days overdue (Requirement 1.6)
            const today = new Date();
            const daysOverdue = differenceInDays(today, invoice.dueDate);
            expect(daysInfo).toBe(`Overdue by ${daysOverdue} days`);
          } else if (invoice.status === "Pending") {
            // For pending invoices, should show days until due (Requirement 1.5)
            const today = new Date();
            const daysToDue = differenceInDays(invoice.dueDate, today);
            expect(daysInfo).toBe(`Due in ${daysToDue} days`);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Unit tests for specific examples and edge cases
  describe("Days Display Formatting - Unit Tests", () => {
    it('should show "Due in X days" for pending invoices', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 5);

      const invoice = {
        status: "Pending",
        dueDate: tomorrow,
        paymentDate: null,
      };

      expect(calculateDaysInfo(invoice)).toBe("Due in 5 days");
    });

    it('should show "Overdue by X days" for overdue invoices', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const invoice = {
        status: "Overdue",
        dueDate: threeDaysAgo,
        paymentDate: null,
      };

      expect(calculateDaysInfo(invoice)).toBe("Overdue by 3 days");
    });

    it('should show "Paid on time" for invoices paid on due date', () => {
      const dueDate = new Date("2024-01-15");
      const paymentDate = new Date("2024-01-15");

      const invoice = {
        status: "Paid",
        dueDate: dueDate,
        paymentDate: paymentDate,
      };

      expect(calculateDaysInfo(invoice)).toBe("Paid on time");
    });

    it('should show "Paid X days early" for early payments', () => {
      const dueDate = new Date("2024-01-15");
      const paymentDate = new Date("2024-01-10"); // 5 days early

      const invoice = {
        status: "Paid",
        dueDate: dueDate,
        paymentDate: paymentDate,
      };

      expect(calculateDaysInfo(invoice)).toBe("Paid 5 days early");
    });

    it('should show "Paid X days late" for late payments', () => {
      const dueDate = new Date("2024-01-15");
      const paymentDate = new Date("2024-01-20"); // 5 days late

      const invoice = {
        status: "Paid",
        dueDate: dueDate,
        paymentDate: paymentDate,
      };

      expect(calculateDaysInfo(invoice)).toBe("Paid 5 days late");
    });
  });

  describe("Date Utility Functions - Unit Tests", () => {
    it("should calculate difference in days correctly", () => {
      const date1 = new Date("2024-01-15");
      const date2 = new Date("2024-01-10");

      expect(differenceInDays(date1, date2)).toBe(5);
      expect(differenceInDays(date2, date1)).toBe(-5);
    });

    it("should check if dates are in same month", () => {
      const date1 = new Date("2024-01-15");
      const date2 = new Date("2024-01-20");
      const date3 = new Date("2024-02-15");

      expect(isSameMonth(date1, date2)).toBe(true);
      expect(isSameMonth(date1, date3)).toBe(false);
    });

    it("should format date correctly", () => {
      const date = new Date("2024-01-15");
      expect(formatDate(date)).toBe("01/15/2024");
    });

    it("should format currency correctly", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("should handle invalid dates gracefully", () => {
      expect(formatDate(null)).toBe("");
      expect(formatDate(new Date("invalid"))).toBe("");
    });

    it("should handle invalid currency amounts gracefully", () => {
      expect(formatCurrency(null)).toBe("$0.00");
      expect(formatCurrency(NaN)).toBe("$0.00");
    });

    it("should check if date is in current month", () => {
      const now = new Date();
      const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 15);
      const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 15);

      expect(isCurrentMonth(currentMonthDate)).toBe(true);
      expect(isCurrentMonth(nextMonthDate)).toBe(false);
    });
  });
});
