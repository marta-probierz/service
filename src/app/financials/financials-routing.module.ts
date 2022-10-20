import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialsComponent } from '@app/financials/financials.component';

import { HeaderComponent } from '@app/shared/header/header.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { NewInvoiceComponent } from '@app/financials/new-invoice/new-invoice.component';
import { ChartComponent } from '@app/financials/chart/chart.component';
import { InvoicesResolverService } from '@app/transactions/invoices/invoices.resolver';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'financials/new-invoice',
                component: NewInvoiceComponent,
            },
            {
                path: 'financials/chart',
                component: ChartComponent,
                resolve: {
                    invoices: InvoicesResolverService
                }
            },
            {
                path: '',
                outlet: 'header',
                component: HeaderComponent
            },
            {
                path: '',
                component: FinancialsComponent
            },
            {
                path: '',
                outlet: 'footer',
                component: FooterComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancialsRoutingModule {}
