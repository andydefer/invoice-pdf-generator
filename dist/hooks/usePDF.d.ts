import { PDFOptions } from '../types';

export declare function usePDF(): {
    generate: (element: HTMLElement, options?: Partial<PDFOptions>) => Promise<string>;
    download: (elements: HTMLElement | HTMLElement[], options?: Partial<PDFOptions>) => Promise<void>;
    preview: (element: HTMLElement, containerId: string) => void;
    config: import('../context').PDFConfig;
    updateConfig: (newConfig: Partial<import('../context').PDFConfig>) => void;
    loading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
};
