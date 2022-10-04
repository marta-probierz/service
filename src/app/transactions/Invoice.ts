export interface Invoice {
    id?: number;
    date: string;
    invoice: number;
    jobID: string;
    location: string;
    account: string;
    billToAcct: number;
    paymentDueDate: string;
    amountDue: number;
    status: string;
}
