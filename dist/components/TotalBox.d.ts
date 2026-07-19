import { CSSProperties } from 'react';

export interface TotalBoxProps {
    subtotal: number;
    discount?: number;
    tax?: number;
    shipping?: number;
    total: number;
    currency?: string;
    className?: string;
    style?: CSSProperties;
}
export declare function TotalBox({ subtotal, discount, tax, shipping, total, currency, className, style, }: TotalBoxProps): import("react").JSX.Element;
