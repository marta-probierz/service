import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { StoreService } from '@app/services/store.service';
import { Invoice } from '@app/transactions/Invoice';


@Component({
    selector: 'app-remove-invoice',
    templateUrl: './remove-invoice.component.html',
})

export class RemoveInvoiceComponent implements OnInit {
    closeResult = '';
    invoice: Invoice;

    constructor(public activeModal: NgbActiveModal, private storeService: StoreService) { }

    ngOnInit(): void { }

    onDeleteInvoice() {
        this.storeService.deleteInvoice(this.invoice.id).subscribe(() => {
            this.activeModal.close(this.invoice);
        });
    }
}
