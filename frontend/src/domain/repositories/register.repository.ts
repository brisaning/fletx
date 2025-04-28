import { Observable } from "rxjs";
import { RegisterModel } from "../models/register.model";
import { LoginModel } from "../models/login.model";

export abstract class RegisterRepository {
    abstract setRegister(params: RegisterModel): Observable<LoginModel>;
}
