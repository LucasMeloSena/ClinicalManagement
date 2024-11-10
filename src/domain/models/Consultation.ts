import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Nutritionist } from './Nutritionist';
import { Client } from './Client';

export class Consultation {
  _id?: string;
  clientId: Client | Types.ObjectId | string;
  nutritionistId: Nutritionist | Types.ObjectId | string;
  startAt: Date;
  endAt: Date;
}

export type ConsultationDocument = HydratedDocument<ConsultationSchema>;

@Schema({ collection: 'consultations', timestamps: true })
export class ConsultationSchema implements Consultation {
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: Client | Types.ObjectId | string;

  @Prop({ type: Types.ObjectId, ref: 'Nutritionist' })
  nutritionistId: Nutritionist | Types.ObjectId | string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  _id?: string;
}

export const ConsultationSchemaFactory =
  SchemaFactory.createForClass(ConsultationSchema);
