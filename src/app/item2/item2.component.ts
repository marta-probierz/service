import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreService } from '@app/services/store.service';
import { Invoice } from '@app/transactions/Invoice';


@Component({
  selector: 'app-item2',
  templateUrl: './item2.component.html'
})
export class Item2Component implements OnInit {
  selectedProduct: Invoice;
  invoices: Observable<any>;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.fetchInvoices();
    this.invoices = this.storeService.invoices;
  }

  onSelectedProduct(product) {
    this.selectedProduct = product;
  }
}
