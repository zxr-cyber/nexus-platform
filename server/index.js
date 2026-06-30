require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/generate', require('./routes/generate'));
app.use('/api/deploy', require('./routes/deploy'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/snapshots', require('./routes/snapshots'));
app.use('/api/share', require('./routes/share'));
app.use('/api/models', require('./routes/models'));

app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
