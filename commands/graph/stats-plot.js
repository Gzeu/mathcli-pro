/**
 * stats-plot.js
 * Histogram and statistical visualization for data arrays.
 *
 * Usage:
 *   statsPlot([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 *   statsPlot([23, 45, 12, 67, 34, 89, 45, 23], { bins: 5, label: 'Scores' })
 */
import chalk from 'chalk';

/**
 * Renders a horizontal histogram + stats summary.
 * @param {number[]} data
 * @param {object}   opts
 * @param {number}   [opts.bins=10]
 * @param {string}   [opts.label='Data']
 * @param {number}   [opts.barWidth=40] - max bar length in chars
 */
export function statsPlot(data, { bins = 10, label = 'Data', barWidth = 40 } = {}) {
  if (!Array.isArray(data) || data.length < 2) {
    console.log(chalk.red('  Furnizează cel puțin 2 valori numerice.'));
    return;
  }

  const nums = data.filter(n => typeof n === 'number' && isFinite(n));
  if (!nums.length) {
    console.log(chalk.red('  Nu există valori numerice valide.'));
    return;
  }

  // Stats
  const n = nums.length;
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const sorted = [...nums].sort((a, b) => a - b);
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];
  const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
  const stddev = Math.sqrt(variance);

  // Histogram buckets
  const range = max - min || 1;
  const binSize = range / bins;
  const counts = Array(bins).fill(0);
  nums.forEach(v => {
    let idx = Math.floor((v - min) / binSize);
    if (idx >= bins) idx = bins - 1;
    counts[idx]++;
  });
  const maxCount = Math.max(...counts);

  // Render
  console.log();
  console.log(chalk.cyan.bold(`  📊 Histogram: ${label}`) + chalk.gray(`  (n=${n}, bins=${bins})`));
  console.log();

  counts.forEach((count, i) => {
    const lo = (min + i * binSize).toFixed(2).padStart(8);
    const hi = (min + (i + 1) * binSize).toFixed(2).padStart(8);
    const barLen = maxCount > 0 ? Math.round((count / maxCount) * barWidth) : 0;
    const bar = '█'.repeat(barLen);
    const pct = ((count / n) * 100).toFixed(1).padStart(5);
    console.log(
      chalk.gray(`  [${lo} – ${hi}]`) +
      chalk.yellow(` ${bar.padEnd(barWidth)} `) +
      chalk.white(`${String(count).padStart(4)}`) +
      chalk.gray(` (${pct}%)`)
    );
  });

  console.log();
  console.log(chalk.gray('  ─────────────────────────────────────────────────'));
  console.log(
    chalk.gray('  n:') + chalk.white(` ${n}`) +
    chalk.gray('   min:') + chalk.white(` ${min.toFixed(4)}`) +
    chalk.gray('   max:') + chalk.white(` ${max.toFixed(4)}`)
  );
  console.log(
    chalk.gray('  mean:') + chalk.white(` ${mean.toFixed(4)}`) +
    chalk.gray('   median:') + chalk.white(` ${median.toFixed(4)}`) +
    chalk.gray('   σ:') + chalk.white(` ${stddev.toFixed(4)}`)
  );
  console.log();
}

/**
 * Parse comma/space-separated numbers from CLI string.
 * e.g. "1,2.5,3,4" or "1 2 3"
 */
export function parseDataInput(str) {
  return str
    .split(/[,\s]+/)
    .map(s => parseFloat(s.trim()))
    .filter(n => !isNaN(n));
}
