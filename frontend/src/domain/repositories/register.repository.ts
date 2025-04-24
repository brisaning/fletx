import { Observable } from "rxjs";
import { RegisterModel } from "../models/register.model";

export abstract class RegisterRepository {
    abstract getRegisters() : Observable<RegisterModel[]>;
    abstract setRegister(params: any): Observable<RegisterModel>;
    abstract getRegisterById(id: number): Observable<RegisterModel>;
    abstract updateRegisterById(id: number, params: any):  void;
    abstract deleteRegisterById(id: number): void;
}
