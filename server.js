const http = require('http');
const os = require('os');
const AWS = require('aws-sdk');

// Configure AWS SDK [Here You need to specify your AWS region; access & secret access keys if not running the code on AWS and using outside cloud editor or locally.]
AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.EC2MetadataCredentials({
    httpOptions: { timeout: 5000 },
    maxRetries: 10,
  }),
});

const s3 = new AWS.S3();

// Define the bucket and key for the image
const bucketName = 'mydevopspg';
const imageName = 'imagee.jpg';

const hostname = '0.0.0.0';  // Change to listen on all network interfaces
const port = 3000;

const server = http.createServer((req, res) => {
  const interfaces = os.networkInterfaces();
  let ip = 'Unknown';
  Object.keys(interfaces).forEach((key) => {
    interfaces[key].forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        ip = iface.address;
      }
    });
  });

  if (req.url === '/') {
    // Fetch the image from S3
    const params = {
      Bucket: bucketName,
      Key: imageName,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.error(`Error fetching image: ${err.message}`);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Welcome</h1><p>This server is hosted at IP address: ${ip}</p><p>Error fetching image: ${err.message}</p>`);
      } else {
        // Convert image data to base64 to embed directly in HTML
        const base64Image = Buffer.from(data.Body).toString('base64');
        const imageDataUri = `data:image/jpeg;base64,${base64Image}`;

        // Send HTML response with text and image
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Welcome</h1><p>This server is hosted at IP address: ${ip}</p><img src="${imageDataUri}" alt="S3 Image" />`);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
