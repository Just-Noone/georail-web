const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const compression = require('compression');
const request = require("request");
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
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '30d',
  immutable: true
}));

// Use compression middleware
app.use(compression());

// Reverse proxy in Node.js that strips frame-blocking headers
app.use("/proxy-map", (req, res) => {
  const target = "http://104.36.84.122:8181" + req.url;
  request(target, {
    headers: {
      // Pretend we're a normal browser
      "User-Agent": "Mozilla/5.0"
    }
  })
    .on("response", response => {
      delete response.headers["x-frame-options"];
      delete response.headers["content-security-policy"];
    })
    .pipe(res);
});


// Reverse proxy for http://104.36.84.122:8888 (systemmap)
app.use("/proxy-system", (req, res) => {
  const target = "http://104.36.84.122:8888" + req.url.replace(/^\/proxy\/systemmap/, "");
  request(target, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  })
    .on("response", response => {
      delete response.headers["x-frame-options"];
      delete response.headers["content-security-policy"];
    })
    .pipe(res);
});

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

// Export the app for Vercel
module.exports = app;