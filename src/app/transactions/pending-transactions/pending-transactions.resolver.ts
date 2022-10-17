import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionsService } from '@app/services/transactions.service';
import { Transaction } from '@app/transactions/Transaction';


@Injectable({
    providedIn: 'root'
})
export class TransactionsResolverService implements Resolve<Transaction> {

    constructor(private transactionsService: TransactionsService) { }

    resolve(): Observable<any> {
        return this.transactionsService.getTransactions();
    }
}
