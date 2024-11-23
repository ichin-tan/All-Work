const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('Working start on Task Manager');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
