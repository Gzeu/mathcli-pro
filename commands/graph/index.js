/**
 * commands/graph/index.js
 * Unified router for the `math graph` command family.
 *
 * Sub-commands:
 *   math graph "sin(x)"                      → plot one function
 *   math graph "sin(x)" "cos(x)"             → multi-plot
 *   math graph --ai "show me a parabola"     → AI interprets prompt
 *   math graph --stats "1,2,3,4,5"           → histogram
 *   math graph --xmin=-5 --xmax=5 "x^2"      → custom range
 *
 * Environment:
 *   EVERCLAW_URL   (default: http://localhost:3141/v1)
 *   EVERCLAW_MODEL (default: llama3)
 *   EVERCLAW_KEY   (default: free)
 */
import chalk from 'chalk';
import { plotFunction } from './plot-function.js';
import { multiPlot } from './multi-plot.js';
import { aiPlot } from './ai-plot.js';
import { statsPlot, parseDataInput } from './stats-plot.js';

/**
 * Main entry point for graph commands.
 * @param {string[]} args - raw CLI args after 'graph'
 */
export async function graphCommand(args = []) {
  // Parse flags
  const flags = {};
  const positional = [];

  for (const arg of args) {
    if (arg.startsWith('--xmin=')) {
      flags.xMin = parseFloat(arg.split('=')[1]);
    } else if (arg.startsWith('--xmax=')) {
      flags.xMax = parseFloat(arg.split('=')[1]);
    } else if (arg.startsWith('--steps=')) {
      flags.steps = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--ai') {
      flags.ai = true;
    } else if (arg === '--stats') {
      flags.stats = true;
    } else if (arg === '--multi') {
      flags.multi = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      return;
    } else {
      positional.push(arg);
    }
  }

  if (!positional.length) {
    printHelp();
    return;
  }

  const rangeOpts = {
    xMin: flags.xMin ?? -10,
    xMax: flags.xMax ?? 10,
    steps: flags.steps ?? 70,
  };

  // ── AI mode ────────────────────────────────────────────────────
  if (flags.ai) {
    const prompt = positional.join(' ');
    await aiPlot(prompt, rangeOpts);
    return;
  }

  // ── Stats / histogram mode ─────────────────────────────────────
  if (flags.stats) {
    const dataStr = positional.join(',');
    const data = parseDataInput(dataStr);
    if (!data.length) {
      console.log(chalk.red('  Furnizează date numerice: math graph --stats 1,2,3,4,5'));
      return;
    }
    statsPlot(data, { label: 'Input Data' });
    return;
  }

  // ── Multi-plot (explicit flag or multiple args) ─────────────────
  if (flags.multi || positional.length > 1) {
    multiPlot(positional, rangeOpts);
    return;
  }

  // ── Single function plot ────────────────────────────────────────
  plotFunction(positional[0], rangeOpts);
}

function printHelp() {
  console.log();
  console.log(chalk.cyan.bold('  math graph') + chalk.gray(' — AI-powered math graphing (2026)'));
  console.log();
  console.log(chalk.white('  Usage:'));
  console.log(chalk.gray('    math graph "sin(x)"'));
  console.log(chalk.gray('    math graph "sin(x)" "cos(x)"          (multi-plot)'));
  console.log(chalk.gray('    math graph --ai "parabola from -5 to 5"'));
  console.log(chalk.gray('    math graph --stats 1,2,3,4,5,6,7,8'));
  console.log(chalk.gray('    math graph --xmin=-3.14 --xmax=3.14 "sin(x)"'));
  console.log();
  console.log(chalk.white('  Everclaw proxy (for --ai):'));
  console.log(chalk.gray('    EVERCLAW_URL=http://localhost:3141/v1'));
  console.log(chalk.gray('    EVERCLAW_MODEL=llama3'));
  console.log(chalk.gray('    EVERCLAW_KEY=free'));
  console.log();
  console.log(chalk.white('  mathjs expressions supported:'));
  console.log(chalk.gray('    sin, cos, tan, sqrt, exp, log, abs, pi, e, ^, *, /, +, -'));
  console.log();
}
