import {Entity, hasMany, model, property, referencesMany} from '@loopback/repository';
import {Rating} from './rating.model';
import {Speciality} from './speciality.model';

@model()
export class Physician extends Entity {
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
    type: 'array',
    itemType: 'string',
    required: true,
  })
  accreditations: string[];

  @property({
    type: 'string',
  })
  comment?: string;

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

  @hasMany(() => Rating)
  ratings: Rating[];

  @referencesMany(() => Speciality)
  specialityIds: string[];

  constructor(data?: Partial<Physician>) {
    super(data);
  }
}

export interface PhysicianRelations {
  // describe navigational properties here
}

export type PhysicianWithRelations = Physician & PhysicianRelations;
