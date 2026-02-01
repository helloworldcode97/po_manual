import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/mockData';
import { Plus, Trash2 } from 'lucide-react';

const ProductPicker = ({ selectedItems, setSelectedItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(loading => false);
    });
  }, []);

  const addItem = (product) => {
    setSelectedItems((prev) => [
      ...prev,
      {
        ...product,
        qty: 1,
        disc_p: 0,
        disc_rp: 0,
        tempId: Math.random().toString(36).substr(2, 9),
      },
    ]);
  };

  const removeItem = (tempId) => {
    setSelectedItems((prev) => prev.filter((item) => item.tempId !== tempId));
  };

  const updateItem = (tempId, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item) => {
        if (item.tempId === tempId) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'qty' || field === 'harga' || field === 'disc_p' || field === 'disc_rp') {
            const qty = parseFloat(field === 'qty' ? value : item.qty) || 0;
            const harga = parseFloat(field === 'harga' ? value : item.harga) || 0;
            const disc_p = parseFloat(field === 'disc_p' ? value : item.disc_p) || 0;
            const disc_rp = parseFloat(field === 'disc_rp' ? value : item.disc_rp) || 0;

            // Basic calculation: (Harga * Qty) - DiscRP - (Harga * Qty * DiscP / 100)
            // Or usually (Harga * (1 - DiscP/100) * Qty) - DiscRP
            // Let's go with: (Harga * Qty) * (1 - disc_p/100) - disc_rp
            updatedItem.jumlah = (harga * qty) * (1 - disc_p / 100) - disc_rp;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  if (loading) return <div className="no-print">Loading products...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 no-print">
      <h2 className="text-xl font-bold mb-4">Select Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 max-h-40 overflow-y-auto border p-2 rounded">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => addItem(product)}
            className="flex items-center justify-between p-2 text-sm border rounded hover:bg-blue-50 text-left"
          >
            <span>{product.name}</span>
            <Plus size={16} className="text-blue-500" />
          </button>
        ))}
      </div>

      <h3 className="font-bold mb-2">Selected Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase w-20">Qty</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase w-28">Harga</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase w-16">Disc %</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase w-24">Disc RP</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase w-24">Jumlah</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedItems.map((item) => (
              <tr key={item.tempId}>
                <td className="px-2 py-1 text-sm">{item.name}</td>
                <td className="px-2 py-1 text-sm">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateItem(item.tempId, 'qty', e.target.value)}
                    className="w-full border rounded px-1"
                  />
                </td>
                <td className="px-2 py-1 text-sm">
                   <input
                    type="number"
                    value={item.harga}
                    onChange={(e) => updateItem(item.tempId, 'harga', e.target.value)}
                    className="w-full border rounded px-1"
                  />
                </td>
                <td className="px-2 py-1 text-sm">
                   <input
                    type="number"
                    value={item.disc_p}
                    onChange={(e) => updateItem(item.tempId, 'disc_p', e.target.value)}
                    className="w-full border rounded px-1"
                  />
                </td>
                <td className="px-2 py-1 text-sm">
                   <input
                    type="number"
                    value={item.disc_rp}
                    onChange={(e) => updateItem(item.tempId, 'disc_rp', e.target.value)}
                    className="w-full border rounded px-1"
                  />
                </td>
                <td className="px-2 py-1 text-sm">
                  {(item.jumlah || (item.harga * item.qty)).toLocaleString()}
                </td>
                <td className="px-2 py-1 text-sm">
                  <button onClick={() => removeItem(item.tempId)} className="text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPicker;
