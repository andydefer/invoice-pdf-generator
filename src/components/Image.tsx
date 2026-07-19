import React, { CSSProperties } from 'react';

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

export function Image({
    src,
    alt = '',
    width,
    height,
    fit = 'contain',
    rounded = false,
    fallback,
    className = '',
    style = {},
}: ImageProps) {
    const fitClass = {
        contain: 'object-contain',
        cover: 'object-cover',
        fill: 'object-fill',
        none: 'object-none',
    }[fit];

    const roundedClass = rounded === 'full' ? 'rounded-full' : rounded ? 'rounded-lg' : '';

    const [error, setError] = React.useState(false);

    const handleError = () => {
        if (fallback && !error) {
            setError(true);
        }
    };

    const imageSrc = error && fallback ? fallback : src;

    return (
        <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className={`${fitClass} ${roundedClass} ${className}`}
            style={style}
            onError={handleError}
        />
    );
}