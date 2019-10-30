const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket();

app.get('/', cors(), (req, res) => {
  console.log(req);
  res.json({ msg: 'We got this shit my guy' });
});

server.listen(3001, () => {
  console.log('listening on port 3001');
});
