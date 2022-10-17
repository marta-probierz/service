import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from '@app/shared/footer/footer.component';
import { HeaderComponent } from '@app/shared/header/header.component';
import { TransactionsComponent } from './transactions.component';
import { DetailComponent } from '@app/transactions/detail/detail.component';
import { InvoicesResolverService } from '@app/transactions/invoices/invoices.resolver';
import { TransactionsResolverService } from '@app/transactions/transactions.resolver';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'transactions/:id',
                component: DetailComponent,
                resolve: {
                    transactions: TransactionsResolverService
                }
            },
            {
                path: '',
                outlet: 'header',
                component: HeaderComponent,
            },
            {
                path: '',
                component: TransactionsComponent,
                resolve: {
                    invoices: InvoicesResolverService,
                    transactions: TransactionsResolverService
                }
            },
            {
                path: '',
                outlet: 'footer',
                component: FooterComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TransactionsRoutingModule {}
