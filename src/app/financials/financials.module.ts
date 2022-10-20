import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { FinancialsRoutingModule } from './financials-routing.module';
import { FinancialsComponent } from '@app/financials/financials.component';
import { NewInvoiceComponent } from '@app/financials/new-invoice/new-invoice.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
    imports: [SharedModule, FinancialsRoutingModule, ReactiveFormsModule],
    declarations: [FinancialsComponent, NewInvoiceComponent, ChartComponent],
    exports: [],
})
export class FinancialsModule {}
