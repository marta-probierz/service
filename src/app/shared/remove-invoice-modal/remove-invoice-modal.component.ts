import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { StoreService } from '@app/services/store.service';


@Component({
    selector: 'app-remove-invoice-modal',
    templateUrl: './remove-invoice-modal.component.html',
})

export class RemoveInvoiceModalComponent implements OnInit {
    closeResult = '';
    invoices: any;
    id: string;

    constructor(public activeModal: NgbActiveModal, private storeService: StoreService) { }

    ngOnInit(): void {
        this.storeService.fetchInvoices();
        this.invoices = this.storeService.invoices;
    }

    onDeleteInvoice() {
        this.storeService.deleteInvoice(this.invoices.id);
        // this.storeService.deleteInvoice(invoice.id).subscribe(() => {
        //     this.invoices = this.invoices.filter(item => item.id !== invoice.id);
        // });
    }
}
