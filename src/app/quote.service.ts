import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Quote } from './models';
import { backendUrl2 } from './const';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private http: HttpClient) {}

  getQuote(category): Observable<Quote> {
    let params = new HttpParams();
    params = params.append('maxLength', '70');

    return this.http
      .get<Quote>(`${backendUrl2}/quote/${category}`, {params: params})
      .pipe(
        tap((result: Quote) => console.log(`got quote`)),
        catchError(this.handleError<any>())
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
