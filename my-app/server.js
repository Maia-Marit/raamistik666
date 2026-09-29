const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Loe andmed failist
app.get('/api/inimesed', (req, res) => {
  const data = fs.readFileSync('./inimesed.json', 'utf8');
  res.json(JSON.parse(data));
});

// Salvesta uued andmed faili
app.post('/api/inimesed', (req, res) => {
  const uuedInimesed = req.body;
  fs.writeFileSync('./inimesed.json', JSON.stringify(uuedInimesed, null, 2));
  res.json({ success: true });
});

app.listen(3001, () => console.log('Server töötab pordil 3001'));