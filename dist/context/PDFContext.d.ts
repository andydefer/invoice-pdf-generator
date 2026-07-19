import { ReactNode } from 'react';

export interface PDFConfig {
    format: 'a4' | 'a3' | 'letter' | 'legal';
    orientation: 'portrait' | 'landscape';
    scale: number;
    margin: number;
}
interface PDFContextType {
    config: PDFConfig;
    setConfig: (config: Partial<PDFConfig>) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}
export declare function PDFProvider({ children, initialConfig, }: {
    children: ReactNode;
    initialConfig?: Partial<PDFConfig>;
}): import("react").JSX.Element;
export declare function usePDFContext(): PDFContextType;
export {};
