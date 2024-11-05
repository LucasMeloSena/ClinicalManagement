import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Nutritionist } from './Nutritionist';

export class Consultation {
  patient: string;
  email: string;
  phone: string;
  birth_date: Date;
  cpf: string;
  body_biotype: BodyBiotype;
  start_at: Date;
  end_at: Date;
  nutritionist: Nutritionist | Types.ObjectId;
}

export enum BodyBiotype {
  Ectomorfo = 'Ectomorfo',
  Mesomorfo = 'Mesomorfo',
  Endomorfo = 'Endomorfo',
}

export type ConsultationDocument = HydratedDocument<ConsultationSchema>;

@Schema({ collection: 'consultations', timestamps: true })
export class ConsultationSchema implements Consultation {
  @Prop({ required: true })
  patient: string;

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

  @Prop({ required: true })
  start_at: Date;

  @Prop({ required: true })
  end_at: Date;

  @Prop({ type: Types.ObjectId, ref: 'Nutritionist' })
  nutritionist: Nutritionist | Types.ObjectId;
}

export const ConsultationSchemaFactory =
  SchemaFactory.createForClass(ConsultationSchema);
