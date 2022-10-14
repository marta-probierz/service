import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';

import { SharedModule } from '@app/shared/shared.module';
import { Item2Component } from '@app/item2/item2.component';
import { Item2RoutingModule } from '@app/item2/item2-routing.module';
import { ProductsComponent } from './products/products.component';
import { ModalComponent } from './modal/modal.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { AddNewComponent } from './add-new/add-new.component';

@NgModule({
    imports: [Item2RoutingModule, SharedModule, NgbModule, CardModule],
    declarations: [Item2Component, ProductsComponent, ModalComponent, ProductCardComponent, AddNewComponent],
    exports: []
})
export class Item2Module {}
