(function(n,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("html2canvas"),require("jspdf")):typeof define=="function"&&define.amd?define(["exports","html2canvas","jspdf"],a):(n=typeof globalThis<"u"?globalThis:n||self,a(n.InvoicePDF={},n.html2canvas,n.jspdf))})(this,function(n,a,c){"use strict";var D=Object.defineProperty;var F=(n,a,c)=>a in n?D(n,a,{enumerable:!0,configurable:!0,writable:!0,value:c}):n[a]=c;var g=(n,a,c)=>F(n,typeof a!="symbol"?a+"":a,c);function v(t){const e=t.items.reduce((l,d)=>l+d.quantity*d.unitPrice,0),o=t.discount||0,i=e-o,r=i*(t.tax/100),s=i+r;return{subtotal:e,discountAmount:o,afterDiscount:i,taxAmount:r,total:s}}function w(t){return t.map(e=>`
    <tr>
      <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">${e.description}</td>
      <td style="padding: 14px 16px; text-align: center; border-bottom: 1px solid #f3f4f6;">${e.quantity}</td>
      <td style="padding: 14px 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">${e.unitPrice.toFixed(2)} €</td>
      <td style="padding: 14px 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">${(e.quantity*e.unitPrice).toFixed(2)} €</td>
    </tr>
  `).join("")}function $(t,e){const{subtotal:o,discountAmount:i,taxAmount:r,total:s}=e,l=o>0?(i/o*100).toFixed(1):"0";let d=`
    <tr>
      <td class="label">Subtotal</td>
      <td class="amount">${o.toFixed(2)} €</td>
    </tr>`;return t.discount>0&&(d+=`
    <tr class="discount">
      <td class="label">Discount (${l}%)</td>
      <td class="amount">-${i.toFixed(2)} €</td>
    </tr>`),d+=`
    <tr>
      <td class="label">Tax (${t.tax}%)</td>
      <td class="amount">${r.toFixed(2)} €</td>
    </tr>
    <tr class="total-row">
      <td class="label"><strong>Total</strong></td>
      <td class="amount"><strong>${s.toFixed(2)} €</strong></td>
    </tr>`,d}function m(t,e={}){const{showLogo:o=!0,showPaymentInfo:i=!0,primaryColor:r="#4338ca",secondaryColor:s="#eef2ff"}=e,l=v(t),d=w(t.items),b=$(t,l),f={paid:"paid",pending:"pending",overdue:"overdue"}[t.status]||"pending",u=o&&t.company.logo?`<img src="${t.company.logo}" alt="Logo" class="logo">`:"",h=i?`
    <div class="payment-info">
      <strong>IBAN :</strong> FR76 1234 5678 9012 3456 7890 123<br>
      <strong>BIC :</strong> AGRIFRPP
    </div>`:"";return`<!DOCTYPE html>
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
      background: ${s};
      color: ${r};
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
          ${u}
          <div class="company-name">${t.company.name}</div>
          <div class="company-siret">${t.company.siret||""}</div>
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
            <span class="status-badge ${f}">● ${t.status}</span>
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
        ${d}
      </tbody>
    </table>

    <!-- TOTALS -->
    <table class="totals-table">
      ${b}
    </table>

    <!-- FOOTER -->
    <table class="footer-table">
      <tr>
        <td style="width:60%; vertical-align:top;">
          <div class="terms">
            <p><strong>Terms & Conditions</strong></p>
            <p>Payment due within 30 days.</p>
            ${h}
          </div>
        </td>
        <td style="width:40%; vertical-align:top; text-align:right;">
          <div class="thanks">
            <p><strong>Thank you for your business!</strong></p>
            <p style="font-size:11px; color:#d1d5db;">
              Generated on ${new Date().toLocaleDateString("en-US")}
            </p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`}class x{constructor(){g(this,"container",null)}async generate(e,o={}){const{filename:i="invoice.pdf",scale:r=2,backgroundColor:s="#ffffff",margin:l=10,format:d="a4",orientation:b="portrait"}=o;this.container=document.createElement("div"),this.container.innerHTML=e,this.container.style.position="absolute",this.container.style.left="-9999px",this.container.style.top="0",this.container.style.width="794px",this.container.style.background="#ffffff",document.body.appendChild(this.container);try{const p=await a(this.container,{scale:r,backgroundColor:s,logging:!1,useCORS:!0,allowTaint:!0,windowWidth:794,windowHeight:this.container.scrollHeight});this.cleanup();const f=new c({orientation:b,unit:"mm",format:d}),u=p.toDataURL("image/png"),h=f.internal.pageSize.getWidth(),T=p.height*h/p.width;return f.addImage(u,"PNG",l,l,h-l*2,T-l*2),f.save(i),f}catch(p){throw this.cleanup(),new Error(`PDF generation failed: ${p}`)}}async toBase64(e,o={}){const{scale:i=2,backgroundColor:r="#ffffff"}=o;this.container=document.createElement("div"),this.container.innerHTML=e,this.container.style.position="absolute",this.container.style.left="-9999px",this.container.style.top="0",this.container.style.width="794px",this.container.style.background="#ffffff",document.body.appendChild(this.container);try{const s=await a(this.container,{scale:i,backgroundColor:r,logging:!1,useCORS:!0,allowTaint:!0,windowWidth:794,windowHeight:this.container.scrollHeight});return this.cleanup(),s.toDataURL("image/png")}catch(s){throw this.cleanup(),new Error(`Base64 conversion failed: ${s}`)}}cleanup(){this.container&&this.container.parentNode&&(document.body.removeChild(this.container),this.container=null)}}class y{constructor(e){g(this,"data");g(this,"template","stripe");g(this,"templateOptions",{});g(this,"generator");this.data=e,this.generator=new x}setTemplate(e){return this.template=e,this}setTemplateOptions(e){return this.templateOptions={...this.templateOptions,...e},this}generateHTML(){switch(this.template){case"stripe":return m(this.data,this.templateOptions);default:throw new Error(`Template "${this.template}" not found`)}}async download(e={}){const o=this.generateHTML();return this.generator.generate(o,e)}preview(e){const o=document.getElementById(e);if(!o)throw new Error(`Container #${e} not found`);const i=this.generateHTML();return o.innerHTML=i,this}async toBase64(e={}){const o=this.generateHTML();return this.generator.toBase64(o,e)}getData(){return this.data}setData(e){return this.data={...this.data,...e},this}}typeof window<"u"&&(window.InvoicePDF=y),n.InvoicePDF=y,n.PDFGenerator=x,n.stripeTemplate=m,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
