import React, { ReactNode, CSSProperties } from 'react';

export interface HeadingProps {
    children: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    color?: 'primary' | 'secondary' | 'muted';
    className?: string;
    style?: CSSProperties;
}

export function Heading({
    children,
    level = 1,
    color = 'primary',
    className = '',
    style = {},
}: HeadingProps) {
    const sizeClass = {
        1: 'text-4xl font-bold',
        2: 'text-3xl font-bold',
        3: 'text-2xl font-bold',
        4: 'text-xl font-bold',
        5: 'text-lg font-bold',
        6: 'text-base font-bold',
    }[level];

    const colorClass = {
        primary: 'text-gray-900',
        secondary: 'text-gray-700',
        muted: 'text-gray-500',
    }[color];

    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return React.createElement(
        Tag,
        { className: `${sizeClass} ${colorClass} ${className}`, style },
        children
    );
}