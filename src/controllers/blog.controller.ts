import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Buffer} from 'buffer'; // Import the Buffer module
import {exec} from 'child_process';
import {promisify} from 'util';
import {Blog, BlogContent} from '../models';
import {BlogContentRepository, BlogRepository, } from '../repositories';

const execAsync: (command: string) => Promise<{stdout: string, stderr: string}> = promisify(exec);





export class BlogController {
  constructor(
    @repository(BlogRepository)
    public blogRepository: BlogRepository,
    @repository(BlogContentRepository) private blogContentRepository: BlogContentRepository,

  ) { }

  @post('/blogs')
  @response(200, {
    description: 'Blog created successfully',
    content: {'application/json': {schema: getModelSchemaRef(Blog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {
            title: 'NewBlog',
            exclude: ['id'],
          }),
        },
      },
    })
    blog: Omit<Blog, 'id'>,

  ): Promise<Blog> {
    // const { blog_image, ...blogWithoutImage } = blog;
    const savedblog = await this.blogRepository.create(blog);
    // console.log("hi",(savedblog.content[0] as BlogContent)?.image_path)


    const {Storage} = require('@google-cloud/storage');
    let projectId = "silent-venture-405711";
    let keyfilename = "C://Users//nitis//wellness1//src//mykey.json";
    const storage = new Storage({
      projectId,
      keyfilename,

    });

    const bucketName = 'tour2wellness_bucket';
    const filename = `asset/blog/${savedblog.id}.png`;
    let signedUrl: string | undefined;
    let signedUrl1: string | undefined;
    const signedUrls = [];










    console.log("filename", filename)
    if (blog.blog_image) {
      await storage.bucket(bucketName).file(filename).save(Buffer.from(blog.blog_image, 'base64'));
      // const gsutilCommand = `gsutil signurl -d 10m ${keyfilename} gs://${bucketName}/${filename}`;
      // const { stdout } = await execAsync(gsutilCommand);
      // console.log('Signed URL:', stdout.trim());

      try {
        // Use gsutil to generate the signed URL
        const gsutilCommand = `gsutil signurl -d 100m ${keyfilename} gs://${bucketName}/${filename}`;
        const result = await execAsync(gsutilCommand);

        const stdout = result.stdout.trim();
        console.log('Signed URL:', stdout);

        // Use a regular expression to extract the signed URL with query parameters
        const urlRegex = /https:\/\/storage\.googleapis\.com\/[^\s]+/g;
        // const signedUrls = [];
        let match;

        while ((match = urlRegex.exec(stdout)) !== null) {
          signedUrls.push(match[0]);
        }

        if (signedUrls.length > 0) {

          console.log('Extracted Signed URLs:', signedUrls[0]);
        } else {
          console.error('Signed URLs not found in stdout');
        }



        signedUrl = stdout;



        console.log("hii", signedUrl)
      } catch (error) {
        console.error('Error generating signed URL:', error.message);
      }


      console.log("filename", filename);
      const imagePath = signedUrls

      console.log("key", keyfilename)
      console.log("hii", signedUrl)



      // const expiration = Date.now() + 5 * 60;


      // const signedUrl = await storage.bucket(bucketName).file(filename).getSignedUrl({
      //   action: 'read',
      //   expires: expiration,
      // });

      // console.log('Signed URL:', signedUrl[0]);

      // return signedUrl[0];

      try {
        savedblog.blog_image = signedUrls[0];
        await this.blogRepository.update(savedblog);
      } catch (error) {
        console.error('Error updating blog image:', error);
      }


    }


    const content = savedblog.content;
    const urlRegex = /https:\/\/storage\.googleapis\.com\/[^\s]+/g;


    for (let i = 0; i < content.length; i++) {
      const signedUrls1 = [];

      const filename1 = `asset/blog/content/${i}/${savedblog.id}.png`

      const contentItem = content[i] as BlogContent | undefined;
      const image_path = contentItem?.image_path

      if (image_path) {
        await storage.bucket(bucketName).file(filename1).save(Buffer.from(image_path, 'base64'));
        try {

          const gsutilCommand1 = `gsutil signurl -d 100m ${keyfilename} gs://${bucketName}/${filename1}`;
          const result1 = await execAsync(gsutilCommand1);

          const stdout1 = result1.stdout.trim();
          console.log('Signed URL:', stdout1);

          let match;

          while ((match = urlRegex.exec(stdout1)) !== null) {
            signedUrls1.push(match[0]);
          }

          if (signedUrls1.length > 0) {

            console.log('Extracted Signed URLs:', signedUrls1[0]);
          } else {
            console.error('Signed URLs not found in stdout');
          }



          signedUrl1 = stdout1;



          console.log("hiii", signedUrls1[0])
        } catch (error) {
          console.error('Error generating signed URL:', error.message);
        }

        console.log("filename", filename1);
        const imagePath1 = `https://storage.cloud.google.com/${bucketName}/${filename1}`;

        try {
          contentItem.image_path = signedUrls1[0];
          await this.blogRepository.update(savedblog);
        } catch (error) {
          console.error('Error updating blog image:', error);
        }
      }
    }





    return blog
  }

  @get('/blogs/count')
  @response(200, {
    description: 'Blog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Blog) where?: Where<Blog>,
  ): Promise<Count> {
    return this.blogRepository.count(where);
  }

  @get('/blogs')
  @response(200, {
    description: 'Array of Blog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Blog, {includeRelations: true}),

        },
      },
    },
  })
  async find(
    @param.filter(Blog) filter?: Filter<Blog>,
  ): Promise<Blog[]> {
    console.log("hello");
    return this.blogRepository.find(filter);
  }

  @patch('/blogs')
  @response(200, {
    description: 'Blog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {partial: true}),
        },
      },
    })
    blog: Blog,
    @param.where(Blog) where?: Where<Blog>,
  ): Promise<Count> {
    return this.blogRepository.updateAll(blog, where);
  }

  @get('/blogs/{id}')
  @response(200, {
    description: 'Blog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Blog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Blog, {exclude: 'where'}) filter?: FilterExcludingWhere<Blog>
  ): Promise<Blog> {
    return this.blogRepository.findById(id, filter);
  }

  @patch('/blogs/{id}')
  @response(204, {
    description: 'Blog PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {partial: true}),
        },
      },
    })
    blog: Blog,
  ): Promise<void> {
    await this.blogRepository.updateById(id, blog);
  }

  @put('/blogs/{id}')
  @response(204, {
    description: 'Blog PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() blog: Blog,
  ): Promise<void> {
    await this.blogRepository.replaceById(id, blog);
  }

  @del('/blogs/{id}')
  @response(204, {
    description: 'Blog DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.blogRepository.deleteById(id);
  }
}
