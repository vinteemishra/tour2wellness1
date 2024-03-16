import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {UserSignup, UserSignupRelations} from '../models';

export type Credentials={
  email:string;
  password:string;
};


export class UserSignupRepository extends DefaultCrudRepository<
  UserSignup,
  typeof UserSignup.prototype.id,
  UserSignupRelations
> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
  ) {
    super(UserSignup, dataSource);
  }
}
