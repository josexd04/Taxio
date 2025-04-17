import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFolio } from '../models/IFolio.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoliosService {

  constructor(private http:HttpClient) { }

  private URL = "http://localhost:7000/api/folios"

  getFolios(): Observable<IFolio[]> {
    return this.http.get<IFolio[]>(this.URL);
  }

  assignFolios(folio: IFolio): Observable<IFolio[]> {
    return this.http.post<IFolio[]>(this.URL, folio);
  }


}

