// catalog.js
// Catalog vizualizări CLI și extensii pentru MathCLI Pro

export const catalog = [
  {
    name: 'CLI Chart',
    command: 'plot-chart',
    description: 'Draws a bar chart (histogram) directly in the terminal.',
    example: 'node index.js plot-chart 3 1 4 1 5 9 2 6',
    extensible: true,
    category: 'visualization',
    notes: 'You can add support for line, scatter, or ASCII heatmap charts.',
    exampleOutput: `▇▁▆▁▇▃▁▅`
  },
  {
    name: 'Math Optimization',
    command: 'optimize',
    description: 'Optimizes mathematical functions (min/max) and displays an ASCII chart.',
    example: 'node index.js optimize "minimize x^2+3x-5"',
    extensible: true,
    category: 'analysis',
    notes: 'You can add support for advanced numerical optimizations.',
    exampleOutput: `ASCII chart (x ∈ [-10,10]):\n•\n•\n•\n ••\n  ••\n   ••\n    ••\n     ••      ••\n       ••••••\n  -10        -5         0         5        10`
  },
  {
    name: 'Currency Calculator',
    command: 'fetch-currency',
    description: 'Displays currency rates from multiple APIs.',
    example: 'node index.js fetch-currency USD exchangerate.host',
    extensible: true,
    category: 'finance',
    notes: 'You can add alerts, automatic conversions, or currency history. Supported APIs: exchangerate.host (default), frankfurter.app, openexchangerates.org, currencyapi.com, coingecko (crypto).',
    defaultApi: 'exchangerate.host',
    supportedApis: ['exchangerate.host', 'frankfurter.app', 'openexchangerates.org', 'currencyapi.com', 'coingecko'],
    exampleOutput: `USD: 1\nEUR: 0.92\nGBP: 0.78`
  },
  {
    name: 'Crypto Rates',
    command: 'fetch-currency',
    description: 'Displays cryptocurrency rates using CoinGecko API.',
    example: 'node index.js fetch-currency BTC coingecko',
    extensible: true,
    category: 'finance',
    notes: 'You can add support for more crypto APIs or alerts.',
    defaultApi: 'coingecko',
    supportedApis: ['coingecko'],
    exampleOutput: `BTC: 67000\nETH: 3500\nSOL: 180`
  },
  {
    name: 'Script Automation',
    command: 'run-script',
    description: 'Runs CLI command scripts from files.',
    example: 'node index.js run-script script.txt',
    extensible: true,
    category: 'automation',
    notes: 'You can add support for advanced scripting, variables, or loops.',
    exampleOutput: `Script result: 12, 256, 5...`
  },
  // Adaugă aici alte tipuri de vizualizări sau extensii...
];
