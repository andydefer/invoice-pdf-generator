import { CSSProperties } from 'react';
import { Box } from './Box';
import { Text } from './Text';
import { Flex } from './Flex';

export interface TotalBoxProps {
    subtotal: number;
    discount?: number;
    tax?: number;
    shipping?: number;
    total: number;
    currency?: string;
    className?: string;
    style?: CSSProperties;
}

export function TotalBox({
    subtotal,
    discount = 0,
    tax = 0,
    shipping = 0,
    total,
    currency = '€',
    className = '',
    style = {},
}: TotalBoxProps) {
    const taxAmount = (subtotal - discount) * (tax / 100);

    return (
        <Box
            className={`bg-gray-50 p-4 rounded-lg ${className}`}
            style={style}
        >
            <Flex direction="column" gap={2}>
                <Flex direction="row" justify="between">
                    <Text variant="body" color="muted">Subtotal</Text>
                    <Text variant="body">{subtotal.toFixed(2)} {currency}</Text>
                </Flex>

                {discount > 0 && (
                    <Flex direction="row" justify="between">
                        <Text variant="body" color="muted">Discount</Text>
                        <Text variant="body" color="destructive">-{discount.toFixed(2)} {currency}</Text>
                    </Flex>
                )}

                {tax > 0 && (
                    <Flex direction="row" justify="between">
                        <Text variant="body" color="muted">Tax ({tax}%)</Text>
                        <Text variant="body">{taxAmount.toFixed(2)} {currency}</Text>
                    </Flex>
                )}

                {shipping > 0 && (
                    <Flex direction="row" justify="between">
                        <Text variant="body" color="muted">Shipping</Text>
                        <Text variant="body">{shipping.toFixed(2)} {currency}</Text>
                    </Flex>
                )}

                <div className="border-t-2 border-gray-300 pt-2 mt-2">
                    <Flex direction="row" justify="between">
                        <Text variant="h5" bold>Total</Text>
                        <Text variant="h5" bold>{total.toFixed(2)} {currency}</Text>
                    </Flex>
                </div>
            </Flex>
        </Box>
    );
}