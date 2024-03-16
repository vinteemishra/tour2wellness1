
import {join} from 'path';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication,RestBindings} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {BcyptHasher} from './services/encrypt_password';
import {MyUserService} from './services/user_service';
import {HtDbMgDataSource} from './datasources';
export {ApplicationConfig};
import {
  SECURITY_SCHEME_SPEC,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {Storage} from '@google-cloud/storage';
const corsOptions: Object = {
  // origin: ['https://tour2wellness.com'],
  origin: ['*'],

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};








export class HtApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.configure('cors').to(corsOptions);



    // set up bindings
    this.setupBinding();


    // this.bind('storage.keyFile').to('GOOG1EA4H5LVLF2XHXKSUB3OGQRGOMAXN3JYLDQ7F4LVZGS4FXTOAW77OPHPT');
    // this.bind('storage.bucketName').to('tour2wellness_bucket');
    // const gcsCredentials = {
    //   private_key: 'GOOG1EA4H5LVLF2XHXKSUB3OGQRGOMAXN3JYLDQ7F4LVZGS4FXTOAW77OPHPT',
    //   client_email: 'vintee.afidigital@gmail.com',
    //   project_id: 'silent-venture-405711',
    // };
    // const storage = new Storage({
    //   credentials: gcsCredentials,
    // });
    // this.bind('services.GoogleCloudStorage').to(storage);
    this.bind('storage.keyFile').to(path.join(__dirname,'../mykey.json'))
    this.bind('storage.bucketName').to('tour2wellness_bucket');
    this.bind('options').to({ limit: 10, offset: 0 });


    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    this.dataSource(HtDbMgDataSource, UserServiceBindings.DATASOURCE_NAME);
  }
  setupBinding(): void {
    this.bind('service.hasher').toClass(BcyptHasher);
    this.bind('rounds').to(10);
    this.bind('services.user_service').toClass(MyUserService);


  }

}
