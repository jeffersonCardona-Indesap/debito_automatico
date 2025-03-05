import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchClients } from '../../models/ClientsDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  apiUrl =environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllClients(page: number, limit: number,params: SearchClients) {

    const httpParams = new HttpParams({ fromObject: params as any });

    return this.http.get(`${this.apiUrl}/clients/page/${page}/limit/${limit}`, {params: httpParams});
  }

  exportToCSV(params: SearchClients) {
    const httpParams = new HttpParams({ fromObject: params as any });
    return this.http.get(`${this.apiUrl}/clients/export`,
      {
        params: httpParams,
        responseType: 'blob'
     });
  }
}
