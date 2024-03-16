import { inject } from '@loopback/context';
import { Request } from '@loopback/rest';

export interface PaginationOptions {
  limit: number;
  offset: number;
}

export class PaginationMixin {
  @inject('options') options: PaginationOptions; 

  getPaginationOptions(request: Request): PaginationOptions {
    const limit = Number(request.query.limit) || this.options.limit || 10;
    const offset = Number(request.query.offset) || this.options.offset || 0;

    return { limit, offset };
  }
}
