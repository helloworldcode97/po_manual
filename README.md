# Invoice Generator - CV Nio Utaman

A multi-page invoice generator built with React, Vite, and Tailwind CSS v4.

## Features
- A5 Landscape format (210mm x 148mm).
- Pagination: Max 8 items per page.
- Product picker from a simulated API.
- Print / Print Preview functionality.
- Download as PDF.

## Deployment

This project is configured to automatically deploy to GitHub Pages via GitHub Actions when you push to the `main` branch.

To enable this:
1. Go to your repository settings on GitHub.
2. Navigate to **Pages** in the left sidebar.
3. Under **Build and deployment > Source**, select **GitHub Actions**.

## How to Run Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Usage
- Fill in the invoice information in the top form.
- Select products from the "Select Products" section.
- Adjust quantity, price, or discount in the "Selected Items" table.
- Use "Print / Preview" to print or "Download PDF" to save a PDF file.
