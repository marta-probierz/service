import { Component, Input, OnInit } from '@angular/core';

import { Invoice } from '@app/transactions/Invoice';
import { InvoicesService } from '@app/services/invoices.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() products = [];
  invoices: Invoice[] = [];
  totalAmountDue: number;
  isReadMore = true;

  constructor(private invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.invoicesService.getInvoices().subscribe((invoices: Invoice[]) => {
      this.invoices = invoices;
      this.totalAmountDue = this.invoices.map(item => item.amountDue).reduce((acc, amount) => +acc + +amount, 0);
    });
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }
}
