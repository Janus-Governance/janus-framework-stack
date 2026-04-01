  require('dotenv').config({ path: require('path').join(__dirname, '.env') });
  console.log('OPENAI_API_KEY present at runtime:', !!process.env.OPENAI_API_KEY);
const fs = require('fs');
const path = require('path');

async function analyzeScreenshot(imagePath, outputPath) {
  const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const jsonResult = { status: 'error', issues: [], confidence: 'unknown', notes: 'vision failed: missing API key' };
      fs.writeFileSync(outputPath, JSON.stringify(jsonResult, null, 2));
    return;
  }
  try {
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');
    const systemPrompt = 'You are a vision analysis assistant. Always reply ONLY with a valid JSON object: { "status": "analyzed", "issues": [], "confidence": "high|medium|low", "notes": "short explanation" }. Do not include any other text.';
      const userPrompt = 'Analyze this UI screenshot and return ONLY the JSON object as described.';
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        input: [
          {
            role: 'system',
            content: [
              { type: 'input_text', text: systemPrompt }
            ]
          },
          {
            role: 'user',
            content: [
              { type: 'input_text', text: userPrompt },
              { type: 'input_image', image_url: `data:image/png;base64,${base64Image}` }
            ]
          }
        ],
        max_output_tokens: 300
      })
    });
    const httpStatus = response.status;
    const rawText = await response.text();
    if (!response.ok) {
      console.error('OpenAI API HTTP status:', httpStatus);
      console.error('OpenAI API raw response:', rawText);
      throw new Error(`API error: status ${httpStatus}, response: ${rawText}`);
    }
    let data;
    try { data = JSON.parse(rawText); } catch (e) {
      throw new Error(`Non-JSON API response (status ${httpStatus}): ${rawText}`);
    }
    console.log('OpenAI API HTTP status:', httpStatus);
    console.log('OpenAI API raw response:', rawText);
    console.log('OpenAI API response (parsed):', JSON.stringify(data, null, 2));
    let jsonResult = { status: 'error', issues: [], confidence: 'unknown', notes: 'vision failed' };
    // Try to extract JSON from the model's response
    const messageItem = data.output && data.output.find(item => item.type === 'message');
    if (messageItem && messageItem.content && messageItem.content[0] && messageItem.content[0].text) {
      try {
        const raw = messageItem.content[0].text.replace(/^```json\s*|\s*```$/g, '').trim();
        const parsed = JSON.parse(raw);
        jsonResult = {
          status: parsed.status || 'analyzed',
          issues: Array.isArray(parsed.issues) ? parsed.issues : [],
          confidence: parsed.confidence || 'unknown',
          notes: parsed.notes || ''
        };
      } catch (e) {
        // fallback to default error
      }
    }
      fs.writeFileSync(outputPath, JSON.stringify(jsonResult, null, 2));
    } catch (err) {
      console.error('Vision API error:', err);
      const jsonResult = { status: 'error', issues: [], confidence: 'unknown', notes: 'vision failed' };
      fs.writeFileSync(outputPath, JSON.stringify(jsonResult, null, 2));
        return { httpStatus: null, rawResponse: String(err) };
    }
}

module.exports = { analyzeScreenshot };