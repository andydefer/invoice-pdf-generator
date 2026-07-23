/**
 * @fileoverview Core PDF generation utilities using html2canvas, jsPDF, and pdf-lib.
 * Provides a robust API for converting HTML content and React components to PDF documents.
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/** Supported page formats for PDF generation */
export type PageFormat = 'a4' | 'a3' | 'letter' | 'legal' | number[];

/** Supported page orientations */
export type PageOrientation = 'portrait' | 'landscape';

/** Container rendering options for the hidden DOM container */
export interface ContainerOptions {
    /** Width of the container in pixels (default: 900) */
    width?: number;
    /** Padding inside the container in pixels (default: 40) */
    padding?: number;
    /** Background color of the container (default: #ffffff) */
    background?: string;
}

/**
 * Configuration options for PDF generation.
 * All properties are optional and will use defaults if not provided.
 */
export interface PDFOptions {
    /** Name of the file when downloaded (default: 'document.pdf') */
    filename?: string;
    /** Rendering scale factor for image quality (default: 1.5) */
    scale?: number;
    /** Background color of the PDF (default: #ffffff) */
    backgroundColor?: string;
    /** Margin around the content in millimeters (default: 10) */
    margin?: number;
    /** Page format (default: 'a4') */
    format?: PageFormat;
    /** Page orientation (default: 'portrait') */
    orientation?: PageOrientation;
    /** JPEG image quality from 0.1 to 1.0 (default: 0.8) */
    quality?: number;
    /** Width of the rendering container in pixels (default: 900) */
    containerWidth?: number;
    /** Padding of the rendering container in pixels (default: 40) */
    containerPadding?: number;
    /** Background color of the rendering container (default: #ffffff) */
    containerBackground?: string;
}

/**
 * Internal configuration combining all options with defaults.
 * Used internally to ensure consistent configuration throughout the generation process.
 */
interface InternalPDFOptions extends Required<PDFOptions> {
    format: PageFormat;
    orientation: PageOrientation;
}

// ============================================================================
// MAIN CLASS
// ============================================================================

/**
 * Core PDF generator class responsible for converting HTML content to PDF documents.
 *
 * Uses a three-step process:
 * 1. Renders content in a hidden DOM container
 * 2. Captures the rendered content using html2canvas
 * 3. Generates a PDF using jsPDF and optionally merges multiple pages
 *
 * @example
 * ```typescript
 * const generator = new PDFGenerator();
 * const pdfBuffer = await generator.generatePage(element);
 * ```
 */
export class PDFGenerator {
    /** Default container options used for rendering */
    private static readonly DEFAULT_CONTAINER_OPTIONS: ContainerOptions = {
        width: 900,
        padding: 40,
        background: '#ffffff',
    };

    /** Default PDF generation options */
    private static readonly DEFAULT_PDF_OPTIONS: Omit<InternalPDFOptions, 'format' | 'orientation'> = {
        filename: 'document.pdf',
        scale: 1.5,
        backgroundColor: '#ffffff',
        margin: 10,
        quality: 0.8,
        containerWidth: 900,
        containerPadding: 40,
        containerBackground: '#ffffff',
    };

    /**
     * Renders delay in milliseconds.
     * Required to allow React components to render and DOM to stabilize.
     */
    private static readonly RENDER_DELAY_MS = 200;

    // ==========================================================================
    // PRIVATE HELPERS
    // ==========================================================================

    /**
     * Builds a complete configuration object by merging user options with defaults.
     *
     * @param options - Partial user-provided options
     * @returns Complete configuration with all fields defined
     */
    private buildConfig(options: PDFOptions = {}): InternalPDFOptions {
        const defaults = PDFGenerator.DEFAULT_PDF_OPTIONS;

        return {
            filename: options.filename ?? defaults.filename,
            scale: options.scale ?? defaults.scale,
            backgroundColor: options.backgroundColor ?? defaults.backgroundColor,
            margin: options.margin ?? defaults.margin,
            format: options.format ?? 'a4',
            orientation: options.orientation ?? 'portrait',
            quality: options.quality ?? defaults.quality,
            containerWidth: options.containerWidth ?? defaults.containerWidth,
            containerPadding: options.containerPadding ?? defaults.containerPadding,
            containerBackground: options.containerBackground ?? defaults.containerBackground,
        };
    }

