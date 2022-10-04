import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialsComponent } from '@app/financials/financials.component';

import { HeaderComponent } from '@app/shared/header/header.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { NewInvoiceComponent } from '@app/financials/new-invoice/new-invoice.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'financials/new-invoice',
                component: NewInvoiceComponent,
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
