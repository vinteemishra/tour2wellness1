import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Contactus, ContactusRelations} from '../models';

export class ContactusRepository extends DefaultCrudRepository<
  Contactus,
  typeof Contactus.prototype.id,
  ContactusRelations
> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
  ) {
    super(Contactus, dataSource);
  }
}