    /**
     * Creates a hidden DOM container for rendering content.
     * The container is positioned off-screen to avoid visual interference.
     *
     * @param content - HTML string or HTMLElement to render
     * @param options - Container configuration
     * @returns The created container element
     */
    private createHiddenContainer(
        content: HTMLElement | string,
        options: ContainerOptions = {}
    ): HTMLDivElement {
        const { width, padding, background } = {
            ...PDFGenerator.DEFAULT_CONTAINER_OPTIONS,
            ...options,
        };

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = `${width}px`;
        container.style.background = background ?? '#ffffff';
        container.style.padding = `${padding}px`;

        if (typeof content === 'string') {
            container.innerHTML = content;
        } else {
            container.appendChild(content.cloneNode(true));
        }

        document.body.appendChild(container);
        return container;
    }

    /**
     * Removes a container from the DOM.
     * Performs a safe removal with error handling.
     *
     * @param container - The container to remove
     */
    private removeHiddenContainer(container: HTMLDivElement): void {
        if (container.parentNode) {
            try {
                document.body.removeChild(container);
            } catch {
                // Container may have already been removed
            }
        }
    }

    /**
     * Waits for a specified number of milliseconds.
     * Used to ensure DOM stability before capturing.
     *
     * @param ms - Milliseconds to wait
     * @returns Promise that resolves after the delay
     */
    private wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Captures an HTML element as a canvas using html2canvas.
     *
     * @param element - The element to capture
     * @param options - Capture configuration
     * @param options.scale - Rendering scale factor
     * @param options.backgroundColor - Background color
     * @param options.width - Capture width in pixels
     * @param options.height - Capture height in pixels
     * @returns Promise resolving to the captured canvas
     */
    private async captureElement(
        element: HTMLElement,
        options: {
            scale: number;
            backgroundColor: string;
            width: number;
            height: number;
        }
    ): Promise<HTMLCanvasElement> {
        return html2canvas(element, {
            scale: options.scale,
            backgroundColor: options.backgroundColor,
            logging: false,
            useCORS: true,
            allowTaint: true,
            width: options.width,
            height: options.height,
            windowWidth: options.width,
            windowHeight: options.height,
        });
    }

    /**
     * Calculates image placement within a PDF page.
     * Centers the image and handles overflow situations.
     *
     * @param canvas - The captured canvas
     * @param pdfWidth - Width of the PDF page in millimeters
     * @param pdfHeight - Height of the PDF page in millimeters
     * @param margin - Margin in millimeters
     * @returns Object containing x, y, width, and height placement values
     */
    private calculateImagePlacement(
        canvas: HTMLCanvasElement,
        pdfWidth: number,
        pdfHeight: number,
        margin: number
    ): { x: number; y: number; width: number; height: number } {
        const usableWidth = pdfWidth - margin * 2;
        const usableHeight = pdfHeight - margin * 2;

        const imgWidth = usableWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > usableHeight) {
            const ratio = usableHeight / imgHeight;
            const newWidth = imgWidth * ratio;
            const xOffset = margin + (usableWidth - newWidth) / 2;
            return {
                x: xOffset,
                y: margin,
                width: newWidth,
                height: usableHeight,
            };
        }

