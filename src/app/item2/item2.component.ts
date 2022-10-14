import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { StoreService } from '@app/services/store.service';
import { Invoice } from '@app/transactions/Invoice';


@Component({
  selector: 'app-item2',
  templateUrl: './item2.component.html'
})
export class Item2Component implements OnInit {
  selectedProduct: Invoice;
  invoices: Observable<any>;
  toDisplay = true;
  showAddNew = false;
  editStatusForm: FormGroup;
  status: FormControl;
  selectedID: number;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.fetchInvoices();
    this.invoices = this.storeService.invoices;

    this.editStatusForm = new FormGroup({
      status: new FormControl(this.status),
    });
  }

  onSelectedProduct(product) {
    this.selectedProduct = product;
    this.selectedID = this.selectedProduct.id;
    this.toDisplay = true;
  }

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }

  toggleAddNew() {
    this.showAddNew = !this.showAddNew;
  }

  onEdit() {
    this.storeService.editInvoice(this.selectedID, this.editStatusForm.value).subscribe(() => {
      this.selectedProduct = this.editStatusForm.value;
    });
  }
}
