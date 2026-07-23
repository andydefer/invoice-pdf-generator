/**
 * @fileoverview Custom hook for generating PDFs from React components.
 * Provides a clean API for downloading or generating PDF documents
 * from any React component tree.
 */

import { useState, ReactElement, useRef, useCallback } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { PDFGenerator as PDFGeneratorClass, PDFOptions } from '../utils/pdfGenerator';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/** Default configuration values for PDF generation */
const DEFAULT_CONFIG = {
    format: 'a3' as const,
    orientation: 'portrait' as const,
    scale: 2,
    margin: 20,
    containerWidth: 900,
    containerPadding: 10,
    containerBackground: '#ffffff',
} as const;

/** Type representing the default configuration shape */
export type PdfConfig = typeof DEFAULT_CONFIG;

/** Partial configuration for updating settings */
export type PartialPdfConfig = Partial<PdfConfig>;

/**
 * Return type for the usePdf hook.
 * Provides methods and state for PDF generation.
 */
export interface UsePdfReturn {
    /**
     * Downloads the PDF directly to the user's device.
     * @param options - Optional PDF generation options
     * @returns Promise that resolves when download is complete
     */
    download: (options?: Partial<PDFOptions>) => Promise<void>;

    /**
     * Generates the PDF as a base64-encoded string.
     * @param options - Optional PDF generation options
     * @returns Promise resolving to a base64 string of the PDF
     */
    generate: (options?: Partial<PDFOptions>) => Promise<string>;

    /** Indicates whether a PDF generation operation is in progress */
    loading: boolean;

    /** Error message if the last operation failed, null otherwise */
    error: string | null;

    /** Current PDF generation configuration */
    config: PdfConfig;

    /**
     * Updates the PDF generation configuration.
     * @param newConfig - Partial configuration to merge with existing
     */
    updateConfig: (newConfig: PartialPdfConfig) => void;

