import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '@app/transactions/Invoice';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() products = [];
  @Input() invoices: Invoice;

  constructor() { }

  ngOnInit(): void {

  }

}
