import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { DetailComponent } from './detail/detail.component';
import { RemoveInvoiceComponent } from '@app/transactions/modals/remove-invoice/remove-invoice.component';
import { EditInvoiceComponent } from '@app/transactions/modals/edit-invoice/edit-invoice.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PendingTransactionsComponent } from './pending-transactions/pending-transactions.component';
import { InvoiceSummariesByDateComponent } from './invoice-summaries-by-date/invoice-summaries-by-date.component';

@NgModule({
    imports: [TransactionsRoutingModule, SharedModule, NgbModule, TableModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    declarations: [TransactionsComponent, DetailComponent, RemoveInvoiceComponent, EditInvoiceComponent, InvoicesComponent, PendingTransactionsComponent, InvoiceSummariesByDateComponent],
    exports: [],
    providers: [CurrencyPipe]
})
export class TransactionsModule {}
