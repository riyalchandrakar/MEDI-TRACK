const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/patient', require('./routes/patient'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Medi-Track API');
});

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "./frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend", "build", "index.html"))
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
