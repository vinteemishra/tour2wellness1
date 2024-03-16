import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {User, UserRelations, Patient} from '../models';
import {PatientRepository} from './patient.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly patients: HasManyRepositoryFactory<Patient, typeof User.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(User, dataSource);
    this.patients = this.createHasManyRepositoryFactoryFor('patients', patientRepositoryGetter,);
    this.registerInclusionResolver('patients', this.patients.inclusionResolver);
  }
}
