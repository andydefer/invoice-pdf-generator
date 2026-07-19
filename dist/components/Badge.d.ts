import { ReactNode, CSSProperties } from 'react';

export interface BadgeProps {
    children: ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare function Badge({ children, variant, size, rounded, className, style, }: BadgeProps): import("react").JSX.Element;
