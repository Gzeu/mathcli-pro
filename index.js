import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { calculate } from './commands/calculate.js';
import { calculateFromFile } from './commands/calculateFromFile.js';
import { convert } from './commands/convert.js';
import { showHistory as showHistoryModule } from './commands/history.js';
import fs from 'fs';

// Import new features
import { calculateAICost, compareAIModels, recommendModel } from './commands/ai/api-cost-calculator.js';
import { calculateMEV } from './commands/defi/mev-calculator.js';
import { optimizeServerless, compareServerless, estimateDatabaseCost } from './commands/cloud/serverless-optimizer.js';
import { matrixOperations } from './commands/scientific/matrix.js';
import { solveEquations } from './commands/scientific/equations.js';
import { integrate, integrateDouble } from './commands/scientific/integration.js';
import { mechanics } from './commands/physics/mechanics.js';
import { electricity } from './commands/physics/electricity.js';
import { thermodynamics } from './commands/physics/thermodynamics.js';
import { probability } from './commands/gaming/probability.js';
import { rng } from './commands/gaming/rng.js';

const HISTORY_FILE = './data/history.json';

import { optimize } from './commands/optimize.js';
import { fetchCurrency } from './commands/fetchCurrency.js';
import { plotChart } from './commands/plotChart.js';
import { runScript } from './commands/runScript.js';
import { showHelp } from './commands/help.js';
import { catalog } from './catalog.js';

// Alias-uri CLI
const ALIASES = {
  calc: 'calculate',
  conv: 'convert',
  hist: 'history',
  opt: 'optimize',
  help: 'help',
  exit: 'exit',
  ai: 'ai-calculator',
  mev: 'mev-calculator',
  cloud: 'serverless-optimizer',
  matrix: 'scientific-matrix',
  physics: 'physics-calculator',
  prob: 'probability-gaming',
};

const [,, command, ...args] = process.argv;

