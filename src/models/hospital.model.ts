import {Entity, model, property} from '@loopback/repository';

@model()
export class Hospital extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  hospitalName: string;

  @property({
    type: 'string',
  })
  establishedIn?: string;

  @property({
    type: 'string',
  })
  numberOfBeds?: string;

  @property({
    type: 'string',
  })
  reviews?: string;

  @property({
    type: 'string',
  })
  location?: string;

  // @property({
  //   type: 'string',

  // })
  // address?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  address: string;

  @property.array(String)
  departments?: string[];

  @property({
    type: 'string',
  })
  about?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property.array(String)
  accreditations?: string[];

  @property({
    type: 'string',
  })
  specialty?: string;


  constructor(data?: Partial<Hospital>) {
    super(data);
  }
}

export interface HospitalRelations {
  // describe navigational properties here
}

export type HospitalWithRelations = Hospital & HospitalRelations;
