import { CSSProperties } from 'react';

export interface Column {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

export interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    bordered?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    className?: string;
    style?: CSSProperties;
}

export function Table({
    columns,
    data,
    bordered = false,
    striped = false,
    hoverable = false,
    className = '',
    style = {},
}: TableProps) {
    const borderClass = bordered ? 'border border-gray-200' : '';
    const stripedClass = striped ? 'even:bg-gray-50' : '';
    const hoverClass = hoverable ? 'hover:bg-gray-50' : '';

    return (
        <table
            className={`w-full ${borderClass} ${className}`}
            style={style}
        >
            <thead>
                <tr className="bg-gray-100">
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            style={{ width: col.width }}
                            className={`px-4 py-2 text-left text-sm font-semibold text-gray-700 ${col.align === 'right' ? 'text-right' :
                                col.align === 'center' ? 'text-center' : ''
                                }`}
                        >
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className={`${stripedClass} ${hoverClass}`}>
                        {columns.map((col) => (
                            <td
                                key={col.key}
                                className={`px-4 py-2 text-sm ${col.align === 'right' ? 'text-right' :
                                    col.align === 'center' ? 'text-center' : ''
                                    }`}
                            >
                                {row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}