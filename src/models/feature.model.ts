import {Entity, hasMany, model, property} from '@loopback/repository';
import {Recipe} from './recipe.model';

@model()
export class Feature extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  frequency: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

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

  @hasMany(() => Recipe)
  recipes: Recipe[];

  constructor(data?: Partial<Feature>) {
    super(data);
  }
}

export interface FeatureRelations {
  // describe navigational properties here
}

export type FeatureWithRelations = Feature & FeatureRelations;
