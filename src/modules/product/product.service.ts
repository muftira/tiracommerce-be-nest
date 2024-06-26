import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../product/Dto/createProduct.dto';
import { User } from '../users/schema/users.schema';
import { Image } from './schema/image.schema';
import { Category } from './schema/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Image') private imageModel: Model<Image>,
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    const products = await this.productModel.find();

    return {
      success: true,
      data: products,
    };
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id)
    if (!product) {
      throw new NotFoundException('product is not found');
    }
    return {
      success: true,
      data: product,
    };
  }

  async createProduct(userId: string, {url, category, ...createProductDto} : CreateProductDto) {
    if (userId) {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('user is not found');
      } else {
        const product = await this.productModel.create({
          ...createProductDto,
          userId
        });

        const image = await this.imageModel.create({
          url,
          productId: product._id,
        });

        const _category = await this.categoryModel.create({categoryName: category});

        return {
          success: true,
          message: 'product is created',
          data: product,
        };
      }
    }
    throw new NotFoundException('user is not found');
  }

  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    try {
      const productId = await this.productModel.findById(id);
      if(!productId) {
        throw new NotFoundException('product is not found');
      } else {
        const updateProduct = await this.productModel.findByIdAndUpdate(
          id,
          updateProductDto,
          {
            new: true,
          },
        );
        return {
          success: true,
          message: 'product is updated',
          data: updateProduct,
        };
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteProduct(id: string) {
    const deleteProduct = await this.productModel.findByIdAndDelete(id, {
      new: true,
    });

    if (!deleteProduct) {
      throw new NotFoundException('product is not found');
    }
    return {
      success: true,
      message: 'product is deleted',
      data: deleteProduct,
    };
  }
}
