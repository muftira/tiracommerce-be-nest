import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './product.schema';


@Schema({ collection: 'Images', timestamps: true })
export class Image {
    @Prop({
        type: String,
        default: () => uuidv4(),
      })
    _id: string;
    @Prop({required: true})
    url: string;
    @Prop({ type: String, ref: 'Product' })
    product: Product;
}

export const ImageSchema = SchemaFactory.createForClass(Image)
