
import inquirer from 'inquirer';
import { calculate } from './commands/calculate.js';
import { calculateFromFile } from './commands/calculateFromFile.js';
import { convert } from './commands/convert.js';
import { showHistory as showHistoryModule } from './commands/history.js';
import fs from 'fs';
const HISTORY_FILE = './data/history.json';
import { optimize } from './commands/optimize.js';
import { fetchCurrency } from './commands/fetchCurrency.js';
import { plotChart } from './commands/plotChart.js';
import { runScript } from './commands/runScript.js';
import { showHelp } from './commands/help.js';

const [,, command, ...args] = process.argv;

async function mainMenu() {
  const choices = [
    { name: 'Calculate expression', value: 'calculate' },
    { name: 'Convert units', value: 'convert' },
    { name: 'History', value: 'history' },
    { name: 'Optimize math', value: 'optimize' },
    { name: 'Calculate from file', value: 'calculate-from-file' },
    { name: 'Fetch currency rates', value: 'fetch-currency' },
    { name: 'Run script file', value: 'run-script' },
    { name: 'Plot chart', value: 'plot-chart' },
    { name: 'Help', value: 'help' },
    { name: 'Exit', value: 'exit' }
  ];
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices
    });
    if (action === 'exit') break;
    switch (action) {
      case 'calculate': {
        const { expr } = await inquirer.prompt({ type: 'input', name: 'expr', message: 'Enter expression:' });
        const { result, error } = calculate(expr);
        if (error) console.log('Invalid expression:', error);
        else console.log(`Result: ${result}`);
        await saveHistory({ type: 'calculate', input: expr, result, error, date: new Date().toISOString() });
        break;
      }
      case 'convert': {
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Enter conversion query:' });
        const { result } = convert(query);
        console.log(result);
        await saveHistory({ type: 'convert', input: query, result, date: new Date().toISOString() });
        break;
      }
      case 'history': {
        await showHistoryPersistent();
        break;
      }
      case 'optimize': {
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Enter optimization query:' });
        const { result } = optimize(query);
        console.log(result);
        await saveHistory({ type: 'optimize', input: query, result, date: new Date().toISOString() });
        break;
      }
      case 'calculate-from-file': {
        const { file, op, output } = await inquirer.prompt([
          { type: 'input', name: 'file', message: 'File path (.csv/.json):' },
          { type: 'input', name: 'op', message: 'Operation (ex: sum(col1)):' },
          { type: 'input', name: 'output', message: 'Output file (optional):' }
        ]);
        const res = calculateFromFile(file, op, output || null);
        if (res && res.error) console.log(res.error);
        else if (res) console.log(res);
        await saveHistory({ type: 'calculate-from-file', input: { file, op, output }, result: res, date: new Date().toISOString() });
        break;
      }
      case 'fetch-currency': {
        const { currency, apiIdx } = await inquirer.prompt([
          { type: 'input', name: 'currency', message: 'Currency code (ex: USD):' },
          { type: 'list', name: 'apiIdx', message: 'Select API source:', choices: [ { name: 'exchangerate.host', value: 0 }, { name: 'frankfurter.app', value: 1 } ] }
        ]);
        const res = await fetchCurrency(currency, apiIdx);
        if (res && res.error) console.log(res.error);
        else if (res) {
          console.log(`Exchange rates for ${currency} [${res.api}]:`);
          Object.entries(res.rates).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
          });
        }
        await saveHistory({ type: 'fetch-currency', input: { currency, apiIdx }, result: res, date: new Date().toISOString() });
        break;
      }
      case 'run-script': {
        const { script } = await inquirer.prompt({ type: 'input', name: 'script', message: 'Script file path:' });
        const results = await runScript(script);
        if (Array.isArray(results)) {
          results.forEach(r => {
            if (r.error) console.log(r.error);
            else console.log(r.result || r);
          });
        } else if (results && results.error) {
          console.log(results.error);
        }
        await saveHistory({ type: 'run-script', input: script, result: results, date: new Date().toISOString() });
        break;
      }
      case 'plot-chart': {
        const { vals } = await inquirer.prompt({ type: 'input', name: 'vals', message: 'Enter numbers separated by comma:' });
        const arr = vals.split(',').map(Number).filter(x => !isNaN(x));
        await plotChart(arr);
        await saveHistory({ type: 'plot-chart', input: vals, result: arr, date: new Date().toISOString() });
        break;
      }
      case 'help': {
        console.log(showHelp());
        break;
      }
    }
    console.log('');
  }
}

