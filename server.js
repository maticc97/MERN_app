const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('API running'));

//define routes
app.use('/api/v1/', require('./api/routes/auth'));
app.use('/api/v1/customers/', require('./api/routes/customers'));
app.use('/api/v1/device/', require('./api/routes/devices'));
//app.use('/lestvica/', require('./api/routes/lestvica'));

const PORT = process.env.PORT || 5000; //if no env.PORT ser in file then use 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
