import React from 'react';
import {
    PDFGenerator,
    Flex,
    Grid,
    Box,
    Text,
    Heading,
    Table,
    Badge,
    Divider,
    TotalBox,
    QRCode,
    Barcode,
    Page,
    usePDF,
    PDFProvider,
} from '../../src';

function InvoiceExampleContent() {
    const { download, loading } = usePDF();

    const items = [
        { description: 'E-commerce Website Development', quantity: 1, unitPrice: 850.00, total: 850.00 },
        { description: 'Payment System Integration', quantity: 1, unitPrice: 350.00, total: 350.00 },
        { description: 'Premium Hosting (1 year)', quantity: 12, unitPrice: 25.00, total: 300.00 },
        { description: 'Maintenance & Support (3 months)', quantity: 3, unitPrice: 120.00, total: 360.00 },
    ];

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = 50.00;
    const tax = 20;
    const total = subtotal - discount + ((subtotal - discount) * tax / 100);

    const handleDownload = async () => {
        const container = document.querySelector('.pdf-container') as HTMLElement;
        if (container) {
            await download(container, {
                filename: 'invoice_INV-2026-001.pdf',
                format: 'a3',
                orientation: 'portrait',
                scale: 4,
            });
        }
    };

    return (
        <div className="p-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>

            <PDFGenerator
                format="a4"
                className="bg-white"
                border={true}
                borderColor="#d1d5db"
                borderWidth={2}
                borderRadius={12}
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '2px solid #d1d5db',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
            >
                {/* ===== PAGE 1 ===== */}
                <Page>
                    <Box
                        style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '24px',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        {/* HEADER */}
                        <Flex direction="row" justify="between" className="mb-8">
                            <Flex direction="column" gap={1}>
                                <Heading level={1} style={{ color: '#1a1a2e' }}>INVOICE</Heading>
                                <Text color="muted">#INV-2026-001</Text>
                            </Flex>
                            <Flex direction="column" align="end" gap={1}>
                                <Text variant="body" style={{ fontWeight: 'bold' }}>WebStudio Pro</Text>
                                <Text variant="small" color="muted">123 Avenue des Créateurs</Text>
                                <Text variant="small" color="muted">75000 Paris</Text>
                                <Text variant="small" color="muted">contact@webstudio.fr</Text>
                                <Text variant="small" color="muted">+33 1 23 45 67 89</Text>
                            </Flex>
                        </Flex>

                        <Divider style={{ marginBottom: '24px' }} />

                        {/* CLIENT INFO */}
                        <Flex direction="row" justify="between" className="my-6" style={{ gap: '40px' }}>
                            <Box
                                className="p-4 rounded"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    flex: 1,
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                }}
                            >
                                <Text variant="small" color="muted" style={{ marginBottom: '8px' }}>BILL TO</Text>
                                <Text style={{ fontWeight: 'bold' }}>Jean Dupont</Text>
                                <Text className="text-sm">45 Rue du Commerce</Text>
                                <Text className="text-sm">69000 Lyon</Text>
                                <Text className="text-sm">jean.dupont@example.com</Text>
                            </Box>

                            <Box
                                className="p-4 rounded"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    flex: 1,
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                }}
                            >
                                <Text variant="small" color="muted" style={{ marginBottom: '8px' }}>INVOICE DETAILS</Text>
                                <Text className="text-sm"><strong>Date:</strong> 19/07/2026</Text>
                                <Text className="text-sm"><strong>Due Date:</strong> 18/08/2026</Text>
                                <Text className="text-sm"><strong>Payment:</strong> Bank Transfer</Text>
                                <div className="mt-2">
                                    <Badge variant="warning">Pending</Badge>
                                </div>
                            </Box>
                        </Flex>

                        {/* TABLEAU DES ARTICLES */}
                        <Table
                            columns={[
                                { key: 'description', label: 'Description', width: '50%' },
                                { key: 'quantity', label: 'Qty', align: 'center' },
                                { key: 'unitPrice', label: 'Price', align: 'right' },
                                { key: 'total', label: 'Total', align: 'right' },
                            ]}
                            data={items}
                            bordered
                            striped
                            className="my-6"
                        />

                        {/* TOTAUX */}
                        <Flex direction="row" justify="end">
                            <TotalBox
                                subtotal={subtotal}
                                discount={discount}
                                tax={tax}
                                shipping={0}
                                total={total}
                                className="w-64"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    width: '280px',
                                    border: '1px solid #e5e7eb',
                                }}
                            />
                        </Flex>

                        <Divider className="my-8" />

                        {/* FOOTER PAGE 1 */}
                        <Flex direction="row" justify="between">
                            <Flex direction="column" gap={1}>
                                <Text variant="small" color="muted">
                                    <strong>Payment Terms:</strong> Due in 30 days
                                </Text>
                                <Text variant="small" color="muted">
                                    <strong>IBAN:</strong> FR76 1234 5678 9012 3456 7890 123
                                </Text>
                                <Text variant="small" color="muted">
                                    <strong>BIC:</strong> AGRIFRPP
                                </Text>
                            </Flex>
                            <Flex direction="column" align="end">
                                <Text variant="small" color="muted">
                                    Thank you for your business!
                                </Text>
                                <Text variant="small" color="muted" style={{ fontSize: '11px' }}>
                                    Generated on {new Date().toLocaleDateString()}
                                </Text>
                            </Flex>
                        </Flex>

                        {/* QR CODE PAGE 1 */}
                        <Flex direction="row" justify="center" className="mt-6">
                            <QRCode
                                value={`https://example.com/invoice/INV-2026-001`}
                                size={100}
                                fgColor="#1a1a2e"
                                bgColor="#ffffff"
                            />
                        </Flex>
                    </Box>
                </Page>

                {/* ===== PAGE 2 ===== */}
                <Page>
                    <Box
                        style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '24px',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <Heading level={2} style={{ marginBottom: '24px', color: '#1a1a2e' }}>
                            Document Information
                        </Heading>

                        <Divider style={{ marginBottom: '24px' }} />

                        {/* QR CODE + BARCODE */}
                        <Grid columns={2} gap={6}>
                            <Box
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '24px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    textAlign: 'center',
                                }}
                            >
                                <Text variant="h5" style={{ marginBottom: '16px' }}>QR Code</Text>
                                <QRCode
                                    value={`https://example.com/invoice/INV-2026-001`}
                                    size={150}
                                    fgColor="#4338ca"
                                    bgColor="#ffffff"
                                    level="H"
                                />
                                <Text variant="small" color="muted" style={{ marginTop: '12px' }}>
                                    Scan for invoice details
                                </Text>
                            </Box>

                            <Box
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '24px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    textAlign: 'center',
                                }}
                            >
                                <Text variant="h5" style={{ marginBottom: '16px' }}>Barcode</Text>
                                <Barcode
                                    value="INV-2026-001"
                                    format="CODE128"
                                    width={2}
                                    height={80}
                                    displayValue={true}
                                    fontSize={14}
                                />
                                <Text variant="small" color="muted" style={{ marginTop: '12px' }}>
                                    Invoice Reference
                                </Text>
                            </Box>
                        </Grid>

                        <Divider style={{ margin: '24px 0' }} />

                        {/* EAN-13 + Client QR */}
                        <Grid columns={2} gap={6}>
                            <Box
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '24px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    textAlign: 'center',
                                }}
                            >
                                <Text variant="h5" style={{ marginBottom: '16px' }}>EAN-13</Text>
                                <Barcode
                                    value="123456789012"
                                    format="EAN13"
                                    width={2}
                                    height={60}
                                    displayValue={true}
                                    fontSize={12}
                                />
                            </Box>

                            <Box
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '24px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    textAlign: 'center',
                                }}
                            >
                                <Text variant="h5" style={{ marginBottom: '16px' }}>Client QR</Text>
                                <QRCode
                                    value={`client:jean.dupont@example.com`}
                                    size={100}
                                    fgColor="#059669"
                                    bgColor="#ffffff"
                                />
                                <Text variant="small" color="muted" style={{ marginTop: '12px' }}>
                                    Client Identifier
                                </Text>
                            </Box>
                        </Grid>

                        <Divider style={{ margin: '24px 0' }} />

                        {/* FOOTER PAGE 2 */}
                        <Flex direction="row" justify="between">
                            <Flex direction="column" gap={1}>
                                <Text variant="small" color="muted">
                                    <strong>Document ID:</strong> DOC-2026-001
                                </Text>
                                <Text variant="small" color="muted">
                                    <strong>Version:</strong> 1.0
                                </Text>
                            </Flex>
                            <Flex direction="column" align="end">
                                <Text variant="small" color="muted">
                                    Page 2 / 2
                                </Text>
                                <Text variant="small" color="muted" style={{ fontSize: '11px' }}>
                                    Generated on {new Date().toLocaleDateString()}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Page>
            </PDFGenerator>

            <button
                onClick={handleDownload}
                disabled={loading}
                style={{
                    marginTop: '16px',
                    padding: '10px 24px',
                    background: loading ? '#6b7280' : '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'default' : 'pointer',
                    fontWeight: 'bold',
                }}
            >
                {loading ? 'Generating...' : 'Download Invoice PDF'}
            </button>
        </div>
    );
}

export default function InvoiceExample() {
    return (
        <PDFProvider>
            <InvoiceExampleContent />
        </PDFProvider>
    );
}