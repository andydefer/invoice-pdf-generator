import { ReactNode, CSSProperties } from 'react';

export interface TableRowProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export function TableRow({
    children,
    className = '',
    style = {},
}: TableRowProps) {
    return (
        <tr className={className} style={style}>
            {children}
        </tr>
    );
}