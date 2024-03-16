import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Feature,
  Recipe,
} from '../models';
import {FeatureRepository} from '../repositories';

export class FeatureRecipeController {
  constructor(
    @repository(FeatureRepository) protected featureRepository: FeatureRepository,
  ) { }

  @get('/features/{id}/recipes', {
    responses: {
      '200': {
        description: 'Array of Feature has many Recipe',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recipe)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Recipe>,
  ): Promise<Recipe[]> {
    return this.featureRepository.recipes(id).find(filter);
  }

  @post('/features/{id}/recipes', {
    responses: {
      '200': {
        description: 'Feature model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recipe)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Feature.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {
            title: 'NewRecipeInFeature',
            exclude: ['id'],
            optional: ['featureId']
          }),
        },
      },
    }) recipe: Omit<Recipe, 'id'>,
  ): Promise<Recipe> {
    return this.featureRepository.recipes(id).create(recipe);
  }

  @patch('/features/{id}/recipes', {
    responses: {
      '200': {
        description: 'Feature.Recipe PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {partial: true}),
        },
      },
    })
    recipe: Partial<Recipe>,
    @param.query.object('where', getWhereSchemaFor(Recipe)) where?: Where<Recipe>,
  ): Promise<Count> {
    return this.featureRepository.recipes(id).patch(recipe, where);
  }

  @del('/features/{id}/recipes', {
    responses: {
      '200': {
        description: 'Feature.Recipe DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recipe)) where?: Where<Recipe>,
  ): Promise<Count> {
    return this.featureRepository.recipes(id).delete(where);
  }
}
