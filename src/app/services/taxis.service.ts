import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITaxi } from '../models/ITaxis.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxisService {

  private URL = "http://localhost:7000/api";

  constructor(private http: HttpClient) { }

  getTaxis(): Observable<ITaxi[]> {
    return this.http.get<ITaxi[]>(this.URL + "/taxi");
  }

  getTaxiById(_id: string | number): Observable<ITaxi> {
    return this.http.get<ITaxi>(`${this.URL}/taxi/${_id}`);
  }

  addTaxi(taxiData: {
    taxiNumber: number, arrivalFolio: string
  }): Observable<ITaxi> {
    return this.http.post<ITaxi>(`${this.URL}/taxi/add`, taxiData);
  }

  removeTaxiById(_id: string | number): Observable<ITaxi[]> {
    return this.http.delete<ITaxi[]>(`${this.URL}/taxi/${_id}`);
  }

  updateTaxiPosition(taxiData: { driverID: string, position: string }): Observable<ITaxi> {
    return this.http.put<ITaxi>(`${this.URL}/taxi/update-position`, taxiData);
  }
}