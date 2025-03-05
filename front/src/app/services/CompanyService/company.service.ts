import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CompaniesDTO, SearchCompanies } from '../../models/CompaniesDTO';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getAllCompanies(params: SearchCompanies): Observable<CompaniesDTO[]> {

    const httpParams = new HttpParams({ fromObject: params as any });
    return this.http.get<CompaniesDTO[]>(`${this.apiUrl}/companies`,
      { params: httpParams,
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
      catchError(this.handleError<CompaniesDTO[]>('getAllCompanies', []))
    );
  }

  deleteCompany(id: number): Observable<CompaniesDTO> {
    return this.http.delete<CompaniesDTO>(`${this.apiUrl}/deleteCompany/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError<CompaniesDTO>('deleteCompany'))
    );
  }

  createCompany(company: CompaniesDTO): Observable<CompaniesDTO> {
    return this.http.post<CompaniesDTO>(`${this.apiUrl}/createCompany`, company, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError<CompaniesDTO>('createCompany'))
    );
  }

  updateCompany(company: CompaniesDTO): Observable<CompaniesDTO> {
    return this.http.put<CompaniesDTO>(`${this.apiUrl}/updateCompany`, company, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError<CompaniesDTO>('updateCompany'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  exportToCSV(params: SearchCompanies): Observable<Blob> {
    const httpParams = new HttpParams({ fromObject: params as any });
    return this.http.get(`${this.apiUrl}/exportCompanies`,
      {
        params: httpParams,
        responseType: 'blob'
      });
  }

}
