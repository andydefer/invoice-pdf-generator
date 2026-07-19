import { CSSProperties, ReactNode } from 'react';

export interface PageProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare function Page({ children, className, style, }: PageProps): import("react").JSX.Element;
