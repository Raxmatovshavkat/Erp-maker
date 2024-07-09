import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @IsOptional()
    userId:string;
    
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    token:string

    @IsOptional()
    expiryDate:Date
}
