const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const fs = require('fs')

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.AWS_REGION; // Consistent variable naming
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    region,
    accessKeyId, // Correct key name
    secretAccessKey,
});

function uploadFile(file) {
    const fileStrem = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStrem,
        Key: file.filename, // Consistent key naming
    };

    return s3.upload(uploadParams).promise()
        .then(data => {
            console.log("File uploaded successfully", data);
            return data;
        })
        .catch(err => {
            console.error("File upload failed", err);
            throw err;
        });
}

module.exports = { uploadFile };
