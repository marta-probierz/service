import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { HeaderComponent } from '@app/shared/header/header.component';
import { TransactionsComponent } from './transactions.component';
import { DetailComponent} from '@app/transactions/detail/detail.component';
import {PendingTransactionsComponent} from '@app/transactions/pending-transactions/pending-transactions.component';
import {InvoicesComponent} from '@app/transactions/invoices/invoices.component';
import {InvoiceSummariesByDateComponent} from '@app/transactions/invoice-summaries-by-date/invoice-summaries-by-date.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'transactions/:id',
                component: DetailComponent,
            },
            // {
            //     path: 'transactions#pending-transactions',
            //     component: PendingTransactionsComponent,
            // },
            // {
            //     path: 'invoices',
            //     component: InvoicesComponent,
            // },
            // {
            //     path: '.invoice-summaries-by-date',
            //     component: InvoiceSummariesByDateComponent,
            // },
            {
                path: '',
                outlet: 'header',
                component: HeaderComponent,
            },
            {
                path: '',
                component: TransactionsComponent,
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
