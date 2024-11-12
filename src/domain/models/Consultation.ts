import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Nutritionist } from './Nutritionist';
import { Client } from './Client';

export class Consultation {
  _id?: string;
  client: Client | Types.ObjectId | string;
  nutritionist: Nutritionist | Types.ObjectId | string;
  startAt: Date;
  endAt: Date;
}

export type ConsultationDocument = HydratedDocument<ConsultationSchema>;

@Schema({ collection: 'consultations', timestamps: true })
export class ConsultationSchema implements Consultation {
  @Prop({ type: Types.ObjectId, ref: 'ClientSchema' })
  client: Client | Types.ObjectId | string;

  @Prop({ type: Types.ObjectId, ref: 'NutritionistSchema' })
  nutritionist: Nutritionist | Types.ObjectId | string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop()
  intervalOfDaysToRepeat?: number;

  _id?: string;
}

export const ConsultationSchemaFactory =
  SchemaFactory.createForClass(ConsultationSchema);
