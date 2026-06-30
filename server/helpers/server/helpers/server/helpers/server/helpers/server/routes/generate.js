const router = require('express').Router();
const { supabaseAdmin } = require('../helpers/supabase');
const { callGemini, extractJson } = require('../helpers/llm');
const { runAgent } = require('../helpers/agent');
const { detectMissingKeys } = require('../helpers/checkEnv');
const crypto = require('crypto');
const pendingSessions = new Map();

router.post('/app', async (req, res) => {
  const { prompt, sessionId = crypto.randomUUID(), imageUrl } = req.body;
  try {
    // If image, extract brand identity
    let brand = {};
    if (imageUrl) {
      const visionPrompt = `Analyze this logo, return JSON: { "colors": [], "personality": "", "fontStyle": "" }`;
      const brandRaw = await callGemini(visionPrompt, imageUrl);
      brand = extractJson(brandRaw);
    }

    const enhancedPrompt = `User: "${prompt}". Brand: ${JSON.stringify(brand)}. Build React+Vite app with pink/dark theme.`;
    const { files, history } = await runAgent(enhancedPrompt);

    const missing = detectMissingKeys(files);
    if (missing.length) {
      pendingSessions.set(sessionId, { userId: 'test', prompt, files, history, missing });
      return res.status(400).json({ status: 'missing_env', sessionId, keys: missing });
    }

    // Save deployment
    const { data: deployment, error } = await supabaseAdmin
      .from('deployments')
      .insert({ user_id: 'test', name: 'AI App', subdomain: `app-${Date.now()}`, files, status: 'deployed' })
      .select();
    if (error) throw error;
    res.json({ success: true, url: `https://${deployment[0].subdomain}.nexuslaunch.app`, deploymentId: deployment[0].id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/resume', async (req, res) => {
  const { sessionId, envVars } = req.body;
  const session = pendingSessions.get(sessionId);
  if (!session) return res.status(404).json({ error: 'Session expired' });
  // In production, merge envVars into process.env for build
  // For demo, just deploy with existing files
  const { data: deployment } = await supabaseAdmin
    .from('deployments')
    .insert({ user_id: 'test', name: 'Resumed App', subdomain: `resume-${Date.now()}`, files: session.files, status: 'deployed' })
    .select();
  pendingSessions.delete(sessionId);
  res.json({ success: true, url: `https://${deployment[0].subdomain}.nexuslaunch.app` });
});

module.exports = router;
