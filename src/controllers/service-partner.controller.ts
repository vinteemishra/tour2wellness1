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
import {ServicePartner} from '../models';
import {ServicePartnerRepository} from '../repositories';
import {generateUId} from '../utils';

export class ServicePartnerController {
  constructor(
    @repository(ServicePartnerRepository)
    public servicePartnerRepository : ServicePartnerRepository,
  ) {}

  @post('/service-partners')
  @response(200, {
    description: 'ServicePartner model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServicePartner)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePartner, {
            exclude:['id', 'createdOn'],
            title: 'NewServicePartner',

          }),
        },
      },
    })
    servicePartner: ServicePartner,
  ): Promise<ServicePartner> {
    servicePartner.id = generateUId();
    servicePartner.createdOn = new Date ();
    return this.servicePartnerRepository.create(servicePartner);
  }

  @get('/service-partners/count')
  @response(200, {
    description: 'ServicePartner model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServicePartner) where?: Where<ServicePartner>,
  ): Promise<Count> {
    return this.servicePartnerRepository.count(where);
  }

  @get('/service-partners')
  @response(200, {
    description: 'Array of ServicePartner model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServicePartner, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServicePartner) filter?: Filter<ServicePartner>,
  ): Promise<ServicePartner[]> {
    return this.servicePartnerRepository.find(filter);
  }

  @patch('/service-partners')
  @response(200, {
    description: 'ServicePartner PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePartner, {partial: true}),
        },
      },
    })
    servicePartner: ServicePartner,
    @param.where(ServicePartner) where?: Where<ServicePartner>,
  ): Promise<Count> {
    return this.servicePartnerRepository.updateAll(servicePartner, where);
  }

  @get('/service-partners/{id}')
  @response(200, {
    description: 'ServicePartner model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServicePartner, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ServicePartner, {exclude: 'where'}) filter?: FilterExcludingWhere<ServicePartner>
  ): Promise<ServicePartner> {
    return this.servicePartnerRepository.findById(id, filter);
  }

  @patch('/service-partners/{id}')
  @response(204, {
    description: 'ServicePartner PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePartner, {partial: true}),
        },
      },
    })
    servicePartner: ServicePartner,
  ): Promise<void> {
    await this.servicePartnerRepository.updateById(id, servicePartner);
  }

  @put('/service-partners/{id}')
  @response(204, {
    description: 'ServicePartner PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() servicePartner: ServicePartner,
  ): Promise<void> {
    await this.servicePartnerRepository.replaceById(id, servicePartner);
  }

  @del('/service-partners/{id}')
  @response(204, {
    description: 'ServicePartner DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.servicePartnerRepository.deleteById(id);
  }
}
