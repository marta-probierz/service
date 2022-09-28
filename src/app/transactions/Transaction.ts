import { Detail } from '@app/transactions/detail/Detail';

export interface Transaction {
    id?: number;
    jobID: string;
    location: string;
    account: string;
    billToAcct: number;
    pendingAmountDue: number;
    lastActivityDate: string;
    detail: Detail[];
};
