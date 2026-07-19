import { CSSProperties } from 'react';

export interface BarcodeProps {
    value: string;
    format?: 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8' | 'UPC' | 'ITF' | 'ITF14' | 'MSI' | 'CODABAR' | 'PHARMACODE';
    width?: number;
    height?: number;
    displayValue?: boolean;
    fontSize?: number;
    font?: string;
    textAlign?: 'left' | 'center' | 'right';
    textPosition?: 'top' | 'bottom';
    textMargin?: number;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    background?: string;
    lineColor?: string;
    className?: string;
    style?: CSSProperties;
}
export declare function Barcode({ value, format, width, height, displayValue, fontSize, font, textAlign, textPosition, textMargin, margin, marginTop, marginBottom, marginLeft, marginRight, background, lineColor, className, style, }: BarcodeProps): import("react").JSX.Element;
