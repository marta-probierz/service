import { Detail } from '@app/transactions/detail/Detail';

export interface Transaction {
    id?: number;
    jobID: string;
    location: string;
    account: string;
    billToAcct: string;
    pendingAmountDue: string;
    lastActivityDate: string;
    detail: Detail;
};
