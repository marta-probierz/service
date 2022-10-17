import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionsService } from '@app/services/transactions.service';
import { Detail } from '@app/transactions/detail/Detail';


@Injectable({
    providedIn: 'root'
})
export class TransactionsDetailByIDResolverService implements Resolve<Detail> {

    constructor(private transactionsService: TransactionsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.transactionsService.getTransactionDetailByID(route.params?.id);
    }
}
