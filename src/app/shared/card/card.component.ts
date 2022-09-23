import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() title2: string;
  @Input() view: string;
  @Input() total: number;
  @Input() tableName: string;
  @Input() more: number;
  @Input() footer: string;

  constructor() { }

  hideTitle(): boolean {
    return this.title === 'Deposit Account Balances';
  }

  hideTable(): boolean {
    return this.title !== 'Deposit Account Balances';
  }

  ngOnInit(): void {
  }
}
