import { create, all } from 'mathjs';
import chalk from 'chalk';

const math = create(all);

/**
 * Matrix Operations Handler
 */
export async function matrixOperations(operation, matrixData) {
  try {
    console.log(chalk.blue('\n🔢 Matrix Operations\n'));

    switch (operation) {
      case 'determinant':
        return calculateDeterminant(matrixData);
      case 'inverse':
        return calculateInverse(matrixData);
      case 'transpose':
        return calculateTranspose(matrixData);
      case 'eigenvalues':
        return calculateEigenvalues(matrixData);
      case 'multiply':
        return multiplyMatrices(matrixData);
      case 'rank':
        return calculateRank(matrixData);
      default:
        throw new Error('Unknown matrix operation');
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    return null;
  }
}

function calculateDeterminant(matrixData) {
  const matrix = math.matrix(matrixData);
  const det = math.det(matrix);
  
  console.log(chalk.cyan('Matrix:'));
  console.log(formatMatrix(matrixData));
  console.log(chalk.green(`\n✓ Determinant: ${det}`));
  
  return det;
}

function calculateInverse(matrixData) {
  const matrix = math.matrix(matrixData);
  const det = math.det(matrix);
  
  if (Math.abs(det) < 1e-10) {
    console.log(chalk.red('⚠ Matrix is singular (determinant ≈ 0), inverse does not exist'));
    return null;
  }
  
  const inverse = math.inv(matrix);
  
  console.log(chalk.cyan('Original Matrix:'));
  console.log(formatMatrix(matrixData));
  console.log(chalk.cyan('\nInverse Matrix:'));
  console.log(formatMatrix(inverse.toArray()));
  
  return inverse.toArray();
}

function calculateTranspose(matrixData) {
  const matrix = math.matrix(matrixData);
  const transpose = math.transpose(matrix);
  
  console.log(chalk.cyan('Original Matrix:'));
  console.log(formatMatrix(matrixData));
  console.log(chalk.cyan('\nTranspose Matrix:'));
  console.log(formatMatrix(transpose.toArray()));
  
  return transpose.toArray();
}

function calculateEigenvalues(matrixData) {
  const matrix = math.matrix(matrixData);
  const eigen = math.eigs(matrix);
  
  console.log(chalk.cyan('Matrix:'));
  console.log(formatMatrix(matrixData));
  console.log(chalk.green('\n✓ Eigenvalues:'));
  eigen.values.forEach((val, i) => {
    console.log(`  λ${i + 1} = ${formatComplex(val)}`);
  });
  
  return eigen;
}

function multiplyMatrices(matrices) {
  if (matrices.length < 2) {
    throw new Error('Need at least 2 matrices to multiply');
  }
  
  let result = math.matrix(matrices[0]);
  
  for (let i = 1; i < matrices.length; i++) {
    result = math.multiply(result, math.matrix(matrices[i]));
  }
  
  console.log(chalk.green('\n✓ Result:'));
  console.log(formatMatrix(result.toArray()));
  
  return result.toArray();
}

function calculateRank(matrixData) {
  const matrix = math.matrix(matrixData);
  // Use QR decomposition to find rank
  const qr = math.qr(matrix);
  const R = qr.R.toArray();
  
  let rank = 0;
  const tolerance = 1e-10;
  
  for (let i = 0; i < Math.min(R.length, R[0].length); i++) {
    if (Math.abs(R[i][i]) > tolerance) {
      rank++;
    }
  }
  
  console.log(chalk.cyan('Matrix:'));
  console.log(formatMatrix(matrixData));
  console.log(chalk.green(`\n✓ Rank: ${rank}`));
  
  return rank;
}

function formatMatrix(matrix) {
  const arr = Array.isArray(matrix) ? matrix : matrix.toArray();
  return arr.map(row => 
    '  [' + row.map(val => 
      typeof val === 'number' ? val.toFixed(4).padStart(10) : val
    ).join(', ') + ']'
  ).join('\n');
}

function formatComplex(val) {
  if (typeof val === 'object' && val.re !== undefined) {
    const real = val.re.toFixed(4);
    const imag = val.im.toFixed(4);
    if (Math.abs(val.im) < 1e-10) return real;
    return `${real} ${val.im >= 0 ? '+' : ''}${imag}i`;
  }
  return val.toFixed(4);
}

export default matrixOperations;