async function mainMenu() {
  console.log(
    chalk.cyan(
      figlet.textSync('MathCLI Pro', { horizontalLayout: 'default', font: 'Standard' })
    )
  );
  console.log(chalk.gray('Advanced CLI Calculator | v4.2.0 | Type "help" for commands\n'));
  
  const categories = [
    new inquirer.Separator(chalk.cyan('=== 🤖 AI & Cloud (NEW!) ===')),
    { name: '🤖 AI API Cost Calculator    (40+ models, caching, batch)', value: 'ai-calculator' },
    { name: '💰 MEV Calculator (DeFi)     (arbitrage, liquidation, flashloan)', value: 'mev-calculator' },
    { name: '☁️  Serverless Optimizer     (AWS, Cloudflare, Vercel)', value: 'serverless-optimizer' },
    
    new inquirer.Separator(chalk.cyan('=== 📐 Scientific Computing ===')),
    { name: '🔢 Matrix Operations        (determinant, inverse, eigenvalues)', value: 'scientific-matrix' },
    { name: '🔬 Linear Equations         (Gaussian, LU decomposition)', value: 'scientific-equations' },
    { name: '∫  Numerical Integration    (Simpson, Trapezoidal, Monte Carlo)', value: 'scientific-integration' },
    
    new inquirer.Separator(chalk.cyan('=== ⚙️  Physics & Engineering ===')),
    { name: '⚙️  Mechanics Calculator     (velocity, force, energy, projectile)', value: 'physics-mechanics' },
    { name: '⚡ Electricity Calculator    (Ohm\'s law, power, resistance)', value: 'physics-electricity' },
    { name: '🌡️  Thermodynamics          (heat transfer, ideal gas, entropy)', value: 'physics-thermodynamics' },
    
    new inquirer.Separator(chalk.cyan('=== 🎮 Gaming & Probability ===')),
    { name: '🎲 Probability Calculator   (drop rates, gacha, loot box EV)', value: 'probability-gaming' },
    { name: '🎰 RNG Tools                (random generation, distribution test)', value: 'rng-tools' },
    
    new inquirer.Separator(chalk.cyan('=== 🧮 Classic Features ===')),
    { name: '🧠 Calculate expression   (ex: 2+2*5 → 12)', value: 'calculate' },
    { name: '📈 Optimize math         (ex: minimize x^2+3x-5)', value: 'optimize' },
    { name: '🔄 Convert units         (ex: 100 cm to m → 1 m)', value: 'convert' },
    { name: '🗂️  Calculate from file   (ex: test.csv, sum(col1))', value: 'calculate-from-file' },
    { name: '💱 Fetch currency rates  (ex: USD, exchangerate.host)', value: 'fetch-currency' },
    { name: '📜 Run script file       (ex: script.txt)', value: 'run-script' },
    { name: '📊 Plot chart            (ex: 3 1 4 1 5 9 2 6)', value: 'plot-chart' },
    
    new inquirer.Separator(chalk.cyan('=== 🛠️  Utilities ===')),
    { name: '🕑 History               (last 20 operations)', value: 'history' },
    { name: '🆘 Help                  (commands, examples)', value: 'help' },
    { name: '📚 Catalog               (all features)', value: 'catalog' },
    { name: '🚪 Exit', value: 'exit' }
  ];

  process.on('SIGINT', () => {
    console.log(chalk.green('\nCLI closed. Goodbye!'));
    process.exit(0);
  });

  while (true) {
    let action;
    
    if (command) {
      action = ALIASES[command] || command;
    } else {
      const resp = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: chalk.cyan('Choose a feature:'),
        choices: categories,
        pageSize: 30
      });
      action = resp.action;
    }

    if (action === 'exit') {
      console.log(chalk.green('Goodbye!'));
      process.exit(0);
    }

    switch (action) {
      // NEW: AI Calculator
      case 'ai-calculator':
        await handleAICalculator();
        break;
      
      // NEW: MEV Calculator
      case 'mev-calculator':
        await handleMEVCalculator();
        break;
      
      // NEW: Serverless Optimizer
      case 'serverless-optimizer':
        await handleServerlessOptimizer();
        break;
      
      // NEW: Scientific Matrix
      case 'scientific-matrix':
        await handleScientificMatrix();
        break;
      
      // NEW: Scientific Equations
      case 'scientific-equations':
        await handleScientificEquations();
        break;
      
      // NEW: Scientific Integration
      case 'scientific-integration':
        await handleScientificIntegration();
        break;
      
      // NEW: Physics Mechanics
      case 'physics-mechanics':
        await handlePhysicsMechanics();
        break;
      
      // NEW: Physics Electricity
      case 'physics-electricity':
        await handlePhysicsElectricity();
        break;
      
      // NEW: Physics Thermodynamics
      case 'physics-thermodynamics':
        await handlePhysicsThermodynamics();
        break;
      
      // NEW: Probability Gaming
      case 'probability-gaming':
        await handleProbabilityGaming();
        break;
      
      // NEW: RNG Tools
      case 'rng-tools':
        await handleRNGTools();
        break;

      // ... existing cases ...
      case 'catalog':
        const grouped = {};
        for (const item of catalog) {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        }
        for (const [cat, items] of Object.entries(grouped)) {
          console.log(chalk.cyan.bold(`\n=== ${cat.toUpperCase()} ===`));
          for (const ext of items) {
            console.log(chalk.yellowBright(`\n${ext.name}`));
            console.log(chalk.gray(`Command: ${ext.command}`));
            console.log(chalk.white(ext.description));
            console.log(chalk.green('Example: ') + ext.example);
            if (ext.exampleOutput) {
              console.log(chalk.magenta('Output:'));
              console.log(ext.exampleOutput);
            }
            if (ext.notes) console.log(chalk.blue('Notes: ') + ext.notes);
          }
        }
        break;

      case 'calculate':
        console.log(chalk.yellow('Example: 2+2*5 → 12'));
        const { expr } = await inquirer.prompt({
          type: 'input',
          name: 'expr',
          message: 'Enter math expression:',
          validate: input => {
            if (!input.trim()) return 'Expression cannot be empty!';
            if (!/^[\d\s\+\-\*\/\^\(\)\.,a-zA-Z]+$/.test(input)) return 'Invalid expression!';
            return true;
          },
          suffix: chalk.gray('  ex: 2+2*5, sin(pi/2)+sqrt(16)')
        });
        try {
          const result = calculate(expr);
          if (result.error) {
            console.log(chalk.red('Calculation error:'), result.error);
          } else {
            console.log(chalk.green('Result:'), result);
            await saveHistory({ type: 'calculate', input: expr, result, date: new Date().toISOString() });
          }
        } catch (e) {
          console.log(chalk.red('Calculation error:'), e.message);
        }
        break;

      case 'optimize':
        console.log(chalk.yellow('Example: minimize x^2+3x-5'));
        const { query } = await inquirer.prompt({ type: 'input', name: 'query', message: 'Enter function to optimize:' });
        try {
          const result = optimize(query);
          if (result.error) {
            console.log(chalk.red('Optimization error:'), result.error);
          } else {
            console.log(chalk.bold.cyan('\n=== Optimization Result ==='));
            console.log(chalk.greenBright(` ${result.result}`));
            console.log(chalk.yellowBright(` Extremum point: x = ${result.extremum.x}, y = ${result.extremum.y}`));
            await saveHistory({ type: 'optimize', input: query, result, date: new Date().toISOString() });
          }
        } catch (e) {
          console.log(chalk.red('Optimization error:'), e.message);
        }
        break;

      case 'convert':
        console.log(chalk.yellow('Example: 100 cm to m → 1 m'));
        const { conv } = await inquirer.prompt({
          type: 'input',
          name: 'conv',
          message: 'Enter conversion (ex: 100 cm to m):',
          validate: input => {
            if (!input.trim()) return 'Conversion cannot be empty!';
            if (!/^\d+\s*[a-zA-Z]+\s+to\s+[a-zA-Z]+$/.test(input.trim())) return 'Invalid format! ex: 100 cm to m';
            return true;
          }
        });
        try {
          const result = convert(conv);
          if (result.error) {
            console.log(chalk.red('Conversion error:'), result.error);
          } else {
            console.log(chalk.green('Conversion:'), result);
            await saveHistory({ type: 'convert', input: conv, result, date: new Date().toISOString() });
          }
        } catch (e) {
          console.log(chalk.red('Conversion error:'), e.message);
        }
        break;

      case 'calculate-from-file':
        console.log(chalk.yellow('Example: test.csv, sum(col1)'));
        const { file, op, output } = await inquirer.prompt([
          { type: 'input', name: 'file', message: 'File path (.csv/.json):' },
          { type: 'input', name: 'op', message: 'Operation (ex: sum(col1)):' },
          { type: 'input', name: 'output', message: 'Output file (optional):' }
        ]);
        try {
          const result = calculateFromFile(file, op, output || null);
          console.log(chalk.green('Batch result:'), result);
          await saveHistory({ type: 'calculate-from-file', input: { file, op, output }, result, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Batch error:'), e.message);
        }
        break;

      case 'fetch-currency':
        console.log(chalk.yellow('Example: USD, exchangerate.host or BTC, coingecko'));
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
            console.log(chalk.red(result.error));
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
        console.log(chalk.yellow('Example: script.txt with CLI commands'));
        const { script } = await inquirer.prompt({ type: 'input', name: 'script', message: 'Script file path:' });
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
          console.log(chalk.red('Script error:'), e.message);
        }
        break;

      case 'plot-chart':
        console.log(chalk.yellow('Example: 3 1 4 1 5 9 2 6'));
        const { values } = await inquirer.prompt({ type: 'input', name: 'values', message: 'Values separated by space:' });
        try {
          const arr = values.split(/\s+/).map(Number).filter(x => !isNaN(x));
          plotChart(arr);
          await saveHistory({ type: 'plot-chart', input: values, result: arr, date: new Date().toISOString() });
        } catch (e) {
          console.log(chalk.red('Chart error:'), e.message);
        }
        break;

      case 'history':
        await showHistoryPersistent();
        break;

      case 'help':
        console.log(showHelp());
        break;
    }
    
    if (command) break;
    console.log('');
  }
}

