import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Feature} from './feature.model';

@model()
export class Recipe extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  limit: number;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: Date;

  @property({
    type: 'string',
    required: true,
  })
  status: string;
  @property({
    type: 'string',
  })
  subscriptionId?: string;

  @belongsTo(() => Feature)
  featureId: string;

  constructor(data?: Partial<Recipe>) {
    super(data);
  }
}

export interface RecipeRelations {
  // describe navigational properties here
}

export type RecipeWithRelations = Recipe & RecipeRelations;
