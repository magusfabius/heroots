// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();

const cors = require('cors');

// Allow requests from 'http://localhost:8080'
app.use(cors({
    origin: 'http://localhost:8080',
}));

// Configure middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/surfer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the username and password access system!');
});

app.post('/register', async (req, res) => {

  console.log("/register")

  try {

    console.log("req.body: ", req.body)
    const { username, password } = req.body;

    // Debug: Print the received username and password to check their values
    console.log('Received username:', username);
    console.log('Received password:', password);

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ username, password: hashedPassword });
    req.session.user = user;
    res.redirect('/dashboard');

  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Error registering user.');
  }
});

app.post('/login', async (req, res) => {

  console.log("/login")

  try {
    console.log("req.body: ", req.body)
    const { username, password } = req.body;

  
    const user = await User.findOne({ username });

    console.log("user data: ", user)

    if (!user) {
      console.log("User not found")
      return res.status(404).send('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("User not found")
      return res.status(401).send('Invalid password.');
    }

    req.session.user = user;
    //res.redirect('/dashboard');
    res.json({ success: true})

  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in.');
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.send(`Welcome, ${req.session.user.username}! This is your dashboard.`);
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
    }
    res.redirect('/');
  });
});




const express = require('express');
const fs = require('fs');
const Papa = require('papaparse');

app.get('/events', (req, res) => {
  res.send('Welcome to the events page!');
});


app.get('/csv-to-json', (req, res) => {
    const csvFilePath = './data/datasample.csv';

    fs.readFile(csvFilePath, 'utf8', (err, csvString) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read CSV file.' });
        }

        Papa.parse(csvString, {
            header: true,
            complete: (results) => {
                // Process the links into an array for each event
                const processedData = results.data.map(event => {
                    if (event.links) {
                        event.links = event.links.split('|');
                    } else {
                        event.links = [];
                    }
                    return event;
                });

                return res.json(processedData);
            },
            error: (error) => {
                return res.status(500).json({ error: 'Failed to parse CSV.' });
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

