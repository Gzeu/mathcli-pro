
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { calculate } from './commands/calculate.js';
import { calculateFromFile } from './commands/calculateFromFile.js';
import { convert } from './commands/convert.js';
import { showHistory as showHistoryModule } from './commands/history.js';
import fs from 'fs';
const HISTORY_FILE = './data/history.json';

// ...existing code...
import { optimize } from './commands/optimize.js';
import { fetchCurrency } from './commands/fetchCurrency.js';
import { plotChart } from './commands/plotChart.js';
import { runScript } from './commands/runScript.js';

import { showHelp } from './commands/help.js';
import * as treeOfLife from './commands/tree-of-life.js';
import { catalog } from './catalog.js';


// Alias-uri CLI pentru acțiuni rapide
const ALIASES = {
  calc: 'calculate',
  conv: 'convert',
  hist: 'history',
  opt: 'optimize',
  help: 'help',
  exit: 'exit',
};

const [,, command, ...args] = process.argv;

async function mainMenu() {
  // Banner ASCII art la pornire
  console.log(
    chalk.cyan(
      figlet.textSync('MathCLI Pro', { horizontalLayout: 'default', font: 'Standard' })
    )
  );
  console.log(chalk.gray('Advanced CLI Calculator | Type "help" for commands\n'));
  const categories = [
    new inquirer.Separator(chalk.cyan('=== Calcul & Optimizare ===')),
    { name: '🧮 Calculate expression   (ex: 2+2*5 → 12)', value: 'calculate' },
    { name: '📈 Optimize math         (ex: minimize x^2+3x-5)', value: 'optimize' },
    new inquirer.Separator(chalk.cyan('=== Conversii & Batch ===')),
    { name: '🔄 Convert units         (ex: 100 cm to m → 1 m)', value: 'convert' },
    { name: '🗂️  Calculate from file   (ex: test.csv, sum(col1))', value: 'calculate-from-file' },
    { name: '💱 Fetch currency rates  (ex: USD, exchangerate.host)', value: 'fetch-currency' },
    new inquirer.Separator(chalk.cyan('=== Automatizare & Vizualizare ===')),
    { name: '📜 Run script file       (ex: script.txt cu comenzi CLI)', value: 'run-script' },
    { name: '📊 Plot chart            (ex: 3 1 4 1 5 9 2 6)', value: 'plot-chart' },
    new inquirer.Separator(chalk.cyan('=== Utilitare ===')),
    { name: '🕑 History               (ultimele 20 operații)', value: 'history' },
    { name: '🆘 Help                  (comenzi, exemple, FAQ)', value: 'help' },
    { name: '� Catalog vizualizări & extensii', value: 'catalog' },
    { name: '�🚪 Exit', value: 'exit' }
  ];
  // Ieșire rapidă la Ctrl+C
  process.on('SIGINT', () => {
    console.log(chalk.green('\nCLI închis. La revedere!'));
    process.exit(0);
  });
  while (true) {
    let action;
    // Dacă există argument CLI, folosește-l ca acțiune (inclusiv alias)
    if (command) {
      action = ALIASES[command] || command;
    } else {
      const resp = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: chalk.cyan('Alege o categorie sau funcție:'),
        choices: categories
      });
      action = resp.action;
    }
    if (action === 'exit') {
      console.log(chalk.green('Goodbye!'));
      process.exit(0);
    }
    switch (action) {
      case 'catalog':
        // Grupare pe categorii
        const grouped = {};
        for (const item of catalog) {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        }
        for (const [cat, items] of Object.entries(grouped)) {
          console.log(chalk.cyan.bold(`\n=== ${cat.toUpperCase()} ===`));
          for (const ext of items) {
            console.log(chalk.yellowBright(`\n${ext.name}`));
            console.log(chalk.gray(`Comandă: ${ext.command}`));
            console.log(chalk.white(ext.description));
            console.log(chalk.green('Exemplu: ') + ext.example);
            if (ext.exampleOutput) {
              console.log(chalk.magenta('Output:'));
              console.log(ext.exampleOutput);
            }
            if (ext.notes) console.log(chalk.blue('Extensibil: ') + ext.notes);
          }
        }
        break;
      case 'calculate':
        console.log(chalk.yellow('Exemplu: 2+2*5 → 12'));
        // Validare expresie matematică simplă (doar caractere permise)
        const { expr } = await inquirer.prompt({
          type: 'input',
          name: 'expr',
          message: 'Introduceți expresia matematică:',
          validate: input => {
            if (!input.trim()) return 'Expresia nu poate fi goală!';
            if (!/^[\d\s\+\-\*\/\^\(\)\.,a-zA-Z]+$/.test(input)) return 'Expresie invalidă! Folosiți doar cifre, operatori și funcții.';
            return true;
          },
          suffix: chalk.gray('  ex: 2+2*5, sin(pi/2)+sqrt(16)')
        });
        try {
          const result = calculate(expr);
          if (result.error) {
            console.log(chalk.red('Eroare la calcul:'), result.error);
          } else {
            console.log(chalk.green('Rezultat:'), result);
            await saveHistory({ type: 'calculate', input: expr, result, date: new Date().toISOString() });
          }
        } catch (e) {
          console.log(chalk.red('Eroare la calcul:'), e.message);
        }
        break;
      case 'tree-of-life':
        if (typeof treeOfLife === 'function') {
          treeOfLife();
        } else if (treeOfLife && typeof treeOfLife.default === 'function') {
          treeOfLife.default();
        } else if (treeOfLife && typeof treeOfLife.treeOfLife === 'function') {
          treeOfLife.treeOfLife();
        }
        await saveHistory({ type: 'tree-of-life', input: null, result: 'Tree of Life displayed', date: new Date().toISOString() });
        break;
      case 'optimize':
        console.log(chalk.yellow('Exemplu: minimize x^2+3x-5'));
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Introduceți funcția de optimizat:' });
        try {
          const result = optimize(query);
          if (result.error) {
            console.log(chalk.red('Eroare la optimizare:'), result.error);
          } else {
            // Highlight rezultat principal
            console.log(chalk.bold.cyan('\n=== Rezultat Optimizare ==='));
            console.log(chalk.greenBright(` ${result.result}`));
            console.log(chalk.yellowBright(` Punct extrem: x = ${result.extremum.x}, y = ${result.extremum.y}`));
            // Tabel sumar puncte critice
            if (result.allPoints && result.allPoints.length > 1) {
              console.log(chalk.gray('\nPuncte critice (x, y):'));
              result.allPoints.forEach(pt => {
                const mark = (pt.x === result.extremum.x) ? chalk.bgGreen(' <extremum>') : '';
                console.log(`  x = ${pt.x}, y = ${pt.y}${mark}`);
              });
            }
            // Grafic ASCII simplu pe interval [-10,10]
            try {
              const { create, all } = await import('mathjs');
              const math = create(all);
              const funcMatch = query.match(/^(minimize|maximize)\s+(.+)$/i);
              if (funcMatch) {
                const func = funcMatch[2];
                const variable = 'x';
                const points = [];
                for (let x = -10; x <= 10; x += 1) {
                  let y = NaN;
                  try { y = math.evaluate(func, { [variable]: x }); } catch {}
                  points.push({ x, y });
                }
                // Normalizează pentru grafic
                const minY = Math.min(...points.map(p => p.y));
                const maxY = Math.max(...points.map(p => p.y));
                const height = 10;
                const scaleY = (y) => Math.round((y - minY) / (maxY - minY) * (height - 1));
                let chart = Array.from({ length: height }, () => Array(points.length).fill(' '));
                points.forEach((p, i) => {
                  if (!isNaN(p.y)) {
                    const yIdx = height - 1 - scaleY(p.y);
                    chart[yIdx][i] = (Math.abs(p.x - result.extremum.x) < 1e-6) ? chalk.bgGreen('●') : chalk.cyan('•');
                  }
                });
                console.log(chalk.gray('\nGrafic ASCII (x ∈ [-10,10]):'));
                chart.forEach(row => console.log(' ' + row.join('')));
                console.log(chalk.gray('  ' + points.map(p => (p.x % 5 === 0 ? String(p.x).padStart(2, ' ') : '  ')).join('')));
              }
            } catch {}
            await saveHistory({ type: 'optimize', input: query, result, date: new Date().toISOString() });
          }
        } catch (e) {
          console.log(chalk.red('Eroare la optimizare:'), e.message);
        }
        break;
      case 'convert':
        console.log(chalk.yellow('Exemplu: 100 cm to m → 1 m'));
        // Validare input conversie (ex: 100 cm to m)
        const { conv } = await inquirer.prompt({
          type: 'input',
          name: 'conv',
          message: 'Introduceți conversia (ex: 100 cm to m):',
          validate: input => {
            if (!input.trim()) return 'Conversia nu poate fi goală!';
            if (!/^\d+\s*[a-zA-Z]+\s+to\s+[a-zA-Z]+$/.test(input.trim())) return 'Format invalid! ex: 100 cm to m';
            return true;
          },
          suffix: chalk.gray('  ex: 100 cm to m, 5 kg to lb')
        });
        try {
          const result = convert(conv);
          if (result.error) {
            console.log(chalk.red('Eroare la conversie:'), result.error);
          } else {
            console.log(chalk.green('Conversie:'), result);
            await saveHistory({ type: 'convert', input: conv, result, date: new Date().toISOString() });
          }
        } catch (e) {
          console.log(chalk.red('Eroare la conversie:'), e.message);
        }
        break;
      case 'calculate-from-file':
        console.log(chalk.yellow('Exemplu: test.csv, sum(col1)'));
        const { file, op, output } = await inquirer.prompt([
          { type: 'input', name: 'file', message: 'Cale fișier (.csv/.json):' },
          { type: 'input', name: 'op', message: 'Operație (ex: sum(col1)):' },
          { type: 'input', name: 'output', message: 'Fișier output (opțional):' }
        ]);
        try {
          const result = calculateFromFile(file, op, output || null);
          console.log(chalk.green('Rezultat batch:'), result);
          await saveHistory({ type: 'calculate-from-file', input: { file, op, output }, result, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Eroare batch:'), e.message);
        }
        break;
      case 'fetch-currency':
        console.log(chalk.yellow('Example: USD, exchangerate.host or BTC, coingecko'));
        // Get all unique APIs from catalog entries with command 'fetch-currency'
        const apiSet = new Set();
        for (const entry of catalog) {
          if (entry.command === 'fetch-currency' && Array.isArray(entry.supportedApis)) {
            entry.supportedApis.forEach(api => apiSet.add(api));
          }
        }
        const apiChoices = Array.from(apiSet).map(api => ({ name: api, value: api }));
        const { currency, api } = await inquirer.prompt([
          { type: 'input', name: 'currency', message: 'Currency code (ex: USD, BTC):' },
          { type: 'list', name: 'api', message: 'Select API source:', choices: apiChoices }
        ]);
        try {
          const result = await fetchCurrency(currency, api);
          if (result && result.error) {
            if (api === 'coingecko') {
              console.log(chalk.red('Crypto not found or unsupported by CoinGecko. Try BTC, ETH, SOL, etc.'));
            } else if (api === 'exchangerate.host' || api === 'frankfurter.app') {
              console.log(chalk.red('Currency not found or unsupported by selected API. Try USD, EUR, RON, etc.'));
            } else {
              console.log(chalk.red(result.error));
            }
          } else if (result) {
            console.log(chalk.green(`Rates for ${currency} [${result.api}]:`));
            Object.entries(result.rates).forEach(([key, value]) => {
              console.log(`  ${key}: ${value}`);
            });
          }
          await saveHistory({ type: 'fetch-currency', input: { currency, api }, result, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Currency fetch error:'), e.message);
        }
        break;
      case 'run-script':
        console.log(chalk.yellow('Exemplu: script.txt cu comenzi CLI'));
        const { script } = await inquirer.prompt({ type: 'input', name: 'script', message: 'Cale fișier script:' });
        try {
          const results = await runScript(script);
          if (Array.isArray(results)) {
            results.forEach(r => {
              if (r.error) console.log(chalk.red(r.error));
              else console.log(chalk.green(r.result || r));
            });
          } else if (results && results.error) {
            console.log(chalk.red(results.error));
          }
          await saveHistory({ type: 'run-script', input: script, result: results, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Eroare script:'), e.message);
        }
        break;
      case 'plot-chart':
        console.log(chalk.yellow('Exemplu: 3 1 4 1 5 9 2 6'));
        const { values } = await inquirer.prompt({ type: 'input', name: 'values', message: 'Valori separate prin spațiu:' });
        try {
          const arr = values.split(/\s+/).map(Number).filter(x => !isNaN(x));
          plotChart(arr);
          await saveHistory({ type: 'plot-chart', input: values, result: arr, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Eroare chart:'), e.message);
        }
        break;
      case 'history':
        await showHistoryPersistent();
        break;
      case 'help':
        console.log(showHelp());
        break;
    }
    // Dacă a fost acțiune din CLI, ieși după execuție (nu intra în buclă meniu)
    if (command) break;
    console.log('');
  }
}

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
// Pornește CLI-ul doar dacă fișierul este rulat direct
mainMenu();