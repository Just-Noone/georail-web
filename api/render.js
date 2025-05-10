const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports = (req, res) => { // async not strictly needed here if not using await
  try {
    let requestedPagePath = req.url; // e.g., '/', '/about', '/some/page'

    if (requestedPagePath === '/') {
      requestedPagePath = '/index'; // Default to index for root
    }

    // Construct the relative path to the .hbs file within the public directory
    // e.g., 'index.hbs', 'about.hbs', 'some/page.hbs'
    const relativeFilePath = requestedPagePath.substring(1) + '.hbs';

    const publicDir = path.resolve(__dirname, '../public');
    const fullPathToHbsFile = path.resolve(publicDir, relativeFilePath);

    // Security check: Ensure the resolved path is still within the public directory
    if (!fullPathToHbsFile.startsWith(publicDir)) {
      console.warn(`Forbidden path traversal attempt: ${relativeFilePath}`);
      res.statusCode = 403;
      return res.end('403: Forbidden');
    }

    if (!fs.existsSync(fullPathToHbsFile)) {
      // This console log helps debug if file paths are not what you expect
      console.log(`HBS file not found by api/render.js: ${fullPathToHbsFile} (requested URL: ${req.url})`);
      res.statusCode = 404;
      return res.end(`404: Page Not Found (template ${relativeFilePath} missing)`);
    }

    const templateContent = fs.readFileSync(fullPathToHbsFile, 'utf-8');
    const template = handlebars.compile(templateContent);

    const data = {
      title: 'GeoRail (Rendered by api/render.js)',
      description: 'Welcome to GeoRail!',
      // You can add more data to pass to your template
      // currentPath: requestedPagePath
    };

    const html = template(data);

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end(html);

  } catch (error) {
    console.error('Error in api/render.js:', error);
    res.statusCode = 500;
    res.end('500: Internal Server Error in Rendering Function');
  }
};