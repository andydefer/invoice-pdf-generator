import { CSSProperties } from 'react';

export interface Column {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
}
export interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    bordered?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare function Table({ columns, data, bordered, striped, hoverable, className, style, }: TableProps): import("react").JSX.Element;
