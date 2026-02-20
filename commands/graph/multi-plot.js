/**
 * multi-plot.js
 * Compare multiple mathjs functions on the same ASCII chart.
 *
 * Usage:
 *   multiPlot(['sin(x)', 'cos(x)', 'tan(x)'], { xMin: -pi, xMax: pi })
 */
import { create, all } from 'mathjs';
import chalk from 'chalk';

const math = create(all);

const COLORS = ['cyan', 'yellow', 'green', 'magenta', 'red', 'blue', 'white'];
const SYMBOLS = ['●', '◆', '▲', '★', '■', '♦', '◉'];

/**
 * @param {string[]} exprs - array of mathjs expressions
 * @param {object}   opts
 */
export function multiPlot(exprs, {
  xMin = -10,
  xMax = 10,
  steps = 70,
  height = 22,
} = {}) {
  if (!exprs.length) {
    console.log(chalk.red('Furnizează cel puțin o expresie.'));
    return;
  }

  const step = (xMax - xMin) / steps;

  // Sample all series
  const seriesPoints = exprs.map(expr => {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * step;
      try {
        const y = math.evaluate(expr, { x });
        pts.push(typeof y === 'number' && isFinite(y) ? y : null);
      } catch {
        pts.push(null);
      }
    }
    return pts;
  });

  const allValid = seriesPoints.flat().filter(p => p !== null);
  if (!allValid.length) {
    console.log(chalk.red('Nicio expresie nu a putut fi evaluată.'));
    return;
  }

  const yMin = Math.min(...allValid);
  const yMax = Math.max(...allValid);
  const yRange = yMax - yMin || 1;
  const width = steps + 1;

  // Build grid (last series drawn wins at overlap)
  const grid = Array.from({ length: height }, () => Array(width).fill({ char: ' ', si: -1 }));

  // Zero axis
  if (yMin <= 0 && yMax >= 0) {
    const zeroRow = Math.round((yMax / yRange) * (height - 1));
    if (zeroRow >= 0 && zeroRow < height) {
      grid[zeroRow] = grid[zeroRow].map(() => ({ char: '─', si: -2 }));
    }
  }

  seriesPoints.forEach((pts, si) => {
    pts.forEach((y, xi) => {
      if (y === null) return;
      const row = Math.round(((yMax - y) / yRange) * (height - 1));
      if (row >= 0 && row < height && xi < width) {
        grid[row][xi] = { char: SYMBOLS[si % SYMBOLS.length], si };
      }
    });
  });

  // Legend
  console.log();
  console.log(chalk.bold('  📊 Multi-Graph') + chalk.gray(`   [x: ${xMin} → ${xMax}]`));
  console.log();
  exprs.forEach((expr, i) => {
    console.log('  ' + chalk[COLORS[i % COLORS.length]](SYMBOLS[i]) + ' ' + chalk[COLORS[i % COLORS.length]].bold(`f${i + 1}(x) =`) + ` ${expr}`);
  });
  console.log();

  // Render grid
  grid.forEach((row, i) => {
    const yVal = yMax - (i / (height - 1)) * yRange;
    const yLabel = yVal.toFixed(3).padStart(9);
    let line = chalk.gray(yLabel) + chalk.gray(' │');
    row.forEach(cell => {
      if (cell.si === -2) {
        line += chalk.gray(cell.char);
      } else if (cell.si >= 0) {
        line += chalk[COLORS[cell.si % COLORS.length]](cell.char);
      } else {
        line += cell.char;
      }
    });
    console.log(line);
  });

  console.log(chalk.gray('          └' + '─'.repeat(width)));
  const xLeft = xMin.toFixed(2);
  const xRight = xMax.toFixed(2);
  const pad = Math.max(0, width - xRight.length);
  console.log(chalk.gray(`           ${xLeft}${' '.repeat(pad)}${xRight}`));
  console.log();
}
