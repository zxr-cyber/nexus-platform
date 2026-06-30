const router = require('express').Router();
const { supabaseAdmin } = require('../helpers/supabase');
router.get('/:deploymentId', async (req, res) => {
  const { data } = await supabaseAdmin.from('project_snapshots').select('*').eq('deployment_id', req.params.deploymentId);
  res.json(data);
});
router.post('/restore/:snapshotId', async (req, res) => {
  const { data: snapshot } = await supabaseAdmin.from('project_snapshots').select('*').eq('id', req.params.snapshotId).single();
  if (!snapshot) return res.status(404).json({ error: 'Not found' });
  const { data: newDeploy } = await supabaseAdmin.from('deployments').insert({ user_id: 'test', name: 'Restored', subdomain: `restore-${Date.now()}`, files: snapshot.files, status: 'deployed' }).select();
  res.json({ success: true, url: `https://${newDeploy[0].subdomain}.nexuslaunch.app` });
});
module.exports = router;
