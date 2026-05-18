const express = require('express');
const next = require('next');
const compression = require('compression');
const zlib = require('zlib');
const brotli = require('brotli');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use((req, res, next) => {
      const acceptEncoding = req.headers['accept-encoding'] || '';
      if (acceptEncoding.includes('br')) {
        res.setHeader('Content-Encoding', 'br');
        zlib.brotliCompressStream(brotli.compressStream());
      } else if (acceptEncoding.includes('gzip')) {
        res.setHeader('Content-Encoding', 'gzip');
        zlib.createGzip();
      }
      next();
    });
  }

  server.all('*', (req, res) => {
    return handle(req, res);
    });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
