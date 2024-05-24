import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserSchema } from '../users/schema/users.schema';

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
        }
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
