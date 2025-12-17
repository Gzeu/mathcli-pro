import chalk from 'chalk';
import crypto from 'crypto';

/**
 * Random Number Generation and Analysis
 */
export async function rng(type, params) {
  try {
    console.log(chalk.blue('\n🎰 Random Number Generator\n'));
    
    switch (type) {
      case 'generate':
        return generateRandom(params);
      case 'seed-analysis':
        return seedAnalysis(params);
      case 'distribution-test':
        return distributionTest(params);
      case 'weighted':
        return weightedRandom(params);
      default:
        throw new Error('Unknown RNG operation');
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function generateRandom(params) {
  const { min = 0, max = 100, count = 1, type = 'integer', crypto: useCrypto = false } = params;
  
  console.log(chalk.cyan(`Generating ${count} random number(s)\n`));
  console.log(chalk.cyan(`Range: [${min}, ${max}]`));
  console.log(chalk.cyan(`Type: ${type}`));
  console.log(chalk.cyan(`Method: ${useCrypto ? 'Cryptographically secure' : 'Pseudo-random'}\n`));
  
  const numbers = [];
  
  for (let i = 0; i < count; i++) {
    let num;
    
    if (useCrypto) {
      const randomBytes = crypto.randomBytes(4);
      const randomValue = randomBytes.readUInt32BE(0) / 0xFFFFFFFF;
      num = min + randomValue * (max - min);
    } else {
      num = min + Math.random() * (max - min);
    }
    
    if (type === 'integer') {
      num = Math.floor(num);
    }
    
    numbers.push(num);
  }
  
  console.log(chalk.green('Generated numbers:'));
  if (count <= 20) {
    numbers.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));
  } else {
    console.log(`  First 10: ${numbers.slice(0, 10).join(', ')}`);
    console.log(`  Last 10: ${numbers.slice(-10).join(', ')}`);
  }
  
  if (count > 1) {
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    
    console.log(chalk.yellow(`\nStatistics:`));
    console.log(`  Average: ${avg.toFixed(4)}`);
    console.log(`  Median: ${median.toFixed(4)}`);
    console.log(`  Min: ${Math.min(...numbers).toFixed(4)}`);
    console.log(`  Max: ${Math.max(...numbers).toFixed(4)}`);
  }
  
  return numbers;
}

function seedAnalysis(params) {
  const { seed, iterations = 1000 } = params;
  
  console.log(chalk.cyan(`Analyzing RNG seed: ${seed}\n`));
  
  // Simple LCG (Linear Congruential Generator) for demonstration
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);
  
  let state = seed;
  const numbers = [];
  
  for (let i = 0; i < iterations; i++) {
    state = (a * state + c) % m;
    numbers.push(state / m);
  }
  
  // Analyze distribution
  const buckets = new Array(10).fill(0);
  numbers.forEach(n => {
    const bucket = Math.floor(n * 10);
    buckets[bucket]++;
  });
  
  console.log(chalk.green('Distribution Analysis:'));
  buckets.forEach((count, i) => {
    const expected = iterations / 10;
    const deviation = ((count - expected) / expected * 100).toFixed(2);
    const bar = '█'.repeat(Math.floor(count / (iterations / 50)));
    console.log(`  [${i * 0.1}-${(i + 1) * 0.1}): ${bar} ${count} (${deviation}%)`);
  });
  
  return { seed, distribution: buckets };
}

function distributionTest(params) {
  const { samples = 10000, bins = 10 } = params;
  
  console.log(chalk.cyan(`Chi-Square Goodness of Fit Test\n`));
  console.log(chalk.cyan(`Samples: ${samples}`));
  console.log(chalk.cyan(`Bins: ${bins}\n`));
  
  const observed = new Array(bins).fill(0);
  const expected = samples / bins;
  
  // Generate random samples
  for (let i = 0; i < samples; i++) {
    const bin = Math.floor(Math.random() * bins);
    observed[bin]++;
  }
  
  // Calculate chi-square statistic
  let chiSquare = 0;
  observed.forEach(o => {
    chiSquare += Math.pow(o - expected, 2) / expected;
  });
  
  const degreesOfFreedom = bins - 1;
  
  console.log(chalk.green('Distribution:'));
  observed.forEach((count, i) => {
    const percent = ((count / samples) * 100).toFixed(2);
    const bar = '█'.repeat(Math.floor(count / (samples / 50)));
    console.log(`  Bin ${i}: ${bar} ${count} (${percent}%)`);
  });
  
  console.log(chalk.yellow(`\nχ² statistic: ${chiSquare.toFixed(4)}`));
  console.log(chalk.yellow(`Degrees of freedom: ${degreesOfFreedom}`));
  
  // Critical values at 0.05 significance (approximation)
  const criticalValue = degreesOfFreedom * 1.5 + 3;
  const passed = chiSquare < criticalValue;
  
  console.log(chalk[passed ? 'green' : 'red'](
    `${passed ? '✓' : '✗'} Distribution test: ${passed ? 'PASSED' : 'FAILED'}`
  ));
  
  return { chiSquare, passed };
}

function weightedRandom(params) {
  const { items, count = 1 } = params;
  
  if (!items || !Array.isArray(items)) {
    throw new Error('Provide items array with {name, weight}');
  }
  
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  
  console.log(chalk.cyan('Weighted Random Selection\n'));
  console.log(chalk.cyan('Items:'));
  items.forEach(item => {
    const probability = (item.weight / totalWeight * 100).toFixed(2);
    console.log(chalk.gray(`  ${item.name}: weight ${item.weight} (${probability}%)`));
  });
  
  console.log(chalk.cyan(`\nGenerating ${count} selection(s):\n`));
  
  const results = new Map();
  items.forEach(item => results.set(item.name, 0));
  
  for (let i = 0; i < count; i++) {
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
      if (random < item.weight) {
        results.set(item.name, results.get(item.name) + 1);
        if (count <= 20) {
          console.log(chalk.green(`  ${i + 1}. ${item.name}`));
        }
        break;
      }
      random -= item.weight;
    }
  }
  
  if (count > 20) {
    console.log(chalk.green('Results:'));
    results.forEach((count, name) => {
      const percent = (count / params.count * 100).toFixed(2);
      console.log(`  ${name}: ${count} (${percent}%)`);
    });
  }
  
  return Object.fromEntries(results);
}

export default rng;
