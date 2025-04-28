import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRepository } from "../domain/repositories/login.repository";
import { catchError, Observable, of, tap } from "rxjs";
import { LoginModel } from "../domain/models/login.model";
import { environment } from "../environments/environment";


@Injectable()
export class LoginService extends LoginRepository {
    
    private isLoggedIn = false;
    private baseUrl: string = environment.baseUrl;
    private url: string; // Replace with your API URL
    
    constructor(
        private http: HttpClient,
    ) {
        super()
        this.url = this.baseUrl + "/api/v1/auth/login";
    }
    
    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            
            // TODO: send the error to remote logging infrastructure
            if(error.status === 401) {
            }
            console.error(error); // log to console instead
            
            return of(result as T);
        };
    }
    
    override login(params: any): Observable<LoginModel> {
        return this.http.post<LoginModel>(this.url, params).pipe(
            tap((control: LoginModel) => {
                console.log('fetched Control: ' + control);
                // Store the token in local storage or a service;
            }),
            catchError(this.handleError<LoginModel>('login'))
        );
    }
    
    override logout(): Observable<void> {
        throw new Error("Method not implemented.");
    }
    override isAuthenticated(params: any): Observable<boolean> {
        throw new Error("Method not implemented.");
    }
    
    
}