import { CSSProperties } from 'react';

export interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    imageSettings?: {
        src: string;
        height: number;
        width: number;
        excavate: boolean;
    };
    className?: string;
    style?: CSSProperties;
}
export declare function QRCode({ value, size, bgColor, fgColor, level, includeMargin, imageSettings, className, style, }: QRCodeProps): import("react").JSX.Element;
