const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

//define routes
app.use('/', require('./api/routes/auth'));
app.use('/pivo/', require('./api/routes/pivo'));
app.use('/dogodki/', require('./api/routes/dogodki'));
app.use('/lestvica/', require('./api/routes/lestvica'));

const PORT = process.env.PORT || 5000; //if no env.PORT ser in file then use 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
