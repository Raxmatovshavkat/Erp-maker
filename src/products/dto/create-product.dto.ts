import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNumber()
    @IsNotEmpty()
    price:number;
    @IsString()
    @IsNotEmpty()
    category:string;
    @IsString()
    image_url:string;
}
