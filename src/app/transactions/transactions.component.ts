import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from 'primeng/api';
import { Table } from 'primeng/table';

import { Transaction } from '@app/transactions/Transaction';
import { TransactionsService } from '@app/services/transactions.service';
import { LocationsModalComponent } from '@app/shared/locations-modal/locations-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from '@app/transactions/Invoice';
import { InvoicesService } from '@app/services/invoices.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    @Input() account: number;
    @ViewChild('d', { static: true }) d: Table;
    transactions: Transaction[] = [];
    cols: any[];
    invoices: Invoice[] = [];
    invoicesCols: any[];

    locationsPen: string[];

    model: NgbDateStruct;
    selectedDate: string;
    hoveredDate: NgbDate | null = null;
    fromDate: NgbDate | null;
    toDate: NgbDate | null;
    selectedFrom: string;
    selectedTo: string;
    totalAmountDue: number;
    statuses: string[];
    locations: string[];

    constructor(private transactionsService: TransactionsService, private modalService: NgbModal, private invoicesService: InvoicesService, private filterService: FilterService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    openModal() {
        this.modalService.open(LocationsModalComponent, { size: 'lg' });
    }
    ngOnInit(): void {
        this.transactionsService.getTransactions().subscribe((transactions: Transaction[]) => (this.transactions = transactions));
        this.invoicesService.getInvoices().subscribe((invoices: Invoice[]) => {
           this.invoices = invoices;
            this.totalAmountDue = this.invoices.map(item => item.amountDue).reduce((acc, amount) => acc + amount, 0);
            this.statuses = [...new Set(this.invoices.map(i => i.status))];
            this.locations = [...new Set(this.invoices.map(i => i.location))];
        });

        this.cols = [
            { field: 'jobID', header: 'Job ID', icon: false },
            { field: 'location', header: 'Location', icon: true },
            { field: 'account', header: 'Account', icon: false },
            { field: 'billToAcct', header: 'Bill to ACCT', icon: false },
            { field: 'pendingAmountDue', header: 'Pending Amount DUE', icon: false },
            { field: 'lastActivityDate', header: 'Last Activity Date', icon: false }
        ];
        this.invoicesCols = [
            { field: 'invoiceDate', header: 'Invoice Date', icon: false },
            { field: 'invoice', header: 'Invoice', icon: false },
            { field: 'jobID', header: 'Job ID', icon: false },
            { field: 'location', header: 'Location', icon: true },
            { field: 'account', header: 'Account', icon: false },
            { field: 'billToAcct', header: 'Bill to ACCT', icon: false },
            { field: 'paymentDueDate', header: 'Payment DUE Date', icon: false },
            { field: 'amountDue', header: 'Amount Due', icon: false },
            { field: 'status', header: 'Status', icon: false }
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

    onDateSelection(date: NgbDate, table) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
        this.selectedFrom = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
        if (this.toDate !== null) {
            this.selectedTo = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
        }
        table.filter([this.selectedFrom, this.selectedTo], 'invoiceDate', 'isBetween');
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

    filterStatus(status, table) {
        this.invoices.filter(i => {
            if (i.status === status) {
                table.filterGlobal(status, 'equals');
            } else if (status === '') {
                table.filterGlobal(status, 'not-equals');
            }
        });
    }

    filterLocationInv(location, table) {
        this.invoices.filter(i => {
            if (i.location === location) {
                table.filterGlobal(location, 'equals');
            } else if (location === '') {
                table.filterGlobal(location, 'not-equals');
            }
        });
    }
}

