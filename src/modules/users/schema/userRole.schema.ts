import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export enum Roles {
  SELLER = 'seller',
  BUYER = 'buyer',
}

@Schema({ collection: 'userRoles', timestamps: true })
export class UserRole {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;
  @Prop({ required: false, enum: Object.values(Roles) })
  roleName: Roles;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
