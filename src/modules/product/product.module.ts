import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserSchema } from '../users/schema/users.schema';
import { ImageSchema } from './schema/image.schema';
import { CategorySchema } from './schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
          name: 'Product',
          schema: ProductSchema,
        },
        {
          name: 'User',
          schema: UserSchema,
        },
        {
          name: 'Image',
          schema: ImageSchema,
        },
        {
          name: 'Category',
          schema: CategorySchema,
        }
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
