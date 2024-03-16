import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, ReferencesManyAccessor} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Physician, PhysicianRelations, Rating, Speciality} from '../models';
import {RatingRepository} from './rating.repository';
import {SpecialityRepository} from './speciality.repository';

export class PhysicianRepository extends DefaultCrudRepository<
  Physician,
  typeof Physician.prototype.id,
  PhysicianRelations
> {

  public readonly ratings: HasManyRepositoryFactory<Rating, typeof Physician.prototype.id>;

  public readonly specialitys: ReferencesManyAccessor<Speciality, typeof Physician.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('RatingRepository') protected ratingRepositoryGetter: Getter<RatingRepository>, @repository.getter('SpecialityRepository') protected specialityRepositoryGetter: Getter<SpecialityRepository>,
  ) {
    super(Physician, dataSource);
    this.specialitys = this.createReferencesManyAccessorFor('specialitys', specialityRepositoryGetter,);
    this.registerInclusionResolver('specialitys', this.specialitys.inclusionResolver);
    this.ratings = this.createHasManyRepositoryFactoryFor('ratings', ratingRepositoryGetter,);
    this.registerInclusionResolver('ratings', this.ratings.inclusionResolver);
  }
}
