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
    const [cmd, ...args] = line.split(' ');
    switch (cmd) {
      case 'calculate':
        results.push(calculate(args.join(' ')));
        break;
      case 'fetch-currency':
        if (args[0]) results.push(await fetchCurrency(args[0]));
        break;
      default:
        results.push({ error: `Unknown command in script: ${cmd}` });
    }
  }
  return results;
}
