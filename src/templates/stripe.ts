import { InvoiceData, TemplateOptions } from '../types';

interface Totals {
    subtotal: number;
    discountAmount: number;
    afterDiscount: number;
    taxAmount: number;
    total: number;
}

function calculateTotals(data: InvoiceData): Totals {
    const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const discountAmount = data.discount || 0;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * (data.tax / 100);
    const total = afterDiscount + taxAmount;

    return { subtotal, discountAmount, afterDiscount, taxAmount, total };
}

function generateItemsRows(items: InvoiceData['items']): string {
    return items.map(item => `
    <tr>
      <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">${item.description}</td>
      <td style="padding: 14px 16px; text-align: center; border-bottom: 1px solid #f3f4f6;">${item.quantity}</td>
      <td style="padding: 14px 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">${item.unitPrice.toFixed(2)} €</td>
      <td style="padding: 14px 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">${(item.quantity * item.unitPrice).toFixed(2)} €</td>
    </tr>
  `).join('');
}

function generateTotalsRows(data: InvoiceData, totals: Totals): string {
    const { subtotal, discountAmount, taxAmount, total } = totals;
    const discountPercentage = subtotal > 0 ? ((discountAmount / subtotal) * 100).toFixed(1) : '0';

    let html = `
    <tr>
      <td class="label">Subtotal</td>
      <td class="amount">${subtotal.toFixed(2)} €</td>
    </tr>`;

    if (data.discount > 0) {
        html += `
    <tr class="discount">
      <td class="label">Discount (${discountPercentage}%)</td>
      <td class="amount">-${discountAmount.toFixed(2)} €</td>
    </tr>`;
    }

    html += `
    <tr>
      <td class="label">Tax (${data.tax}%)</td>
      <td class="amount">${taxAmount.toFixed(2)} €</td>
    </tr>
    <tr class="total-row">
      <td class="label"><strong>Total</strong></td>
      <td class="amount"><strong>${total.toFixed(2)} €</strong></td>
    </tr>`;

    return html;
}

