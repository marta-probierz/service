import { Component, OnInit } from '@angular/core';

import { TransactionsService } from '@app/services/transactions.service';
import { Detail } from '@app/transactions/detail/Detail';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  transactionsDetail: Detail[] = [];
  cols: any[];

  constructor(private transactionsService: TransactionsService) { }
  ngOnInit() {
    this.transactionsService.getTransactions().subscribe((detail: Detail[]) => (this.transactionsDetail = detail));

    this.cols = [
      { field: 'date', header: 'Activity Date', icon: true },
      { field: 'sortCode', header: 'Sort Code', icon: true },
      { field: 'resource', header: 'Resource', icon: false },
      { field: 'qty', header: 'Qty', icon: true },
      { field: 'rate', header: 'Rate', icon: true },
      { field: 'fee', header: 'Fee', icon: true },
      { field: 'postage', header: 'Postage', icon: true },
      { field: 'adjFee', header: 'Adj Fee', icon: true },
      { field: 'adjPostage', header: 'Adj Postage', icon: true }
    ];
  }
}
