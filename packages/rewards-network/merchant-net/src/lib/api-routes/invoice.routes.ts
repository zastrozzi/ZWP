export const invoiceLineRoutes = (path: string) => {
    const segment = 'lines'
    return {
        listInvoiceLines: () => `${path}/${segment}`,
        getInvoiceLine: (invoiceLineId: string) => `${path}/${segment}/${invoiceLineId}`,
        updateInvoiceLine: (invoiceLineId: string) => `${path}/${segment}/${invoiceLineId}`,
        deleteInvoiceLine: (invoiceLineId: string) => `${path}/${segment}/${invoiceLineId}`
    }
}

export const invoiceLineRoutesForInvoice = (path: string) => {
    const segment = 'lines'
    return {
        createInvoiceLine: () => `${path}/${segment}`,
        listInvoiceLines: () => `${path}/${segment}`
    }
}

export const invoiceLineRoutesForMerchant = (path: string) => {
    const segment = 'lines'
    return {
        listInvoiceLines: () => `${path}/${segment}`
    }
}

export const invoicePaymentRoutes = (path: string) => {
    const segment = 'payments'
    return {
        listInvoicePayments: () => `${path}/${segment}`,
        getInvoicePayment: (invoicePaymentId: string) => `${path}/${segment}/${invoicePaymentId}`,
        updateInvoicePayment: (invoicePaymentId: string) => `${path}/${segment}/${invoicePaymentId}`,
        deleteInvoicePayment: (invoicePaymentId: string) => `${path}/${segment}/${invoicePaymentId}`
    }
}

export const invoicePaymentRoutesForInvoice = (path: string) => {
    const segment = 'payments'
    return {
        createInvoicePayment: () => `${path}/${segment}`,
        listInvoicePayments: () => `${path}/${segment}`
    }
}

export const invoicePaymentRoutesForMerchant = (path: string) => {
    const segment = 'payments'
    return {
        listInvoicePayments: () => `${path}/${segment}`
    }
}

export const invoiceRoutes = (path: string) => {
    const segment = 'invoices'
    return {
        listInvoices: () => `${path}/${segment}`,
        getInvoice: (invoiceId: string) => `${path}/${segment}/${invoiceId}`,
        updateInvoice: (invoiceId: string) => `${path}/${segment}/${invoiceId}`,
        deleteInvoice: (invoiceId: string) => `${path}/${segment}/${invoiceId}`,
        invoiceLineRoutesForInvoice: (invoiceId: string) => invoiceLineRoutesForInvoice(`${path}/${segment}/${invoiceId}`),
        invoicePaymentRoutesForInvoice: (invoiceId: string) => invoicePaymentRoutesForInvoice(`${path}/${segment}/${invoiceId}`)
    }
}

export const invoiceRoutesForMerchant = (path: string) => {
    const segment = 'invoices'
    return {
        createInvoice: () => `${path}/${segment}`,
        listInvoices: () => `${path}/${segment}`,
        invoiceLineRoutesForMerchant: () => invoiceLineRoutesForMerchant(`${path}/${segment}`),
        invoicePaymentRoutesForMerchant: () => invoicePaymentRoutesForMerchant(`${path}/${segment}`)
    }
}