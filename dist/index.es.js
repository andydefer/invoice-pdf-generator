var m = Object.defineProperty;
var u = (t, e, o) => e in t ? m(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var c = (t, e, o) => u(t, typeof e != "symbol" ? e + "" : e, o);
import f from "html2canvas";
import x from "jspdf";
function y(t) {
  const e = t.items.reduce((s, r) => s + r.quantity * r.unitPrice, 0), o = t.discount || 0, a = e - o, i = a * (t.tax / 100), n = a + i;
  return { subtotal: e, discountAmount: o, afterDiscount: a, taxAmount: i, total: n };
}
function w(t) {
  return t.map((e) => `
    <tr>
      <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">${e.description}</td>
      <td style="padding: 14px 16px; text-align: center; border-bottom: 1px solid #f3f4f6;">${e.quantity}</td>
      <td style="padding: 14px 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">${e.unitPrice.toFixed(2)} €</td>
      <td style="padding: 14px 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">${(e.quantity * e.unitPrice).toFixed(2)} €</td>
    </tr>
  `).join("");
}
function v(t, e) {
  const { subtotal: o, discountAmount: a, taxAmount: i, total: n } = e, s = o > 0 ? (a / o * 100).toFixed(1) : "0";
  let r = `
    <tr>
      <td class="label">Subtotal</td>
      <td class="amount">${o.toFixed(2)} €</td>
    </tr>`;
  return t.discount > 0 && (r += `
    <tr class="discount">
      <td class="label">Discount (${s}%)</td>
      <td class="amount">-${a.toFixed(2)} €</td>
    </tr>`), r += `
    <tr>
      <td class="label">Tax (${t.tax}%)</td>
      <td class="amount">${i.toFixed(2)} €</td>
    </tr>
    <tr class="total-row">
      <td class="label"><strong>Total</strong></td>
      <td class="amount"><strong>${n.toFixed(2)} €</strong></td>
    </tr>`, r;
}
function $(t, e = {}) {
  const {
    showLogo: o = !0,
    showPaymentInfo: a = !0,
    primaryColor: i = "#4338ca",
    secondaryColor: n = "#eef2ff"
  } = e, s = y(t), r = w(t.items), g = v(t, s), d = {
    paid: "paid",
    pending: "pending",
    overdue: "overdue"
  }[t.status] || "pending", h = o && t.company.logo ? `<img src="${t.company.logo}" alt="Logo" class="logo">` : "", p = a ? `
    <div class="payment-info">
      <strong>IBAN :</strong> FR76 1234 5678 9012 3456 7890 123<br>
      <strong>BIC :</strong> AGRIFRPP
    </div>` : "";
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
      background: ${n};
      color: ${i};
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
          ${h}
          <div class="company-name">${t.company.name}</div>
          <div class="company-siret">${t.company.siret || ""}</div>
        </td>
        <td style="width:40%; vertical-align:top; text-align:right;">
          <div class="invoice-badge">📄 INVOICE</div>
          <div class="invoice-number">${t.number}</div>
          <div class="invoice-date">
            Issued on ${t.date}<br>
            Due on ${t.dueDate}
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
            <strong>${t.company.name}</strong><br>
            ${t.company.address}<br>
            ${t.company.city}<br>
            <span class="small">${t.company.phone}</span><br>
            <span class="small">${t.company.email}</span>
          </div>
        </td>
        <td style="width:33%; vertical-align:top;">
          <div class="label">Bill To</div>
          <div class="value">
            <strong>${t.client.name}</strong><br>
            ${t.client.company}<br>
            ${t.client.address}<br>
            ${t.client.city}<br>
            <span class="small">${t.client.email}</span>
          </div>
        </td>
        <td style="width:34%; vertical-align:top; text-align:right;">
          <div class="label">Status</div>
          <div>
            <span class="status-badge ${d}">● ${t.status}</span>
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
        ${r}
      </tbody>
    </table>

    <!-- TOTALS -->
    <table class="totals-table">
      ${g}
    </table>

    <!-- FOOTER -->
    <table class="footer-table">
      <tr>
        <td style="width:60%; vertical-align:top;">
          <div class="terms">
            <p><strong>Terms & Conditions</strong></p>
            <p>Payment due within 30 days.</p>
            ${p}
          </div>
        </td>
        <td style="width:40%; vertical-align:top; text-align:right;">
          <div class="thanks">
            <p><strong>Thank you for your business!</strong></p>
            <p style="font-size:11px; color:#d1d5db;">
              Generated on ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US")}
            </p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}
class T {
  constructor() {
    c(this, "container", null);
  }
  async generate(e, o = {}) {
    const {
      filename: a = "invoice.pdf",
      scale: i = 2,
      backgroundColor: n = "#ffffff",
      margin: s = 10,
      format: r = "a4",
      orientation: g = "portrait"
    } = o;
    this.container = document.createElement("div"), this.container.innerHTML = e, this.container.style.position = "absolute", this.container.style.left = "-9999px", this.container.style.top = "0", this.container.style.width = "794px", this.container.style.background = "#ffffff", document.body.appendChild(this.container);
    try {
      const l = await f(this.container, {
        scale: i,
        backgroundColor: n,
        logging: !1,
        useCORS: !0,
        allowTaint: !0,
        windowWidth: 794,
        windowHeight: this.container.scrollHeight
      });
      this.cleanup();
      const d = new x({
        orientation: g,
        unit: "mm",
        format: r
      }), h = l.toDataURL("image/png"), p = d.internal.pageSize.getWidth(), b = l.height * p / l.width;
      return d.addImage(
        h,
        "PNG",
        s,
        s,
        p - s * 2,
        b - s * 2
      ), d.save(a), d;
    } catch (l) {
      throw this.cleanup(), new Error(`PDF generation failed: ${l}`);
    }
  }
  async toBase64(e, o = {}) {
    const {
      scale: a = 2,
      backgroundColor: i = "#ffffff"
    } = o;
    this.container = document.createElement("div"), this.container.innerHTML = e, this.container.style.position = "absolute", this.container.style.left = "-9999px", this.container.style.top = "0", this.container.style.width = "794px", this.container.style.background = "#ffffff", document.body.appendChild(this.container);
    try {
      const n = await f(this.container, {
        scale: a,
        backgroundColor: i,
        logging: !1,
        useCORS: !0,
        allowTaint: !0,
        windowWidth: 794,
        windowHeight: this.container.scrollHeight
      });
      return this.cleanup(), n.toDataURL("image/png");
    } catch (n) {
      throw this.cleanup(), new Error(`Base64 conversion failed: ${n}`);
    }
  }
  cleanup() {
    this.container && this.container.parentNode && (document.body.removeChild(this.container), this.container = null);
  }
}
class z {
  constructor(e) {
    c(this, "data");
    c(this, "template", "stripe");
    c(this, "templateOptions", {});
    c(this, "generator");
    this.data = e, this.generator = new T();
  }
  /**
   * Set the template to use
   */
  setTemplate(e) {
    return this.template = e, this;
  }
  /**
   * Set template options (colors, logo, etc.)
   */
  setTemplateOptions(e) {
    return this.templateOptions = { ...this.templateOptions, ...e }, this;
  }
  /**
   * Generate the invoice HTML
   */
  generateHTML() {
    switch (this.template) {
      case "stripe":
        return $(this.data, this.templateOptions);
      default:
        throw new Error(`Template "${this.template}" not found`);
    }
  }
  /**
   * Download the PDF
   */
  async download(e = {}) {
    const o = this.generateHTML();
    return this.generator.generate(o, e);
  }
  /**
   * Preview in an HTML container
   */
  preview(e) {
    const o = document.getElementById(e);
    if (!o)
      throw new Error(`Container #${e} not found`);
    const a = this.generateHTML();
    return o.innerHTML = a, this;
  }
  /**
   * Export as base64
   */
  async toBase64(e = {}) {
    const o = this.generateHTML();
    return this.generator.toBase64(o, e);
  }
  /**
   * Get current invoice data
   */
  getData() {
    return this.data;
  }
  /**
   * Update invoice data
   */
  setData(e) {
    return this.data = { ...this.data, ...e }, this;
  }
}
typeof window < "u" && (window.InvoicePDF = z);
export {
  z as InvoicePDF,
  T as PDFGenerator,
  $ as stripeTemplate
};
