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
export declare function Flex({ children, direction, gap, align, justify, wrap, className, style, }: FlexProps): import("react").JSX.Element;