// NEW: Handler functions for new features
async function handleAICalculator() {
  const { subAction } = await inquirer.prompt({
    type: 'list',
    name: 'subAction',
    message: 'AI Calculator Options:',
    choices: [
      { name: 'Calculate Cost', value: 'cost' },
      { name: 'Compare Models', value: 'compare' },
      { name: 'Recommend Model', value: 'recommend' },
      { name: 'Back', value: 'back' }
    ]
  });
  
  if (subAction === 'back') return;
  
  try {
    if (subAction === 'cost') {
      const params = await inquirer.prompt([
        { type: 'input', name: 'model', message: 'Model (ex: gpt-5, claude-sonnet-4.5):' },
        { type: 'number', name: 'inputTokens', message: 'Input tokens:', default: 1000 },
        { type: 'number', name: 'outputTokens', message: 'Output tokens:', default: 500 },
        { type: 'number', name: 'requests', message: 'Requests per month:', default: 10000 },
        { type: 'confirm', name: 'promptCaching', message: 'Enable prompt caching?', default: false },
        { type: 'confirm', name: 'batchAPI', message: 'Use batch API (50% discount)?', default: false }
      ]);
      
      if (params.promptCaching) {
        const { cacheHitRate } = await inquirer.prompt({
          type: 'number',
          name: 'cacheHitRate',
          message: 'Cache hit rate (0-1):',
          default: 0.8
        });
        params.cacheHitRate = cacheHitRate;
      }
      
      const result = await calculateAICost(params);
      await saveHistory({ type: 'ai-cost', input: params, result, date: new Date().toISOString() });
    } else if (subAction === 'compare') {
      const { models, inputTokens, outputTokens, requests } = await inquirer.prompt([
        { type: 'input', name: 'models', message: 'Models (comma-separated):', default: 'gpt-5,claude-opus-4.5,gemini-3-pro' },
        { type: 'number', name: 'inputTokens', message: 'Input tokens:', default: 1000 },
        { type: 'number', name: 'outputTokens', message: 'Output tokens:', default: 500 },
        { type: 'number', name: 'requests', message: 'Requests per month:', default: 100000 }
      ]);
      
      const result = await compareAIModels({
        models: models.split(',').map(m => m.trim()),
        inputTokens,
        outputTokens,
        requests
      });
      await saveHistory({ type: 'ai-compare', input: { models, inputTokens, outputTokens, requests }, result, date: new Date().toISOString() });
    } else if (subAction === 'recommend') {
      const { useCase, budget } = await inquirer.prompt([
        { 
          type: 'list', 
          name: 'useCase', 
          message: 'Use case:', 
          choices: ['chatbot', 'coding', 'analysis', 'content', 'extraction', 'research'] 
        },
        { type: 'number', name: 'budget', message: 'Monthly budget ($):', default: 500 }
      ]);
      
      const result = await recommendModel({ useCase, budget });
      await saveHistory({ type: 'ai-recommend', input: { useCase, budget }, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('AI Calculator error:'), e.message);
  }
}

async function handleMEVCalculator() {
  const { mevType } = await inquirer.prompt({
    type: 'list',
    name: 'mevType',
    message: 'MEV Calculator Type:',
    choices: [
      { name: 'Arbitrage', value: 'arbitrage' },
      { name: 'Sandwich Attack', value: 'sandwich' },
      { name: 'Liquidation', value: 'liquidation' },
      { name: 'Flashloan', value: 'flashloan' },
      { name: 'Back', value: 'back' }
    ]
  });
  
  if (mevType === 'back') return;
  
  try {
    if (mevType === 'arbitrage') {
      const params = await inquirer.prompt([
        { type: 'input', name: 'token', message: 'Token:', default: 'EGLD' },
        { type: 'number', name: 'amount', message: 'Amount:', default: 10000 },
        { type: 'number', name: 'priceA', message: 'Price on DEX A:', default: 35.20 },
        { type: 'number', name: 'priceB', message: 'Price on DEX B:', default: 35.80 },
        { type: 'number', name: 'gasPrice', message: 'Gas price:', default: 100 },
        { type: 'list', name: 'chain', message: 'Chain:', choices: ['ethereum', 'multiversx', 'bsc', 'polygon', 'arbitrum'], default: 'multiversx' }
      ]);
      
      const result = await calculateMEV('arbitrage', params);
      await saveHistory({ type: 'mev-arbitrage', input: params, result, date: new Date().toISOString() });
    } else if (mevType === 'liquidation') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'collateralValue', message: 'Collateral value ($):', default: 100000 },
        { type: 'number', name: 'debtValue', message: 'Debt value ($):', default: 90000 },
        { type: 'number', name: 'gasPrice', message: 'Gas price:', default: 120 },
        { type: 'input', name: 'platform', message: 'Platform:', default: 'Aave' }
      ]);
      
      const result = await calculateMEV('liquidation', params);
      await saveHistory({ type: 'mev-liquidation', input: params, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('MEV Calculator error:'), e.message);
  }
}

