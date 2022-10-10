import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

import { StoreService } from '@app/services/store.service';
import { Invoice } from '@app/transactions/Invoice';


@Component({
    selector: 'app-edit-invoice',
    templateUrl: './edit-invoice.component.html',
    styleUrls: ['./edit-invoice.component.scss']
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
    newAmountDue: number;

    constructor(public activeModal: NgbActiveModal, private storeService: StoreService, private currencyPipe: CurrencyPipe) { }

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
            amountDue: new FormControl(this.amountDue, [Validators.required, Validators.pattern(/^[0-9\.\,\-\$]+$/)]),
            status: new FormControl(this.status, Validators.required),
        });

        this.editInvoiceForm.patchValue(this.invoice);


        this.editInvoiceForm.valueChanges.subscribe(form => {
            if (form.amountDue) {
                this.editInvoiceForm.patchValue({
                    amountDue: this.currencyPipe.transform(form.amountDue.replace(/\D/g, '').replace(/^0+/, ''), 'USD', '', '1.0-0')
                }, {emitEvent: false});
            }
        });
    }

    onEdit() {
        this.storeService.editInvoice(this.invoice.id, this.editInvoiceForm.value).subscribe(() => {
            this.activeModal.close(this.invoice);
        });
    }

    increment() {
        this.editInvoiceForm.value.amountDue = Number(this.editInvoiceForm.value.amountDue);
        this.editInvoiceForm.value.amountDue++;
        this.editInvoiceForm.patchValue(this.editInvoiceForm.value);
    }

    decrement() {
        this.editInvoiceForm.value.amountDue = Number(this.editInvoiceForm.value.amountDue);
        this.editInvoiceForm.value.amountDue--;
        this.editInvoiceForm.patchValue(this.editInvoiceForm.value);
    }
}
