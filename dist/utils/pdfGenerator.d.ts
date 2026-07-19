import { default as jsPDF } from 'jspdf';
import { PDFOptions } from '../types';

export declare class PDFGenerator {
    private container;
    generate(htmlContent: string, options?: PDFOptions): Promise<jsPDF>;
    toBase64(htmlContent: string, options?: PDFOptions): Promise<string>;
    private cleanup;
}
