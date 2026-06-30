const router = require('express').Router();
const { supabaseAdmin } = require('../helpers/supabase');

// Download source code
router.get('/download/:id', async (req, res) => {
  const { id } = req.params;
  const { data: deployment } = await supabaseAdmin.from('deployments').select('files, name').eq('id', id).single();
  if (!deployment) return res.status(404).json({ error: 'Not found' });
  const files = deployment.files || {};
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${deployment.name}.zip"`);
  // Simplified: just send JSON, in real project use archiver
  res.json(files);
});

// Redeploy (simplified)
router.post('/redeploy/:id', async (req, res) => {
  const { id } = req.params;
  const { data: deployment } = await supabaseAdmin.from('deployments').select('files, subdomain').eq('id', id).single();
  if (!deployment) return res.status(404).json({ error: 'Not found' });
  await supabaseAdmin.from('deployments').update({ deployed_at: new Date().toISOString() }).eq('id', id);
  res.json({ success: true, url: `https://${deployment.subdomain}.nexuslaunch.app` });
});

module.exports = router;
