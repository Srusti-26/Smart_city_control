require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.static('../'));

const LLM_API_URL = process.env.LLM_API_URL;
const LLM_API_KEY = process.env.LLM_API_KEY;

if (!LLM_API_URL || !LLM_API_KEY) {
  console.warn('Warning: set LLM_API_URL and LLM_API_KEY in your environment (see .env.example)');
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Agent analysis endpoint
app.post('/agent/analyze', async (req, res) => {
  try {
    const { agentType, context, prompt } = req.body;
    
    if (!LLM_API_URL || !LLM_API_KEY) {
      return res.status(503).json({ 
        error: 'API not configured',
        useFallback: true 
      });
    }
    
    const fullPrompt = `Agent: ${agentType}. Task: ${prompt}`;
    const contextStr = context ? JSON.stringify(context) : '{}';
    
    const response = await fetch(LLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LLM_API_KEY
      },
      body: JSON.stringify({ 
        prompt: fullPrompt,
        context: contextStr,
        compress: true
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('ScaleDown API error:', response.status, errorText);
      return res.status(503).json({ 
        error: 'ScaleDown API unavailable',
        useFallback: true 
      });
    }
    
    const result = await response.json();
    let analysis = result.compressed_output || result.output || result.results?.compressed_prompt || null;
    
    // If we only got compression metadata, generate an agent response
    if (!analysis || (typeof analysis === 'object' && !result.compressed_output && !result.output)) {
      analysis = generateAgentResponse(agentType, prompt, context);
    } else if (typeof analysis === 'object') {
      analysis = JSON.stringify(analysis, null, 2);
    }
    
    res.json({ analysis: String(analysis), compressed: true });
  } catch (err) {
    console.error('Agent API error:', err.message);
    res.status(503).json({ 
      error: err.message,
      useFallback: true 
    });
  }
});

// Generate an agent response based on agent type and task
function generateAgentResponse(agentType, prompt, context) {
  switch (agentType?.toLowerCase()) {
    case 'traffic':
      return `Traffic Agent Analysis: Optimizing flow across ${context?.intersections || 847} intersections. Current optimization level: ${context?.flow || 87}%. Recommendation: Focus on peak hour management.`;
    case 'energy':
      return `Energy Agent Analysis: Managing grid load at ${context?.load || 2.4} GW. Peak forecast: ${context?.peak || 3.1} GW. Status: Stable. Anomalies detected: ${context?.anomalies || 0}.`;
    case 'emergency':
      return `Emergency Agent Analysis: Currently managing ${context?.active || 3} active incidents. Average response time: ${context?.response || 4.2} minutes. All units are operational and responsive.`;
    case 'citizen':
      return `Citizen Agent Analysis: Monitoring sentiment levels at ${context?.sentiment || 78}%. Total complaints: ${context?.complaints || 147}. Overall satisfaction: High. Key concern areas identified for follow-up.`;
    case 'coordinator':
      return `Coordinator Agent Analysis: All systems operational. Coordinating ${context?.agents || 5} specialized agents. No conflicts detected. System efficiency: Optimal.`;
    default:
      return `Agent Analysis Complete: Task '${prompt}' processed. Analysis: All systems operational and responding normally.`;
  }
}

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message, cityState } = req.body;
    
    if (!LLM_API_URL || !LLM_API_KEY) {
      console.log('API not configured, client will use fallback');
      return res.status(503).json({ 
        error: 'API not configured',
        useFallback: true 
      });
    }
    
    const prompt = `You are a Smart City Assistant. Answer the user's question based on the city data. User: ${message}`;
    const context = cityState ? JSON.stringify(cityState) : '{}';
    
    const response = await fetch(LLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LLM_API_KEY
      },
      body: JSON.stringify({ 
        prompt: prompt,
        context: context,
        compress: true
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('ScaleDown API error:', response.status, errorText);
      return res.status(503).json({ 
        error: 'ScaleDown API unavailable',
        useFallback: true,
        details: errorText 
      });
    }
    
    const result = await response.json();
    let responseText = result.compressed_output || result.output || result.results?.compressed_prompt || null;
    
    // If we only got compression metadata, generate a response based on city data
    if (!responseText || (typeof responseText === 'object' && result.results && !result.compressed_output && !result.output)) {
      responseText = generateChatResponse(message, cityState);
    } else if (typeof responseText === 'object') {
      responseText = JSON.stringify(responseText, null, 2);
    }
    
    res.json({ response: String(responseText), compressed: true });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(503).json({ 
      error: err.message,
      useFallback: true 
    });
  }
});

// Generate a chat response based on user message and city state
function generateChatResponse(message, cityState) {
  if (!cityState) return 'Hello! I am the Smart City Assistant. How can I help you today?';
  
  const msg = message.toLowerCase();
  
  if (msg.includes('status') || msg.includes('city')) {
    return `City Status Report\n\n🚦 Traffic: ${cityState.traffic?.flow || 0}% optimal flow\n⚡ Energy: ${cityState.energy?.load || 0} GW load\n🚨 Emergencies: ${cityState.emergency?.active || 0} active\n👥 Citizens: ${cityState.citizen?.sentiment || 0}% positive sentiment`;
  }
  if (msg.includes('traffic')) {
    return `Traffic Report\n\nFlow rate: ${cityState.traffic?.flow || 0}%\nCongestion points: ${cityState.traffic?.congestion || 0}\nAll major intersections operational.`;
  }
  if (msg.includes('energy')) {
    return `Energy Status\n\nCurrent load: ${cityState.energy?.load || 0} GW\nPeak forecast: ${cityState.energy?.peak || 0} GW\nGrid operating normally.`;
  }
  if (msg.includes('emergency') || msg.includes('emergencies')) {
    return `Emergency Status\n\nActive incidents: ${cityState.emergency?.active || 0}\nAverage response time: ${cityState.emergency?.response || 0} min\nAll units ready.`;
  }
  if (msg.includes('summary') || msg.includes('report')) {
    return `Daily Summary\n\n📊 Overall Status: OPERATIONAL\n\n🚦 Traffic: Good (${cityState.traffic?.flow || 0}% flow)\n⚡ Energy: Normal (${cityState.energy?.load || 0} GW)\n🚨 Response: Optimal (${cityState.emergency?.response || 0} min avg)\n👥 Sentiment: Positive (${cityState.citizen?.sentiment || 0}%)`;
  }
  
  return `Hello! I'm the Smart City Assistant. Based on current city data:\n\n• Traffic flow: ${cityState.traffic?.flow || 0}% optimal\n• Energy consumption: ${cityState.energy?.load || 0} GW\n• Active emergencies: ${cityState.emergency?.active || 0}\n• Citizen sentiment: ${cityState.citizen?.sentiment || 0}%\n\nHow can I help you?`;
}

// POST /generate
// Expects a JSON body which will be forwarded to the LLM provider as-is.
app.post('/generate', async (req, res) => {
  try {
    if (!LLM_API_URL || !LLM_API_KEY) {
      return res.status(500).json({ error: 'server_misconfigured', message: 'LLM_API_URL or LLM_API_KEY not set' });
    }

    const upstreamResp = await fetch(LLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LLM_API_KEY
      },
      body: JSON.stringify(req.body)
    });

    const data = await upstreamResp.text();
    let parsed;
    try { parsed = JSON.parse(data); } catch { parsed = data; }

    res.status(upstreamResp.ok ? 200 : 502).json(parsed);
  } catch (err) {
    console.error('generate error', err);
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`LLM proxy server listening on ${port}`));
