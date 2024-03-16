import {model, property, belongsTo} from '@loopback/repository';
// import {Blog} from '.';
import {Blog} from './blog.model';

@model()
export class BlogContent extends Blog {
  @property({
    type: 'string',
    required: true,
  })
  topic: string;

  @property({
    type: 'string',
    required: true,
  })
  topic_desc: string;

  @property({
    type: 'boolean',
    required: true,
  })
  focus: boolean;

  @property({
    type: 'boolean',
  })
  image?: boolean;

  @property({
    type: 'string',
  })
  image_path?: string;

  @belongsTo(() => Blog)
  blogId: string;

  constructor(data?: Partial<BlogContent>) {
    super(data);
  }
}

export interface BlogContentRelations {
  // describe navigational properties here
}

export type BlogContentWithRelations = BlogContent & BlogContentRelations;
