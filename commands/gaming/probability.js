import chalk from 'chalk';

/**
 * Gaming Probability Calculator
 */
export async function probability(type, params) {
  try {
    console.log(chalk.blue('\n🎲 Probability Calculator\n'));
    
    switch (type) {
      case 'drop-rate':
        return dropRate(params);
      case 'gacha':
        return gachaSimulator(params);
      case 'critical-hit':
        return criticalHit(params);
      case 'loot-box':
        return lootBoxExpectedValue(params);
      case 'binomial':
        return binomialProbability(params);
      case 'geometric':
        return geometricProbability(params);
      default:
        throw new Error('Unknown probability calculation');
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function dropRate(params) {
  const { probability, trials, atLeastOne = true } = params;
  
  if (!probability || !trials) {
    throw new Error('Probability and number of trials required');
  }
  
  const p = probability;
  const n = trials;
  
  console.log(chalk.cyan(`Drop Rate: ${(p * 100).toFixed(2)}%`));
  console.log(chalk.cyan(`Attempts: ${n}\n`));
  
  if (atLeastOne) {
    // P(at least 1) = 1 - P(none) = 1 - (1-p)^n
    const probAtLeastOne = 1 - Math.pow(1 - p, n);
    console.log(chalk.green(`✓ Probability of at least 1 drop: ${(probAtLeastOne * 100).toFixed(2)}%`));
    
    // Expected number of trials for first success
    const expectedTrials = 1 / p;
    console.log(chalk.yellow(`Expected attempts for 1st drop: ${expectedTrials.toFixed(1)}`));
    
    return { probAtLeastOne, expectedTrials };
  } else {
    // P(exactly k successes) for k=0 to n
    console.log(chalk.green('Probability distribution:'));
    for (let k = 0; k <= Math.min(n, 10); k++) {
      const prob = binomialProb(n, k, p);
      console.log(`  ${k} drops: ${(prob * 100).toFixed(2)}%`);
    }
  }
}

function gachaSimulator(params) {
  const { rarity, pitySystem, pulls = 1 } = params;
  
  if (!rarity || !Array.isArray(rarity)) {
    throw new Error('Provide rarity tiers with probabilities');
  }
  
  console.log(chalk.cyan('Gacha System Analysis\n'));
  console.log(chalk.cyan('Rarity Tiers:'));
  
  let totalProb = 0;
  rarity.forEach(tier => {
    console.log(chalk.gray(`  ${tier.name}: ${(tier.probability * 100).toFixed(2)}%`));
    totalProb += tier.probability;
  });
  
  if (Math.abs(totalProb - 1) > 0.01) {
    console.log(chalk.yellow(`\n⚠ Warning: Probabilities sum to ${(totalProb * 100).toFixed(2)}%`));
  }
  
  console.log(chalk.cyan(`\nNumber of pulls: ${pulls}\n`));
  
  // Calculate expected outcomes
  rarity.forEach(tier => {
    const expected = pulls * tier.probability;
    const atLeastOne = 1 - Math.pow(1 - tier.probability, pulls);
    console.log(chalk.green(`${tier.name}:`));
    console.log(`  Expected: ${expected.toFixed(2)} pulls`);
    console.log(`  Probability of ≥1: ${(atLeastOne * 100).toFixed(2)}%`);
    console.log(`  Average pulls needed: ${(1 / tier.probability).toFixed(1)}\n`);
  });
  
  if (pitySystem) {
    console.log(chalk.magenta('\nPity System:'));
    console.log(chalk.magenta(`Guaranteed after ${pitySystem.counter} pulls`));
    const guaranteedCost = Math.ceil(pulls / pitySystem.counter);
    console.log(chalk.magenta(`Guaranteed pulls in ${pulls}: ${guaranteedCost}`));
  }
  
  return { rarity, pulls };
}

function criticalHit(params) {
  const { critChance, critMultiplier = 2, attacks } = params;
  
  if (!critChance || !attacks) {
    throw new Error('Critical chance and number of attacks required');
  }
  
  const expectedCrits = attacks * critChance;
  const avgDamageMultiplier = (1 - critChance) * 1 + critChance * critMultiplier;
  
  console.log(chalk.cyan('Critical Hit Analysis\n'));
  console.log(chalk.cyan(`Critical Chance: ${(critChance * 100).toFixed(2)}%`));
  console.log(chalk.cyan(`Critical Multiplier: ${critMultiplier}x`));
  console.log(chalk.cyan(`Number of Attacks: ${attacks}\n`));
  
  console.log(chalk.green(`✓ Expected Critical Hits: ${expectedCrits.toFixed(2)}`));
  console.log(chalk.green(`✓ Average Damage Multiplier: ${avgDamageMultiplier.toFixed(3)}x`));
  
  // Probability of at least one crit
  const atLeastOneCrit = 1 - Math.pow(1 - critChance, attacks);
  console.log(chalk.green(`✓ Probability of ≥1 crit: ${(atLeastOneCrit * 100).toFixed(2)}%`));
  
  return { expectedCrits, avgDamageMultiplier, atLeastOneCrit };
}

function lootBoxExpectedValue(params) {
  const { items } = params;
  
  if (!items || !Array.isArray(items)) {
    throw new Error('Provide items array with {name, probability, value}');
  }
  
  console.log(chalk.cyan('Loot Box Expected Value Analysis\n'));
  
  let expectedValue = 0;
  let totalProb = 0;
  
  console.log(chalk.cyan('Items:'));
  items.forEach(item => {
    const ev = item.probability * item.value;
    expectedValue += ev;
    totalProb += item.probability;
    console.log(chalk.gray(`  ${item.name}: ${(item.probability * 100).toFixed(2)}% - $${item.value}`));
    console.log(chalk.gray(`    Contribution to EV: $${ev.toFixed(2)}`));
  });
  
  console.log(chalk.green(`\n✓ Expected Value: $${expectedValue.toFixed(2)}`));
  
  if (Math.abs(totalProb - 1) > 0.01) {
    console.log(chalk.yellow(`⚠ Probabilities sum to ${(totalProb * 100).toFixed(2)}%`));
  }
  
  return { expectedValue, items };
}

function binomialProbability(params) {
  const { n, k, p } = params;
  
  if (n === undefined || k === undefined || p === undefined) {
    throw new Error('Provide n (trials), k (successes), p (probability)');
  }
  
  const prob = binomialProb(n, k, p);
  const expected = n * p;
  const variance = n * p * (1 - p);
  const stdDev = Math.sqrt(variance);
  
  console.log(chalk.cyan('Binomial Distribution\n'));
  console.log(chalk.cyan(`Trials (n): ${n}`));
  console.log(chalk.cyan(`Successes (k): ${k}`));
  console.log(chalk.cyan(`Success Probability (p): ${(p * 100).toFixed(2)}%\n`));
  
  console.log(chalk.green(`✓ P(X = ${k}): ${(prob * 100).toFixed(4)}%`));
  console.log(chalk.yellow(`Expected value: ${expected.toFixed(2)}`));
  console.log(chalk.yellow(`Standard deviation: ${stdDev.toFixed(2)}`));
  
  return { probability: prob, expected, stdDev };
}

function geometricProbability(params) {
  const { p, k } = params;
  
  if (!p) {
    throw new Error('Provide success probability (p)');
  }
  
  const expected = 1 / p;
  const variance = (1 - p) / (p * p);
  const stdDev = Math.sqrt(variance);
  
  console.log(chalk.cyan('Geometric Distribution\n'));
  console.log(chalk.cyan(`Success Probability: ${(p * 100).toFixed(2)}%\n`));
  
  if (k) {
    // P(X = k) = (1-p)^(k-1) * p
    const prob = Math.pow(1 - p, k - 1) * p;
    console.log(chalk.green(`✓ P(success on trial ${k}): ${(prob * 100).toFixed(4)}%`));
  }
  
  console.log(chalk.yellow(`Expected trials until success: ${expected.toFixed(2)}`));
  console.log(chalk.yellow(`Standard deviation: ${stdDev.toFixed(2)}`));
  
  // Probability of success within X trials
  console.log(chalk.cyan('\nProbability of success within:'));
  [10, 50, 100, 200].forEach(trials => {
    const prob = 1 - Math.pow(1 - p, trials);
    console.log(`  ${trials} trials: ${(prob * 100).toFixed(2)}%`);
  });
  
  return { expected, stdDev };
}

function binomialProb(n, k, p) {
  return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function combination(n, k) {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= (n - i + 1) / i;
  }
  return result;
}

export default probability;
