const { callGemini, extractJson } = require('./llm');

async function runAgent(userPrompt) {
  const planPrompt = `You are a senior architect. Create a plan for: "${userPrompt}". Return JSON: { "pages": [], "database": [], "auth": "supabase" }`;
  const planRaw = await callGemini(planPrompt);
  const plan = extractJson(planRaw);

  const codePrompt = `Based on plan: ${JSON.stringify(plan)}, generate full React+Vite app. Return JSON of files.`;
  const codeRaw = await callGemini(codePrompt);
  const files = extractJson(codeRaw);

  // Self-review (simplified)
  const reviewPrompt = `Review code for errors: ${JSON.stringify(files)}. Return { "fixed": {} }`;
  const reviewRaw = await callGemini(reviewPrompt);
  const review = extractJson(reviewRaw);
  if (review.fixed) {
    for (const [k, v] of Object.entries(review.fixed)) files[k] = v;
  }
  return { files, history: [{ plan, files: Object.keys(files) }] };
}
module.exports = { runAgent };
