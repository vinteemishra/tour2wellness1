import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Recipe,
  Feature,
} from '../models';
import {RecipeRepository} from '../repositories';

export class RecipeFeatureController {
  constructor(
    @repository(RecipeRepository)
    public recipeRepository: RecipeRepository,
  ) { }

  @get('/recipes/{id}/feature', {
    responses: {
      '200': {
        description: 'Feature belonging to Recipe',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Feature),
          },
        },
      },
    },
  })
  async getFeature(
    @param.path.string('id') id: typeof Recipe.prototype.id,
  ): Promise<Feature> {
    return this.recipeRepository.feature(id);
  }
}
