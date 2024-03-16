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
  Patient,
  User,
} from '../models';
import {UserRepository} from '../repositories';
import {generateUId} from '../utils';

export class UserPatientController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/patients', {
    responses: {
      '200': {
        description: 'Array of User has many Patient',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Patient)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Patient>,
  ): Promise<Patient[]> {
    return this.userRepository.patients(id).find(filter);
  }

  @post('/users/{id}/patients', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Patient)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {
            title: 'NewPatientInUser',
            exclude: ['id','createdOn', 'status','userId'],
          }),
        },
      },
    }) patient: Patient,
  ): Promise<Patient> {
    patient.id = generateUId();
    patient.createdOn = new Date();
    patient.status = 'Not Verified';
    return this.userRepository.patients(id).create(patient);
  }

  @patch('/users/{id}/patients', {
    responses: {
      '200': {
        description: 'User.Patient PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {partial: true}),
        },
      },
    })
    patient: Partial<Patient>,
    @param.query.object('where', getWhereSchemaFor(Patient)) where?: Where<Patient>,
  ): Promise<Count> {
    return this.userRepository.patients(id).patch(patient, where);
  }

  @del('/users/{id}/patients', {
    responses: {
      '200': {
        description: 'User.Patient DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Patient)) where?: Where<Patient>,
  ): Promise<Count> {
    return this.userRepository.patients(id).delete(where);
  }
}