export function stripeTemplate(data: InvoiceData, options: TemplateOptions = {}): string {
    const {
        showLogo = true,
        showPaymentInfo = true,
        primaryColor = '#4338ca',
        secondaryColor = '#eef2ff'
    } = options;

    const totals = calculateTotals(data);
    const itemsRows = generateItemsRows(data.items);
    const totalsRows = generateTotalsRows(data, totals);

    const statusClassMap = {
        'paid': 'paid',
        'pending': 'pending',
        'overdue': 'overdue'
    };
    const statusClass = statusClassMap[data.status] || 'pending';

    const logoHtml = showLogo && data.company.logo
        ? `<img src="${data.company.logo}" alt="Logo" class="logo">`
        : '';

    const paymentInfoHtml = showPaymentInfo
        ? `
    <div class="payment-info">
      <strong>IBAN :</strong> FR76 1234 5678 9012 3456 7890 123<br>
      <strong>BIC :</strong> AGRIFRPP
    </div>`
        : '';

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      background: #f8f9fa;
      color: #1a1a2e;
      padding: 40px 20px;
    }
    
    .invoice-wrapper {
      max-width: 794px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.08);
      padding: 48px 56px;
    }
    
    .header-table {
      width: 100%;
      margin-bottom: 40px;
      padding-bottom: 24px;
      border-bottom: 2px solid #f0f0f5;
    }
    
    .header-table .logo {
      max-height: 80px;
      width: auto;
      margin-bottom: 12px;
      border-radius: 8px;
    }
    
    .header-table .company-name {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a2e;
    }
    
    .header-table .company-siret {
      font-size: 12px;
      color: #6b7280;
    }
    
    .header-table .invoice-badge {
      background: ${secondaryColor};
      color: ${primaryColor};
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 8px;
    }
    
    .header-table .invoice-number {
      font-size: 28px;
      font-weight: 700;
      color: #1a1a2e;
    }
    
    .header-table .invoice-date {
      font-size: 13px;
      color: #6b7280;
      margin-top: 4px;
    }
    
    .info-table {
      width: 100%;
      margin-bottom: 32px;
    }
    
    .info-table .label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #9ca3af;
      margin-bottom: 6px;
    }
    
    .info-table .value {
      font-size: 15px;
      line-height: 1.6;
      color: #1a1a2e;
    }
    
    .info-table .value strong { font-weight: 700; }
    .info-table .value .small { font-size: 13px; color: #6b7280; }
    
    .status-badge {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 20px;
      text-transform: uppercase;
    }
    
    .status-badge.paid {
      background: #d1fae5;
      color: #065f46;
    }
    
    .status-badge.pending {
      background: #fef3c7;
      color: #92400e;
    }
    
    .status-badge.overdue {
      background: #fee2e2;
      color: #991b1b;
    }
    
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin: 28px 0 24px 0;
    }
    
    .items-table thead th {
      background: #f8f9fa;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #6b7280;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .items-table thead th:last-child,
    .items-table tbody td:last-child {
      text-align: right;
    }
    
    .totals-table {
      width: 280px;
      border-collapse: collapse;
      margin-left: auto;
      margin-top: 12px;
      padding-top: 20px;
      border-top: 2px solid #f0f0f5;
    }
    
    .totals-table td {
      padding: 6px 0;
      font-size: 14px;
      color: #1a1a2e;
    }
    
    .totals-table .label {
      color: #6b7280;
      padding-right: 24px;
    }
    
    .totals-table .amount {
      text-align: right;
      font-weight: 500;
    }
    
    .totals-table .discount td { color: #dc2626; }
    
    .totals-table .total-row td {
      padding-top: 12px;
      border-top: 2px solid #1a1a2e;
      font-size: 18px;
      font-weight: 700;
    }
    
    .footer-table {
      width: 100%;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 2px solid #f0f0f5;
    }
    
    .footer-table .terms {
      font-size: 12px;
      color: #9ca3af;
    }
    
    .footer-table .payment-info {
      margin-top: 8px;
      font-size: 12px;
      color: #6b7280;
    }
    
    .footer-table .payment-info strong { color: #1a1a2e; }
    
    .footer-table .thanks {
      font-size: 12px;
      color: #9ca3af;
      text-align: right;
    }
    
    .footer-table .thanks strong { color: #1a1a2e; }
  </style>
</head>
<body>
  <div class="invoice-wrapper" id="invoice-content">
    <!-- HEADER -->
    <table class="header-table">
      <tr>
        <td style="width:60%; vertical-align:top;">
          ${logoHtml}
          <div class="company-name">${data.company.name}</div>
          <div class="company-siret">${data.company.siret || ''}</div>
        </td>
        <td style="width:40%; vertical-align:top; text-align:right;">
          <div class="invoice-badge">📄 INVOICE</div>
          <div class="invoice-number">${data.number}</div>
          <div class="invoice-date">
            Issued on ${data.date}<br>
            Due on ${data.dueDate}
          </div>
        </td>
      </tr>
    </table>

    <!-- INFO -->
    <table class="info-table">
      <tr>
        <td style="width:33%; vertical-align:top;">
          <div class="label">From</div>
          <div class="value">
            <strong>${data.company.name}</strong><br>
            ${data.company.address}<br>
            ${data.company.city}<br>
            <span class="small">${data.company.phone}</span><br>
            <span class="small">${data.company.email}</span>
          </div>
        </td>
        <td style="width:33%; vertical-align:top;">
          <div class="label">Bill To</div>
          <div class="value">
            <strong>${data.client.name}</strong><br>
            ${data.client.company}<br>
            ${data.client.address}<br>
            ${data.client.city}<br>
            <span class="small">${data.client.email}</span>
          </div>
        </td>
        <td style="width:34%; vertical-align:top; text-align:right;">
          <div class="label">Status</div>
          <div>
            <span class="status-badge ${statusClass}">● ${data.status}</span>
          </div>
          <div style="margin-top:8px; font-size:12px; color:#6b7280;">
            <strong>Payment :</strong> Bank Transfer
          </div>
        </td>
      </tr>
    </table>

    <!-- ITEMS -->
    <table class="items-table">
      <thead>
        <tr>
          <th style="width:50%;">Description</th>
          <th style="width:15%;text-align:center;">Qty</th>
          <th style="width:20%;text-align:right;">Unit Price</th>
          <th style="width:15%;text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <!-- TOTALS -->
    <table class="totals-table">
      ${totalsRows}
    </table>

    <!-- FOOTER -->
    <table class="footer-table">
      <tr>
        <td style="width:60%; vertical-align:top;">
          <div class="terms">
            <p><strong>Terms & Conditions</strong></p>
            <p>Payment due within 30 days.</p>
            ${paymentInfoHtml}
          </div>
        </td>
        <td style="width:40%; vertical-align:top; text-align:right;">
          <div class="thanks">
            <p><strong>Thank you for your business!</strong></p>
            <p style="font-size:11px; color:#d1d5db;">
              Generated on ${new Date().toLocaleDateString('en-US')}
            </p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}