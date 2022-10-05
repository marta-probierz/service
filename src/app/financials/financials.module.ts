import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { FinancialsRoutingModule } from './financials-routing.module';
import { FinancialsComponent } from '@app/financials/financials.component';
import { NewInvoiceComponent } from '@app/financials/new-invoice/new-invoice.component';

@NgModule({
    imports: [SharedModule, FinancialsRoutingModule, ReactiveFormsModule],
    declarations: [FinancialsComponent, NewInvoiceComponent],
    exports: [],
})
export class FinancialsModule {}