if (!command) {
  mainMenu();
} else {
  (async () => {
    switch (command) {
      case 'calculate': {
        if (!args[0]) {
          console.log('Please provide an expression to calculate.');
        } else {
          const { result, error } = calculate(args[0]);
          if (error) console.log('Invalid expression:', error);
          else console.log(`Result: ${result}`);
          await saveHistory({ type: 'calculate', input: args[0], result, error, date: new Date().toISOString() });
        }
        break;
      }
      case 'calculate-from-file': {
        if (!args[0] || !args[1]) {
          console.log('Usage: node index.js calculate-from-file <file.csv|json> "sum(column)" [--output results.json|results.csv]');
        } else {
          let outputFile = null;
          const outputArg = args.find(a => a.startsWith('--output'));
          if (outputArg) {
            const parts = outputArg.split('=');
            if (parts.length === 2) outputFile = parts[1];
          }
          const res = calculateFromFile(args[0], args[1], outputFile);
          if (res && res.error) console.log(res.error);
          else if (res) console.log(res);
          await saveHistory({ type: 'calculate-from-file', input: { file: args[0], op: args[1], output: outputFile }, result: res, date: new Date().toISOString() });
        }
        break;
      }
      case 'convert': {
        if (!args[0]) {
          console.log('Please provide a conversion query.');
        } else {
          const { result } = convert(args[0]);
          console.log(result);
          await saveHistory({ type: 'convert', input: args[0], result, date: new Date().toISOString() });
        }
        break;
      }
      case 'history': {
        await showHistoryPersistent();
        break;
      }
      case 'optimize': {
        if (!args[0]) {
          console.log('Please provide an optimization query.');
        } else {
          const { result } = optimize(args[0]);
          console.log(result);
          await saveHistory({ type: 'optimize', input: args[0], result, date: new Date().toISOString() });
        }
        break;
      }
      case 'fetch-currency': {
        let currency = args[0];
        let apiIdx = 0;
        if (args[1]) {
          apiIdx = args[1] === 'frankfurter.app' ? 1 : 0;
        }
        if (!currency) {
          console.log('Usage: node index.js fetch-currency USD [exchangerate.host|frankfurter.app]');
        } else {
          const res = await fetchCurrency(currency, apiIdx);
          if (res && res.error) console.log(res.error);
          else if (res) {
            console.log(`Exchange rates for ${currency} [${res.api}]:`);
            Object.entries(res.rates).forEach(([key, value]) => {
              console.log(`  ${key}: ${value}`);
            });
          }
          await saveHistory({ type: 'fetch-currency', input: { currency, apiIdx }, result: res, date: new Date().toISOString() });
        }
        break;
      }
      case 'run-script': {
        if (!args[0]) {
          console.log('Usage: node index.js run-script script.txt');
        } else {
          const results = await runScript(args[0]);
          if (Array.isArray(results)) {
            results.forEach(r => {
              if (r.error) console.log(r.error);
              else console.log(r.result || r);
            });
          } else if (results && results.error) {
            console.log(results.error);
          }
          await saveHistory({ type: 'run-script', input: args[0], result: results, date: new Date().toISOString() });
        }
        break;
      }
      case 'plot-chart': {
        const arr = args.map(Number).filter(x => !isNaN(x));
        plotChart(arr);
        await saveHistory({ type: 'plot-chart', input: args.join(','), result: arr, date: new Date().toISOString() });
        break;
      }
      case 'help':
      default:
        console.log(showHelp());
        break;
    }
  })();
}
// --- ISTORIC PERSISTENT ---

async function saveHistory(entry) {
  try {
    let arr = [];
    if (fs.existsSync(HISTORY_FILE)) {
      arr = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    }
    arr.push(entry);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(arr, null, 2));
  } catch (err) {
    // fail silent
  }
}

async function showHistoryPersistent() {
  if (!fs.existsSync(HISTORY_FILE)) {
    console.log('No history found.');
    return;
  }
  try {
    const arr = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    if (!arr.length) {
      console.log('No history found.');
      return;
    }
    arr.slice(-20).forEach((h, i) => {
      console.log(`[${i+1}] ${h.date} | ${h.type} | input: ${JSON.stringify(h.input)} | result: ${JSON.stringify(h.result)}${h.error ? ' | error: '+h.error : ''}`);
    });
  } catch (err) {
    console.log('Failed to read history:', err.message);
  }
}

