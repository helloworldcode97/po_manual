import React from 'react';

const InvoicePage = ({ formData, items, pageNum, totalPages, grandTotal }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="invoice-page bg-white p-8 mx-auto relative mb-8 shadow-lg print:shadow-none print:m-0" style={{ width: '210mm', height: '148mm', fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold border-l-4 border-black pl-2 leading-none mb-1">INVOICE</h1>
          <p className="font-bold text-sm">CV NIO UTAMAN</p>
          <div className="mt-4 grid grid-cols-[100px_10px_1fr] gap-x-1">
            <span>NO. NOTA</span><span>:</span><span className="border-b border-dotted border-gray-400 min-w-[100px]">{formData.noNota || ''}</span>
            <span>JTH. TEMPO</span><span>:</span><span className="border-b border-dotted border-gray-400 min-w-[100px]">{formatDate(formData.jthTempo) || ''}</span>
            <span>MEMO</span><span>:</span><span className="border-b border-dotted border-gray-400 min-w-[100px]">{formData.memo || ''}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold uppercase">BANJARMASIN, {formatDate(formData.tanggal) || '{Tanggal}'}</p>
          <div className="mt-1 text-left inline-block">
             <p>Kepada Yth :</p>
             <p className="font-bold text-base leading-tight">{(formData.kepadaYth || '').toUpperCase()}</p>
             <p className="mt-2">{formData.info1 || ''}</p>
             <p>{formData.info2 || ''}</p>
             <p className="mt-2 font-bold">Sales : {formData.sales || ''}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border-y border-black">
        <table className="w-full text-xs table-fixed">
          <thead>
            <tr className="border-b border-black">
              <th className="py-1 text-center border-r border-black w-[35px]">NO</th>
              <th className="py-1 text-center border-r border-black w-[110px]">BARCODE</th>
              <th className="py-1 text-center border-r border-black">NAMA PRODUK</th>
              <th className="py-1 text-center border-r border-black w-[40px]">QTY</th>
              <th className="py-1 text-center border-r border-black w-[40px]">SAT</th>
              <th className="py-1 text-center border-r border-black w-[80px]">HARGA @</th>
              <th className="py-1 text-center border-r border-black w-[50px]">DISC %</th>
              <th className="py-1 text-center border-r border-black w-[70px]">DISC RP</th>
              <th className="py-1 text-center w-[90px]">JUMLAH</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="h-6">
                <td className="text-center border-r border-black">{(pageNum - 1) * 8 + index + 1}</td>
                <td className="text-left px-1 border-r border-black overflow-hidden">{item.barcode}</td>
                <td className="text-left px-1 border-r border-black truncate">{item.name}</td>
                <td className="text-center border-r border-black">{item.qty}</td>
                <td className="text-center border-r border-black">{item.sat}</td>
                <td className="text-right px-1 border-r border-black">{(item.harga || 0).toLocaleString()}</td>
                <td className="text-center border-r border-black">{item.disc_p || 0}</td>
                <td className="text-right px-1 border-r border-black">{(item.disc_rp || 0).toLocaleString()}</td>
                <td className="text-right px-1">{(item.jumlah || (item.harga * item.qty)).toLocaleString()}</td>
              </tr>
            ))}
            {/* Fill empty rows if less than 8 */}
            {Array.from({ length: 8 - items.length }).map((_, i) => (
              <tr key={`empty-${i}`} className="h-6">
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-start">
        <div className="flex gap-12 mt-4">
           <div className="text-center">
             <p className="mb-12">Diketahui,</p>
             <div className="w-32 border-b border-black mx-auto"></div>
             <p className="text-[10px] mt-1">{formData.diketahui || ''}</p>
           </div>
           <div className="text-center">
             <p className="mb-12">Penerima,</p>
             <div className="w-32 border-b border-black mx-auto"></div>
             <p className="text-[10px] mt-1">{formData.penerima || ''}</p>
           </div>
           <div className="text-center">
             <p className="mb-12">Diperiksa,</p>
             <div className="w-32 border-b border-black mx-auto"></div>
             <p className="text-[10px] mt-1">{formData.diperiksa || ''}</p>
           </div>
        </div>
        <div className="text-right">
           <div className="flex justify-between items-center gap-4 mb-2">
             <span className="font-extrabold text-base">GRAND TOTAL :</span>
             <span className="text-xl font-extrabold">Rp {grandTotal.toLocaleString()}</span>
           </div>
           <div className="border-t-2 border-black w-48 ml-auto pt-1">
             <p className="text-[10px]">Hal. {pageNum} / {totalPages}</p>
             <p className="text-[10px]">CETAK : {formatDateTime(formData.cetakTanggalJam) || '{TanggalJam}'}</p>
           </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-8 text-[10px]">
        Pembayaran harap transfer ke rekening BCA an. CV Nio Utaman no rekening 0512 300 462
      </div>
    </div>
  );
};

export default InvoicePage;
