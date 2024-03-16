import {Entity, model, property} from '@loopback/repository';

@model()
export class Speciality extends Entity {
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
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  details: string;

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


  constructor(data?: Partial<Speciality>) {
    super(data);
  }
}

export interface SpecialityRelations {
  // describe navigational properties here
}

export type SpecialityWithRelations = Speciality & SpecialityRelations;
