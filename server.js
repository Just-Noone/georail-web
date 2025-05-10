const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars'); // Import Handlebars engine
const connectDB = require('./public/assets/js/db.js'); // Import DB connection function

// Connect to MongoDB
connectDB();

// Handlebars Middleware Setup
app.engine('hbs', engine({
    extname: '.hbs', // Use .hbs extension for handlebars files
    defaultLayout: false, // No default layout for now; enable if you create layout files
    // For layouts (optional):
    // layoutsDir: path.join(__dirname, 'public/layouts'), 
    // For partials (optional):
    // partialsDir: path.join(__dirname, 'public/partials') 
}));
app.set('view engine', 'hbs'); // Set Handlebars as the view engine
app.set('views', path.join(__dirname, 'public')); // Tell Express to look for .hbs files in the 'public' directory

// Serve static files from 'public' directory (CSS, client-side JS, images)
// This should generally come after view engine setup if views are in 'public',
// but before routes that might render those views.
const handlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

// Set up Handlebars without layouts/partials
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  layoutsDir: false,
  partialsDir: false,
  defaultLayout: false
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public')); // Use public for .hbs files

// Serve static files from public/assets, public/img, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Serve Webpack output directory (if still used for other assets)
app.use('/assets/dist', express.static(path.join(__dirname, 'public/assets/dist')));

// Root route: Render index.hbs
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html')); // Old way
    res.render('index'); // Renders 'public/index.hbs' using the hbs engine
                         // No need to specify .hbs extension here
// Render any .hbs file in /public by its name (e.g. /gallery -> gallery.hbs)
app.get('/:page?', (req, res, next) => {
  const page = req.params.page || 'index';
  res.render(page, { title: 'GeoRail' }, (err, html) => {
    if (err) {
      if (err.message.includes('Failed to lookup view')) {
        return res.status(404).send('404: Page Not Found');
      }
      return next(err);
    }
    res.send(html);
  });
});

const PORT = process.env.PORT || 15500; // Use environment variable for port or default to 15500
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
  console.log('View engine: Handlebars');
  console.log('Views directory: ./public');
});
// Export the app for Vercel
module.exports = app;
    // This will automatically look for index.hbs in the views directory
    // and render it. No need to specify .hbs extension.
})
