const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Static files (CSS)
app.use(express.static('public'));

// Custom middleware: check working hours
const workingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const isWorkingHour = hour >= 9 && hour < 17;

  if (isWeekday && isWorkingHour) {
    next();
  } else {
    res.send(
      `<h1>Sorry!</h1><p>The website is only available Monday to Friday, from 9 to 17.</p>`
    );
  }
};

// Apply middleware to all routes
app.use(workingHours);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
