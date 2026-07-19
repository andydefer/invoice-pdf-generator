import { CSSProperties } from 'react';

export interface DividerProps {
    variant?: 'solid' | 'dashed' | 'dotted';
    size?: number;
    color?: string;
    className?: string;
    style?: CSSProperties;
}
export declare function Divider({ variant, size, color, className, style, }: DividerProps): import("react").JSX.Element;
