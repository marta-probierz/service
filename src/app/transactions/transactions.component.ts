import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    active: number;

    tabs = [
        {
            id: 1,
            fragment: 'pending-transactions',
        },
        {
            id: 2,
            fragment: 'invoices',
        },
        {
            id: 3,
            fragment: 'invoice-summaries-by-date'
        }
    ];

    constructor(public route: ActivatedRoute) {
        this.route.fragment.subscribe((fragment: string) => {
            if (fragment) {
                this.active = this.tabs.find((tab: {fragment: string, id: number}) => tab.fragment === fragment).id;
            }
        });
    }

    ngOnInit(): void { }

    onNavChange(activeId: number) {
        const fragment = this.tabs.find((tab: {fragment: string, id: number}) => tab.id === activeId)?.fragment;
        if (fragment) {
            window.location.hash = fragment;
        }
    }
}
