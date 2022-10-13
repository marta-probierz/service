import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '@app/item2/modal/modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  @Input() products = [];
  @Output() onSelected = new EventEmitter<any>();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  onSelectedProductDetail(product) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.products = product;
  }

  onSelectedProductShow(product) {
    console.log(product);
    this.onSelected.emit(product);
  }
}
