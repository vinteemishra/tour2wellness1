import {Entity, model, property,hasMany} from '@loopback/repository';
import {BlogContent} from './blog-content.model';

@model()
export class Blog extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string|undefined;

  @property({
    type: 'string',
    required: true,
  })
  blog_header: string;

  @property({
    type: 'string',
    required: true,
  })
  about: string;

  @property({
    type: 'string',
  })
  blog_image?: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
  })
  author_profile?: string;

  @property({
    type: 'string',
    required: true,
  })
  published_date: string;

  @property({
    type: 'string',
    default: 3,
  })
  rating?: string;

  @property({
    type: 'string',
    default: 5,
  })
  priority?: string;

  @property({
    type: 'string',
    required: true,
  })
  tag: string;

  // @property({
  //   type: 'object',
  //   required: true,
  // })
  // content: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  content: object[];

  // @hasMany(() => BlogContent, {keyTo: 'blogId'})
  // blogContents?: BlogContent[];








  constructor(data?: Partial<Blog>) {
    super(data);
  }
}

export interface BlogRelations {
  // describe navigational properties here
}

export type BlogWithRelations = Blog & BlogRelations;
