import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';


@Schema({ collection: 'Categories', timestamps: true })
export class Category {
    @Prop({
        type: String,
        default: () => uuidv4(),
      })
    _id: string;
    @Prop({required: true})
    categoryName: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
