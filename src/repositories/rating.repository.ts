import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Rating, RatingRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class RatingRepository extends DefaultCrudRepository<
  Rating,
  typeof Rating.prototype.id,
  RatingRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Rating.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Rating, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
