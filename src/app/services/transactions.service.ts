import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {
  private apiUrl = 'http://localhost:5000/transactions';

  constructor(private http: HttpClient) { }

  getTransactions() {
    return this.http.get(this.apiUrl);
  }

  getTransactionDetailByID(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
