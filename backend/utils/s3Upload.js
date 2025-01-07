const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

// AWS S3 configuration
const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload file to S3
const uploadToS3 = async (localFilePath, bucketName, keyName) => {
  try {
    const fileStream = fs.createReadStream(localFilePath);

    // Add 'blogs/' folder prefix to the S3 key
    const s3Key = `blogs/${keyName}`;

    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Body: fileStream,
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    console.log('File uploaded successfully:', response);
    return `https://${bucketName}.s3.${s3Client.config.region}.amazonaws.com/${s3Key}`;
  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw err;
  }
};

module.exports = uploadToS3;
