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
  response
} from '@loopback/rest';

import * as path from 'path';
import {Contactus} from '../models';
import {ContactusRepository} from '../repositories';

import {Buffer} from 'buffer'; // Import the Buffer module
import {sendEmail} from '../utils/sendmail1';
// import {sendThankYouEmail} from '../utils/sendmail1';


interface ContactusResponse {
  data: Contactus;
  status: number;
}

const buf1 = Buffer.allocUnsafe(26);


export class ContactusController {

  constructor(
    @repository(ContactusRepository)
    public contactusRepository: ContactusRepository,
  ) { }
  // attachmentBase64: string;



  @post('/contacts')
  async createContact(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              firstname: {type: 'string'},
              lastname: {type: 'string'},
              email: {type: 'string'},
              contactno: {type: 'string'},
              details: {type: 'string'},
              speciality: {type: 'string'},
              filename: {type: 'string'},
              report: {type: 'string'}, // Assuming image is a base64-encoded string
            },
          },
        },
      },
    })
    contactus: Contactus,
  ): Promise<{status: string; data: Contactus}>
  // Promise<Contactus>
  {
    const {report, ...contactData} = contactus;
    // Save the contact information to MongoDB
    const savedContact = await this.contactusRepository.create(contactData);
    const {Storage} = require('@google-cloud/storage');
    let projectId = "silent-venture-405711";
    let keyfilename = path.join(__dirname, '..', 'mykey.json');

    const storage = new Storage({
      projectId,
      keyfilename,

    });



    //Mohit - extract extention
    console.log("Filename", savedContact.toString());
    var lastindexofextdot = savedContact.filename.toString().lastIndexOf('.');
    var extension = savedContact.filename.toString().slice(lastindexofextdot + 1);
    console.log("FileExtension", extension.toString());
    const fileExtension = extension.toString();

    //console.log("contactus.report", contactus.report)
    const defaultExtension = 'txt';
    //console.log("details", contactus.details)


    if (fileExtension) {
      console.log(`File Extension: ${fileExtension}`);
    } else {
      console.error('Unable to determine file extension.');
    }

    console.log(projectId);
    console.log(keyfilename);

    // const bucketName = 'tour2wellness_bucket';
    // // const filename = `report/${savedContact.id}.png` ; // Assuming image is a PNG file
    // const filenametosave = `report/${savedContact.id}.${fileExtension || defaultExtension}`;

    // let x=storage.getBuckets();
    // console.log("hiiii",x)

    // const fileExtension = extension.toString();

    // const defaultExtension = 'txt';

    // if (fileExtension) {
    //   console.log(`File Extension: ${fileExtension}`);
    // } else {
    //   console.error('Unable to determine file extension.');
    // }

    const bucketName = 'tour2wellness_bucket';
    const filenametosave = `report/${savedContact.id}.${fileExtension || defaultExtension}`;
    if (contactus.report) {

      // await storage.bucket(bucketName).file(filenametosave).save(Buffer.from(contactus.report, 'base64'));
      // const file1 = storage.bucket(bucketName).file(filenametosave);

      await storage.bucket(bucketName).file(filenametosave).save(Buffer.from(contactus.report, 'base64'));
      const file1 = storage.bucket(bucketName).file(filenametosave);

      try {
        const [downloadedFile] = await storage.bucket(bucketName).file(filenametosave).download();
        const attachmentBase64: string = downloadedFile.toString('base64');
        // Rest of your code...
        console.log("filenametosave",filenametosave);
        console.log("attachment-base-64",attachmentBase64);

        // let emailBody = `<strong>Contact Information:</strong>\n\n`;
        let emailBody = `<p style="margin: 0; padding: 0; color: black;"><strong>Contact Information:</strong></p>\n\n`;

        for (const [key, value] of Object.entries(contactData)) {
           const style = key === 'firstname' ? 'style="margin-top: 10px; color: black;"' : 'style="margin-top: 0; color: black;"';
           emailBody += `<p ${style}><strong>${key}:</strong>&nbsp;${value}</p>\n`;
        }

        // let emailBody = `Contact Information:\n\n`;
        // for (const [key, value] of Object.entries(contactData)) {
        //    emailBody += `${key}: ${value}\n`;
        // }
        // 'info@tour2wellness.com'
        await sendEmail('info@tour2wellness.com', `Quotation of ${savedContact.firstname}`,'contact_us',  attachmentBase64, filenametosave, fileExtension, {bodyText: emailBody});

        // const thankYouEmail = savedContact.email; // Assuming email is the user's email field
        // await sendThankYouEmail(thankYouEmail, 'Thank You for Contacting Us', 'Thank you for reaching out to us. We will contact you soon.');

      } catch (error) {
        console.error('Error downloading file:', error);
        // Handle the error or log additional information.
      }


      try {
        if (file1) {
          const [fileContent] = await file1.download();
          const attachmentBase64: string = fileContent.toString('base64');

        } else {
          console.error('Error: file1 is undefined');
          // Handle the case where file1 is undefined
        }

      } catch (error) {
        console.error('Error downloading file:', error);
        // Handle the error or log additional information.
      }

    } else {
      // Handle the case where contactus.report is undefined
      console.error('Error: report is undefined');
    }
    // savedContact.report = 'https://storage.cloud.google.com/tour2wellness_bucket/{filename}';
    savedContact.report = filenametosave;

    await this.contactusRepository.updateById(savedContact.id, savedContact);

    let baseurl = 'https://storage.cloud.google.com/tour2wellness_bucket/'






    // await sendEmail('m.mathur@afidigitalservices.com', 'contact_us', 'Plz find the attachment of report', attachmentBuffer, baseurl+savedContact.report);
    // await sendEmail('vinteeshukla@gmail.com', 'contact_us', `Quotation of ${savedContact.firstname}`, attachmentBase64, savedContact.report,fileExtension, {bodyText: emailBody});


    return {status: '200', data: savedContact};


  }
