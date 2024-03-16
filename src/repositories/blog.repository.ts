import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {Blog, BlogRelations,BlogContent} from '../models';
import {Getter} from '@loopback/core';
import {repository, HasManyRepositoryFactory} from '@loopback/repository';
import { BlogContentRepository } from './blog-content.repository';


export class BlogRepository extends DefaultCrudRepository<
  Blog,
  typeof Blog.prototype.id,
  BlogRelations
> {
  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
    @repository.getter(BlogContentRepository) protected blogContentRepositoryGetter: Getter<BlogContentRepository>,

  ) {
    super(Blog, dataSource);
  }
}

// export class BlogRepository extends DefaultCrudRepository<
//   Blog,
//   typeof Blog.prototype.id
// > {
//   public readonly blogContents: HasManyRepositoryFactory<BlogContent, typeof Blog.prototype.id>;

//   constructor(
//     @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource,
//     @repository.getter(BlogContentRepository) protected blogContentRepositoryGetter: Getter<BlogContentRepository>,
//   ) {
//     super(Blog, dataSource);
//     this.blogContents = this.createHasManyRepositoryFactoryFor('blogContents', blogContentRepositoryGetter);
//   }

//   async getBlogContentImagePath(blogId: string): Promise<string | undefined> {
//     const blog = await this.findById(blogId, {
//       include: [{relation: 'blogContents'}],
//     });

//     if (!blog || !blog.content || blog.content.length === 0) {
//       return undefined;
//     }

//     // Assuming a blog can have multiple blogContents, here we are just taking the first one
//     const firstBlogContent = blog.content[0];

//     // Accessing the image_path field of BlogContent
//     // return firstBlogContent.image_path;
//   }
// }
