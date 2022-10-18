import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { StoreService } from '@app/services/store.service';
import { Invoice } from '@app/transactions/Invoice';
import { ProductsComponent } from '@app/item2/products/products.component';
import { ProductCardComponent } from '@app/item2/product-card/product-card.component';


@Component({
  selector: 'app-item2',
  templateUrl: './item2.component.html'
})
export class Item2Component implements OnInit, AfterViewInit {
  @ViewChild(ProductsComponent, { static: false }) titleFromProducts: ProductsComponent;
  @ViewChild('btn', { static: false }) btn: ElementRef;
  @ViewChildren(ProductCardComponent) val: QueryList<ProductCardComponent>;
  selectedProduct: Invoice;
  invoices: Observable<any>;
  toDisplay = true;
  showAddNew = false;
  editStatusForm: FormGroup;
  status: FormControl;
  selectedID: number;
  title: string;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.fetchInvoices();
    this.invoices = this.storeService.invoices;

    this.editStatusForm = new FormGroup({
      status: new FormControl(this.status),
    });
  }

  ngAfterViewInit() {
    this.titleFromProducts.title = 'Lorem Ipsum:';
    this.btn.nativeElement.className = 'btn btn-primary';
    this.val.toArray().map((e: ProductCardComponent, index: number) => index % 2 === 0 ? e.title = 'Hi!' : e.title = 'Hello!');
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
      this.ngOnInit();
    });
  }
}