    /**
     * Cleans up the internal DOM container.
     * Useful for memory management when the hook is no longer needed.
     */
    cleanup: () => void;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Custom hook for generating PDF documents from React components.
 *
 * Renders the provided component in a hidden DOM container, captures it,
 * and generates a PDF using the configured options.
 *
 * @param component - React element to render and convert to PDF
 * @returns Object containing generation methods and state
 *
 * @example
 * ```tsx
 * const InvoicePDF = () => <Invoice data={invoiceData} />;
 *
 * function InvoicePage() {
 *   const { download, generate, loading } = usePdf(<InvoicePDF />);
 *
 *   return (
 *     <button onClick={() => download({ filename: 'invoice.pdf' })}>
 *       {loading ? 'Generating...' : 'Download PDF'}
 *     </button>
 *   );
 * }
 * ```
 */
export function usePdf(component: ReactElement): UsePdfReturn {
    // ==========================================================================
    // STATE
    // ==========================================================================

    const [config, setConfigState] = useState<PdfConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Refs for managing the React root and DOM container
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<Root | null>(null);

    // ==========================================================================
    // PRIVATE HELPERS
    // ==========================================================================

    /**
     * Collects all CSS rules from the document's stylesheets.
     * Used to ensure the rendered component receives the correct styles.
     *
     * @returns Concatenated CSS rules as a string
     */
    const collectDocumentStyles = useCallback((): string => {
        const styleSheets = document.styleSheets;
        let styles = '';

        for (const sheet of styleSheets) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                if (rules) {
                    for (const rule of rules) {
                        if (rule instanceof CSSStyleRule) {
                            styles += rule.cssText;
                        }
                    }
                }
            } catch {
                // Cross-origin stylesheets are silently ignored
                // This is a common and acceptable limitation
            }
        }

        return styles;
    }, []);

    /**
     * Creates a hidden DOM container, renders the component into it,
     * and returns the container element.
     *
     * @param comp - React element to render
     * @param options - Optional overrides for container dimensions
     * @returns The container DOM element containing the rendered component
     */
    const createHiddenContainer = useCallback(
        (comp: ReactElement, options?: Partial<PDFOptions>): HTMLDivElement => {
            const {
                containerWidth = config.containerWidth,
                containerPadding = config.containerPadding,
                containerBackground = config.containerBackground,
            } = options || {};

            // Create hidden container
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            container.style.top = '0';
            container.style.width = `${containerWidth}px`;
            container.style.background = containerBackground;
            container.style.padding = `${containerPadding}px`;

            // Inject styles
            const styleElement = document.createElement('style');
            styleElement.textContent = collectDocumentStyles();
            container.appendChild(styleElement);

            document.body.appendChild(container);

            // Render component
            const root = createRoot(container);
            rootRef.current = root;
            root.render(comp);

            containerRef.current = container;
            return container;
        },
        [config, collectDocumentStyles]
    );

    /**
     * Extracts pages from the rendered container.
     * Pages are identified by the 'data-page-id' attribute.
     *
     * @param container - The rendered container element
     * @returns Array of page elements
     * @throws Error if no pages are found
     */
    const extractPages = useCallback((container: HTMLElement): HTMLElement[] => {
        const pages: HTMLElement[] = [];
        const pageElements = container.querySelectorAll('[data-page-id]');

        if (pageElements.length > 0) {
            pageElements.forEach((page) => {
                pages.push(page as HTMLElement);
            });
        } else {
            pages.push(container);
        }

        if (pages.length === 0) {
            throw new Error('No pages found to generate PDF');
        }

        return pages;
    }, []);

    /**
     * Waits for the DOM to stabilize after rendering.
     * Essential for ensuring html2canvas captures the content correctly.
     */
    const waitForRender = useCallback(
        (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 300)),
        []
    );

    /**
     * Cleans up the DOM container and React root.
     * Must be called to prevent memory leaks.
     */
    const cleanupContainer = useCallback((): void => {
        if (rootRef.current) {
            rootRef.current.unmount();
            rootRef.current = null;
        }

        if (containerRef.current && containerRef.current.parentNode) {
            try {
                document.body.removeChild(containerRef.current);
            } catch {
                // Container may have already been removed
            }
            containerRef.current = null;
        }
    }, []);

    /**
     * Builds generation options by merging defaults with overrides.
     */
    const buildGenerationOptions = useCallback(
        (options?: Partial<PDFOptions>): PDFOptions => ({
            filename: options?.filename || 'document.pdf',
            format: options?.format || config.format,
            orientation: options?.orientation || config.orientation,
            scale: options?.scale || 1.5,
            margin: options?.margin || config.margin,
            backgroundColor: options?.backgroundColor || '#ffffff',
            quality: options?.quality || 0.8,
            containerWidth: options?.containerWidth || config.containerWidth,
            containerPadding: options?.containerPadding || config.containerPadding,
            containerBackground: options?.containerBackground || config.containerBackground,
        }),
        [config]
    );

    /**
     * Executes a PDF generation operation with consistent error handling
     * and cleanup.
     */
    const executePdfOperation = useCallback(
        async <T>(
            operation: (container: HTMLElement, options: PDFOptions) => Promise<T>,
            options?: Partial<PDFOptions>
        ): Promise<T> => {
            setLoading(true);
            setError(null);

            let container: HTMLElement | null = null;

            try {
                container = createHiddenContainer(component, options);
                await waitForRender();

                const pdfOptions = buildGenerationOptions(options);
                const result = await operation(container, pdfOptions);

                cleanupContainer();
                setLoading(false);
                return result;
            } catch (err) {
                cleanupContainer();
                const message = err instanceof Error ? err.message : 'Unknown error';
                setError(message);
                setLoading(false);
                throw err;
            }
        },
        [component, createHiddenContainer, waitForRender, buildGenerationOptions, cleanupContainer]
    );

    // ==========================================================================
    // PUBLIC API
    // ==========================================================================

    /**
     * Downloads the PDF document.
     */
    const download = useCallback(
        async (options?: Partial<PDFOptions>): Promise<void> => {
            await executePdfOperation(async (container, pdfOptions) => {
                const pages = extractPages(container);
                const generator = new PDFGeneratorClass();
                await generator.downloadMultiplePages(pages, pdfOptions);
            }, options);
        },
        [executePdfOperation, extractPages]
    );

    /**
     * Generates the PDF as a base64 string.
     */
    const generate = useCallback(
        async (options?: Partial<PDFOptions>): Promise<string> => {
            return await executePdfOperation(async (container, pdfOptions) => {
                const generator = new PDFGeneratorClass();
                return await generator.toBase64(container.outerHTML, pdfOptions);
            }, options);
        },
        [executePdfOperation]
    );

    /**
     * Updates the PDF generation configuration.
     */
    const updateConfig = useCallback((newConfig: PartialPdfConfig): void => {
        setConfigState((prev) => ({ ...prev, ...newConfig }));
    }, []);

    // ==========================================================================
    // CLEANUP ON UNMOUNT
    // ==========================================================================

    // The consumer is responsible for calling cleanup()
    // This is intentional to allow for manual cleanup control

    // ==========================================================================
    // RETURN
    // ==========================================================================

    return {
        download,
        generate,
        loading,
        error,
        config,
        updateConfig,
        cleanup: cleanupContainer,
    };
}

export default usePdf;