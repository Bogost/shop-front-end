import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionReport } from './action-report';

//import * as eh from './error-handlers';
import { httpErrorHandler } from './error-handlers';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient) { }

  verify(code: string): Observable<ActionReport> {
    let url = environment.endpoint + "/user/verify/" + code;
    return this.http.get<ActionReport>(url).pipe(
      catchError(httpErrorHandler),
    );
  }
}
