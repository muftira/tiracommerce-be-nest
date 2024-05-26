import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator';


export class CreateCategoryDto {
    @IsNotEmpty()
    categoryName: string;
  }
export class CreateProductDto {
    @IsNotEmpty()
    price: string;
  
    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    color: string;

    @IsOptional()
    url: string;

    @IsNotEmpty()
    category: CreateCategoryDto;

    // @IsNotEmpty()
    // userId: string;
  }