async function handleServerlessOptimizer() {
  const { subAction } = await inquirer.prompt({
    type: 'list',
    name: 'subAction',
    message: 'Serverless Optimizer:',
    choices: [
      { name: 'Calculate Cost', value: 'cost' },
      { name: 'Compare Platforms', value: 'compare' },
      { name: 'Database Cost', value: 'database' },
      { name: 'Back', value: 'back' }
    ]
  });
  
  if (subAction === 'back') return;
  
  try {
    if (subAction === 'cost') {
      const params = await inquirer.prompt([
        { type: 'list', name: 'platform', message: 'Platform:', choices: ['aws-lambda', 'cloudflare-workers', 'vercel', 'google-cloud-functions', 'azure-functions'] },
        { type: 'number', name: 'requests', message: 'Requests per month:', default: 5000000 },
        { type: 'number', name: 'avgDuration', message: 'Avg duration (ms):', default: 500 },
        { type: 'number', name: 'memory', message: 'Memory (MB):', default: 512 }
      ]);
      
      const result = await optimizeServerless(params);
      await saveHistory({ type: 'serverless-cost', input: params, result, date: new Date().toISOString() });
    } else if (subAction === 'compare') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'requests', message: 'Requests per month:', default: 10000000 },
        { type: 'number', name: 'avgDuration', message: 'Avg duration (ms):', default: 300 },
        { type: 'number', name: 'memory', message: 'Memory (MB):', default: 256 }
      ]);
      
      const result = await compareServerless(params);
      await saveHistory({ type: 'serverless-compare', input: params, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('Serverless error:'), e.message);
  }
}

