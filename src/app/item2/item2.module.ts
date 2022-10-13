import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared/shared.module';
import { Item2Component } from '@app/item2/item2.component';
import { Item2RoutingModule } from '@app/item2/item2-routing.module';
import { ProductsComponent } from './products/products.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    imports: [Item2RoutingModule, SharedModule, NgbModule],
    declarations: [Item2Component, ProductsComponent, ModalComponent],
    exports: []
})
export class Item2Module {}
