import { Component, TemplateRef } from '@angular/core';

import { ToastService } from '@app/services/toast.service';


@Component({
    selector: 'app-toasts',
    template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="false"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
      header="Hello!"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
    styleUrls: ['./toast.component.scss']
})
export class ToastsComponent {
    constructor(public toastService: ToastService) {}

    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
