import React, { useState } from 'react';
import {
    Flex,
    Grid,
    Box,
    Text,
    Heading,
    Divider,
    Page,
    usePdf,
    PDFPreview,
} from '../../src';
import { Eye, Download, Loader2 } from 'lucide-react';

function BasicDocument() {


    return (
        <Page>
            <Flex direction="column" gap={4}>
                <Heading level={1} className="text-foreground">
                    Hello World
                </Heading>

                <Text variant="body" className="text-foreground py-3 inline-block">
                    This is a basic example of the PDF generator.
                </Text>

                <Grid columns={2} gap={4}>
                    <Box className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <Text variant="h4" className="text-primary">Column 1</Text>
                        <Text className="text-foreground">Content for column 1</Text>
                    </Box>
                    <Box className="bg-success/10 p-4 rounded-lg border border-success/20">
                        <Text variant="h4" className="text-success">Column 2</Text>
                        <Text className="text-foreground">Content for column 2</Text>
                    </Box>
                </Grid>

                <Divider className="border-border" />

                <Text variant="small" className="text-muted-foreground">
                    Generated on {new Date().toLocaleDateString()}
                </Text>
            </Flex>
        </Page>
    );
}

export default function BasicExample() {
    const [showPreview, setShowPreview] = useState(false);
    const { download, loading } = usePdf(<BasicDocument />);

    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-foreground">
                Basic PDF Generator
            </h1>

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={() => setShowPreview(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all duration-200 font-medium"
                >
                    <Eye size={18} />
                    Preview
                </button>

                <button
                    onClick={() => download({ filename: 'basic-document.pdf' })}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground transition-all duration-200 font-medium"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            Download PDF
                        </>
                    )}
                </button>
            </div>

            {showPreview && (
                <PDFPreview
                    width={60}
                    height={60}
                    onClose={() => setShowPreview(false)}
                >
                    <BasicDocument />
                </PDFPreview>
            )}
        </div>
    );
}