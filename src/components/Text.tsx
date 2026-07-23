import { ReactNode, CSSProperties } from 'react';

export interface TextProps {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'small';
    color?: 'primary' | 'secondary' | 'muted' | 'destructive' | 'success' | 'warning';
    align?: 'left' | 'center' | 'right' | 'justify';
    bold?: boolean;
    truncate?: boolean;
    className?: string;
    style?: CSSProperties;
}

export function Text({
    children,
    variant = 'body',
    color = 'primary',
    align = 'left',
    bold = false,
    truncate = false,
    className = '',
    style = {},
}: TextProps) {
    const variantClass = {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-bold',
        h4: 'text-xl font-bold',
        h5: 'text-lg font-bold',
        body: 'text-base',
        small: 'text-sm',
    }[variant];

    const colorClass = {
        primary: 'text-gray-900',
        secondary: 'text-gray-700',
        muted: 'text-gray-500',
        destructive: 'text-red-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
    }[color];

    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    }[align];

    const boldClass = bold ? 'font-bold' : '';
    const truncateClass = truncate ? 'truncate' : '';

    return (
        <div
            className={`${variantClass} ${colorClass} ${alignClass} ${boldClass} ${truncateClass} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}