const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');
const listRoutes = require('./routes/listRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/admin', adminRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);


app.get('/', (req, res) => {
    res.send('API is running...');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});