async function handleScientificMatrix() {
  const { operation } = await inquirer.prompt({
    type: 'list',
    name: 'operation',
    message: 'Matrix Operation:',
    choices: ['determinant', 'inverse', 'transpose', 'eigenvalues', 'back']
  });
  
  if (operation === 'back') return;
  
  try {
    const { matrixInput } = await inquirer.prompt({
      type: 'input',
      name: 'matrixInput',
      message: 'Enter matrix (ex: [[4,3],[2,1]]):'
    });
    
    const matrix = JSON.parse(matrixInput);
    const result = await matrixOperations(operation, matrix);
    await saveHistory({ type: 'matrix-' + operation, input: matrix, result, date: new Date().toISOString() });
  } catch (e) {
    console.log(chalk.red('Matrix error:'), e.message);
  }
}

async function handleScientificEquations() {
  try {
    const { A, b } = await inquirer.prompt([
      { type: 'input', name: 'A', message: 'Coefficient matrix A (ex: [[2,1,-1],[-3,-1,2],[-2,1,2]]):' },
      { type: 'input', name: 'b', message: 'Constants vector b (ex: [8,-11,-3]):' }
    ]);
    
    const matrixA = JSON.parse(A);
    const vectorB = JSON.parse(b);
    
    const result = await solveEquations(matrixA, vectorB);
    await saveHistory({ type: 'equations', input: { A: matrixA, b: vectorB }, result, date: new Date().toISOString() });
  } catch (e) {
    console.log(chalk.red('Equations error:'), e.message);
  }
}

