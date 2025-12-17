import { create, all } from 'mathjs';
import chalk from 'chalk';

const math = create(all);

/**
 * System of Linear Equations Solver
 * Solves Ax = b using various methods
 */
export async function solveEquations(A, b, method = 'auto') {
  try {
    console.log(chalk.blue('\n🔬 System of Linear Equations Solver\n'));
    
    const matrixA = math.matrix(A);
    const vectorB = math.matrix(b);
    
    console.log(chalk.cyan('Coefficient Matrix A:'));
    console.log(formatMatrix(A));
    console.log(chalk.cyan('\nConstants Vector b:'));
    console.log(formatVector(b));
    
    let solution;
    
    switch (method) {
      case 'gauss':
        solution = solveGaussian(A, b);
        break;
      case 'lu':
        solution = solveLU(matrixA, vectorB);
        break;
      case 'auto':
      default:
        solution = math.lusolve(matrixA, vectorB);
        break;
    }
    
    console.log(chalk.green('\n✓ Solution:'));
    const solutionArray = Array.isArray(solution[0]) ? solution.map(s => s[0]) : solution;
    solutionArray.forEach((val, i) => {
      console.log(`  x${i + 1} = ${val.toFixed(6)}`);
    });
    
    // Verify solution
    verifySolution(A, b, solutionArray);
    
    return solutionArray;
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function solveGaussian(A, b) {
  const n = A.length;
  const augmented = A.map((row, i) => [...row, b[i]]);
  
  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Partial pivoting
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k;
      }
    }
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
    
    // Eliminate below
    for (let k = i + 1; k < n; k++) {
      const factor = augmented[k][i] / augmented[i][i];
      for (let j = i; j <= n; j++) {
        augmented[k][j] -= factor * augmented[i][j];
      }
    }
  }
  
  // Back substitution
  const x = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = augmented[i][n];
    for (let j = i + 1; j < n; j++) {
      x[i] -= augmented[i][j] * x[j];
    }
    x[i] /= augmented[i][i];
  }
  
  return x;
}

function solveLU(A, b) {
  return math.lusolve(A, b);
}

function verifySolution(A, b, x) {
  const result = A.map(row => 
    row.reduce((sum, val, i) => sum + val * x[i], 0)
  );
  
  const error = result.map((val, i) => Math.abs(val - b[i]));
  const maxError = Math.max(...error);
  
  console.log(chalk.cyan('\nVerification (Ax = b):'));
  result.forEach((val, i) => {
    const match = Math.abs(val - b[i]) < 1e-6 ? '✓' : '✗';
    console.log(`  ${match} Row ${i + 1}: ${val.toFixed(6)} ≈ ${b[i]}`);
  });
  console.log(chalk.yellow(`\nMax error: ${maxError.toExponential(2)}`));
}

function formatMatrix(matrix) {
  return matrix.map(row => 
    '  [' + row.map(val => val.toFixed(4).padStart(10)).join(', ') + ']'
  ).join('\n');
}

function formatVector(vector) {
  return '  [' + vector.map(val => val.toFixed(4)).join(', ') + ']';
}

export default solveEquations;
