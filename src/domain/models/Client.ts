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
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 11,
    maxlength: 11,
  })
  phone: string;

  @Prop({ type: Date, required: true })
  birthDate: Date;

  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 11,
    maxlength: 11,
  })
  cpf: string;

  @Prop({ type: String, required: true, enum: Object.values(BodyBiotype) })
  bodyBiotype: BodyBiotype;

  @Prop({ type: Date })
  deletedAt?: Date;

  _id?: string;
}

export const ClientSchemaFactory = SchemaFactory.createForClass(ClientSchema);
