import { IsBoolean, IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    name: string;
    
    @IsString()
    sector: string;
    
    @IsString()
    phone: string;
    
    @IsString()
    address: string;
    
    @IsDecimal()
    assets: number;
    
    @IsDecimal()
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
