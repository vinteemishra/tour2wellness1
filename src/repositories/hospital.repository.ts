
import {inject} from '@loopback/core';
import {DefaultCrudRepository, repository, Filter} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Hospital, HospitalRelations} from '../models';

import { PaginationMixin, PaginationOptions } from '../pagination.mixin';


export class HospitalRepository extends DefaultCrudRepository<
  Hospital,
  typeof Hospital.prototype.id,
  HospitalRelations
> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
  ) {
    super(Hospital, dataSource);
  }

  async findWithPagination(
    filter: Filter<Hospital>,
    paginationOptions: PaginationOptions,
  ): Promise<Hospital[]> {
    const {limit, offset} = paginationOptions;


    const result = await this.find({
      ...filter,
      limit,
      offset,
    });

    return result;
  }
}



