import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Nutritionist {
  name: string;
  email: string;
  password: string;
}

export type NutritionistDocument = HydratedDocument<NutritionistSchema>;

@Schema({ collection: 'nutritionists', timestamps: true })
export class NutritionistSchema implements Nutritionist {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const NutritionistSchemaFactory =
  SchemaFactory.createForClass(NutritionistSchema);
