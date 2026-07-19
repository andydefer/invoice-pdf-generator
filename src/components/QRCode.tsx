import { CSSProperties } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    imageSettings?: {
        src: string;
        height: number;
        width: number;
        excavate: boolean;
    };
    className?: string;
    style?: CSSProperties;
}

export function QRCode({
    value,
    size = 128,
    bgColor = '#ffffff',
    fgColor = '#000000',
    level = 'M',
    includeMargin = false,
    imageSettings,
    className = '',
    style = {},
}: QRCodeProps) {
    return (
        <div
            className={className}
            style={{
                display: 'inline-block',
                ...style,
            }}
        >
            <QRCodeSVG
                value={value}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level={level}
                includeMargin={includeMargin}
                imageSettings={imageSettings}
            />
        </div>
    );
}