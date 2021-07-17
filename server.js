const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Sets server up to listen to chosen port.
app.listen(port, () => console.log(`Server listening on port ${port}`));

// MIDDLEWARE
// Handle CORS.
app.use(cors());
// Handle urlEncoded requests.
app.use(express.urlencoded({ extended: false }));
// Handle JSON requests.
app.use(express.json());

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
