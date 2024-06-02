const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Replace 'us-east-1' with your desired region

// Create an S3 object
const s3 = new AWS.S3();

// Define bucket and image name
const bucketName = 'mydevopspg';
const imageName = 'imagee.jpg';

// Parameters for getObject
const params = {
  Bucket: bucketName,
  Key: imageName,
};

// Download the image from S3
s3.getObject(params, (err, data) => {
  if (err) {
    console.error('Error fetching image:', err);
  } else {
    fs.writeFileSync('imagee_downloaded.jpg', data.Body); // Save image to local file
    console.log('Image downloaded successfully');
  }
});
