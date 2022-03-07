const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

//define routes
app.use('/api/users', require('./api/routes/users'));
app.use('/api/auth', require('./api/routes/auth'));
app.use('/api/posts', require('./api//routes/posts'));

const PORT = process.env.PORT || 5000; //if no env.PORT ser in file then use 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
