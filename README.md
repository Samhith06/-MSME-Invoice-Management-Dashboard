# MSME Invoice Management Dashboard

A simplified invoice management dashboard built with **React** and **Tailwind CSS**, designed to help business owners track invoices, payments, and credit utilization at a glance.

## 🚀 Live Demo
*(Insert your deployment URL here)*

## 🛠 Tech Stack
*   **React.js** (Vite): Component-based UI library.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **LocalStorage**: For client-side data persistence.

## ✨ Features

### 1. Invoice Management
*   **List View**: View all invoices with status (Paid, Pending, Overdue).
*   **Filtering**: Filter by status (All, Paid, Pending, Overdue).
*   **Sorting**: Sort by Amount, Date, Due Date, etc.
*   **Search**: Real-time search by Invoice # or Customer Name.
*   **CRUD Operations**: Create, Read, Update, and Delete invoices.

### 2. Smart Summary Dashboard
Real-time metrics calculated instantly:
*   **Total Outstanding**: Sum of Pending + Overdue amounts.
*   **Total Overdue**: Sum of Overdue amounts only.
*   **Total Paid**: Total amount collected.
*   **Invoice Counts**: Quick count of invoices by status.

### 3. Intelligent Status Logic
*   **Paid**: Invoice has a payment date.
*   **Overdue**: No payment date AND due date is in the past.
*   **Pending**: No payment date AND due date is in the future.

### 4. Interactive Components
*   **Modal Forms**: Clean, validated forms for creating/editing invoices.
*   **Confirmation Dialogs**: Safety checks for deleting or marking invoices as paid.
*   **Toast Notifications**: Visual feedback for actions.

## ⚡ Performance Optimizations
*   **State Management**: `InvoiceContext` uses `useReducer` pattern for predictable state updates.
*   **Memoization**: content-heavy lists and expensive calculations (like filtered totals) are memoized using `useMemo` to prevent unnecessary re-calculations.
*   **Debounced Search**: Search input is optimized to prevent filtering on every keystroke.

## 📦 Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── BaseComponents.jsx  # Button, Input, Card, Badge
│   ├── InvoiceForm.jsx     # Form for Create/Edit
│   ├── InvoiceList.jsx     # Main table view
│   ├── SummaryCards.jsx    # Metric dashboard
│   ├── InvoiceFilters.jsx  # Search & Filter controls
│   └── Modal.jsx           # Generic Modal
├── contexts/           # Global State (InvoiceContext)
├── hooks/              # Custom Hooks (useInvoice)
├── services/           # Data Services (localStorage)
├── utils/              # Helper functions (dates, validation)
└── App.jsx             # Main Application Layout
```

## 🚀 How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd invoice-dashboard
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 Time Breakdown
*   **Design & Planning**: 1 hour
*   **Development**: 3 hours
*   **Testing & Debugging**: 0.5 hours
*   **Total**: ~4.5 hours
