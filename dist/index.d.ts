import { InvoiceData, PDFOptions, TemplateOptions } from './types';
import { default as jsPDF } from 'jspdf';

export * from './types';
export declare class InvoicePDF {
    private data;
    private template;
    private templateOptions;
    private generator;
    constructor(data: InvoiceData);
    /**
     * Set the template to use
     */
    setTemplate(template: 'stripe' | 'moderne'): this;
    /**
     * Set template options (colors, logo, etc.)
     */
    setTemplateOptions(options: TemplateOptions): this;
    /**
     * Generate the invoice HTML
     */
    generateHTML(): string;
    /**
     * Download the PDF
     */
    download(options?: PDFOptions): Promise<jsPDF>;
    /**
     * Preview in an HTML container
     */
    preview(containerId: string): this;
    /**
     * Export as base64
     */
    toBase64(options?: PDFOptions): Promise<string>;
    /**
     * Get current invoice data
     */
    getData(): InvoiceData;
    /**
     * Update invoice data
     */
    setData(data: Partial<InvoiceData>): this;
}
export { stripeTemplate } from './templates/stripe';
export { PDFGenerator } from './utils/pdfGenerator';
