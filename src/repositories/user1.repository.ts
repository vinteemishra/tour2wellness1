import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {user1, User1Relations} from '../models';

// export type Credentials={
//   email:string;
//   password:string;
// };

export class User1Repository extends DefaultCrudRepository<
user1,
  typeof user1.prototype.id,
  User1Relations
> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
  ) {
    super(user1, dataSource);
  }
}


