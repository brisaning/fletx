import { IsInt, IsString } from "class-validator";

export class CreateCityDto {
    @IsString()
    name: string;

    @IsInt()
    locationId: number;
}
