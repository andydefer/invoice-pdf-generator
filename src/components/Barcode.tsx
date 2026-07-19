import { CSSProperties, useEffect, useRef } from 'react';

export interface BarcodeProps {
    value: string;
    format?: 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8' | 'UPC' | 'ITF' | 'ITF14' | 'MSI' | 'CODABAR' | 'PHARMACODE';
    width?: number;
    height?: number;
    displayValue?: boolean;
    fontSize?: number;
    font?: string;
    textAlign?: 'left' | 'center' | 'right';
    textPosition?: 'top' | 'bottom';
    textMargin?: number;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    background?: string;
    lineColor?: string;
    className?: string;
    style?: CSSProperties;
}

export function Barcode({
    value,
    format = 'CODE128',
    width = 2,
    height = 100,
    displayValue = true,
    fontSize = 16,
    font = 'monospace',
    textAlign = 'center',
    textPosition = 'bottom',
    textMargin = 2,
    margin = 10,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    background = '#ffffff',
    lineColor = '#000000',
    className = '',
    style = {},
}: BarcodeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const generateBarcode = async () => {
            if (containerRef.current) {
                try {
                    // Nettoyer le conteneur
                    containerRef.current.innerHTML = '';

                    // Créer le SVG
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    containerRef.current.appendChild(svg);

                    const JsBarcode = (await import('jsbarcode')).default;
                    JsBarcode(svg, value, {
                        format,
                        width,
                        height,
                        displayValue,
                        fontSize,
                        font,
                        textAlign,
                        textPosition,
                        textMargin,
                        margin,
                        marginTop,
                        marginBottom,
                        marginLeft,
                        marginRight,
                        background,
                        lineColor,
                    });
                } catch (error) {
                    console.error('Barcode generation failed:', error);
                }
            }
        };

        generateBarcode();
    }, [
        value,
        format,
        width,
        height,
        displayValue,
        fontSize,
        font,
        textAlign,
        textPosition,
        textMargin,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        background,
        lineColor,
    ]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                display: 'inline-block',
                ...style,
            }}
        />
    );
}