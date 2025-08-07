
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
    { name: '🚪 Exit', value: 'exit' }
  ];
  // Ieșire rapidă la Ctrl+C
  process.on('SIGINT', () => {
    console.log(chalk.green('\nCLI închis. La revedere!'));
    process.exit(0);
  });
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: chalk.cyan('Alege o categorie sau funcție:'),
      choices: categories
    });
    if (action === 'exit') {
      console.log(chalk.green('Goodbye!'));
      process.exit(0);
    }
    switch (action) {
      case 'calculate':
        console.log(chalk.yellow('Exemplu: 2+2*5 → 12'));
        // Implementare directă sau apel la modulul calculate
        const { expr } = await inquirer.prompt({ type: 'input', name: 'expr', message: 'Introduceți expresia matematică:' });
        try {
          const result = calculate(expr);
          console.log(chalk.green('Rezultat:'), result);
          await saveHistory({ type: 'calculate', input: expr, result, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Eroare la calcul:'), e.message);
        }
        break;
      case 'optimize':
        console.log(chalk.yellow('Exemplu: minimize x^2+3x-5'));
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Introduceți funcția de optimizat:' });
        try {
          const result = optimize(query);
          console.log(chalk.green('Optimizare:'), result);
          await saveHistory({ type: 'optimize', input: query, result, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Eroare la optimizare:'), e.message);
        }
        break;
      case 'convert':
        console.log(chalk.yellow('Exemplu: 100 cm to m → 1 m'));
        const { conv } = await inquirer.prompt({ type: 'input', name: 'conv', message: 'Introduceți conversia (ex: 100 cm to m):' });
        try {
          const result = convert(conv);
          console.log(chalk.green('Conversie:'), result);
          await saveHistory({ type: 'convert', input: conv, result, date: new Date().toISOString() });
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
        console.log(chalk.yellow('Exemplu: USD, exchangerate.host'));
        const { currency, apiIdx } = await inquirer.prompt([
          { type: 'input', name: 'currency', message: 'Cod valută (ex: USD):' },
          { type: 'list', name: 'apiIdx', message: 'Alege sursa API:', choices: [ { name: 'exchangerate.host', value: 0 }, { name: 'frankfurter.app', value: 1 } ] }
        ]);
        try {
          const result = await fetchCurrency(currency, apiIdx);
          if (result && result.error) console.log(chalk.red(result.error));
          else if (result) {
            console.log(chalk.green(`Cursuri pentru ${currency} [${result.api}]:`));
            Object.entries(result.rates).forEach(([key, value]) => {
              console.log(`  ${key}: ${value}`);
            });
          }
          await saveHistory({ type: 'fetch-currency', input: { currency, apiIdx }, result, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Eroare curs valutar:'), e.message);
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