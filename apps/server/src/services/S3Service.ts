import { ReadStream } from 'fs';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { nanoid } from 'nanoid';
import logger from '../utils/logger';

interface S3Object {
  ETag: string;
  Location: string;
  Key: string;
  Bucket: string;
  filename: string;
}

// interface FileResponse {
//   filename: string;
//   mimeType: string;
//   encoding: string;
//   url: string;
// }

// const awsConfig = AWS.config.update({
//   signatureVersion: 's3v4',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

const s3 = new S3({
  params: { Bucket: process.env.AWS_BUCKET_NAME },
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

type S3Key = 'post' | 'project' | 'user';

const s3DefaultParams = {
  ACL: 'public-read',
  Bucket: process.env.AWS_BUCKET_NAME,
  Conditions: [
    ['content-length-range', 0, 6291456], // 6 Mb
    { acl: 'public-read' },
  ],
};

const S3Service = {
  uploadImage: async (
    createReadStream: () => ReadStream,
    filename: string,
    key: S3Key,
  ): Promise<S3Object | null> => {
    const filenameWithEntropy = `${filename}-${nanoid()}`;

    const params: PutObjectRequest = {
      ...s3DefaultParams,
      Key: `${key}/${filenameWithEntropy}`,
      Body: createReadStream(),
    };

    try {
      const image = await s3.upload(params).promise();

      return {
        Bucket: image.Bucket,
        ETag: image.ETag,
        filename: filenameWithEntropy,
        Key: image.Key,
        Location: image.Location,
      };
    } catch (e) {
      logger.error(
        `Error uploading image ${filename} to S3 bucket: ${process.env.AWS_BUCKET_NAME}`,
        e,
      );
    }
    return null;
  },
  deleteImage: async (key: S3Key, filename: string): Promise<void> => {
    const params: PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${key}/${filename}`,
    };

    try {
      await s3.deleteObject(params).promise();
    } catch (e) {
      logger.error(
        `Error deleting image ${key} from S3 bucket: ${process.env.AWS_BUCKET_NAME}`,
        e,
      );
    }
  },
};

export default S3Service;
