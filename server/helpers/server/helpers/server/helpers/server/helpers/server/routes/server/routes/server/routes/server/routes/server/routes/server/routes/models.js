const router = require('express').Router();
router.get('/enabled', (req, res) => {
  res.json([
    { key: 'gemini', label: 'Gemini', provider: 'Google', speed: 'fast' },
    { key: 'groq-llama', label: 'Groq Llama', provider: 'Groq', speed: 'very fast' }
  ]);
});
module.exports = router;
