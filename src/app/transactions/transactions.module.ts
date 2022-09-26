import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';
import { TransactionsComponent } from './transactions.component';
import {TransactionsRoutingModule} from './transactions-routing.module';

@NgModule({
    imports: [TransactionsRoutingModule, SharedModule, NgbModule, TableModule, HttpClientModule],
    declarations: [TransactionsComponent],
    exports: [],
})
export class TransactionsModule {}
