import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Subscription, SubscriptionRelations, Recipe} from '../models';
import {RecipeRepository} from './recipe.repository';

export class SubscriptionRepository extends DefaultCrudRepository<
  Subscription,
  typeof Subscription.prototype.id,
  SubscriptionRelations
> {

  public readonly recipes: HasManyRepositoryFactory<Recipe, typeof Subscription.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('RecipeRepository') protected recipeRepositoryGetter: Getter<RecipeRepository>,
  ) {
    super(Subscription, dataSource);
    this.recipes = this.createHasManyRepositoryFactoryFor('recipes', recipeRepositoryGetter,);
    this.registerInclusionResolver('recipes', this.recipes.inclusionResolver);
  }
}
