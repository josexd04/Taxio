import { Injectable } from '@angular/core';
import { IDriver } from '../models/IDriver.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DriverService {

private URL = 'http://localhost:7000/api/drivers'

  constructor( private http: HttpClient) { }

getDriver(): Observable<IDriver[]> {
  return this.http.get<IDriver[]>(this.URL);
}

saveDriver(driverData: IDriver ): Observable<IDriver> {
  return this.http.post<IDriver>(this.URL + "/register", driverData);
}

activateDriver(driverID: string): Observable<any> {
  return this.http.patch(`${this.URL}/activate`, { driverID });
}

deactivateDriver(driverID: string): Observable<any> {
  return this.http.patch(`${this.URL}/deactivate`, { driverID });
}

}
