import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Client {
  name: string;
  email: string;
  phone: string;
  birth_date: Date;
  cpf: string;
  body_biotype: BodyBiotype;
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
  birth_date: Date;

  @Prop({ required: true, unique: true, minlength: 11, maxlength: 11 })
  cpf: string;

  @Prop({ required: true, enum: BodyBiotype })
  body_biotype: BodyBiotype;

  @Prop()
  deleted_at?: Date;
}

export const ClientSchemaFactory = SchemaFactory.createForClass(ClientSchema);
