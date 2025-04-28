export interface UserModel {
    id: string;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    createdAt?: Date;
    updatedAt?: Date;
}