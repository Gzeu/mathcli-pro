/**
 * plot-function.js
 * ASCII line chart for a mathjs expression f(x) in terminal.
 * Zero dependencies beyond mathjs + chalk (already in project).
 *
 * Usage:
 *   plotFunction('sin(x)', { xMin: -Math.PI, xMax: Math.PI })
 *   plotFunction('x^2 - 4', { xMin: -5, xMax: 5, height: 15 })
 */
import { create, all } from 'mathjs';
import chalk from 'chalk';

const math = create(all);

/**
 * Renders an ASCII line chart for a given mathjs expression.
 * @param {string} expr  - mathjs expression in x, e.g. 'sin(x) + cos(x/2)'
 * @param {object} opts
 * @param {number} [opts.xMin=-10]
 * @param {number} [opts.xMax=10]
 * @param {number} [opts.steps=70]  - horizontal resolution
 * @param {number} [opts.height=20] - vertical resolution
 * @param {string} [opts.label]     - display name (default: expr)
 * @param {string} [opts.color='cyan']
 */
export function plotFunction(expr, {
  xMin = -10,
  xMax = 10,
  steps = 70,
  height = 20,
  label = null,
  color = 'cyan',
} = {}) {
  const step = (xMax - xMin) / steps;
  const points = [];

  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * step;
    try {
      const y = math.evaluate(expr, { x });
      points.push(typeof y === 'number' && isFinite(y) ? y : null);
    } catch {
      points.push(null);
    }
  }

  const valid = points.filter(p => p !== null);
  if (!valid.length) {
    console.log(chalk.red(`⚠ Nu s-au putut evalua puncte pentru: ${expr}`));
    return;
  }

  const yMin = Math.min(...valid);
  const yMax = Math.max(...valid);
  const yRange = yMax - yMin || 1;
  const width = points.length;

  // Build grid
  const grid = Array.from({ length: height }, () => Array(width).fill(' '));

  points.forEach((y, xi) => {
    if (y === null) return;
    const row = Math.round(((yMax - y) / yRange) * (height - 1));
    if (row >= 0 && row < height) {
      grid[row][xi] = '•';
    }
  });

  // Draw zero axis if in range
  if (yMin <= 0 && yMax >= 0) {
    const zeroRow = Math.round((yMax / yRange) * (height - 1));
    if (zeroRow >= 0 && zeroRow < height) {
      grid[zeroRow] = grid[zeroRow].map(c => (c === ' ' ? chalk.gray('─') : c));
    }
  }

  // Y-axis labels + plot
  const displayLabel = label || expr;
  console.log();
  console.log(chalk[color].bold(`  ƒ(x) = ${displayLabel}`) + chalk.gray(`   [x: ${xMin} → ${xMax}]`));
  console.log();

  grid.forEach((row, i) => {
    const yVal = yMax - (i / (height - 1)) * yRange;
    const yLabel = yVal.toFixed(3).padStart(9);
    const line = row.map(c => (c === '•' ? chalk[color](c) : c)).join('');
    console.log(chalk.gray(yLabel) + chalk.gray(' │') + line);
  });

  // X axis
  console.log(chalk.gray('          └' + '─'.repeat(width)));
  const xLeft = xMin.toFixed(2);
  const xRight = xMax.toFixed(2);
  const pad = Math.max(0, width - xRight.length);
  console.log(chalk.gray(`           ${xLeft}${' '.repeat(pad)}${xRight}`));

  // Stats
  const zeros = countZeros(points, yMin, yMax, xMin, step);
  const maxPoint = valid.reduce((a, b) => Math.max(a, b));
  const minPoint = valid.reduce((a, b) => Math.min(a, b));
  console.log();
  console.log(
    chalk.gray('  max:') + chalk.white(` ${maxPoint.toFixed(6)}`) +
    chalk.gray('   min:') + chalk.white(` ${minPoint.toFixed(6)}`) +
    (zeros.length ? chalk.gray('   zeros≈') + chalk.white(zeros.map(z => z.toFixed(3)).join(', ')) : '')
  );
  console.log();
}

function countZeros(points, yMin, yMax, xMin, step) {
  const zeros = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (a !== null && b !== null && Math.sign(a) !== Math.sign(b)) {
      zeros.push(xMin + i * step + step * (Math.abs(a) / (Math.abs(a) + Math.abs(b))));
    }
  }
  return zeros.slice(0, 6); // max 6 zeros shown
}
