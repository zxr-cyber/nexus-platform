const { supabase } = require('../helpers/supabase');
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error();
    req.user = user;
    next();
  } catch { res.status(401).json({ error: 'Unauthorized' }); }
};
