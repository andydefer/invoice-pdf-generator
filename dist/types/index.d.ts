export interface Company {
    name: string;
    address: string;
    city: string;
    siret: string;
    email: string;
    phone: string;
    logo?: string;
}
export interface Client {
    name: string;
    company: string;
    address: string;
    city: string;
    email: string;
}
export interface LineItem {
    description: string;
    quantity: number;
    unitPrice: number;
}
export interface InvoiceData {
    number: string;
    date: string;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
    company: Company;
    client: Client;
    items: LineItem[];
    discount: number;
    tax: number;
}
export interface PDFOptions {
    filename?: string;
    scale?: number;
    backgroundColor?: string;
    margin?: number;
    format?: 'a4' | 'a3' | 'letter' | 'legal' | number[];
    orientation?: 'portrait' | 'landscape';
}
export interface TemplateOptions {
    showLogo?: boolean;
    showPaymentInfo?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
}
