export interface Transactions {
    id?: number;
    jobID: string;
    location: string;
    account: string;
    billToAcct: string;
    pendingAmountDue: string;
    lastActivityDate: string;
};
