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
  Physician,
  Rating,
} from '../models';
import {PhysicianRepository} from '../repositories';
import {generateUId} from '../utils';

export class PhysicianRatingController {
  constructor(
    @repository(PhysicianRepository) protected physicianRepository: PhysicianRepository,
  ) { }

  @get('/physicians/{id}/ratings', {
    responses: {
      '200': {
        description: 'Array of Physician has many Rating',
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
    return this.physicianRepository.ratings(id).find(filter);
  }

  @post('/physicians/{id}/ratings', {
    responses: {
      '200': {
        description: 'Physician model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rating)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Physician.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {
            title: 'NewRatingInPhysician',
            exclude: ['id', 'createdOn'],
            optional: ['physicianId']
          }),
        },
      },
    }) rating: Rating,
  ): Promise<Rating> {
    rating.id = generateUId();
    rating.createdOn = new Date();
    return this.physicianRepository.ratings(id).create(rating);
  }

  @patch('/physicians/{id}/ratings', {
    responses: {
      '200': {
        description: 'Physician.Rating PATCH success count',
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
    return this.physicianRepository.ratings(id).patch(rating, where);
  }

  @del('/physicians/{id}/ratings', {
    responses: {
      '200': {
        description: 'Physician.Rating DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return this.physicianRepository.ratings(id).delete(where);
  }
}
