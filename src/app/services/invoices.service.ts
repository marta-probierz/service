import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService {
    private apiUrl = 'http://localhost:5000/invoices';
    constructor(private http: HttpClient) { }
    getInvoices() {
        return this.http.get(this.apiUrl);
    }
}
