# Create a sample node.js page on local

To create a sample node.js page on local machine, I used VS code editor. Created a node.js page which displays **Welcome, this server is hosted on IP address <display server IP>**.

## Install Node.js

Firstly, if you haven't installed node.js on your system, you can download it from [node.js official site](https://nodejs.org/en) and install it.

## Create your app file and install dependencies.

- Create a new directory and navigate into your created project directory and run `npm init` and follow the prompts to create a `package.json` file. This will contain info about your project and it's dependencies.
- Create a file `server.js` with the following code.

```js
const http = require('http');                         
const os = require('os');                            
// const hostname = '127.0.0.1';                         
const hostname = '0.0.0.0';  // Change to listen on all network interfaces
const port = 3000;                                 

const server = http.createServer((req, res) => {              
  res.statusCode = 200;                                      
  res.setHeader('Content-Type', 'text/html');                 
  const interfaces = os.networkInterfaces();                
  let ip = 'Unknown';                                      
  Object.keys(interfaces).forEach((key) => {                
    interfaces[key].forEach((iface) => { 
      if (iface.family === 'IPv4' && !iface.internal) {                
        ip = iface.address;                                          
      }
    });
  });
  res.end(`<h1>Welcome</h1><p>This server is hosted at IP address: ${ip}</p>`);             
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);                         
});

```

## Run the `server.js` file

Save your `server.js` file and open VS code terminal, run `node server.js`.
You can now access the node app on your localhost.

## To access the node app

Open your preferred browser and run `http://localhost:3000` in the URL.
