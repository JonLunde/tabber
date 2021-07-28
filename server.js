const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
var router = express.Router();

// Heroku CORS options.
// const whitelist = [
//   'http://localhost:3000',
//   'http://localhost:5000',
//   'http://localhost:8080',
//   'https://guitar-tabber.herokuapp.com/',
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log('** Origin of request ' + origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log('Origin acceptable');
//       callback(null, true);
//     } else {
//       console.log('Origin rejected');
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// Sets server up to listen to chosen port.
app.listen(port, () => console.log(`Server listening on port ${port}`));

// MIDDLEWARE
// Handle CORS.
// app.use(cors(corsOptions));
app.use(cors());
// Handle urlEncoded requests.
app.use(express.urlencoded({ extended: false }));
// Handle JSON requests.
app.use(express.json());
// Serve static files from client.
app.use(express.static(path.join(__dirname, 'client/public')));

// // For Heroku, makes sure the react client instead of backend.
// const path = require('path');
// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   // Handle React routing, return all requests to React app
//   app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

// ENDPOINTS
app.post('/export', (req, res) => {
  const textTab = req.body;
  const writeTextTab = require('./writeTextTab');
  writeTextTab(textTab);

  res.status(201).json('Text file created.');
});

app.get('/export', (req, res) => {
  const file = `${__dirname}/tmp/test.txt`;

  res.status(200).download(file, 'test.txt', (err) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    fs.unlinkSync(file);
  });
});

// Wildcard rerouting.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

router.get('/', (req, res, next) => {
  res.render('index', { Title: 'Express' });
});
