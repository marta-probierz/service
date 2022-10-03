import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from 'primeng/api';
import { Table } from 'primeng/table';

import { TransactionsService } from '@app/services/transactions.service';
import { Detail } from '@app/transactions/detail/Detail';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/transactions/Transaction';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  @ViewChild('dt', { static: true }) dt: Table;
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
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  selectedDateFrom: string;
  selectedDateTo: string;

  constructor(private transactionsService: TransactionsService, private route: ActivatedRoute, private filterService: FilterService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.route.params.subscribe((param) => {
      this.id = param.id;
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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

    this.filterService.register(
        'isBetween', (value, filter): boolean => {
          if (filter === undefined || filter === null) {
            return true;
          }
          if (value === undefined || value === null) {
            return false;
          }
          return value >= filter[0] && value <= filter[1];
        });
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
    this.dt.filterGlobal(this.selectedDate, 'contains');
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.selectedDateFrom = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    if (this.toDate !== null) {
      this.selectedDateTo = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
    }
    this.dt.filter([this.selectedDateFrom, this.selectedDateTo], 'date', 'isBetween');
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
