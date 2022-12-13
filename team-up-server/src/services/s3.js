require("dotenv").config();
import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export async function uploadProfilePic(file, userId) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: "profile/" + userId.toString() + "/" + file.originalname,
  };
  return await s3.upload(uploadParams).promise();
}
