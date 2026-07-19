import { ReactNode, CSSProperties } from 'react';

export interface TableRowProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare function TableRow({ children, className, style, }: TableRowProps): import("react").JSX.Element;
