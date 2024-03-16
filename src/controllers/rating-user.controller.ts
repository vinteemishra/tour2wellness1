import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Rating,
  User,
} from '../models';
import {RatingRepository} from '../repositories';

export class RatingUserController {
  constructor(
    @repository(RatingRepository)
    public ratingRepository: RatingRepository,
  ) { }

  @get('/ratings/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Rating',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Rating.prototype.id,
  ): Promise<User> {
    return this.ratingRepository.user(id);
  }
}
