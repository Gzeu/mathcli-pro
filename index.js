#!/usr/bin/env node
import inquirer from 'inquirer';
import { calculate } from './commands/calculate.js';
import { calculateFromFile } from './commands/calculateFromFile.js';
import { convert } from './commands/convert.js';
import { showHistory } from './commands/history.js';
import { optimize } from './commands/optimize.js';
import { fetchCurrency } from './commands/fetchCurrency.js';
import { plotChart } from './commands/plotChart.js';
import { runScript } from './commands/runScript.js';
import { showHelp } from './commands/help.js';

function calculateFromFile(filePath, operation, outputFile) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let data;
  if (filePath.endsWith('.json')) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.log('Invalid JSON file.');
      return;
    }
  } else if (filePath.endsWith('.csv')) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      data = parse(content, { columns: true });
    } catch (err) {
      console.log('Invalid CSV file.');
      return;
    }
  } else {
    console.log('Unsupported file type. Use .csv or .json');
    return;
  }

  // Exemplu: operation = "sum(column1)"
  const match = operation.match(/sum\(([^)]+)\)/);
  if (match) {
    const col = match[1];
    let sum = 0;
    for (const row of data) {
      const val = parseFloat(row[col]);
      if (!isNaN(val)) sum += val;
    }
    console.log(`Sum of ${col}: ${sum}`);
    if (outputFile) {
      if (outputFile.endsWith('.json')) {
        fs.writeFileSync(outputFile, JSON.stringify({ column: col, sum }, null, 2));
        console.log(`Result exported to ${outputFile}`);
      } else if (outputFile.endsWith('.csv')) {
        fs.writeFileSync(outputFile, `column,sum\n${col},${sum}\n`);
        console.log(`Result exported to ${outputFile}`);
      } else {
        console.log('Unsupported output file type. Use .json or .csv');
      }
    }
    return;
  }
  console.log('Unsupported operation. Example: sum(column1)');
}


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
        break;
      }
      case 'convert': {
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Enter conversion query:' });
        const { result } = convert(query);
        console.log(result);
        break;
      }
      case 'history': {
        const { result } = showHistory();
        console.log(result);
        break;
      }
      case 'optimize': {
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Enter optimization query:' });
        const { result } = optimize(query);
        console.log(result);
        break;
      }
      case 'calculate-from-file': {
        const { file, op, output } = await inquirer.prompt([
          { type: 'input', name: 'file', message: 'File path (.csv/.json):' },
          { type: 'input', name: 'op', message: 'Operation (ex: sum(col1)):' },
          { type: 'input', name: 'output', message: 'Output file (optional):' }
        ]);
        const res = calculateFromFile(file, op, output || null);
        if (res.error) console.log(res.error);
        else console.log(res);
        break;
      }
      case 'fetch-currency': {
        const { currency, apiIdx } = await inquirer.prompt([
          { type: 'input', name: 'currency', message: 'Currency code (ex: USD):' },
          { type: 'list', name: 'apiIdx', message: 'Select API source:', choices: [ { name: 'exchangerate.host', value: 0 }, { name: 'frankfurter.app', value: 1 } ] }
        ]);
        const res = await fetchCurrency(currency, apiIdx);
        if (res.error) console.log(res.error);
        else {
          console.log(`Exchange rates for ${currency} [${res.api}]:`);
          Object.entries(res.rates).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
          });
        }
        break;
      }
      case 'run-script': {
        const { script } = await inquirer.prompt({ type: 'input', name: 'script', message: 'Script file path:' });
        const results = await runScript(script);
        results.forEach(r => {
          if (r.error) console.log(r.error);
          else console.log(r.result || r);
        });
        break;
      }
      case 'plot-chart': {
        const { vals } = await inquirer.prompt({ type: 'input', name: 'vals', message: 'Enter numbers separated by comma:' });
        const arr = vals.split(',').map(Number).filter(x => !isNaN(x));
        plotChart(arr);
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
        try {
          const result = math.evaluate(expr);
          console.log(`Result: ${result}`);
        } catch (err) {
          console.log('Invalid expression:', err.message);
        }
        break;
      }
      case 'convert': {
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Enter conversion query:' });
        console.log(`Conversion: ${query}`);
        break;
      }
      case 'history': {
        console.log('History feature is not yet implemented.');
        break;
      }
      case 'optimize': {
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Enter optimization query:' });
        console.log(`Optimization: ${query}`);
        break;
      }
      case 'calculate-from-file': {
        const { file, op, output } = await inquirer.prompt([
          { type: 'input', name: 'file', message: 'File path (.csv/.json):' },
          { type: 'input', name: 'op', message: 'Operation (ex: sum(col1)):' },
          { type: 'input', name: 'output', message: 'Output file (optional):' }
        ]);
        calculateFromFile(file, op, output || null);
        break;
      }
      case 'fetch-currency': {
        const { currency, apiIdx } = await inquirer.prompt([
          { type: 'input', name: 'currency', message: 'Currency code (ex: USD):' },
          { type: 'list', name: 'apiIdx', message: 'Select API source:', choices: currencyApis.map((a, i) => ({ name: a.name, value: i })) }
        ]);
        await fetchCurrency(currency, apiIdx);
        break;
      }
      case 'run-script': {
        const { script } = await inquirer.prompt({ type: 'input', name: 'script', message: 'Script file path:' });
        await runScript(script);
        break;
      }
      case 'help': {
        showHelp();
        break;
      }
      case 'plot-chart': {
        const { vals } = await inquirer.prompt({ type: 'input', name: 'vals', message: 'Enter numbers separated by comma:' });
        const arr = vals.split(',').map(Number).filter(x => !isNaN(x));
        await plotChart(arr);
        break;
      }
    }
    console.log('');
  }
}

async function testApis(currency = 'USD') {
  for (let i = 0; i < currencyApis.length; i++) {
    const api = currencyApis[i];
    process.stdout.write(`Testing ${api.name}... `);
    try {
      const url = api.url(currency);
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const rates = api.parse(data);
      if (!rates || typeof rates !== 'object' || Object.keys(rates).length === 0) {
        console.log('❌ Invalid response');
      } else {
        console.log('✅ OK');
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }
}

const [,, command, ...args] = process.argv;

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
          if (res.error) console.log(res.error);
          else console.log(res);
        }
        break;
      }
      case 'convert': {
        if (!args[0]) {
          console.log('Please provide a conversion query.');
        } else {
          const { result } = convert(args[0]);
          console.log(result);
        }
        break;
      }
      case 'history': {
        const { result } = showHistory();
        console.log(result);
        break;
      }
      case 'optimize': {
        if (!args[0]) {
          console.log('Please provide an optimization query.');
        } else {
          const { result } = optimize(args[0]);
          console.log(result);
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
          if (res.error) console.log(res.error);
          else {
            console.log(`Exchange rates for ${currency} [${res.api}]:`);
            Object.entries(res.rates).forEach(([key, value]) => {
              console.log(`  ${key}: ${value}`);
            });
          }
        }
        break;
      }
      case 'run-script': {
        if (!args[0]) {
          console.log('Usage: node index.js run-script script.txt');
        } else {
          const results = await runScript(args[0]);
          results.forEach(r => {
            if (r.error) console.log(r.error);
            else console.log(r.result || r);
          });
        }
        break;
      }
      case 'plot-chart': {
        const arr = args.map(Number).filter(x => !isNaN(x));
        plotChart(arr);
        break;
      }
      case 'help':
      default:
        console.log(showHelp());
        break;
    }
  })();
}
