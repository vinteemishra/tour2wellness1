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
  Subscription,
  Recipe,
} from '../models';
import {SubscriptionRepository} from '../repositories';

export class SubscriptionRecipeController {
  constructor(
    @repository(SubscriptionRepository) protected subscriptionRepository: SubscriptionRepository,
  ) { }

  @get('/subscriptions/{id}/recipes', {
    responses: {
      '200': {
        description: 'Array of Subscription has many Recipe',
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
    return this.subscriptionRepository.recipes(id).find(filter);
  }

  @post('/subscriptions/{id}/recipes', {
    responses: {
      '200': {
        description: 'Subscription model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recipe)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Subscription.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {
            title: 'NewRecipeInSubscription',
            exclude: ['id'],
            optional: ['subscriptionId']
          }),
        },
      },
    }) recipe: Omit<Recipe, 'id'>,
  ): Promise<Recipe> {
    return this.subscriptionRepository.recipes(id).create(recipe);
  }

  @patch('/subscriptions/{id}/recipes', {
    responses: {
      '200': {
        description: 'Subscription.Recipe PATCH success count',
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
    return this.subscriptionRepository.recipes(id).patch(recipe, where);
  }

  @del('/subscriptions/{id}/recipes', {
    responses: {
      '200': {
        description: 'Subscription.Recipe DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recipe)) where?: Where<Recipe>,
  ): Promise<Count> {
    return this.subscriptionRepository.recipes(id).delete(where);
  }
}
