import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() view: string;
  @Input() tableName: string;
  @Input() more: number;
  @Input() footer: string;

  constructor() { }

  ngOnInit(): void {
  }

}
