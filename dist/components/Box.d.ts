import { ReactNode, CSSProperties } from 'react';

export interface BoxProps {
    children: ReactNode;
    padding?: number;
    margin?: number;
    border?: boolean;
    rounded?: boolean;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    style?: CSSProperties;
}
export declare function Box({ children, padding, margin, border, rounded, shadow, className, style, }: BoxProps): import("react").JSX.Element;
