import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Speciality, SpecialityRelations} from '../models';

export class SpecialityRepository extends DefaultCrudRepository<
  Speciality,
  typeof Speciality.prototype.id,
  SpecialityRelations
> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
  ) {
    super(Speciality, dataSource);
  }
}
