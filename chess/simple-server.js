const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Get the URL path
  let filePath = '.' + req.url;
  
  // Default to index.html if the path is '/'
  if (filePath === './') {
    filePath = './public/standalone.html';
  } else if (filePath === './index.html') {
    filePath = './public/standalone.html';
  } else {
    // Prepend the public directory for other files
    filePath = './public' + req.url;
  }
  
  // Get the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  
  // MIME types for common file extensions
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };
  
  // Set the content type based on the file extension
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        fs.readFile('./public/standalone.html', (err, content) => {
          if (err) {
            // If even the standalone.html is not found, return a simple 404 message
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
          } else {
            // Return the standalone.html file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success - return the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`You can also access it at http://${require('os').hostname()}:${PORT}/`);
});
