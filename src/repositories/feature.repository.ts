import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Feature, FeatureRelations, Recipe} from '../models';
import {RecipeRepository} from './recipe.repository';

export class FeatureRepository extends DefaultCrudRepository<
  Feature,
  typeof Feature.prototype.id,
  FeatureRelations
> {

  public readonly recipes: HasManyRepositoryFactory<Recipe, typeof Feature.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('RecipeRepository') protected recipeRepositoryGetter: Getter<RecipeRepository>,
  ) {
    super(Feature, dataSource);
    this.recipes = this.createHasManyRepositoryFactoryFor('recipes', recipeRepositoryGetter,);
    this.registerInclusionResolver('recipes', this.recipes.inclusionResolver);
  }
}
