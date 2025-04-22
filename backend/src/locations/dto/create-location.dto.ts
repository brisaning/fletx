import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateLocationDto {
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