async function handleScientificIntegration() {
  try {
    const params = await inquirer.prompt([
      { type: 'input', name: 'expression', message: 'Function to integrate (ex: x^2):' },
      { type: 'number', name: 'a', message: 'Lower bound:', default: 0 },
      { type: 'number', name: 'b', message: 'Upper bound:', default: 1 },
      { type: 'list', name: 'method', message: 'Method:', choices: ['simpson', 'trapezoidal', 'midpoint', 'monte-carlo'], default: 'simpson' }
    ]);
    
    const result = await integrate(params.expression, params.a, params.b, params.method);
    await saveHistory({ type: 'integration', input: params, result, date: new Date().toISOString() });
  } catch (e) {
    console.log(chalk.red('Integration error:'), e.message);
  }
}

async function handlePhysicsMechanics() {
  const { calcType } = await inquirer.prompt({
    type: 'list',
    name: 'calcType',
    message: 'Mechanics Calculator:',
    choices: ['velocity', 'force', 'kinetic-energy', 'projectile', 'back']
  });
  
  if (calcType === 'back') return;
  
  try {
    if (calcType === 'velocity') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'distance', message: 'Distance (m):', default: 100 },
        { type: 'number', name: 'time', message: 'Time (s):', default: 10 }
      ]);
      const result = await mechanics('velocity', params);
      await saveHistory({ type: 'physics-velocity', input: params, result, date: new Date().toISOString() });
    } else if (calcType === 'projectile') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'velocity', message: 'Initial velocity (m/s):', default: 50 },
        { type: 'number', name: 'angle', message: 'Launch angle (degrees):', default: 45 }
      ]);
      const result = await mechanics('projectile', params);
      await saveHistory({ type: 'physics-projectile', input: params, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('Physics error:'), e.message);
  }
}

async function handlePhysicsElectricity() {
  const { calcType } = await inquirer.prompt({
    type: 'list',
    name: 'calcType',
    message: 'Electricity Calculator:',
    choices: ['ohms-law', 'power', 'resistance-series', 'back']
  });
  
  if (calcType === 'back') return;
  
  try {
    if (calcType === 'ohms-law') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'voltage', message: 'Voltage (V):', default: 12 },
        { type: 'number', name: 'current', message: 'Current (A) [leave 0 to calculate]:', default: 0 }
      ]);
      if (params.current === 0) delete params.current;
      const result = await electricity('ohms-law', params);
      await saveHistory({ type: 'electricity-ohms', input: params, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('Electricity error:'), e.message);
  }
}

async function handlePhysicsThermodynamics() {
  const { calcType } = await inquirer.prompt({
    type: 'list',
    name: 'calcType',
    message: 'Thermodynamics:',
    choices: ['heat-transfer', 'ideal-gas', 'back']
  });
  
  if (calcType === 'back') return;
  
  try {
    if (calcType === 'heat-transfer') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'mass', message: 'Mass (kg):', default: 1 },
        { type: 'number', name: 'specificHeat', message: 'Specific heat (J/kg·°C):', default: 4186 },
        { type: 'number', name: 'tempChange', message: 'Temperature change (°C):', default: 50 }
      ]);
      const result = await thermodynamics('heat-transfer', params);
      await saveHistory({ type: 'thermo-heat', input: params, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('Thermodynamics error:'), e.message);
  }
}

