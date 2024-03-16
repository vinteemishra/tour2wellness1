import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, ReferencesManyAccessor} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {ServicePartner, ServicePartnerRelations, Rating, Speciality} from '../models';
import {RatingRepository} from './rating.repository';
import {SpecialityRepository} from './speciality.repository';

export class ServicePartnerRepository extends DefaultCrudRepository<
  ServicePartner,
  typeof ServicePartner.prototype.id,
  ServicePartnerRelations
> {

  public readonly ratings: HasManyRepositoryFactory<Rating, typeof ServicePartner.prototype.id>;

  public readonly specialitys: ReferencesManyAccessor<Speciality, typeof ServicePartner.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('RatingRepository') protected ratingRepositoryGetter: Getter<RatingRepository>, @repository.getter('SpecialityRepository') protected specialityRepositoryGetter: Getter<SpecialityRepository>,
  ) {
    super(ServicePartner, dataSource);
    this.specialitys = this.createReferencesManyAccessorFor('specialitys', specialityRepositoryGetter,);
    this.registerInclusionResolver('specialitys', this.specialitys.inclusionResolver);
    this.ratings = this.createHasManyRepositoryFactoryFor('ratings', ratingRepositoryGetter,);
    this.registerInclusionResolver('ratings', this.ratings.inclusionResolver);
  }
}
