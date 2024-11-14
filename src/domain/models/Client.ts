import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Client {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  cpf: string;
  bodyBiotype: BodyBiotype;
  deletedAt?: Date;
}

export enum BodyBiotype {
  Ectomorfo = 'Ectomorfo',
  Mesomorfo = 'Mesomorfo',
  Endomorfo = 'Endomorfo',
}

export type ClientDocument = HydratedDocument<ClientSchema>;

@Schema({ collection: 'clients', timestamps: true })
export class ClientSchema implements Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true, minlength: 11, maxlength: 11 })
  phone: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true, unique: true, minlength: 11, maxlength: 11 })
  cpf: string;

  @Prop({ required: true, enum: BodyBiotype })
  bodyBiotype: BodyBiotype;

  @Prop()
  deletedAt?: Date;

  _id?: string;
}

export const ClientSchemaFactory = SchemaFactory.createForClass(ClientSchema);
