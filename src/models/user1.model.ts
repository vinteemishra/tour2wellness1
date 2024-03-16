import {Entity, model, property} from '@loopback/repository';

@model()
export class user1 extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true, // Set to true to enforce uniqueness
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  date_of_birth: string;


  constructor(data?: Partial<user1>) {
    super(data);
  }
}

export interface User1Relations {
  // describe navigational properties here
}

export type User1WithRelations = user1 & User1Relations;
