import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private apiUrl = 'http://localhost:5000/locations';
    constructor(private http: HttpClient) { }
    getLocations() {
        return this.http.get(this.apiUrl);
    }
}
