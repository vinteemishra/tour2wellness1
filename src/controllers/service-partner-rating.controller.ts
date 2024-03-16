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
  Rating,
  ServicePartner,
} from '../models';
import {ServicePartnerRepository} from '../repositories';
import {generateUId} from '../utils';

export class ServicePartnerRatingController {
  constructor(
    @repository(ServicePartnerRepository) protected servicePartnerRepository: ServicePartnerRepository,
  ) { }

  @get('/service-partners/{id}/ratings', {
    responses: {
      '200': {
        description: 'Array of ServicePartner has many Rating',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rating)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rating>,
  ): Promise<Rating[]> {
    return this.servicePartnerRepository.ratings(id).find(filter);
  }

  @post('/service-partners/{id}/ratings', {
    responses: {
      '200': {
        description: 'ServicePartner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rating)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ServicePartner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {
            title: 'NewRatingInServicePartner',
            exclude: ['id'],
            optional: ['servicePartnerId']
          }),
        },
      },
    }) rating: Rating,
  ): Promise<Rating> {
    rating.id = generateUId();
    rating.createdOn = new Date();
    return this.servicePartnerRepository.ratings(id).create(rating);
  }

  @patch('/service-partners/{id}/ratings', {
    responses: {
      '200': {
        description: 'ServicePartner.Rating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Partial<Rating>,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return this.servicePartnerRepository.ratings(id).patch(rating, where);
  }

  @del('/service-partners/{id}/ratings', {
    responses: {
      '200': {
        description: 'ServicePartner.Rating DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return this.servicePartnerRepository.ratings(id).delete(where);
  }
}
