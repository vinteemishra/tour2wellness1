import {
  repository,
  Filter
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BlogContent,
  Blog,
} from '../models';
import {BlogContentRepository} from '../repositories';

export class BlogContentBlogController {
  constructor(
    @repository(BlogContentRepository)
    public blogContentRepository: BlogContentRepository,
  ) { }

  @get('/blog-contents', {
    responses: {
      '200': {
        description: 'Array of Blog contents',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(BlogContent),
            },
          },
        },
      },
    },
  })
  async getAllBlogContents(
    @param.filter(BlogContent) filter?: Filter<BlogContent>,
  ): Promise<BlogContent[]> {
    const blogContents = await this.blogContentRepository.find(filter || {});
    console.log("blogContents",blogContents)
    return blogContents || [];
  }


  @get('/blog-contents/{id}/blog', {
    responses: {
      '200': {
        description: 'Blog belonging to BlogContent',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Blog),
          },
        },
      },
    },
  })
  async getBlog(
    @param.path.string('id') id: typeof BlogContent.prototype.id,
  ): Promise<Blog> {
    console.log(this.blogContentRepository.blog(id))
    return this.blogContentRepository.blog(id);
  }
}
