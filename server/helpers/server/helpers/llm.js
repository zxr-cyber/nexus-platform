async function callGemini(prompt, imageUrl = null) {
  const apiKey = process.env.GEMINI_API_KEY;
  let parts = [{ text: prompt }];
  if (imageUrl) {
    const res = await fetch(imageUrl);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    parts.push({ inline_data: { mime_type: res.headers.get('content-type') || 'image/png', data: base64 } });
  }
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }] }) }
  );
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return {};
  try { return JSON.parse(match[0]); } catch { return {}; }
}

module.exports = { callGemini, extractJson };
