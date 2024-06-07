# Secure Image Upload and Access in S3 for Node.js Application Only.

Now, I will upload an image to an S3 bucket, ensuring the bucket is kept private. 
The image will be configured to be exclusively accessible by my Node.js application, preventing any other service from using it.

So, to acheive the above task follow the steps below:

### 1. Install the AWS SDK

```bash
npm install aws-sdk
```

### 2. Update your node.js app

Here, I have updated my `server.js` app, to fetch the S3 image in my app.

```js
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const port = 3000;

// Configure the AWS region and credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your_AWS_ACCESS_KEY_ID', // Use environment variables for security
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your_AWS_SECRET_ACCESS_KEY',
  region: 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = 'mydevopspg'; [my S3 bucket name]
const objectKey = 'imagee.jpg'; // Path to your image in the bucket ["imagee" is my image name uploaded in S3 bucket]

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the S3 Image Server!');
});

// Define a route for fetching the image
app.get('/image', (req, res) => {
  const params = {
    Bucket: bucketName,
    Key: objectKey
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching image from S3');
    } else {
      res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your image type
      res.send(data.Body);
    }
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});

```

### 3. Test your S3 Image locally

To test if your S3 image is being fetched from AWS console on your local machine, you can check by running this locally.
Run:

```
node server.js
```

Then route to `/image` in the URL.


