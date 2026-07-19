import { ReactNode, CSSProperties } from 'react';

export interface TableCellProps {
    children: ReactNode;
    align?: 'left' | 'center' | 'right';
    className?: string;
    style?: CSSProperties;
}

export function TableCell({
    children,
    align = 'left',
    className = '',
    style = {},
}: TableCellProps) {
    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[align];

    return (
        <td
            className={`px-4 py-2 ${alignClass} ${className}`}
            style={style}
        >
            {children}
        </td>
    );
}