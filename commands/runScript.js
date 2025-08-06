import fs from 'fs';
import { calculate } from './calculate.js';
import { fetchCurrency } from './fetchCurrency.js';

export async function runScript(scriptFile) {
  if (!fs.existsSync(scriptFile)) {
    return { error: 'Script file not found: ' + scriptFile };
  }
  const lines = fs.readFileSync(scriptFile, 'utf8').split(/\r?\n/).filter(Boolean);
  const results = [];
  for (const line of lines) {
    const match = line.match(/^(\w+)(?:\s+(.+))?$/);
    if (!match) {
      results.push({ error: `Invalid line: ${line}` });
      continue;
    }
    const cmd = match[1];
    const arg = match[2] || '';
    switch (cmd) {
      case 'calculate':
        results.push(calculate(arg));
        break;
      case 'fetch-currency':
        if (arg) results.push(await fetchCurrency(arg));
        break;
      default:
        results.push({ error: `Unknown command in script: ${cmd}` });
    }
  }
  return results;
}
