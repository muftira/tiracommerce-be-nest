import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './userRole.schema';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;
  @Prop({ required: false })
  fullName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: String, ref: 'UserRole' })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
