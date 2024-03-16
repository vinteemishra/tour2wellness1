import * as isEmail from 'isemail';
import {Credentials} from '../repositories/user-signup.repository';
import {HttpErrors, HttpHandler} from '@loopback/rest';
export function validatecredentials(credentials:Credentials){
  if(!isEmail.validate(credentials.email)){
    throw new HttpErrors.UnprocessableEntity('invalid email')
  }
  if(credentials.password.length<8){
    throw new HttpErrors.UnprocessableEntity('password length should be greater then 8')
  }

}
