import { ReactNode, CSSProperties } from 'react';

export interface FlexProps {
    children: ReactNode;
    direction?: 'row' | 'column';
    gap?: number;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: boolean;
    className?: string;
    style?: CSSProperties;
}

export function Flex({
    children,
    direction = 'row',
    gap = 4,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    className = '',
    style = {},
}: FlexProps) {
    const gapClass = `gap-${gap}`;
    const alignClass = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    }[align];
    const justifyClass = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    }[justify];
    const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';
    const wrapClass = wrap ? 'flex-wrap' : '';

    return (
        <div
            className={`flex ${directionClass} ${gapClass} ${alignClass} ${justifyClass} ${wrapClass} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}