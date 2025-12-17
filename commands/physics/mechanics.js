import chalk from 'chalk';
import { create, all } from 'mathjs';

const math = create(all);

/**
 * Physics - Mechanics Calculations
 */
export async function mechanics(type, params) {
  try {
    console.log(chalk.blue('\n⚙️ Physics - Mechanics\n'));
    
    switch (type) {
      case 'velocity':
        return calculateVelocity(params);
      case 'acceleration':
        return calculateAcceleration(params);
      case 'force':
        return calculateForce(params);
      case 'kinetic-energy':
        return calculateKineticEnergy(params);
      case 'potential-energy':
        return calculatePotentialEnergy(params);
      case 'momentum':
        return calculateMomentum(params);
      case 'projectile':
        return projectileMotion(params);
      default:
        throw new Error('Unknown mechanics calculation');
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function calculateVelocity(params) {
  const { distance, time, initialVelocity, acceleration } = params;
  
  let velocity;
  if (distance && time && !acceleration) {
    // Average velocity: v = d/t
    velocity = distance / time;
    console.log(chalk.cyan('Formula: v = d/t'));
  } else if (initialVelocity !== undefined && acceleration && time) {
    // Final velocity: v = v0 + at
    velocity = initialVelocity + acceleration * time;
    console.log(chalk.cyan('Formula: v = v₀ + at'));
  } else {
    throw new Error('Insufficient parameters for velocity calculation');
  }
  
  console.log(chalk.green(`✓ Velocity: ${velocity.toFixed(2)} m/s`));
  console.log(chalk.gray(`  (${(velocity * 3.6).toFixed(2)} km/h)`));
  
  return velocity;
}

function calculateAcceleration(params) {
  const { initialVelocity, finalVelocity, time, force, mass } = params;
  
  let acceleration;
  if (initialVelocity !== undefined && finalVelocity !== undefined && time) {
    // a = (v - v0) / t
    acceleration = (finalVelocity - initialVelocity) / time;
    console.log(chalk.cyan('Formula: a = (v - v₀)/t'));
  } else if (force && mass) {
    // Newton's 2nd law: a = F/m
    acceleration = force / mass;
    console.log(chalk.cyan('Formula: a = F/m (Newton\'s 2nd Law)'));
  } else {
    throw new Error('Insufficient parameters for acceleration calculation');
  }
  
  console.log(chalk.green(`✓ Acceleration: ${acceleration.toFixed(2)} m/s²`));
  
  return acceleration;
}

function calculateForce(params) {
  const { mass, acceleration } = params;
  
  if (!mass || !acceleration) {
    throw new Error('Mass and acceleration required');
  }
  
  const force = mass * acceleration;
  console.log(chalk.cyan('Formula: F = ma (Newton\'s 2nd Law)'));
  console.log(chalk.green(`✓ Force: ${force.toFixed(2)} N (Newtons)`));
  
  return force;
}

function calculateKineticEnergy(params) {
  const { mass, velocity } = params;
  
  if (!mass || !velocity) {
    throw new Error('Mass and velocity required');
  }
  
  const energy = 0.5 * mass * velocity * velocity;
  console.log(chalk.cyan('Formula: KE = ½mv²'));
  console.log(chalk.green(`✓ Kinetic Energy: ${energy.toFixed(2)} J (Joules)`));
  
  return energy;
}

function calculatePotentialEnergy(params) {
  const { mass, height, gravity = 9.81 } = params;
  
  if (!mass || !height) {
    throw new Error('Mass and height required');
  }
  
  const energy = mass * gravity * height;
  console.log(chalk.cyan('Formula: PE = mgh'));
  console.log(chalk.cyan(`Gravity: ${gravity} m/s²`));
  console.log(chalk.green(`✓ Potential Energy: ${energy.toFixed(2)} J (Joules)`));
  
  return energy;
}

function calculateMomentum(params) {
  const { mass, velocity } = params;
  
  if (!mass || !velocity) {
    throw new Error('Mass and velocity required');
  }
  
  const momentum = mass * velocity;
  console.log(chalk.cyan('Formula: p = mv'));
  console.log(chalk.green(`✓ Momentum: ${momentum.toFixed(2)} kg·m/s`));
  
  return momentum;
}

function projectileMotion(params) {
  const { velocity, angle, gravity = 9.81 } = params;
  
  if (!velocity || angle === undefined) {
    throw new Error('Initial velocity and angle required');
  }
  
  const angleRad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(angleRad);
  const vy = velocity * Math.sin(angleRad);
  
  const timeOfFlight = (2 * vy) / gravity;
  const maxHeight = (vy * vy) / (2 * gravity);
  const range = vx * timeOfFlight;
  
  console.log(chalk.cyan('Projectile Motion Analysis:'));
  console.log(chalk.cyan(`Launch angle: ${angle}°`));
  console.log(chalk.cyan(`Initial velocity: ${velocity} m/s`));
  console.log(chalk.green(`\n✓ Horizontal velocity: ${vx.toFixed(2)} m/s`));
  console.log(chalk.green(`✓ Vertical velocity: ${vy.toFixed(2)} m/s`));
  console.log(chalk.green(`✓ Time of flight: ${timeOfFlight.toFixed(2)} s`));
  console.log(chalk.green(`✓ Maximum height: ${maxHeight.toFixed(2)} m`));
  console.log(chalk.green(`✓ Range: ${range.toFixed(2)} m`));
  
  return { vx, vy, timeOfFlight, maxHeight, range };
}

export default mechanics;
