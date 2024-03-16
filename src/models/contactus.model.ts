import {Entity, model, property} from '@loopback/repository';

@model()
export class Contactus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  contactno: string;

  @property({
    type: 'string',
    required: true,
  })
  details: string;

  @property({
    type: 'string',
    required: true,
  })
  speciality: string;

  @property({
    type: 'string',
  })
  filename: string;

  @property({
    type: 'string',
  })
  report?: string;



  // @property.array(String)
  // report?: string[];

  constructor(data?: Partial<Contactus>) {
    super(data);

  }
}

export interface ContactusRelations {
  // describe navigational properties here
}


export type ContactusWithRelations = Contactus & ContactusRelations;
