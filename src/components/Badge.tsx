import { ReactNode, CSSProperties } from 'react';

export interface BadgeProps {
    children: ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
    className?: string;
    style?: CSSProperties;
}

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    rounded = true,
    className = '',
    style = {},
}: BadgeProps) {
    const variantClass = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        default: 'bg-gray-100 text-gray-800',
    }[variant];

    const sizeClass = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    }[size];

    const roundedClass = rounded ? 'rounded-full' : 'rounded';

    return (
        <span
            className={`inline-block ${variantClass} ${sizeClass} ${roundedClass} ${className}`}
            style={style}
        >
            {children}
        </span>
    );
}