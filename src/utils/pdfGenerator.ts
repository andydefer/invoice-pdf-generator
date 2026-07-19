import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import { PDFOptions } from '../types/pdf';

export class PDFGenerator {

    async generatePage(
        element: HTMLElement,
        options: PDFOptions = {}
    ): Promise<ArrayBuffer> {
        const {
            scale = 1.5,
            backgroundColor = '#ffffff',
            margin = 10,
            format = 'a4',
            orientation = 'portrait',
            quality = 0.8
        } = options;

        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '794px';
        tempContainer.style.background = '#ffffff';
        tempContainer.style.padding = '40px';
        tempContainer.appendChild(element.cloneNode(true));
        document.body.appendChild(tempContainer);

        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const canvas = await html2canvas(tempContainer, {
                scale: scale,
                backgroundColor: backgroundColor,
                logging: false,
                useCORS: true,
                allowTaint: true,
                width: 794,
                height: tempContainer.scrollHeight,
                windowWidth: 794,
                windowHeight: tempContainer.scrollHeight,
            });

            document.body.removeChild(tempContainer);

            const pdf = new jsPDF({
                orientation: orientation,
                unit: 'mm',
                format: format,
                compress: true,
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const usableWidth = pdfWidth - (margin * 2);
            const usableHeight = pdfHeight - (margin * 2);

            const imgData = canvas.toDataURL('image/jpeg', quality);
            const imgWidth = usableWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (imgHeight > usableHeight) {
                const ratio = usableHeight / imgHeight;
                const newWidth = imgWidth * ratio;
                const xOffset = margin + (usableWidth - newWidth) / 2;
                pdf.addImage(imgData, 'JPEG', xOffset, margin, newWidth, usableHeight);
            } else {
                const yOffset = margin + (usableHeight - imgHeight) / 2;
                pdf.addImage(imgData, 'JPEG', margin, yOffset, imgWidth, imgHeight);
            }

            return pdf.output('arraybuffer');

        } catch (error) {
            document.body.removeChild(tempContainer);
            throw new Error(`PDF generation failed: ${error}`);
        }
    }

    async generateMultiplePages(
        elements: HTMLElement[],
        options: PDFOptions = {}
    ): Promise<ArrayBuffer> {
        const {
            format = 'a4',
            orientation = 'portrait',
            scale = 1.5,
            margin = 10,
            backgroundColor = '#ffffff',
            quality = 0.8
        } = options;

        const pdfBuffers: ArrayBuffer[] = [];

        for (const element of elements) {
            const buffer = await this.generatePage(element, {
                format,
                orientation,
                scale,
                margin,
                backgroundColor,
                quality,
            });
            pdfBuffers.push(buffer);
        }

        if (pdfBuffers.length === 1) {
            return pdfBuffers[0];
        }

        return await this.mergePDFs(pdfBuffers);
    }

    async mergePDFs(pdfFiles: ArrayBuffer[]): Promise<ArrayBuffer> {
        try {
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of pdfFiles) {
                const pdf = await PDFDocument.load(pdfFile);
                const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                pages.forEach((page) => mergedPdf.addPage(page));
            }

            const uint8Array = await mergedPdf.save();
            return uint8Array.buffer as ArrayBuffer;
        } catch (error) {
            throw new Error(`PDF merge failed: ${error}`);
        }
    }

    async toBase64(
        htmlContent: string,
        options: PDFOptions = {}
    ): Promise<string> {
        const {
            scale = 1.5,
            backgroundColor = '#ffffff',
            quality = 0.8
        } = options;

        const container = document.createElement('div');
        container.innerHTML = htmlContent;
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '794px';
        container.style.background = '#ffffff';
        container.style.padding = '40px';
        document.body.appendChild(container);

        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(container, {
                scale: scale,
                backgroundColor: backgroundColor,
                logging: false,
                useCORS: true,
                allowTaint: true,
                width: 794,
                height: container.scrollHeight,
                windowWidth: 794,
                windowHeight: container.scrollHeight,
            });

            document.body.removeChild(container);
            return canvas.toDataURL('image/jpeg', quality);
        } catch (error) {
            document.body.removeChild(container);
            throw new Error(`Base64 conversion failed: ${error}`);
        }
    }

    async downloadMultiplePages(
        elements: HTMLElement[],
        options: PDFOptions = {}
    ): Promise<void> {
        const {
            filename = 'document.pdf',
        } = options;

        const buffer = await this.generateMultiplePages(elements, options);
        const blob = new Blob([buffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}