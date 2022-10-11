import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { StoreService } from '@app/services/store.service';


@Component({
    selector: 'app-new-invoice',
    templateUrl: './new-invoice.component.html',
    styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {
    locations: Observable<any>;
    newInvoiceForm: FormGroup;
    invoiceDate: FormControl;
    invoice: FormControl;
    jobID: FormControl;
    location: FormControl;
    account: FormControl;
    billToAcct: FormControl;
    paymentDueDate: FormControl;
    amountDue: FormControl;
    status: FormControl;
    newAmountDue: number;

    constructor(private storeService: StoreService) {}

    ngOnInit() {
        this.storeService.fetchInvoices();
        this.storeService.fetchLocations();
        this.locations = this.storeService.locations;

        this.newInvoiceForm = new FormGroup({
            invoiceDate: new FormControl(this.invoiceDate, Validators.required),
            invoice: new FormControl(this.invoice, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            jobID: new FormControl(this.jobID, [Validators.required, Validators.minLength(3)]),
            location: new FormControl(this.location, Validators.required),
            account: new FormControl(this.account, [Validators.required, Validators.minLength(3)]),
            billToAcct: new FormControl(this.billToAcct, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            paymentDueDate: new FormControl(this.paymentDueDate, Validators.required),
            amountDue: new FormControl(this.amountDue, [Validators.required, Validators.pattern(/^[0-9\.\,\-]+$/)]),
            status: new FormControl(this.status, Validators.required),
        });
    }

    onSubmit() {
        this.storeService.postInvoice(this.newInvoiceForm.value);
    }

    increment() {
        this.newInvoiceForm.value.amountDue = Number(this.newInvoiceForm.value.amountDue);
        this.newInvoiceForm.value.amountDue++;
        this.newInvoiceForm.patchValue(this.newInvoiceForm.value);
    }

    decrement() {
        this.newInvoiceForm.value.amountDue = Number(this.newInvoiceForm.value.amountDue);
        this.newInvoiceForm.value.amountDue--;
        this.newInvoiceForm.patchValue(this.newInvoiceForm.value);
    }
}