        const yOffset = margin + (usableHeight - imgHeight) / 2;
        return {
            x: margin,
            y: yOffset,
            width: imgWidth,
            height: imgHeight,
        };
    }

    // ==========================================================================
    // PUBLIC API
    // ==========================================================================

    /**
     * Generates a single-page PDF from an HTML element.
     *
     * @param element - HTML element to convert to PDF
     * @param options - Optional PDF generation configuration
     * @returns Promise resolving to an ArrayBuffer containing the PDF
     * @throws Error if PDF generation fails
     *
     * @example
     * ```typescript
     * const element = document.getElementById('invoice');
     * const pdfBuffer = await generator.generatePage(element, {
     *   format: 'a4',
     *   orientation: 'portrait',
     *   margin: 20
     * });
     * ```
     */
    async generatePage(element: HTMLElement, options: PDFOptions = {}): Promise<ArrayBuffer> {
        const config = this.buildConfig(options);

        const container = this.createHiddenContainer(element, {
            width: config.containerWidth,
            padding: config.containerPadding,
            background: config.containerBackground,
        });

        try {
            await this.wait(PDFGenerator.RENDER_DELAY_MS);

            const canvas = await this.captureElement(container, {
                scale: config.scale,
                backgroundColor: config.backgroundColor,
                width: config.containerWidth,
                height: container.scrollHeight,
            });

            this.removeHiddenContainer(container);

            const pdf = new jsPDF({
                orientation: config.orientation,
                unit: 'mm',
                format: config.format,
                compress: true,
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const placement = this.calculateImagePlacement(
                canvas,
                pdfWidth,
                pdfHeight,
                config.margin
            );

            const imgData = canvas.toDataURL('image/jpeg', config.quality);
            pdf.addImage(
                imgData,
                'JPEG',
                placement.x,
                placement.y,
                placement.width,
                placement.height
            );

            return pdf.output('arraybuffer');
        } catch (error) {
            this.removeHiddenContainer(container);
            throw new Error(`PDF generation failed: ${error}`);
        }
    }

    /**
     * Generates a multi-page PDF from multiple HTML elements.
     * Each element becomes a separate page in the resulting PDF.
     *
     * @param elements - Array of HTML elements, each representing a page
     * @param options - Optional PDF generation configuration
     * @returns Promise resolving to an ArrayBuffer containing the merged PDF
     * @throws Error if any page generation or merging fails
     *
     * @example
     * ```typescript
     * const pages = document.querySelectorAll('[data-page-id]');
     * const pdfBuffer = await generator.generateMultiplePages(Array.from(pages), {
     *   format: 'a4'
     * });
     * ```
     */
    async generateMultiplePages(elements: HTMLElement[], options: PDFOptions = {}): Promise<ArrayBuffer> {
        if (elements.length === 0) {
            throw new Error('No pages provided for PDF generation');
        }

        const config = this.buildConfig(options);

        const pdfBuffers: ArrayBuffer[] = [];

        for (const element of elements) {
            const buffer = await this.generatePage(element, config);
            pdfBuffers.push(buffer);
        }

        if (pdfBuffers.length === 1) {
            return pdfBuffers[0];
        }

        return await this.mergePdfs(pdfBuffers);
    }

    /**
     * Merges multiple PDF files into a single PDF document.
     * Preserves page order as provided in the input array.
     *
     * @param pdfFiles - Array of PDF files as ArrayBuffers
     * @returns Promise resolving to a merged PDF as ArrayBuffer
     * @throws Error if merging fails
     *
     * @example
     * ```typescript
     * const merged = await generator.mergePdfs([pdf1, pdf2, pdf3]);
     * ```
     */
    async mergePdfs(pdfFiles: ArrayBuffer[]): Promise<ArrayBuffer> {
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

    /**
     * Converts HTML content to a base64-encoded string.
     * Useful for previewing or embedding PDFs directly in the browser.
     *
     * @param htmlContent - HTML string to convert
     * @param options - Optional PDF generation configuration
     * @returns Promise resolving to a base64-encoded string
     * @throws Error if conversion fails
     *
     * @example
     * ```typescript
     * const base64 = await generator.toBase64('<h1>Hello World</h1>', {
     *   scale: 2,
     *   quality: 0.9
     * });
     * // Use base64 string in an iframe src or download
     * ```
     */
    async toBase64(htmlContent: string, options: PDFOptions = {}): Promise<string> {
        const config = this.buildConfig(options);

        const container = this.createHiddenContainer(htmlContent, {
            width: config.containerWidth,
            padding: config.containerPadding,
            background: config.containerBackground,
        });

        try {
            await this.wait(PDFGenerator.RENDER_DELAY_MS + 100);

            const canvas = await this.captureElement(container, {
                scale: config.scale,
                backgroundColor: config.backgroundColor,
                width: config.containerWidth,
                height: container.scrollHeight,
            });

            this.removeHiddenContainer(container);
            return canvas.toDataURL('image/jpeg', config.quality);
        } catch (error) {
            this.removeHiddenContainer(container);
            throw new Error(`Base64 conversion failed: ${error}`);
        }
    }

    /**
     * Generates and downloads a multi-page PDF directly.
     * Creates a temporary download link and triggers the download.
     *
     * @param elements - Array of HTML elements, each representing a page
     * @param options - Optional PDF generation configuration
     * @returns Promise that resolves when the download is complete
     * @throws Error if PDF generation or download fails
     *
     * @example
     * ```typescript
     * const pages = document.querySelectorAll('[data-page-id]');
     * await generator.downloadMultiplePages(Array.from(pages), {
     *   filename: 'report.pdf',
     *   format: 'a4',
     *   orientation: 'landscape'
     * });
     * ```
     */
    async downloadMultiplePages(elements: HTMLElement[], options: PDFOptions = {}): Promise<void> {
        const config = this.buildConfig(options);

        const buffer = await this.generateMultiplePages(elements, config);
        const blob = new Blob([buffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = config.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } finally {
            URL.revokeObjectURL(url);
        }
    }
}

export default PDFGenerator;