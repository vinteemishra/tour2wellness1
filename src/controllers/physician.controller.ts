import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Physician} from '../models';
import {PhysicianRepository} from '../repositories';
import {generateUId} from '../utils';

export class PhysicianController {
  constructor(
    @repository(PhysicianRepository)
    public physicianRepository : PhysicianRepository,
  ) {}

  @post('/physicians')
  @response(200, {
    description: 'Physician model instance',
    content: {'application/json': {schema: getModelSchemaRef(Physician)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Physician, {
            title: 'NewPhysician',
            exclude:['id', 'createdOn', 'status'],

          }),
        },
      },
    })
    physician: Physician,
  ): Promise<Physician> {
    physician.id = generateUId();
    physician.createdOn = new Date();
    return this.physicianRepository.create(physician);
  }

  @get('/physicians/count')
  @response(200, {
    description: 'Physician model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Physician) where?: Where<Physician>,
  ): Promise<Count> {
    return this.physicianRepository.count(where);
  }

  @get('/physicians')
  @response(200, {
    description: 'Array of Physician model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Physician, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Physician) filter?: Filter<Physician>,
  ): Promise<Physician[]> {
    return this.physicianRepository.find(filter);
  }

  @patch('/physicians')
  @response(200, {
    description: 'Physician PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Physician, {partial: true}),
        },
      },
    })
    physician: Physician,
    @param.where(Physician) where?: Where<Physician>,
  ): Promise<Count> {
    return this.physicianRepository.updateAll(physician, where);
  }

  @get('/physicians/{id}')
  @response(200, {
    description: 'Physician model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Physician, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Physician, {exclude: 'where'}) filter?: FilterExcludingWhere<Physician>
  ): Promise<Physician> {
    return this.physicianRepository.findById(id, filter);
  }

  @patch('/physicians/{id}')
  @response(204, {
    description: 'Physician PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Physician, {partial: true}),
        },
      },
    })
    physician: Physician,
  ): Promise<void> {
    await this.physicianRepository.updateById(id, physician);
  }

  @put('/physicians/{id}')
  @response(204, {
    description: 'Physician PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() physician: Physician,
  ): Promise<void> {
    await this.physicianRepository.replaceById(id, physician);
  }

  @del('/physicians/{id}')
  @response(204, {
    description: 'Physician DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.physicianRepository.deleteById(id);
  }
}
