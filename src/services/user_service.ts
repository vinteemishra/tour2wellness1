// import {MyUserService} from '@loopback/authentication-jwt';

import{UserService} from '@loopback/authentication';
import {Credentials, UserSignupRepository} from '../repositories/user-signup.repository';
import { UserSignup } from '../models';
import {UserProfile} from '@loopback/security';
import {repository} from '@loopback/repository';
import {BcyptHasher} from './encrypt_password';
import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import { injectable } from '@loopback/context';
// import { Credentials } from '@loopback/authentication-jwt';

// import {UserProfile} from '@loopback/authentication';

@injectable()
export class MyUserService implements UserService<UserSignup,Credentials>{
  constructor(
    @repository(UserSignupRepository)
    public userRepository:UserSignupRepository,
    @inject('service.hasher')
    public hasher:BcyptHasher
  ){}
  async verifyCredentials(credentials: Credentials): Promise<UserSignup> {
    console.log('Verifying credentials:', credentials);
    console.log("bye");
    const foundUser=await this.userRepository.findOne({
      where:{
        email:credentials.email,

      },


    });console.log(foundUser)
    console.log("email");
    console.log('Found user:', foundUser);
    console.log(credentials.email)


    console.log("hiii")
    if(!foundUser){
      throw new HttpErrors.NotFound('user not found with this ${credentials.email}',
      );
    }

    const passwordMached=await this.hasher.comparePassword(
      credentials.password,
      foundUser.password,
    );
    if(!passwordMached){
      throw new HttpErrors.Unauthorized('password is not valid');
    }
    console.log("bye");
    return foundUser;

  }

  convertToUserProfile(
    user: UserSignup,
    ): import('@loopback/security').UserProfile{

      throw new Error('Method not implemented');
    }


  }




