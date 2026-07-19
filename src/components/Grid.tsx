import { ReactNode, CSSProperties } from 'react';

export interface GridProps {
    children: ReactNode;
    columns?: number;
    gap?: number;
    className?: string;
    style?: CSSProperties;
}

export function Grid({
    children,
    columns = 2,
    gap = 4,
    className = '',
    style = {},
}: GridProps) {
    const gridClass = `grid-cols-${columns}`;
    const gapClass = `gap-${gap}`;

    return (
        <div
            className={`grid ${gridClass} ${gapClass} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}