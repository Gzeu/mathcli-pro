import { create, all } from 'mathjs';
import chalk from 'chalk';

const math = create(all);

/**
 * Numerical Integration Methods
 */
export async function integrate(expression, a, b, method = 'simpson', n = 1000) {
  try {
    console.log(chalk.blue('\n∫ Numerical Integration\n'));
    console.log(chalk.cyan(`Function: ${expression}`));
    console.log(chalk.cyan(`Interval: [${a}, ${b}]`));
    console.log(chalk.cyan(`Method: ${method}`));
    console.log(chalk.cyan(`Subdivisions: ${n}\n`));
    
    const f = math.compile(expression);
    const func = (x) => f.evaluate({ x });
    
    let result;
    
    switch (method.toLowerCase()) {
      case 'trapezoidal':
      case 'trapezoid':
        result = trapezoidalRule(func, a, b, n);
        break;
      case 'simpson':
        result = simpsonsRule(func, a, b, n);
        break;
      case 'midpoint':
        result = midpointRule(func, a, b, n);
        break;
      case 'monte-carlo':
      case 'montecarlo':
        result = monteCarlo(func, a, b, n);
        break;
      default:
        throw new Error('Unknown integration method');
    }
    
    console.log(chalk.green(`✓ Result: ${result.toFixed(10)}`));
    
    // Try to get exact value for simple functions
    try {
      const exactExpr = math.parse(expression);
      const antiderivative = math.derivative(exactExpr, 'x');
      console.log(chalk.gray(`\nNote: For exact symbolic integration, use computer algebra systems`));
    } catch (e) {
      // Symbolic integration not available
    }
    
    return result;
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function trapezoidalRule(f, a, b, n) {
  const h = (b - a) / n;
  let sum = (f(a) + f(b)) / 2;
  
  for (let i = 1; i < n; i++) {
    sum += f(a + i * h);
  }
  
  return sum * h;
}

function simpsonsRule(f, a, b, n) {
  // Ensure n is even
  if (n % 2 !== 0) n++;
  
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += f(x) * (i % 2 === 0 ? 2 : 4);
  }
  
  return (h / 3) * sum;
}

function midpointRule(f, a, b, n) {
  const h = (b - a) / n;
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    const midpoint = a + (i + 0.5) * h;
    sum += f(midpoint);
  }
  
  return sum * h;
}

function monteCarlo(f, a, b, n) {
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    const x = a + Math.random() * (b - a);
    sum += f(x);
  }
  
  return (b - a) * sum / n;
}

/**
 * Double Integration (2D)
 */
export async function integrateDouble(expression, x1, x2, y1, y2, nx = 100, ny = 100) {
  try {
    console.log(chalk.blue('\n∬ Double Integration\n'));
    console.log(chalk.cyan(`Function: ${expression}`));
    console.log(chalk.cyan(`x: [${x1}, ${x2}], y: [${y1}, ${y2}]\n`));
    
    const f = math.compile(expression);
    
    const hx = (x2 - x1) / nx;
    const hy = (y2 - y1) / ny;
    let sum = 0;
    
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const x = x1 + (i + 0.5) * hx;
        const y = y1 + (j + 0.5) * hy;
        sum += f.evaluate({ x, y });
      }
    }
    
    const result = sum * hx * hy;
    console.log(chalk.green(`✓ Result: ${result.toFixed(10)}`));
    
    return result;
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

export default integrate;
