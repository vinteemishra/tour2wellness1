import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Hospital} from '../models';
import {HospitalRepository} from '../repositories';
import {PaginationMixin, PaginationOptions} from '../pagination.mixin'; // Adjust the import path accordingly
import {inject} from '@loopback/context';
import {Request, RestBindings} from '@loopback/rest';
import * as path from 'path';
import {promisify} from 'util';
import {exec} from 'child_process';


const execAsync: (command: string) => Promise<{stdout: string, stderr: string}> = promisify(exec);







export class HospitalController extends PaginationMixin {
  constructor(
    @inject('repositories.HospitalRepository') protected hospitalRepository: HospitalRepository, @inject(RestBindings.Http.REQUEST) private request: Request,

  ) {
    super();
  }
  public hospitalToUpdate: Hospital;

  getPaginationOptions(request: Request): PaginationOptions {

    return super.getPaginationOptions(request);
  }
  @inject('options') options: PaginationOptions;

  @patch('/update-signed-urls')
  @response(200, {
    description: 'Update signed URLs for existing hospitals',
  })
  async updateSignedUrls(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {partial: true}),
        },
      },
    })
    hospital: Hospital,
    @param.where(Hospital) where?: Where<Hospital>,
  ): Promise<Count> {

    const {Storage} = require('@google-cloud/storage');
    let projectId = "silent-venture-405711";
    // let keyfilename = path.join(__dirname, '..', 'mykey.json');
    let keyfilename = path.join("C://Users//nitis//wellness1//src//mykey.json");
    console.log("hello");

    const storage = new Storage({
      projectId,
      keyfilename,
    });
    const bucketName = 'tour2wellness_bucket';
    let signedUrl: string | undefined;


    console.log("keyfilename",keyfilename,);



    // Get all hospitals from the database
    const hospitals = await this.hospitalRepository.find();


    // Iterate through each hospital and update the signedImageUrl
    for (const hospitalToUpdate of hospitals) {
      const signedUrls = [];



      if (hospitalToUpdate.image) {
        const filenametosave = `hospital_images/${hospitalToUpdate.id}.png`;
        console.log("helllo",);
        if (hospitalToUpdate.id=="658bf2d6fab03130acd32a71"){
          console.log("gotit")
        }

        try {

          // Use gsutil to generate the signed URL
          const gsutilCommand = `gsutil signurl -d 7d ${keyfilename} gs://${bucketName}/${filenametosave}`;
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


        hospitalToUpdate.image = signedUrls[0];
        await this.hospitalRepository.updateById(hospitalToUpdate.id, hospitalToUpdate);



        // await storage.bucket(bucketName).file(filenametosave).save(Buffer.from(hospitalToUpdate.image, 'base64'));
      }
      // Modify this section to generate the signed URL based on your requirements
      // For demonstration, let's assume you have a method getSignedUrl() that returns the signed URL
      // const signedUrl = await this.getSignedUrl();

      // Update the image property with the signed URL

      // Save the updated hospital
      // await this.hospitalRepository.updateById(hospitalToUpdate.id, hospitalToUpdate);
    }

    // Return a value to satisfy TypeScript
    return {count: hospitals.length} as Count;
  }


  @get('/hospitals')
  @response(200, {
    description: 'Array of Hospital model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hospital, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Hospital) filter?: Filter<Hospital>,
    @param.query.number('limit') limit?: number,
    @param.query.number('offset') offset?: number,
  ): Promise<Hospital[]> {

    const paginationOptions: PaginationOptions = this.getPaginationOptions(this.request);


    limit = limit || paginationOptions.limit;
    offset = offset || paginationOptions.offset;
    if (!filter) {
      filter = {};
    }
    filter.order = ['hospitalName ASC'];


    const result = await this.hospitalRepository.find({
      ...filter,
      limit,
      offset,
    });

    return result;
  }

}