//   @get('/contactus/count')
//   @response(200, {
//     description: 'Contactus model count',
//     content: {'application/json': {schema: CountSchema}},
//   })
//   async count(
//     @param.where(Contactus) where?: Where<Contactus>,
//   ): Promise<Count> {
//     return this.contactusRepository.count(where);
//   }

//   @get('/contactus')
//   @response(200, {
//     description: 'Array of Contactus model instances',
//     content: {
//       'application/json': {
//         schema: {
//           type: 'array',
//           items: getModelSchemaRef(Contactus, {includeRelations: true}),
//         },
//       },
//     },
//   })
//   async find(
//     @param.filter(Contactus) filter?: Filter<Contactus>,
//   ): Promise<Contactus[]> {
//     return this.contactusRepository.find(filter);
//   }

//   @patch('/contactus')
//   @response(200, {
//     description: 'Contactus PATCH success count',
//     content: {'application/json': {schema: CountSchema}},
//   })
//   async updateAll(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Contactus, {partial: true}),
//         },
//       },
//     })
//     contactus: Contactus,
//     @param.where(Contactus) where?: Where<Contactus>,
//   ): Promise<Count> {
//     return this.contactusRepository.updateAll(contactus, where);
//   }

//   @get('/contactus/{id}')
//   @response(200, {
//     description: 'Contactus model instance',
//     content: {
//       'application/json': {
//         schema: getModelSchemaRef(Contactus, {includeRelations: true}),
//       },
//     },
//   })
//   async findById(
//     @param.path.number('id') id: number,
//     @param.filter(Contactus, {exclude: 'where'}) filter?: FilterExcludingWhere<Contactus>
//   ): Promise<Contactus> {
//     return this.contactusRepository.findById(id, filter);
//   }

//   @patch('/contactus/{id}')
//   @response(204, {
//     description: 'Contactus PATCH success',
//   })
//   async updateById(
//     @param.path.number('id') id: number,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Contactus, {partial: true}),
//         },
//       },
//     })
//     contactus: Contactus,
//   ): Promise<void> {
//     await this.contactusRepository.updateById(id, contactus);
//   }

//   @put('/contactus/{id}')
//   @response(204, {
//     description: 'Contactus PUT success',
//   })
//   async replaceById(
//     @param.path.number('id') id: number,
//     @requestBody() contactus: Contactus,
//   ): Promise<void> {
//     await this.contactusRepository.replaceById(id, contactus);
//   }

//   @del('/contactus/{id}')
//   @response(204, {
//     description: 'Contactus DELETE success',
//   })
//   async deleteById(@param.path.number('id') id: number): Promise<void> {
//     await this.contactusRepository.deleteById(id);
//   }
 }
