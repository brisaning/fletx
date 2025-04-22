import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    name: string;
    
    @IsString()
    sector: string;
    
    @IsString()
    phone: string;
    
    @IsString()
    address: string;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    assets: number;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    liabilities: number;
    
    @IsInt()
    cityId: number;

    @IsInt()
    @IsOptional()
    productId?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
