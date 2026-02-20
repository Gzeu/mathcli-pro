/**
 * Everclaw Proxy Client
 * Connects mathcli-pro to Everclaw as an OpenAI-compatible AI proxy.
 * Default: local free proxy (no API key cost)
 * Override via env: EVERCLAW_URL, EVERCLAW_MODEL, EVERCLAW_KEY
 *
 * Usage:
 *   const reply = await everclawChat({ messages: [...] });
 */
import fetch from 'node-fetch';

const BASE_URL = process.env.EVERCLAW_URL ?? 'http://localhost:3141/v1';
const MODEL = process.env.EVERCLAW_MODEL ?? 'llama3';
const API_KEY = process.env.EVERCLAW_KEY ?? 'free';

/**
 * Send a chat completion request through the Everclaw proxy.
 * @param {object} opts
 * @param {Array<{role:string, content:string}>} opts.messages
 * @param {string}  [opts.model]    - override default model
 * @param {string}  [opts.baseUrl]  - override proxy URL
 * @param {number}  [opts.maxTokens]
 * @param {number}  [opts.temperature]
 * @returns {Promise<string>} - assistant message content
 */
export async function everclawChat({
  messages,
  model = MODEL,
  baseUrl = BASE_URL,
  maxTokens = 512,
  temperature = 0.15,
} = {}) {
  let res;
  try {
    res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    throw new Error(
      `Everclaw proxy unreachable at ${baseUrl}\n` +
      `  → Setează EVERCLAW_URL sau porneste proxy-ul local.\n` +
      `  → Detalii: ${err.message}`
    );
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Everclaw HTTP ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Everclaw: răspuns gol sau format neașteptat.');
  return content;
}

/** Quick health check - returns true if proxy is reachable */
export async function everclawPing(baseUrl = BASE_URL) {
  try {
    const res = await fetch(`${baseUrl}/models`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      signal: AbortSignal.timeout(3_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
