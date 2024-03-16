import {inject} from '@loopback/core';

// repositories/token.repository.ts

import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Token } from '../models';
import {HtDbMgDataSource} from '../datasources';

export class TokenRepository extends DefaultCrudRepository<Token, typeof Token.prototype.id> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
  ) {
    super(Token, dataSource);
  }
}

