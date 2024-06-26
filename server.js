const AWS = require('aws-sdk');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configure the AWS region and credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = 'mydevopspg';
const objectKey = 'imagee.jpg';

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

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
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(data.Body);
    }
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
