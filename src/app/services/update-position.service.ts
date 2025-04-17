import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdatePositionService {

  private URL = "http://localhost:7000/api/taxi/update-position";

  constructor(private http: HttpClient) { }

  updatePosition(driverID: string|undefined, position: string|undefined) {
    return this.http.put(this.URL, { driverID, position })
  }
}
