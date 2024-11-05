import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Nutritionist } from './Nutritionist';
import { Client } from './Client';

export class Consultation {
  client: Client | Types.ObjectId;
  nutritionist: Nutritionist | Types.ObjectId;
  start_at: Date;
  end_at: Date;
}

export type ConsultationDocument = HydratedDocument<ConsultationSchema>;

@Schema({ collection: 'consultations', timestamps: true })
export class ConsultationSchema implements Consultation {
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  client: Client | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Nutritionist' })
  nutritionist: Nutritionist | Types.ObjectId;

  @Prop({ required: true })
  start_at: Date;

  @Prop({ required: true })
  end_at: Date;
}

export const ConsultationSchemaFactory =
  SchemaFactory.createForClass(ConsultationSchema);
