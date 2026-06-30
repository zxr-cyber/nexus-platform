const router = require('express').Router();
const { supabaseAdmin } = require('../helpers/supabase');
router.get('/', async (req, res) => {
  const { data } = await supabaseAdmin.from('deployments').select('*');
  res.json(data);
});
module.exports = router;
