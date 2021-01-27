import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function httpErrorHandler(error: HttpErrorResponse)
{
    if(error.error instanceof ErrorEvent) {
        //client side error like lost connection
        console.error('Error: ', error.error.message);
        return throwError('<strong>Problem z połączeniem.</strong> Sprawdź swoje połączenie z internetem, lub sprubój ponownie później.');
    } else {
        //backend returned error
        console.error(`Backend returned code ${error.status}\n body was: ${error.error}`);
        return throwError('<strong>Wystąpił problem.</strong> Spróbuj ponownie później');
    }
}