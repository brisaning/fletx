import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    position: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    salary: number;

    @IsString()
    phone: string;
    
    @IsString()
    @IsOptional()
    role: string;

    @IsNumber()
    @IsOptional()
    companyId?: number;
    
    @IsBoolean()
    @IsOptional()
    isActive?: boolean = true;
}
