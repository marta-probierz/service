import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { StoreService } from '@app/services/store.service';


@Component({
    selector: 'app-edit-invoice-modal',
    templateUrl: './edit-invoice-modal.component.html',
})

export class EditInvoiceModalComponent implements OnInit {
    closeResult = '';
    locations: Observable<any>;

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

    constructor(public activeModal: NgbActiveModal, private storeService: StoreService) { }

    ngOnInit(): void {
        this.storeService.fetchLocations();
        this.locations = this.storeService.locations;
    }
}
