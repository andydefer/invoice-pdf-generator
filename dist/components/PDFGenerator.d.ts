import { ReactNode, CSSProperties } from 'react';
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
export declare const PDFGenerator: import('react').ForwardRefExoticComponent<PDFGeneratorProps & import('react').RefAttributes<PDFGeneratorRef>>;
