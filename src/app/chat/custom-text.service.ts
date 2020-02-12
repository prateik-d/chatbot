import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})


export class CustomTextService {
    serverUrl = 'http://localhost/blogger/';
    // serverUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    saveCustomText(logs) {
      // console.log(logs);
      return this.http.post<any>(this.serverUrl + 'api/logs', logs)
      .pipe(
        catchError(this.handleError)
      );
      
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        // console.log(error);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened. Please try again later.');
    }
}
