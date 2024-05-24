import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateProductDto {
    @IsNotEmpty()
    price: string;
  
    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    color: string;

    // @IsNotEmpty()
    // userId: string;
  }