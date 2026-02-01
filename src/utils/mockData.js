export const mockProducts = [
  { id: '1', barcode: '899123456001', name: 'Produk A - Pen 0.5mm Black with Extra Long Name that should definitely wrap into two lines to test the line-clamp-2 styling', sat: 'PCS', harga: 5000 },
  { id: '2', barcode: '899123456002', name: 'Produk B - Notebook A5 Spiral', sat: 'PCS', harga: 15000 },
  { id: '3', barcode: '899123456003', name: 'Produk C - Eraser Dust Free Small', sat: 'PCS', harga: 2000 },
  { id: '4', barcode: '899123456004', name: 'Produk D - Glue Stick 10g', sat: 'PCS', harga: 8000 },
  { id: '5', barcode: '899123456005', name: 'Produk E - Ruler 30cm Steel', sat: 'PCS', harga: 12000 },
  { id: '6', barcode: '899123456006', name: 'Produk F - Stapler No.10', sat: 'PCS', harga: 18000 },
  { id: '7', barcode: '899123456007', name: 'Produk G - Staples No.10', sat: 'BOX', harga: 3000 },
  { id: '8', barcode: '899123456008', name: 'Produk H - Highlighter Yellow', sat: 'PCS', harga: 7000 },
  { id: '9', barcode: '899123456009', name: 'Produk I - Correction Tape', sat: 'PCS', harga: 11000 },
  { id: '10', barcode: '899123456010', name: 'Produk J - Paper Clips 33mm', sat: 'BOX', harga: 4000 },
  { id: '11', barcode: '899123456011', name: 'Produk K - Marker Whiteboard Black', sat: 'PCS', harga: 9000 },
  { id: '12', barcode: '899123456012', name: 'Produk L - Scissor 6 Inch', sat: 'PCS', harga: 14000 },
  { id: '13', barcode: '899123456013', name: 'Produk M - Calculator 12 Digit', sat: 'PCS', harga: 75000 },
  { id: '14', barcode: '899123456014', name: 'Produk N - Document Bag A4', sat: 'PCS', harga: 25000 },
  { id: '15', barcode: '899123456015', name: 'Produk O - Desk Organizer', sat: 'PCS', harga: 45000 },
  { id: '16', barcode: '899123456016', name: 'Produk P - File Map Plastic', sat: 'PCS', harga: 5000 },
  { id: '17', barcode: '899123456017', name: 'Produk Q - Compass Set', sat: 'SET', harga: 35000 },
  { id: '18', barcode: '899123456018', name: 'Produk R - Drawing Block A3', sat: 'PCS', harga: 22000 },
  { id: '19', barcode: '899123456019', name: 'Produk S - Sketch Book A4', sat: 'PCS', harga: 19000 },
  { id: '20', barcode: '899123456020', name: 'Produk T - Pencil 2B Case', sat: 'DOZ', harga: 36000 },
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};
