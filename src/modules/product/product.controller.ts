import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './Dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return products;
  }

  @Get(':id')
  async findOne(@Param('id') productId: string) {
    const productbyId = await this.productService.findOne(productId);
    return productbyId;
  }

  @Post(':id')
  async createProduct(
    @Param('id') userId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    const newProduct = await this.productService.createProduct(
      userId,
      createProductDto,
    );
    return newProduct;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    const updateProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );
    return updateProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    const deleteProduct = await this.productService.deleteProduct(productId);
    return deleteProduct;
  }
}
