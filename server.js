const express = require('express');
const app = express();
const path = require('path');

// Serve 'public' directory as the root
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html on root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 15500;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
