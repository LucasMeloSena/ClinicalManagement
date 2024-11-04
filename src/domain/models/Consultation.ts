import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Nutritionist } from './Nutritionist';

export enum BodyBiotype {
  Ectomorfo = 'Ectomorfo',
  Mesomorfo = 'Mesomorfo',
  Endomorfo = 'Endomorfo',
}

@Schema({ timestamps: true })
export class Consultation extends Document {
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

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
