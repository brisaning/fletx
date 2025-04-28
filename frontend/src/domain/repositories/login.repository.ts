import { Observable } from "rxjs";
import { LoginModel } from "../models/login.model";

export abstract class LoginRepository {
    abstract login(params: any) : Observable<LoginModel>;
    abstract logout(): Observable<void>;
    abstract isAuthenticated(params: any): Observable<boolean>;
}

/*export interface LoginRepository {
    login(username: string, password: string): Promise<string>; // Returns a token or session ID
    logout(): Promise<void>; // Logs the user out
    isAuthenticated(): Promise<boolean>; // Checks if the user is authenticated
}*/