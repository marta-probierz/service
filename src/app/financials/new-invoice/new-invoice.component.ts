import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { StoreService } from '@app/services/store.service';


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
    locations: Observable<Object>;

    constructor(private storeService: StoreService) {}

    ngOnInit() {
        this.storeService.fetchInvoices();
        this.storeService.fetchLocations();
        this.locations = this.storeService.locations;
    }

    onSubmit() {
        this.storeService.postInvoice(this.newInvoiceForm.value).subscribe(() => {
            this.storeService.fetchInvoices();
            },
            (err) => console.log(err));
    }
}
