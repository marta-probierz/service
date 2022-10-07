import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { StoreService } from '@app/services/store.service';
import { Invoice } from '@app/transactions/Invoice';


@Component({
    selector: 'app-edit-invoice',
    templateUrl: './edit-invoice.component.html',
})

export class EditInvoiceComponent implements OnInit {
    closeResult = '';
    locations: Observable<any>;
    invoice: Invoice;
    invoices: Observable<any>;

    editInvoiceForm = new FormGroup({
        invoiceDate: new FormControl(),
        invoice: new FormControl(),
        jobID: new FormControl(),
        location: new FormControl(),
        account: new FormControl(),
        billToAcct: new FormControl(),
        paymentDueDate: new FormControl(),
        amountDue: new FormControl(),
        status: new FormControl()
    });

    constructor(public activeModal: NgbActiveModal, private storeService: StoreService) { }

    ngOnInit(): void {
        this.storeService.fetchLocations();
        this.locations = this.storeService.locations;
        this.editInvoiceForm.patchValue(this.invoice);
    }

    onEdit() {
        this.storeService.editInvoice(this.invoice.id, this.editInvoiceForm.value).subscribe(() => {
            this.activeModal.close(this.invoice);
        });
    }
}
