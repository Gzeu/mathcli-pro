import chalk from 'chalk';

/**
 * Thermodynamics Calculations
 */
export async function thermodynamics(type, params) {
  try {
    console.log(chalk.blue('\n🌡️ Thermodynamics Calculator\n'));
    
    switch (type) {
      case 'heat-transfer':
        return heatTransfer(params);
      case 'ideal-gas':
        return idealGasLaw(params);
      case 'thermal-expansion':
        return thermalExpansion(params);
      case 'efficiency':
        return heatEngineEfficiency(params);
      case 'entropy':
        return entropyChange(params);
      default:
        throw new Error('Unknown thermodynamics calculation');
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function heatTransfer(params) {
  const { mass, specificHeat, tempChange, heat } = params;
  
  console.log(chalk.cyan('Formula: Q = mcΔT'));
  
  if (heat) {
    if (mass && specificHeat) {
      const deltaT = heat / (mass * specificHeat);
      console.log(chalk.green(`✓ Temperature Change: ${deltaT.toFixed(2)} °C`));
      return { tempChange: deltaT };
    }
  } else if (mass && specificHeat && tempChange) {
    const q = mass * specificHeat * tempChange;
    console.log(chalk.green(`✓ Heat Transferred: ${q.toFixed(2)} J (Joules)`));
    console.log(chalk.gray(`  (${(q / 1000).toFixed(2)} kJ)`));
    return { heat: q };
  }
  
  throw new Error('Insufficient parameters');
}

function idealGasLaw(params) {
  const { pressure, volume, moles, temperature } = params;
  const R = 8.314; // J/(mol·K)
  
  console.log(chalk.cyan('Ideal Gas Law: PV = nRT'));
  console.log(chalk.gray(`R = ${R} J/(mol·K)`));
  
  if (pressure && volume && moles && !temperature) {
    const t = (pressure * volume) / (moles * R);
    console.log(chalk.green(`✓ Temperature: ${t.toFixed(2)} K`));
    console.log(chalk.gray(`  (${(t - 273.15).toFixed(2)} °C)`));
    return { temperature: t };
  } else if (pressure && volume && temperature && !moles) {
    const n = (pressure * volume) / (R * temperature);
    console.log(chalk.green(`✓ Moles: ${n.toFixed(4)} mol`));
    return { moles: n };
  } else if (volume && moles && temperature && !pressure) {
    const p = (moles * R * temperature) / volume;
    console.log(chalk.green(`✓ Pressure: ${p.toFixed(2)} Pa`));
    console.log(chalk.gray(`  (${(p / 101325).toFixed(4)} atm)`));
    return { pressure: p };
  } else if (pressure && moles && temperature && !volume) {
    const v = (moles * R * temperature) / pressure;
    console.log(chalk.green(`✓ Volume: ${v.toFixed(6)} m³`));
    console.log(chalk.gray(`  (${(v * 1000).toFixed(2)} L)`));
    return { volume: v };
  }
  
  throw new Error('Provide exactly 3 of: pressure, volume, moles, temperature');
}

function thermalExpansion(params) {
  const { length, coefficient, tempChange, material } = params;
  
  // Common coefficients (per °C)
  const coefficients = {
    'aluminum': 23e-6,
    'steel': 11e-6,
    'copper': 17e-6,
    'glass': 9e-6,
    'concrete': 12e-6
  };
  
  const alpha = coefficient || (material ? coefficients[material.toLowerCase()] : null);
  
  if (!alpha) {
    console.log(chalk.yellow('Available materials:'));
    Object.entries(coefficients).forEach(([mat, coef]) => {
      console.log(chalk.gray(`  ${mat}: ${coef.toExponential(2)} /°C`));
    });
    throw new Error('Provide coefficient or material name');
  }
  
  const deltaL = length * alpha * tempChange;
  const finalLength = length + deltaL;
  
  console.log(chalk.cyan('Linear Thermal Expansion: ΔL = L₀αΔT'));
  if (material) console.log(chalk.cyan(`Material: ${material}`));
  console.log(chalk.cyan(`Coefficient: ${alpha.toExponential(2)} /°C`));
  console.log(chalk.green(`✓ Length Change: ${(deltaL * 1000).toFixed(4)} mm`));
  console.log(chalk.green(`✓ Final Length: ${finalLength.toFixed(6)} m`));
  
  return { deltaLength: deltaL, finalLength };
}

function heatEngineEfficiency(params) {
  const { hotTemp, coldTemp, workOut, heatIn } = params;
  
  if (hotTemp && coldTemp) {
    // Carnot efficiency
    const efficiencyCarnot = 1 - (coldTemp / hotTemp);
    console.log(chalk.cyan('Carnot Efficiency: η = 1 - (T_c/T_h)'));
    console.log(chalk.green(`✓ Maximum Efficiency: ${(efficiencyCarnot * 100).toFixed(2)}%`));
    return { efficiency: efficiencyCarnot };
  } else if (workOut && heatIn) {
    // Actual efficiency
    const efficiency = workOut / heatIn;
    console.log(chalk.cyan('Efficiency: η = W/Q_h'));
    console.log(chalk.green(`✓ Efficiency: ${(efficiency * 100).toFixed(2)}%`));
    return { efficiency };
  }
  
  throw new Error('Provide either (hotTemp, coldTemp) or (workOut, heatIn)');
}

function entropyChange(params) {
  const { heat, temperature } = params;
  
  if (!heat || !temperature) {
    throw new Error('Heat and temperature required');
  }
  
  const deltaS = heat / temperature;
  
  console.log(chalk.cyan('Entropy Change: ΔS = Q/T'));
  console.log(chalk.green(`✓ Entropy Change: ${deltaS.toFixed(4)} J/K`));
  
  return deltaS;
}

export default thermodynamics;
