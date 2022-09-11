var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');
const diskStorage = multer.diskStorage({ destination: 'assets/uploads'} );
const upload = multer({ storage: diskStorage });
const fs = require('fs')

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  let file = req.file
  const path = file.path

  try {
    fs.unlinkSync(path)
  } catch(err) {
    console.error(err)
  }
  
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
