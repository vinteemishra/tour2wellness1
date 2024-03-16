import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Recipe, RecipeRelations, Feature} from '../models';
import {FeatureRepository} from './feature.repository';

export class RecipeRepository extends DefaultCrudRepository<
  Recipe,
  typeof Recipe.prototype.id,
  RecipeRelations
> {

  public readonly feature: BelongsToAccessor<Feature, typeof Recipe.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('FeatureRepository') protected featureRepositoryGetter: Getter<FeatureRepository>,
  ) {
    super(Recipe, dataSource);
    this.feature = this.createBelongsToAccessorFor('feature', featureRepositoryGetter,);
    this.registerInclusionResolver('feature', this.feature.inclusionResolver);
  }
}
