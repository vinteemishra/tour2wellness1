import {inject} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';



interface PasswordHasher<T = string> {
  HashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>;

}

export class BcyptHasher implements PasswordHasher<string>{
  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordMached = await compare(providedPass, storedPass);
    console.log(passwordMached)
    console.log("hi")
    return passwordMached;

  }
  @inject('rounds')
  public readonly rounds: number;
  round: number = 10;
  async HashPassword(password: string) {
    const salt = await genSalt(this.rounds);
    return await hash(password, salt);


  }
}
