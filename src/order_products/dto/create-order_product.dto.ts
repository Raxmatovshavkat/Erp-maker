import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderProductDto {
    @IsNumber()
    @IsNotEmpty()
    order_id:number;
    @IsNumber()
    @IsNotEmpty()
    product_id:number;
    @IsNumber()
    @IsNotEmpty()
    quantity:number;
}
