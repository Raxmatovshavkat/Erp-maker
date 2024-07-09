import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsString()
    @IsNotEmpty()
    customer_id:number;
    @IsBoolean()
    @IsNotEmpty()
    status:boolean
}
