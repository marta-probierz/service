import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-invoice',
    templateUrl: './new-invoice.component.html',
})
export class NewInvoiceComponent implements OnInit {
    newInvoiceForm = new FormGroup({
        invoiceDate: new FormControl('', Validators.required),
        invoice: new FormControl('', Validators.required),
        jobID: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
        account: new FormControl('', Validators.required),
        billToAcct: new FormControl('', Validators.required),
        paymentDueDate: new FormControl('', Validators.required),
        amountDue: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
    });

    constructor() {}

    ngOnInit() {}

    onSubmit() {
        console.log(this.newInvoiceForm.value);
    }
}
