# Scientific Computing & Gaming Features

## 📐 Scientific Computing

### Matrix Operations

#### Determinant
```javascript
import { matrixOperations } from './commands/scientific/matrix.js';

const matrix = [
  [4, 3],
  [2, 1]
];

await matrixOperations('determinant', matrix);
// Output: Determinant: -2
```

#### Matrix Inverse
```javascript
const matrix = [
  [4, 7],
  [2, 6]
];

await matrixOperations('inverse', matrix);
// Output: Inverse matrix with verification
```

#### Eigenvalues
```javascript
const matrix = [
  [2, 1],
  [1, 2]
];

await matrixOperations('eigenvalues', matrix);
// Output: λ1 = 3.0000, λ2 = 1.0000
```

#### Matrix Multiplication
```javascript
const matrices = [
  [[1, 2], [3, 4]],
  [[5, 6], [7, 8]]
];

await matrixOperations('multiply', matrices);
```

### System of Linear Equations

#### Gaussian Elimination
```javascript
import { solveEquations } from './commands/scientific/equations.js';

const A = [
  [2, 1, -1],
  [-3, -1, 2],
  [-2, 1, 2]
];

const b = [8, -11, -3];

await solveEquations(A, b, 'gauss');
// Output: x1 = 2, x2 = 3, x3 = -1
```

### Numerical Integration

#### Simpson's Rule
```javascript
import { integrate } from './commands/scientific/integration.js';

// Integrate x^2 from 0 to 1
await integrate('x^2', 0, 1, 'simpson', 1000);
// Output: Result: 0.3333333333
```

#### Trapezoidal Rule
```javascript
// Integrate sin(x) from 0 to π
await integrate('sin(x)', 0, Math.PI, 'trapezoidal', 1000);
// Output: Result: 2.0000000000
```

#### Monte Carlo Integration
```javascript
// Integrate e^(-x^2) from 0 to 1
await integrate('exp(-x^2)', 0, 1, 'monte-carlo', 10000);
```

#### Double Integration
```javascript
import { integrateDouble } from './commands/scientific/integration.js';

// Integrate x*y over [0,1] × [0,1]
await integrateDouble('x*y', 0, 1, 0, 1, 100, 100);
// Output: Result: 0.2500000000
```

---

## ⚡ Physics & Engineering

### Mechanics

#### Velocity Calculations
```javascript
import { mechanics } from './commands/physics/mechanics.js';

// Average velocity
await mechanics('velocity', {
  distance: 100,  // meters
  time: 10        // seconds
});
// Output: Velocity: 10.00 m/s (36.00 km/h)

// Final velocity with acceleration
await mechanics('velocity', {
  initialVelocity: 0,
  acceleration: 9.81,
  time: 5
});
// Output: Velocity: 49.05 m/s
```

#### Force (Newton's 2nd Law)
```javascript
await mechanics('force', {
  mass: 10,        // kg
  acceleration: 5  // m/s²
});
// Output: Force: 50.00 N (Newtons)
```

#### Kinetic Energy
```javascript
await mechanics('kinetic-energy', {
  mass: 2,      // kg
  velocity: 10  // m/s
});
// Output: Kinetic Energy: 100.00 J (Joules)
```

#### Projectile Motion
```javascript
await mechanics('projectile', {
  velocity: 50,  // m/s
  angle: 45,     // degrees
  gravity: 9.81
});
// Output:
// ✓ Horizontal velocity: 35.36 m/s
// ✓ Vertical velocity: 35.36 m/s
// ✓ Time of flight: 7.21 s
// ✓ Maximum height: 63.76 m
// ✓ Range: 254.97 m
```

### Electricity

#### Ohm's Law
```javascript
import { electricity } from './commands/physics/electricity.js';

// Calculate resistance
await electricity('ohms-law', {
  voltage: 12,  // V
  current: 2    // A
});
// Output: Resistance: 6.0000 Ω

// Calculate current
await electricity('ohms-law', {
  voltage: 9,
  resistance: 3
});
// Output: Current: 3.0000 A
```

#### Electric Power
```javascript
// P = VI
await electricity('power', {
  voltage: 220,  // V
  current: 5     // A
});
// Output: Power: 1100.0000 W (1.1000 kW)

// P = I²R
await electricity('power', {
  current: 2,
  resistance: 10
});
// Output: Power: 40.0000 W
```

#### Series/Parallel Resistance
```javascript
// Series
await electricity('resistance-series', {
  resistors: [10, 20, 30]  // Ω
});
// Output: Total Resistance: 60.0000 Ω

// Parallel
await electricity('resistance-parallel', {
  resistors: [10, 10, 10]  // Ω
});
// Output: Total Resistance: 3.3333 Ω
```

### Thermodynamics

#### Heat Transfer
```javascript
import { thermodynamics } from './commands/physics/thermodynamics.js';

await thermodynamics('heat-transfer', {
  mass: 1,              // kg
  specificHeat: 4186,   // J/(kg·°C) - water
  tempChange: 50        // °C
});
// Output: Heat Transferred: 209300.00 J (209.30 kJ)
```

#### Ideal Gas Law (PV = nRT)
```javascript
// Calculate temperature
await thermodynamics('ideal-gas', {
  pressure: 101325,  // Pa
  volume: 0.0224,    // m³
  moles: 1           // mol
});
// Output: Temperature: 273.15 K (0.00 °C)
```

