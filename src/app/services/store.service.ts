import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

import { Invoice } from '@app/transactions/Invoice';
import { Location } from '@app/shared/locations-modal/Location';

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    private apiUrl = 'http://localhost:5000/invoices';
    private locationsUrl = 'http://localhost:5000/locations';

    public invoicesObs$: BehaviorSubject<Invoice> = new BehaviorSubject<any>([]);
    public locationsObs$: BehaviorSubject<Location> = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) { }

    fetchInvoices() {
        this.http.get<any>(this.apiUrl).pipe(shareReplay(1)).subscribe((value) => {
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

    postInvoice(data: Invoice): Observable<Object> {
        console.log(data);
        console.log('success');
        const head = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiUrl, data, { headers: head });
    }

    get invoices(): Observable<Object> {
        return this.invoicesObs$.asObservable();
    }

    get locations(): Observable<Object> {
        return this.locationsObs$.asObservable();
    }
}
