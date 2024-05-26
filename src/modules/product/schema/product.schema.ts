// import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/users/schema/users.schema';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './category.schema';
// require('mongoose-double')(mongoose);
// const SchemaTypes = mongoose.Schema.Types;

@Schema({ collection: 'Products', timestamps: true })
export class Product {
    @Prop({
        type: String,
        default: () => uuidv4(),
      })
      _id: string;
    @Prop({ type: String, ref: 'User' })
    userId: User;
    @Prop({ type: String, ref: 'Category' })
    category: Category;
    @Prop({required: true})
    price: number;
    @Prop({required: true})
    productName: string;
    @Prop({required: true})
    size: string;
    @Prop({required: true})
    color: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product)