async function handleProbabilityGaming() {
  const { probType } = await inquirer.prompt({
    type: 'list',
    name: 'probType',
    message: 'Probability Calculator:',
    choices: ['drop-rate', 'gacha', 'critical-hit', 'loot-box', 'back']
  });
  
  if (probType === 'back') return;
  
  try {
    if (probType === 'drop-rate') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'probability', message: 'Drop rate (0-1):', default: 0.01 },
        { type: 'number', name: 'trials', message: 'Number of attempts:', default: 100 }
      ]);
      const result = await probability('drop-rate', params);
      await saveHistory({ type: 'prob-drop', input: params, result, date: new Date().toISOString() });
    } else if (probType === 'critical-hit') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'critChance', message: 'Crit chance (0-1):', default: 0.25 },
        { type: 'number', name: 'attacks', message: 'Number of attacks:', default: 100 },
        { type: 'number', name: 'critMultiplier', message: 'Crit multiplier:', default: 2 }
      ]);
      const result = await probability('critical-hit', params);
      await saveHistory({ type: 'prob-crit', input: params, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('Probability error:'), e.message);
  }
}

async function handleRNGTools() {
  const { rngType } = await inquirer.prompt({
    type: 'list',
    name: 'rngType',
    message: 'RNG Tools:',
    choices: ['generate', 'distribution-test', 'weighted', 'back']
  });
  
  if (rngType === 'back') return;
  
  try {
    if (rngType === 'generate') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'min', message: 'Min value:', default: 1 },
        { type: 'number', name: 'max', message: 'Max value:', default: 100 },
        { type: 'number', name: 'count', message: 'How many numbers:', default: 10 },
        { type: 'confirm', name: 'crypto', message: 'Use cryptographically secure RNG?', default: false }
      ]);
      const result = await rng('generate', params);
      await saveHistory({ type: 'rng-generate', input: params, result, date: new Date().toISOString() });
    } else if (rngType === 'distribution-test') {
      const params = await inquirer.prompt([
        { type: 'number', name: 'samples', message: 'Sample size:', default: 10000 },
        { type: 'number', name: 'bins', message: 'Number of bins:', default: 10 }
      ]);
      const result = await rng('distribution-test', params);
      await saveHistory({ type: 'rng-test', input: params, result, date: new Date().toISOString() });
    }
  } catch (e) {
    console.log(chalk.red('RNG error:'), e.message);
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
  const args = process.argv.slice(3);
  const exportArg = args.find(a => a.startsWith('--export='));
  const exportType = exportArg ? exportArg.split('=')[1] : null;
  
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
    
    if (exportType === 'csv') {
      const csv = ['date,type,input,result,error'];
      arr.forEach(h => {
        csv.push([
          h.date,
          h.type,
          JSON.stringify(h.input).replace(/"/g, '""'),
          JSON.stringify(h.result).replace(/"/g, '""'),
          h.error ? h.error.replace(/"/g, '""') : ''
        ].map(v => '"'+v+'"').join(','));
      });
      fs.writeFileSync('history-export.csv', csv.join('\n'));
      console.log('History exported to history-export.csv');
      return;
    } else if (exportType === 'json') {
      fs.writeFileSync('history-export.json', JSON.stringify(arr, null, 2));
      console.log('History exported to history-export.json');
      return;
    }
    
    arr.slice(-20).forEach((h, i) => {
      console.log(`[${i+1}] ${h.date} | ${h.type} | input: ${JSON.stringify(h.input).substring(0, 50)}... | result: ${JSON.stringify(h.result).substring(0, 50)}...${h.error ? ' | error: '+h.error : ''}`);
    });
  } catch (err) {
    console.log('Failed to read history:', err.message);
  }
}

mainMenu();
