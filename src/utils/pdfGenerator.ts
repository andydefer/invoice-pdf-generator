import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFOptions } from '../types';

export class PDFGenerator {
    private container: HTMLDivElement | null = null;

    async generate(
        htmlContent: string,
        options: PDFOptions = {}
    ): Promise<jsPDF> {
        const {
            filename = 'invoice.pdf',
            scale = 2,
            backgroundColor = '#ffffff',
            margin = 10,
            format = 'a4',
            orientation = 'portrait'
        } = options;

        this.container = document.createElement('div');
        this.container.innerHTML = htmlContent;
        this.container.style.position = 'absolute';
        this.container.style.left = '-9999px';
        this.container.style.top = '0';
        this.container.style.width = '794px';
        this.container.style.background = '#ffffff';
        document.body.appendChild(this.container);

        try {
            const canvas = await html2canvas(this.container, {
                scale,
                backgroundColor,
                logging: false,
                useCORS: true,
                allowTaint: true,
                windowWidth: 794,
                windowHeight: this.container.scrollHeight
            });

            this.cleanup();

            const pdf = new jsPDF({
                orientation,
                unit: 'mm',
                format
            });

            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(
                imgData,
                'PNG',
                margin,
                margin,
                pdfWidth - (margin * 2),
                pdfHeight - (margin * 2)
            );

            pdf.save(filename);

            return pdf;
        } catch (error) {
            this.cleanup();
            throw new Error(`PDF generation failed: ${error}`);
        }
    }

    async toBase64(
        htmlContent: string,
        options: PDFOptions = {}
    ): Promise<string> {
        const {
            scale = 2,
            backgroundColor = '#ffffff'
        } = options;

        this.container = document.createElement('div');
        this.container.innerHTML = htmlContent;
        this.container.style.position = 'absolute';
        this.container.style.left = '-9999px';
        this.container.style.top = '0';
        this.container.style.width = '794px';
        this.container.style.background = '#ffffff';
        document.body.appendChild(this.container);

        try {
            const canvas = await html2canvas(this.container, {
                scale,
                backgroundColor,
                logging: false,
                useCORS: true,
                allowTaint: true,
                windowWidth: 794,
                windowHeight: this.container.scrollHeight
            });

            this.cleanup();
            return canvas.toDataURL('image/png');
        } catch (error) {
            this.cleanup();
            throw new Error(`Base64 conversion failed: ${error}`);
        }
    }

    private cleanup(): void {
        if (this.container && this.container.parentNode) {
            document.body.removeChild(this.container);
            this.container = null;
        }
    }
}