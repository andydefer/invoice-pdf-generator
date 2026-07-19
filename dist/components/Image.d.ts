import { default as React, CSSProperties } from 'react';

export interface ImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    fit?: 'contain' | 'cover' | 'fill' | 'none';
    rounded?: boolean | 'full';
    fallback?: string;
    className?: string;
    style?: CSSProperties;
}
export declare function Image({ src, alt, width, height, fit, rounded, fallback, className, style, }: ImageProps): React.JSX.Element;
