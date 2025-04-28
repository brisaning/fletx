import { UserModel } from "./userModel";

export interface LoginModel {
    accessToken: string;
    user: UserModel;
}