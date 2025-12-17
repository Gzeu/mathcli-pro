import chalk from 'chalk';

/**
 * Electrical Circuit Calculations
 */
export async function electricity(type, params) {
  try {
    console.log(chalk.blue('\n⚡ Electrical Circuit Calculator\n'));
    
    switch (type) {
      case 'ohms-law':
        return ohmsLaw(params);
      case 'power':
        return electricPower(params);
      case 'resistance-series':
        return resistanceSeries(params);
      case 'resistance-parallel':
        return resistanceParallel(params);
      case 'capacitance':
        return capacitance(params);
      case 'inductance':
        return inductance(params);
      default:
        throw new Error('Unknown electrical calculation');
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function ohmsLaw(params) {
  const { voltage, current, resistance } = params;
  
  console.log(chalk.cyan('Ohm\'s Law: V = IR'));
  
  if (voltage && current && !resistance) {
    const r = voltage / current;
    console.log(chalk.green(`✓ Resistance: ${r.toFixed(4)} Ω (Ohms)`));
    return { resistance: r };
  } else if (voltage && resistance && !current) {
    const i = voltage / resistance;
    console.log(chalk.green(`✓ Current: ${i.toFixed(4)} A (Amperes)`));
    return { current: i };
  } else if (current && resistance && !voltage) {
    const v = current * resistance;
    console.log(chalk.green(`✓ Voltage: ${v.toFixed(4)} V (Volts)`));
    return { voltage: v };
  } else {
    throw new Error('Provide exactly 2 of: voltage, current, resistance');
  }
}

function electricPower(params) {
  const { voltage, current, resistance, power } = params;
  
  console.log(chalk.cyan('Power Formulas:'));
  console.log(chalk.gray('P = VI = I²R = V²/R'));
  
  let calculatedPower;
  if (voltage && current) {
    calculatedPower = voltage * current;
    console.log(chalk.cyan('\nUsing: P = VI'));
  } else if (current && resistance) {
    calculatedPower = current * current * resistance;
    console.log(chalk.cyan('\nUsing: P = I²R'));
  } else if (voltage && resistance) {
    calculatedPower = (voltage * voltage) / resistance;
    console.log(chalk.cyan('\nUsing: P = V²/R'));
  } else {
    throw new Error('Insufficient parameters');
  }
  
  console.log(chalk.green(`✓ Power: ${calculatedPower.toFixed(4)} W (Watts)`));
  console.log(chalk.gray(`  (${(calculatedPower / 1000).toFixed(4)} kW)`));
  
  return calculatedPower;
}

function resistanceSeries(params) {
  const { resistors } = params;
  
  if (!Array.isArray(resistors) || resistors.length === 0) {
    throw new Error('Provide array of resistor values');
  }
  
  const total = resistors.reduce((sum, r) => sum + r, 0);
  
  console.log(chalk.cyan('Series Resistance: R_total = R1 + R2 + ... + Rn'));
  console.log(chalk.gray(`Resistors: ${resistors.join(' Ω, ')} Ω`));
  console.log(chalk.green(`✓ Total Resistance: ${total.toFixed(4)} Ω`));
  
  return total;
}

function resistanceParallel(params) {
  const { resistors } = params;
  
  if (!Array.isArray(resistors) || resistors.length === 0) {
    throw new Error('Provide array of resistor values');
  }
  
  const reciprocalSum = resistors.reduce((sum, r) => sum + 1/r, 0);
  const total = 1 / reciprocalSum;
  
  console.log(chalk.cyan('Parallel Resistance: 1/R_total = 1/R1 + 1/R2 + ... + 1/Rn'));
  console.log(chalk.gray(`Resistors: ${resistors.join(' Ω, ')} Ω`));
  console.log(chalk.green(`✓ Total Resistance: ${total.toFixed(4)} Ω`));
  
  return total;
}

function capacitance(params) {
  const { charge, voltage, capacitors, config } = params;
  
  if (charge && voltage) {
    // C = Q/V
    const c = charge / voltage;
    console.log(chalk.cyan('Formula: C = Q/V'));
    console.log(chalk.green(`✓ Capacitance: ${(c * 1e6).toFixed(4)} µF`));
    return c;
  } else if (capacitors && config) {
    if (config === 'series') {
      const reciprocalSum = capacitors.reduce((sum, c) => sum + 1/c, 0);
      const total = 1 / reciprocalSum;
      console.log(chalk.cyan('Series Capacitance: 1/C_total = 1/C1 + 1/C2 + ...'));
      console.log(chalk.green(`✓ Total: ${(total * 1e6).toFixed(4)} µF`));
      return total;
    } else if (config === 'parallel') {
      const total = capacitors.reduce((sum, c) => sum + c, 0);
      console.log(chalk.cyan('Parallel Capacitance: C_total = C1 + C2 + ...'));
      console.log(chalk.green(`✓ Total: ${(total * 1e6).toFixed(4)} µF`));
      return total;
    }
  }
  
  throw new Error('Invalid capacitance parameters');
}

function inductance(params) {
  const { voltage, current, time, inductors, config } = params;
  
  if (voltage && current && time) {
    // V = L(dI/dt)
    const l = (voltage * time) / current;
    console.log(chalk.cyan('Formula: V = L(dI/dt)'));
    console.log(chalk.green(`✓ Inductance: ${(l * 1000).toFixed(4)} mH`));
    return l;
  } else if (inductors && config) {
    if (config === 'series') {
      const total = inductors.reduce((sum, l) => sum + l, 0);
      console.log(chalk.cyan('Series Inductance: L_total = L1 + L2 + ...'));
      console.log(chalk.green(`✓ Total: ${(total * 1000).toFixed(4)} mH`));
      return total;
    } else if (config === 'parallel') {
      const reciprocalSum = inductors.reduce((sum, l) => sum + 1/l, 0);
      const total = 1 / reciprocalSum;
      console.log(chalk.cyan('Parallel Inductance: 1/L_total = 1/L1 + 1/L2 + ...'));
      console.log(chalk.green(`✓ Total: ${(total * 1000).toFixed(4)} mH`));
      return total;
    }
  }
  
  throw new Error('Invalid inductance parameters');
}

export default electricity;
