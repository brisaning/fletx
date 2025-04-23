import { 
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    MinLength, 
    IsOptional,
    IsBoolean,
    IsNumber
  } from 'class-validator';
  
  export class RegisterDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    firstName: string;
  
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El apellido es requerido' })
    lastName: string;
  
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    email: string;
  
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
  
    @IsString({ message: 'El cargo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El cargo es requerido' })
    position: string;
  
    @IsNumber({maxDecimalPlaces: 2}, { message: 'El salario debe ser un número' })
    @IsNotEmpty({ message: 'El salario es requerido' })
    salary: number;
  
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El teléfono es requerido' })
    phone: string;

    @IsString()
    @IsOptional()
    role: string;
  
    @IsNumber({}, { message: 'El ID de la compañía debe ser un número' })
    @IsOptional()
    companyId?: number;
  
    @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
    @IsOptional()
    isActive?: boolean = true;
  }