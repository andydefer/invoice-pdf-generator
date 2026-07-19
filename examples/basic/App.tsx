import React from 'react';
import {
    PDFGenerator,
    Flex,
    Grid,
    Box,
    Text,
    Heading,
    Divider,
    usePDF,
    PDFProvider,
} from '../../src';

function BasicExampleContent() {
    const { download, loading } = usePDF();

    const handleDownload = async () => {
        const container = document.querySelector('.pdf-container') as HTMLElement;
        if (container) {
            await download(container, {
                filename: 'basic-document.pdf',
                format: 'a4',
                orientation: 'portrait',
                scale: 2,
            });
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Basic PDF Generator</h1>

            <PDFGenerator format="a4" className="bg-white">
                <Flex direction="column" gap={4}>
                    <Heading level={1}>Hello World</Heading>

                    <Text variant="body">
                        This is a basic example of the PDF generator.
                    </Text>

                    <Grid columns={2} gap={4}>
                        <Box className="bg-blue-100 p-4 rounded">
                            <Text variant="h4">Column 1</Text>
                            <Text>Content for column 1</Text>
                        </Box>
                        <Box className="bg-green-100 p-4 rounded">
                            <Text variant="h4">Column 2</Text>
                            <Text>Content for column 2</Text>
                        </Box>
                    </Grid>

                    <Divider />

                    <Text variant="small" color="muted">
                        Generated on {new Date().toLocaleDateString()}
                    </Text>
                </Flex>
            </PDFGenerator>

            <button
                onClick={handleDownload}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                {loading ? 'Generating...' : 'Download PDF'}
            </button>
        </div>
    );
}

export default function BasicExample() {
    return (
        <PDFProvider>
            <BasicExampleContent />
        </PDFProvider>
    );
}