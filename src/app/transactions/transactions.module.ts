import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared/shared.module';
import { TransactionsComponent } from './transactions.component';
import {TransactionsRoutingModule} from './transactions-routing.module';

@NgModule({
    imports: [TransactionsRoutingModule, SharedModule, NgbModule, TableModule],
    declarations: [TransactionsComponent],
    exports: [],
})
export class TransactionsModule {}
