import { stripeTemplate } from './templates/stripe';
import { PDFGenerator } from './utils/pdfGenerator';
import { InvoiceData, PDFOptions, TemplateOptions } from './types';
import jsPDF from 'jspdf';

export * from './types';

export class InvoicePDF {
    private data: InvoiceData;
    private template: 'stripe' | 'moderne' = 'stripe';
    private templateOptions: TemplateOptions = {};
    private generator: PDFGenerator;

    constructor(data: InvoiceData) {
        this.data = data;
        this.generator = new PDFGenerator();
    }

    /**
     * Set the template to use
     */
    setTemplate(template: 'stripe' | 'moderne'): this {
        this.template = template;
        return this;
    }

    /**
     * Set template options (colors, logo, etc.)
     */
    setTemplateOptions(options: TemplateOptions): this {
        this.templateOptions = { ...this.templateOptions, ...options };
        return this;
    }

    /**
     * Generate the invoice HTML
     */
    generateHTML(): string {
        switch (this.template) {
            case 'stripe':
                return stripeTemplate(this.data, this.templateOptions);
            default:
                throw new Error(`Template "${this.template}" not found`);
        }
    }

    /**
     * Download the PDF
     */
    async download(options: PDFOptions = {}): Promise<jsPDF> {
        const html = this.generateHTML();
        return this.generator.generate(html, options);
    }

    /**
     * Preview in an HTML container
     */
    preview(containerId: string): this {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container #${containerId} not found`);
        }
        const html = this.generateHTML();
        container.innerHTML = html;
        return this;
    }

    /**
     * Export as base64
     */
    async toBase64(options: PDFOptions = {}): Promise<string> {
        const html = this.generateHTML();
        return this.generator.toBase64(html, options);
    }

    /**
     * Get current invoice data
     */
    getData(): InvoiceData {
        return this.data;
    }

    /**
     * Update invoice data
     */
    setData(data: Partial<InvoiceData>): this {
        this.data = { ...this.data, ...data };
        return this;
    }
}

// Export utilities
export { stripeTemplate } from './templates/stripe';
export { PDFGenerator } from './utils/pdfGenerator';

// Export for script tag usage
if (typeof window !== 'undefined') {
    (window as any).InvoicePDF = InvoicePDF;
}