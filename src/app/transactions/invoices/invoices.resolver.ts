import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { InvoicesService } from '@app/services/invoices.service';
import { Invoice } from '@app/transactions/Invoice';


@Injectable({
    providedIn: 'root'
})
export class InvoicesResolverService implements Resolve<Invoice[]> {

    constructor(private invoicesService: InvoicesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.invoicesService.getInvoices();
    }
}
