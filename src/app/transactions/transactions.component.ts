import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    @ViewChild(NgbNav, { static: true }) ngbNav: NgbNav;
    active: number;
    fragment: string;

    // @Output() newItemEvent = new EventEmitter<NgbNav>();
    // // addNewItem(value: any) {
    // //     this.newItemEvent.emit(value);
    // // }

    // links = [
    //     { title: 'Pending Transactions', fragment: 'pending-transactions' },
    //     { title: 'Invoices', fragment: 'invoices' },
    //     { title: 'Invoice Summaries by Date', fragment: 'invoice-summaries-by-date' }
    // ];

    constructor(public route: ActivatedRoute) { }

    ngOnInit(): void {
        // this.route.fragment.subscribe(fragment => {
        //     console.log(`ActivatedRoute.fragment: ${fragment} (typeof: ${typeof fragment})`);
        //     console.log(`window.location.hash: ${window.location.hash}`);
        //     this.fragment = fragment;
        // });
        // console.log(this.ngbNav.activeIdChange);
        // this.active = 2;
    }
}
