import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { searchParams, TransactionsDTO } from '../../models/TransactionsDTO';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTransactions(page: number, limit: number,params: searchParams):Observable<TransactionsDTO[]> {
    // Get all transactions
    const httpParams = new HttpParams({ fromObject: params as any });
    return this.http.get<TransactionsDTO[]>(`${this.apiUrl}/transactions/page/${page}/limit/${limit}`, { params: httpParams });
    }

  exportToCSV(params: searchParams): Observable<Blob> {
    // Export transactions to CSV
    const httpParams = new HttpParams({ fromObject: params as any });
    return this.http.get(`${this.apiUrl}/mockTransactions/export`,
      {
        params: httpParams,
        responseType: 'blob'
      });
  }
 }

