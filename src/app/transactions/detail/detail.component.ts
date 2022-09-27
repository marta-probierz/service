import { Component, OnInit } from '@angular/core';

import { TransactionsService } from '@app/services/transactions.service';
import { Detail } from '@app/transactions/detail/Detail';
import {ActivatedRoute} from '@angular/router';
import {Transactions} from '@app/transactions/Transactions';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  transactionsDetail: Detail;
  cols: any[];
  id: string;

  constructor(private transactionsService: TransactionsService, private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.id = param.id;
    });
  }
  ngOnInit() {
    this.transactionsService.getTransactions().subscribe((detail: Detail[]) => {
      this.transactionsDetail = detail.find((item: any) => item.id === parseInt(this.id, 10));
      console.log(this.transactionsDetail);
    });

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
