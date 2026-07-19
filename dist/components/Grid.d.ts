import { ReactNode, CSSProperties } from 'react';

export interface GridProps {
    children: ReactNode;
    columns?: number;
    gap?: number;
    className?: string;
    style?: CSSProperties;
}
export declare function Grid({ children, columns, gap, className, style, }: GridProps): import("react").JSX.Element;
