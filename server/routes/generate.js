const router = require('express').Router();

// Endpoint generate app (minimal dulu)
router.post('/app', async (req, res) => {
  try {
    res.json({ 
      success: true, 
      message: 'Generate endpoint works!',
      url: 'https://example.com'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
