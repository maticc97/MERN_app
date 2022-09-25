const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();


//define which requests are allowed
app.use("/api", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

//connect to MongoDB database
connectDB();

//init middleware
app.use(express.json({ extended: false }));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

//test API call
app.get('/', (req, res) => res.send('API running'));

//define routes
app.use('/api/v1/', require('./api/routes/auth'));
app.use('/api/v1/customers/', require('./api/routes/customers'));
app.use('/api/v1/device/', require('./api/routes/devices'));

const PORT = process.env.PORT || 5000; //if no env.PORT ser in file then use 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