#### Thermal Expansion
```javascript
await thermodynamics('thermal-expansion', {
  length: 10,       // m
  material: 'steel',
  tempChange: 100   // °C
});
// Output: 
// Coefficient: 1.10e-5 /°C
// ✓ Length Change: 11.0000 mm
// ✓ Final Length: 10.011000 m
```

#### Heat Engine Efficiency (Carnot)
```javascript
await thermodynamics('efficiency', {
  hotTemp: 500,   // K
  coldTemp: 300   // K
});
// Output: Maximum Efficiency: 40.00%
```

---

## 🎮 Gaming & Randomness

### Probability Calculations

#### Drop Rate Analysis
```javascript
import { probability } from './commands/gaming/probability.js';

await probability('drop-rate', {
  probability: 0.01,  // 1% drop rate
  trials: 100         // attempts
});
// Output:
// ✓ Probability of at least 1 drop: 63.40%
// Expected attempts for 1st drop: 100.0
```

#### Gacha Simulator
```javascript
await probability('gacha', {
  rarity: [
    { name: 'Common', probability: 0.70 },
    { name: 'Rare', probability: 0.25 },
    { name: 'Legendary', probability: 0.05 }
  ],
  pulls: 100,
  pitySystem: { counter: 90 }
});
// Output: Expected outcomes for each rarity tier
```

#### Critical Hit Probability
```javascript
await probability('critical-hit', {
  critChance: 0.25,      // 25%
  critMultiplier: 2.5,   // 2.5x damage
  attacks: 100
});
// Output:
// ✓ Expected Critical Hits: 25.00
// ✓ Average Damage Multiplier: 1.375x
// ✓ Probability of ≥1 crit: 100.00%
```

#### Loot Box Expected Value
```javascript
await probability('loot-box', {
  items: [
    { name: 'Common Skin', probability: 0.70, value: 1 },
    { name: 'Rare Weapon', probability: 0.25, value: 5 },
    { name: 'Legendary Mount', probability: 0.05, value: 50 }
  ]
});
// Output: Expected Value: $4.45
```

#### Binomial Distribution
```javascript
await probability('binomial', {
  n: 100,    // trials
  k: 60,     // successes
  p: 0.5     // probability
});
// Output:
// ✓ P(X = 60): 1.0844%
// Expected value: 50.00
// Standard deviation: 5.00
```

### Random Number Generation

#### Generate Random Numbers
```javascript
import { rng } from './commands/gaming/rng.js';

// Standard RNG
await rng('generate', {
  min: 1,
  max: 100,
  count: 10,
  type: 'integer'
});

// Cryptographically secure
await rng('generate', {
  min: 0,
  max: 1,
  count: 1000,
  type: 'float',
  crypto: true
});
```

#### Seed Analysis
```javascript
await rng('seed-analysis', {
  seed: 12345,
  iterations: 1000
});
// Output: Distribution analysis with histogram
```

#### Distribution Testing (Chi-Square)
```javascript
await rng('distribution-test', {
  samples: 10000,
  bins: 10
});
// Output:
// χ² statistic: 8.4532
// Degrees of freedom: 9
// ✓ Distribution test: PASSED
```

#### Weighted Random Selection
```javascript
await rng('weighted', {
  items: [
    { name: 'Common', weight: 70 },
    { name: 'Uncommon', weight: 20 },
    { name: 'Rare', weight: 8 },
    { name: 'Legendary', weight: 2 }
  ],
  count: 1000
});
// Output: Distribution of selections
```

---

## 🚀 Usage in CLI

These features can be integrated into the main CLI with commands like:

```bash
# Matrix operations
mathcli-pro matrix determinant [[4,3],[2,1]]
mathcli-pro matrix inverse [[4,7],[2,6]]

# Integration
mathcli-pro integrate "x^2" 0 1 --method simpson
mathcli-pro integrate "sin(x)" 0 3.14159 --method trapezoidal

# Physics
mathcli-pro physics velocity --distance 100 --time 10
mathcli-pro physics projectile --velocity 50 --angle 45
mathcli-pro electric ohms-law --voltage 12 --current 2

# Gaming
mathcli-pro probability drop-rate --rate 0.01 --trials 100
mathcli-pro probability gacha --config gacha.json
mathcli-pro rng generate --min 1 --max 100 --count 10
```

## 📊 Output Features

- ✅ Colored console output for better readability
- ✅ Formula display for educational purposes
- ✅ Unit conversions (m/s ↔ km/h, J ↔ kJ, etc.)
- ✅ Statistical analysis (mean, median, std dev)
- ✅ Verification of results
- ✅ ASCII histograms and charts
- ✅ Error handling with helpful messages

## 🔧 Dependencies

All features use:
- `mathjs` - Mathematical computations
- `chalk` - Terminal colors
- `crypto` (Node.js built-in) - Secure RNG

## 📚 Educational Value

Each function includes:
- Mathematical formula display
- Step-by-step calculations
- Real-world units
- Physical interpretations
- Statistical validation

---

**Perfect for:**
- Students learning physics, math, or statistics
- Game developers balancing mechanics
- Engineers doing quick calculations
- Researchers testing numerical methods
- Anyone curious about probability and randomness!
