function detectMissingKeys(files) {
  const required = [];
  const content = JSON.stringify(files);
  if (content.includes('OPENAI') && !process.env.OPENAI_API_KEY) required.push('OPENAI_API_KEY');
  if (content.includes('STRIPE') && !process.env.STRIPE_SECRET_KEY) required.push('STRIPE_SECRET_KEY');
  if (content.includes('GEMINI') && !process.env.GEMINI_API_KEY) required.push('GEMINI_API_KEY');
  return required;
}
module.exports = { detectMissingKeys };
