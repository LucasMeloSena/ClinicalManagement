import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Nutritionist {
  _id?: string;
  name: string;
  email: string;
  password?: string;
}

export type NutritionistDocument = HydratedDocument<NutritionistSchema>;

@Schema({ collection: 'nutritionists', timestamps: true })
export class NutritionistSchema implements Nutritionist {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  _id?: string;
}

export const NutritionistSchemaFactory =
  SchemaFactory.createForClass(NutritionistSchema);
