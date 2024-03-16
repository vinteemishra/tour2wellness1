import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {HtDbMgDataSource} from '../datasources';
import {BlogContent, BlogContentRelations, Blog} from '../models';
import {BlogRepository} from './blog.repository';

export class BlogContentRepository extends DefaultCrudRepository<
  BlogContent,
  typeof BlogContent.prototype.id,
  BlogContentRelations
> {

  public readonly blog: BelongsToAccessor<Blog, typeof BlogContent.prototype.id>;

  constructor(
    @inject('datasources.ht_db_mg') dataSource: HtDbMgDataSource, @repository.getter('BlogRepository') protected blogRepositoryGetter: Getter<BlogRepository>,
  ) {
    super(BlogContent, dataSource);
    this.blog = this.createBelongsToAccessorFor('blog', blogRepositoryGetter,);
    this.registerInclusionResolver('blog', this.blog.inclusionResolver);
  }
}
