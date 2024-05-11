const http = require('http');                         // importing http module from Node.js
const os = require('os');                             // importing os module to fetch the current os requirements.

// const hostname = '127.0.0.1';                         // setting constant "hostname" to value local ip of system.
const hostname = '0.0.0.0';  // Change to listen on all network interfaces
const port = 3000;                                  // setting port (usually used for dev purpose)

const server = http.createServer((req, res) => {              // creating a server with callback function along with 2 args. This is for when we request and what response we recieve.
  res.statusCode = 200;                                      // setting the status code to 200, which means OK (successful)
  res.setHeader('Content-Type', 'text/html');                // setting content type as text/HTML, so the response will be recieved in this format.
  const interfaces = os.networkInterfaces();                // this will fetch the interface info of the current OS.
  let ip = 'Unknown';                                       // to store the IP addr of the server, initializing as unknown.
  Object.keys(interfaces).forEach((key) => {                // iterates over each network interface
    interfaces[key].forEach((iface) => { 
      if (iface.family === 'IPv4' && !iface.internal) {                 // this will check for IPV4 addr and not a loopback addr
        ip = iface.address;                                          // when condition meets, will set the IP value to this variable.
      }
    });
  });
  res.end(`<h1>Welcome</h1><p>This server is hosted at IP address: ${ip}</p>`);             // will respond the result in this format
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);                         // starts the serever. This is mentioned in the end because to confirm all the necessary setting are configured properly. Then only it will accept the connection.
});
