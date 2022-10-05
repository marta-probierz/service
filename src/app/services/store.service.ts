import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Invoice } from '@app/transactions/Invoice';
import { Location } from '@app/shared/locations-modal/Location';
import { ToastService } from '@app/services/toast.service';

@Injectable({
    providedIn: 'root'
})

export class StoreService {
    toasts: any[] = [];

    private invoicesUrl = 'http://localhost:5000/invoices';
    private locationsUrl = 'http://localhost:5000/locations';

    public invoicesObs$: BehaviorSubject<Invoice> = new BehaviorSubject<any>([]);
    public locationsObs$: BehaviorSubject<Location> = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient, private router: Router, public toastService: ToastService) { }

    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

    showSuccess() {
        this.toastService.show('The invoice has been created', { classname: 'bg-success text-light', delay: 1500 });
    }

    showDanger() {
        this.toastService.show('Something is wrong', { classname: 'bg-danger text-light', delay: 2000 });
    }

    fetchInvoices() {
        this.http.get<any>(this.invoicesUrl).pipe(shareReplay(1)).subscribe((value) => {
            this.invoicesObs$.next(value);
        }, (err) => {
            console.error(err);
        });
    }

    fetchLocations() {
        this.http.get<any>(this.locationsUrl).pipe(shareReplay(1)).subscribe((value) => {
            this.locationsObs$.next(value);
        }, (err) => {
            console.error(err);
        });
    }

    postInvoice(data: Invoice): void {
        const head = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post(this.invoicesUrl, data, { headers: head, observe: 'response' })
            .subscribe(response => {
                if (response.status === 201) {
                    this.showSuccess();
                    setTimeout(() => {
                        this.router.navigate(['./transactions']);
                        this.toastService.clear();
                    }, 1500);
                } else {
                    this.showDanger();
                }
            });
    }

    get invoices(): Observable<Object> {
        return this.invoicesObs$.asObservable();
    }

    get locations(): Observable<Object> {
        return this.locationsObs$.asObservable();
    }
}
