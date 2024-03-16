import {Entity, model, property, hasMany} from '@loopback/repository';
import {Recipe} from './recipe.model';

@model()
export class Subscription extends Entity {
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

  constructor(data?: Partial<Subscription>) {
    super(data);
  }
}

export interface SubscriptionRelations {
  // describe navigational properties here
}

export type SubscriptionWithRelations = Subscription & SubscriptionRelations;
