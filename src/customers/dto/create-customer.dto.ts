import { IsArray, IsEmail, IsNotEmpty, IsString, MinLength, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(5) 
    @IsString({ each: true })
    role: string[];
}
