import {Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Invoice } from '@app/transactions/Invoice';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  closeResult = '';
  @Input() products: Invoice;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }
}
