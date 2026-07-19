import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src/**/*.ts'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'InvoicePDF',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['html2canvas', 'jspdf'],
            output: {
                globals: {
                    html2canvas: 'html2canvas',
                    jspdf: 'jspdf'
                }
            }
        }
    },
    server: {
        port: 3000,
        open: '/examples/'
    }
});