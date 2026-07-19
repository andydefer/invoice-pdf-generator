import { default as React, ReactNode, CSSProperties } from 'react';

export interface HeadingProps {
    children: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    color?: 'primary' | 'secondary' | 'muted';
    className?: string;
    style?: CSSProperties;
}
export declare function Heading({ children, level, color, className, style, }: HeadingProps): React.ReactElement<{
    className: string;
    style: React.CSSProperties;
}, string | React.JSXElementConstructor<any>>;
