import React, { useState, useRef } from 'react';
import InvoiceForm from './components/InvoiceForm';
import ProductPicker from './components/ProductPicker';
import InvoicePage from './components/InvoicePage';
import { Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

function App() {
  const [formData, setFormData] = useState({
    noNota: '',
    tanggal: new Date().toISOString().split('T')[0],
    jthTempo: '',
    memo: '',
    kepadaYth: '',
    info1: '',
    info2: '',
    sales: '',
    cetakTanggalJam: new Date().toISOString().slice(0, 16),
    diketahui: '',
    penerima: '',
    diperiksa: '',
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const invoiceRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = invoiceRef.current;
    if (!element) {
      console.error('Invoice element not found');
      return;
    }

    const opt = {
      margin: 0,
      filename: `Invoice_${formData.noNota || 'draft'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a5', orientation: 'landscape' }
    };

    try {
      // Robust check for different import styles of html2pdf.js
      const generator = typeof html2pdf === 'function' ? html2pdf : (html2pdf && html2pdf.default);

      if (typeof generator === 'function') {
        generator().set(opt).from(element).save();
      } else {
        console.error('html2pdf library is not loaded correctly:', html2pdf);
        alert('PDF Download is currently unavailable. Please use the Print button instead.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF.');
    }
  };

  const chunkItems = (items, size) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    if (chunks.length === 0) chunks.push([]); // At least one empty page
    return chunks;
  };

  const itemChunks = chunkItems(selectedItems, 8);
  const grandTotal = selectedItems.reduce((sum, item) => sum + (item.jumlah || (item.harga * item.qty)), 0);

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 no-print">
          <h1 className="text-3xl font-bold text-gray-800">CV Nio Utaman - Invoice Generator</h1>
          <div className="flex gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Printer size={20} />
              Print / Preview
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>
        </header>

        <InvoiceForm formData={formData} setFormData={setFormData} />
        <ProductPicker selectedItems={selectedItems} setSelectedItems={setSelectedItems} />

        <div className="mt-12 overflow-x-auto pb-8">
          <div ref={invoiceRef} className="flex flex-col items-center">
            {itemChunks.map((chunk, index) => (
              <InvoicePage
                key={index}
                formData={formData}
                items={chunk}
                pageNum={index + 1}
                totalPages={itemChunks.length}
                grandTotal={grandTotal}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
