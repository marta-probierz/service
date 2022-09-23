import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    @Input() account: number;
    constructor() {}

    ngOnInit() {}
}

