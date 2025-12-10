export enum EventType {
    paymentUpdated = "payment:updated",
    mandatePaymentUpdated = "mandate-payment:updated",
    
    // ACCOUNT
    accountCreated = "account:created",
    accountUpdated = "account:updated",
    
    // REFRESH
    refreshFinished = "refresh:finished",
    
    // TRANSACTIONS
    accountTransactionsModified = "account-transactions:modified",
    accountTransactionsDeleted = "account-transactions:deleted",
    accountBookedTransactionsModified = "account-booked-transactions:modified",
    reportsGenerationCompleted = "reports-generation:completed",
}