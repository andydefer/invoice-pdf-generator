import { ReactNode, CSSProperties } from 'react';

export interface TextProps {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'small';
    color?: 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning';
    align?: 'left' | 'center' | 'right' | 'justify';
    bold?: boolean;
    truncate?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare function Text({ children, variant, color, align, bold, truncate, className, style, }: TextProps): import("react").JSX.Element;
