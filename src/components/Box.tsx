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

export function Box({
    children,
    padding = 4,
    margin = 0,
    border = false,
    rounded = false,
    shadow = 'none',
    className = '',
    style = {},
}: BoxProps) {
    const paddingClass = `p-${padding}`;
    const marginClass = margin > 0 ? `m-${margin}` : '';
    const borderClass = border ? 'border border-gray-200' : '';
    const roundedClass = rounded ? 'rounded-lg' : '';
    const shadowClass = shadow !== 'none' ? `shadow-${shadow}` : '';

    return (
        <div
            className={`${paddingClass} ${marginClass} ${borderClass} ${roundedClass} ${shadowClass} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}