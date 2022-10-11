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

    constructor(public activeModal: NgbActiveModal, private storeService: StoreService, private currencyPipe: CurrencyPipe) { }

    ngOnInit(): void {
        this.storeService.fetchLocations();
        this.locations = this.storeService.locations;
        this.amountDue = new FormControl(this.currencyPipe.transform(this.invoice.amountDue.toString(), 'USD', 'symbol', '1.2-2'), [
            Validators.required,
            Validators.pattern(/^[0-9\.\,\-\$]+$/),
        ]);

        this.editInvoiceForm = new FormGroup({
            invoiceDate: new FormControl(this.invoiceDate, Validators.required),
            invoice: new FormControl(this.invoice, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            jobID: new FormControl(this.jobID, [Validators.required, Validators.minLength(3)]),
            location: new FormControl(this.location, Validators.required),
            account: new FormControl(this.account, [Validators.required, Validators.minLength(3)]),
            billToAcct: new FormControl(this.billToAcct, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            paymentDueDate: new FormControl(this.paymentDueDate, Validators.required),
            amountDue: this.amountDue,
            status: new FormControl(this.status, Validators.required),
        });

        this.amountDue.valueChanges.subscribe((val: string) => {
            this.amountDue.setValue(this.currencyPipe.transform(val.toString().replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0'), { emitEvent: false });
        });

        this.editInvoiceForm.patchValue(this.invoice);
    }

    onEdit() {
        if (this.editInvoiceForm.value.amountDue) {
            this.editInvoiceForm.value.amountDue = parseInt(this.editInvoiceForm.value.amountDue.slice(1).replace(/,/g, ''), 10);
            this.storeService.editInvoice(this.invoice.id, this.editInvoiceForm.value).subscribe(() => {
                this.activeModal.close(this.invoice);
            });
        }
    }

    increment() {
        const value = Number(this.amountDue.value.replace(/[^0-9\.-]+/g, '')) + 1;
        this.amountDue.setValue(value.toString());
    }

    decrement() {
        const value = Number(this.amountDue.value.replace(/[^0-9\.-]+/g, '')) - 1;
        this.amountDue.setValue(value.toString());
    }
}
