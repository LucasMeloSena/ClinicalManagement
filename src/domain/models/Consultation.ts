import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Nutritionist } from './Nutritionist';
import { Client } from './Client';

export class Consultation {
  clientId: Client | Types.ObjectId | string;
  nutritionistId: Nutritionist | Types.ObjectId | string;
  start_at: Date;
  end_at: Date;
}

export type ConsultationDocument = HydratedDocument<ConsultationSchema>;

@Schema({ collection: 'consultations', timestamps: true })
export class ConsultationSchema implements Consultation {
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: Client | Types.ObjectId | string;

  @Prop({ type: Types.ObjectId, ref: 'Nutritionist' })
  nutritionistId: Nutritionist | Types.ObjectId | string;

  @Prop({ required: true })
  start_at: Date;

  @Prop({ required: true })
  end_at: Date;
}

export const ConsultationSchemaFactory =
  SchemaFactory.createForClass(ConsultationSchema);
