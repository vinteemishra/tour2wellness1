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
import {Speciality} from '../models';
import {SpecialityRepository} from '../repositories';
import {generateUId} from '../utils';

export class SpecialityController {
  constructor(
    @repository(SpecialityRepository)
    public specialityRepository : SpecialityRepository,
  ) {}

  @post('/specialities')
  @response(200, {
    description: 'Speciality model instance',
    content: {'application/json': {schema: getModelSchemaRef(Speciality)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Speciality, {
            title: 'NewSpeciality',
            exclude : ['id', 'createdOn']
          }),
        },
      },
    })
    speciality: Speciality,
  ): Promise<Speciality> {
    speciality.id = generateUId();
    speciality.createdOn = new Date();
    return this.specialityRepository.create(speciality);
  }

  @get('/specialities/count')
  @response(200, {
    description: 'Speciality model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Speciality) where?: Where<Speciality>,
  ): Promise<Count> {
    return this.specialityRepository.count(where);
  }

  @get('/specialities')
  @response(200, {
    description: 'Array of Speciality model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Speciality, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Speciality) filter?: Filter<Speciality>,
  ): Promise<Speciality[]> {
    return this.specialityRepository.find(filter);
  }

  @patch('/specialities')
  @response(200, {
    description: 'Speciality PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Speciality, {partial: true}),
        },
      },
    })
    speciality: Speciality,
    @param.where(Speciality) where?: Where<Speciality>,
  ): Promise<Count> {
    return this.specialityRepository.updateAll(speciality, where);
  }

  @get('/specialities/{id}')
  @response(200, {
    description: 'Speciality model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Speciality, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Speciality, {exclude: 'where'}) filter?: FilterExcludingWhere<Speciality>
  ): Promise<Speciality> {
    return this.specialityRepository.findById(id, filter);
  }

  @patch('/specialities/{id}')
  @response(204, {
    description: 'Speciality PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Speciality, {partial: true}),
        },
      },
    })
    speciality: Speciality,
  ): Promise<void> {
    await this.specialityRepository.updateById(id, speciality);
  }

  @put('/specialities/{id}')
  @response(204, {
    description: 'Speciality PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() speciality: Speciality,
  ): Promise<void> {
    await this.specialityRepository.replaceById(id, speciality);
  }

  @del('/specialities/{id}')
  @response(204, {
    description: 'Speciality DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.specialityRepository.deleteById(id);
  }
}
