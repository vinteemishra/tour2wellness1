import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ht_db_mg',
  connector: 'mongodb',
  url: 'mongodb://myUserAdmin:Adminis%40123456@34.125.110.159:27017\/medtourism?authMechanism=DEFAULT&authSource=admin',
  // host: '127.0.0.1',
  // port: 27017,
  // user: 'ht_admin',
  // password: 'passW0rd',
  // database: 'medtourism',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class HtDbMgDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ht_db_mg';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ht_db_mg', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
