const router = require('express').Router();
const { supabaseAdmin } = require('../helpers/supabase');
const crypto = require('crypto');
router.post('/create', async (req, res) => {
  const { deploymentId } = req.body;
  const token = crypto.randomBytes(16).toString('hex');
  const { data } = await supabaseAdmin.from('share_links').insert({ deployment_id: deploymentId, token, is_active: true }).select();
  res.json({ shareUrl: `https://${req.headers.host}/share/${token}` });
});
router.get('/:token', async (req, res) => {
  const { data: share } = await supabaseAdmin.from('share_links').select('deployment_id').eq('token', req.params.token).single();
  if (!share) return res.status(404).send('Not found');
  const { data: deployment } = await supabaseAdmin.from('deployments').select('files').eq('id', share.deployment_id).single();
  const html = deployment.files?.['index.html'] || 'No content';
  res.send(html);
});
module.exports = router;
