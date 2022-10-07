import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators} from '@angular/forms';
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
    editInvoiceForm: FormGroup;
    invoiceDate: FormControl;
    jobID: FormControl;
    location: FormControl;
    account: FormControl;
    billToAcct: FormControl;
    paymentDueDate: FormControl;
    amountDue: FormControl;
    status: FormControl;

    // editInvoiceForm = new FormGroup({
    //     invoiceDate: new FormControl(),
    //     invoice: new FormControl(),
    //     jobID: new FormControl(),
    //     location: new FormControl(),
    //     account: new FormControl(),
    //     billToAcct: new FormControl(),
    //     paymentDueDate: new FormControl(),
    //     amountDue: new FormControl(),
    //     status: new FormControl()
    // });

    constructor(public activeModal: NgbActiveModal, private storeService: StoreService) { }

    ngOnInit(): void {
        this.storeService.fetchLocations();
        this.locations = this.storeService.locations;

        this.editInvoiceForm = new FormGroup({
            invoiceDate: new FormControl(this.invoiceDate, Validators.required),
            invoice: new FormControl(this.invoice, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            jobID: new FormControl(this.jobID, [Validators.required, Validators.minLength(3)]),
            location: new FormControl(this.location, Validators.required),
            account: new FormControl(this.account, [Validators.required, Validators.minLength(3)]),
            billToAcct: new FormControl(this.billToAcct, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            paymentDueDate: new FormControl(this.paymentDueDate, Validators.required),
            amountDue: new FormControl(this.amountDue, [Validators.required, Validators.pattern(/^[0-9\.\,]+$/)]),
            status: new FormControl(this.status, Validators.required),
        });

        this.editInvoiceForm.patchValue(this.invoice);
    }

    onEdit() {
        this.storeService.editInvoice(this.invoice.id, this.editInvoiceForm.value).subscribe(() => {
            this.activeModal.close(this.invoice);
        });
    }
}
