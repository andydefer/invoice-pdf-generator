import { useRef, ReactNode, useImperativeHandle, forwardRef, CSSProperties } from 'react';
import { usePDFContext } from '../context';
import { PDFGenerator as PDFGeneratorClass } from '../utils/pdfGenerator';
import { PDFGeneratorRef } from '../types/pdf';

export interface PDFGeneratorProps {
    children: ReactNode;
    format?: 'a4' | 'a3' | 'letter' | 'legal';
    orientation?: 'portrait' | 'landscape';
    scale?: number;
    margin?: number;
    border?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    className?: string;
    style?: CSSProperties;
    onGenerate?: (base64: string) => void;
    onDownload?: (pdf: any) => void;
}

export const PDFGenerator = forwardRef<PDFGeneratorRef, PDFGeneratorProps>(
    (
        {
            children,
            format = 'a4',
            orientation = 'portrait',
            scale = 2,
            margin = 40,
            border = true,
            borderColor = '#e5e7eb',
            borderWidth = 2,
            borderRadius = 12,
            className = '',
            style = {},
            onGenerate,
            onDownload,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { setLoading, setError } = usePDFContext();

        const generatePDF = async (filename = 'document.pdf') => {
            try {
                setLoading(true);
                setError(null);

                const container = containerRef.current;
                if (!container) {
                    throw new Error('Container not found');
                }

                const generator = new PDFGeneratorClass();

                // Récupérer toutes les pages (éléments avec page-break-after: always)
                const pageElements = container.querySelectorAll('[style*="page-break-after: always"]');

                let pdf: any = null;

                if (pageElements.length > 0) {
                    // Plusieurs pages
                    const pages: HTMLElement[] = [];
                    pageElements.forEach((el) => {
                        pages.push(el as HTMLElement);
                    });

                    pdf = await generator.generateMultiplePages(pages, {
                        filename,
                        format,
                        orientation,
                        scale,
                        margin: 10,
                    });
                } else {
                    // Une seule page
                    pdf = await generator.generatePage(container, {
                        filename,
                        format,
                        orientation,
                        scale,
                        margin: 10,
                    });
                }

                if (onDownload) onDownload(pdf);
                setLoading(false);
                return pdf;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
                setLoading(false);
                throw error;
            }
        };

        const generateBase64 = async () => {
            try {
                setLoading(true);
                setError(null);

                const container = containerRef.current;
                if (!container) {
                    throw new Error('Container not found');
                }

                const generator = new PDFGeneratorClass();
                const html = container.outerHTML;

                const base64 = await generator.toBase64(html, {
                    scale,
                });

                if (onGenerate) onGenerate(base64);
                setLoading(false);
                return base64;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
                setLoading(false);
                throw error;
            }
        };

        useImperativeHandle(ref, () => ({
            generatePDF,
            generateBase64,
        }));

        const borderStyle = border
            ? {
                border: `${borderWidth}px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`,
            }
            : {};

        return (
            <div
                ref={containerRef}
                className={`pdf-container ${className}`}
                style={{
                    backgroundColor: '#ffffff',
                    width: '794px',
                    padding: `${margin}px`,
                    margin: '0 auto',
                    ...borderStyle,
                    ...style,
                }}
            >
                {children}
            </div>
        );
    }
);

PDFGenerator.displayName = 'PDFGenerator';