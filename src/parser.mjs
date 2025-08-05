function extractInvoiceData(text) {
  const invoiceNumber = text.match(/(Rechnungsnummer|Invoice No.?):?\s*([A-Z0-9-]+)/i)?.[2] || null;
  const date = text.match(/(Datum|Date):?\s*([\d.]+)/i)?.[2] || null;
  const amount = text.match(/(Betrag|Total):?\s*([0-9.,]+)\s?(EUR|€)?/i)?.[2] || null;
  const currency = text.match(/(EUR|€|USD|CHF)/i)?.[0] || null;

  return {
    invoice_number: invoiceNumber,
    date: date,
    amount: amount,
    currency: currency,
  };
}

module.exports = { extractInvoiceData };
