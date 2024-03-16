// models/token.model.ts

import { Entity, model, property,belongsTo } from '@loopback/repository';
import {UserSignup} from './user-signup.model';

@model()
export class Token extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  token1: string;

  // @belongsTo(() => UserSignup)
  // userId: string;

  constructor(data?: Partial<Token>) {
    super(data);
    // this.userId=""
  }
}
