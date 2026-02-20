/**
 * ai-plot.js
 * Natural language → mathjs expression → ASCII chart
 * Powered by Everclaw proxy (free local by default).
 *
 * Usage:
 *   await aiPlot('plot a sine wave from -pi to pi')
 *   await aiPlot('compare sin and cos squared')
 *   await aiPlot('show me a parabola that opens downward')
 */
import chalk from 'chalk';
import { everclawChat, everclawPing } from '../ai/everclaw-client.js';
import { plotFunction } from './plot-function.js';
import { multiPlot } from './multi-plot.js';

const SYSTEM_PROMPT = `
You are a math graphing assistant. The user describes a graph in natural language.
You must respond ONLY with a valid JSON object — no markdown, no explanation outside JSON.

Schema:
{
  "exprs": ["sin(x)", "cos(x)"],   // array of mathjs expressions (use x as variable)
  "xMin": -6.28,                    // number
  "xMax": 6.28,                     // number
  "labels": ["sin(x)", "cos(x)"],   // display labels per expression
  "title": "Trigonometric functions", // short title
  "explanation": "One sentence about what this graph shows."
}

Rules:
- Use mathjs syntax: sin, cos, tan, sqrt, exp, log, abs, pi, e, ^, *, /, +, -
- Single function → exprs has 1 element
- Multiple functions → exprs has multiple elements
- Choose xMin/xMax that best show the interesting features
- If user says "parabola" → x^2, "cubic" → x^3, "exponential" → exp(x)
- Do NOT include any text outside the JSON object
`.trim();

/**
 * Parse AI response robustly (handle markdown code fences)
 */
function parseJSON(raw) {
  const stripped = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
  const match = stripped.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON object found in AI response.');
  return JSON.parse(match[0]);
}

/**
 * AI-powered plot command.
 * @param {string} prompt - natural language description
 * @param {object} [overrides] - optional xMin/xMax/steps overrides
 */
export async function aiPlot(prompt, overrides = {}) {
  // 1. Health check
  const online = await everclawPing();
  if (!online) {
    console.log();
    console.log(chalk.red.bold('  ✗ Everclaw proxy offline'));
    console.log(chalk.gray('  Porneste proxy-ul local:'));
    console.log(chalk.yellow('    cd everclaw && npm start'));
    console.log(chalk.gray('  Sau seteaza EVERCLAW_URL pentru un endpoint remote.'));
    console.log();
    return;
  }

  console.log();
  console.log(chalk.cyan('  🤖 AI analizează: ') + chalk.white(`"${prompt}"`) + chalk.gray(' ...'));

  // 2. Ask AI
  let parsed;
  try {
    const raw = await everclawChat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
      maxTokens: 400,
    });
    parsed = parseJSON(raw);
  } catch (err) {
    console.log(chalk.red(`  ✗ AI error: ${err.message}`));
    return;
  }

  // 3. Validate
  if (!Array.isArray(parsed.exprs) || !parsed.exprs.length) {
    console.log(chalk.red('  ✗ AI nu a returnat expresii valide.'));
    return;
  }

  const xMin = overrides.xMin ?? parsed.xMin ?? -10;
  const xMax = overrides.xMax ?? parsed.xMax ?? 10;
  const steps = overrides.steps ?? 70;

  console.log(chalk.green(`  ✓ ${parsed.title ?? 'Graph'}: ${parsed.explanation ?? ''}`) + '\n');

  // 4. Render
  if (parsed.exprs.length === 1) {
    plotFunction(parsed.exprs[0], {
      xMin, xMax, steps,
      label: parsed.labels?.[0] ?? parsed.exprs[0],
    });
  } else {
    multiPlot(parsed.exprs, { xMin, xMax, steps });
  }
}
