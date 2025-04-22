import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    category: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
