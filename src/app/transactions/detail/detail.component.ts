import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from 'primeng/api';

import { TransactionsService } from '@app/services/transactions.service';
import { Detail } from '@app/transactions/detail/Detail';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/transactions/Transaction';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  transactionsDetail: Detail[];
  cols: any[];
  id: string;
  totalFee: number;
  totalPostage: number;
  totalAdjFee: number;
  totalAdjPostage: number;
  total: number;
  model: NgbDateStruct;
  selectedDate: string;

  constructor(private transactionsService: TransactionsService, private route: ActivatedRoute, private filterService: FilterService) {
    this.route.params.subscribe((param) => {
      this.id = param.id;
    });
  }
  ngOnInit() {
    this.transactionsService.getTransactions().subscribe((transactions: Transaction[]) => {
      this.transactionsDetail = transactions.find((item: Transaction) => item.id === parseInt(this.id, 10))?.detail;
      this.totalFee = this.transactionsDetail.map(item => item.fee).reduce((acc, amount) => acc + amount, 0);
      this.totalPostage = this.transactionsDetail.map(item => item.postage).reduce((acc, amount) => acc + amount, 0);
      this.totalAdjFee = this.transactionsDetail.map(item => item.adjFee).reduce((acc, amount) => acc + amount, 0);
      this.totalAdjPostage = this.transactionsDetail.map(item => item.adjPostage).reduce((acc, amount) => acc + amount, 0);
      this.total = this.totalFee + this.totalPostage + this.totalAdjFee + this.totalAdjPostage;
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

    // const equals = 'custom-equals';
    //
    // this.filterService.register(
    //     equals, (value, filter): boolean => {
    //       if (filter === undefined || filter === null || filter.trim() === '') {
    //         return true;
    //       }
    //
    //       if (value === undefined || value === null) {
    //         return false;
    //       }
    //
    //       return value.toString() === filter.toString();
    //     }
    // );
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) { result = -1; }
      else if (value1 != null && value2 == null) { result = 1; }
      else if (value1 == null && value2 == null) { result = 0; }
      else if (typeof value1 === 'string' && typeof value2 === 'string') { result = value1.localeCompare(value2); }
      else { result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0; }

      return (event.order * result);
    });
  }
  onDateSelect(date) {
    this.selectedDate = date.year + '-' + date.month + '-' + date.day;
    // console.log(this.filterService.filters.equals(this.selectedDate, '2022-9-29'));
  }
}
