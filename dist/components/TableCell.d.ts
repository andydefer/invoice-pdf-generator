import { ReactNode, CSSProperties } from 'react';

export interface TableCellProps {
    children: ReactNode;
    align?: 'left' | 'center' | 'right';
    className?: string;
    style?: CSSProperties;
}
export declare function TableCell({ children, align, className, style, }: TableCellProps): import("react").JSX.Element;
