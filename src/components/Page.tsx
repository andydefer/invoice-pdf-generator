import { CSSProperties, ReactNode, useEffect, useRef } from 'react';

export interface PageProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    id?: string;
}

export function Page({
    children,
    className = '',
    style = {},
    id,
}: PageProps) {
    const pageId = id || `page-${Math.random().toString(36).substring(2, 11)}`;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.setAttribute('data-page-id', pageId);
        }
    }, [pageId]);

    return (
        <div
            ref={ref}
            id={pageId}
            data-page-id={pageId}
            className={className}
            style={{
                width: '100%',
                padding: '40px',
                backgroundColor: '#ffffff',
                pageBreakAfter: 'always',
                breakAfter: 'page',
                ...style,
            }}
        >
            {children}
        </div>
    );
}