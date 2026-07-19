import { default as jsPDF } from 'jspdf';

export interface PDFOptions {
    filename?: string;
    scale?: number;
    backgroundColor?: string;
    margin?: number;
    format?: 'a4' | 'a3' | 'letter' | 'legal' | number[];
    orientation?: 'portrait' | 'landscape';
}
export declare class PDFGenerator {
    generatePage(element: HTMLElement, options?: PDFOptions): Promise<jsPDF>;
    generateMultiplePages(elements: HTMLElement[], options?: PDFOptions): Promise<jsPDF>;
    toBase64(htmlContent: string, options?: PDFOptions): Promise<string>;
}
