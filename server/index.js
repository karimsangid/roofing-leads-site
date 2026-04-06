const express = require('express');
const cors = require('cors');
const path = require('path');
const { generateLeads, leadsToCSV } = require('./leadGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

const VALID_TYPES = ['verified', 'booked', 'transfer'];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/download-leads', (req, res) => {
  try {
    const { type, state, quantity } = req.body;

    if (!type || !VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: 'Invalid lead type' });
    }
    if (!state || typeof state !== 'string' || state.length !== 2) {
      return res.status(400).json({ error: 'Valid state code is required' });
    }
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1 || qty > 500) {
      return res.status(400).json({ error: 'Quantity must be between 1 and 500' });
    }

    const leads = generateLeads(state.toUpperCase(), type, qty);
    const csv = leadsToCSV(leads, type);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=roofing-leads-${type}-${state}-${Date.now()}.csv`);
    res.send(csv);
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: 'Failed to generate leads' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
