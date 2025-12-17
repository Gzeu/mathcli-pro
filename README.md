# MathCLI Pro v4.2.0

[![Build Status](https://github.com/Gzeu/mathcli-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/Gzeu/mathcli-pro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/mathcli-pro.svg)](https://www.npmjs.com/package/mathcli-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/Gzeu/mathcli-pro.svg?style=social)](https://github.com/Gzeu/mathcli-pro)

**Modern CLI calculator for developers, engineers, and power users.**

Comprehensive command-line toolkit featuring **AI API cost calculations**, **MEV/DeFi tools**, **serverless optimization**, advanced math, scientific computing, physics, unit conversions, and more.

> 🚀 **Latest Update v4.2.0**: NEW! AI API Cost Calculator (40+ models), MEV Calculator for DeFi, Serverless Cost Optimizer, plus Scientific Computing, Physics, and Gaming Probability tools!

---

## 🚀 Quick Start

### Installation

```bash
# Global installation (recommended)
npm install -g mathcli-pro

# Or run directly with npx
npx mathcli-pro
```

### Basic Usage

```bash
# Interactive mode
mathcli-pro

# Direct commands
mathcli-pro calculate "sin(pi/2) + sqrt(16)"
mathcli-pro convert "100 cm to m"

# NEW: AI Cost Calculator
mathcli-pro ai cost --model gpt-5 --input 1000 --output 500 --requests 10000

# NEW: MEV Arbitrage
mathcli-pro mev arbitrage --token EGLD --amount 10000 --priceA 35.20 --priceB 35.80

# NEW: Serverless Optimizer
mathcli-pro serverless compare --requests 10000000 --duration 300 --memory 256
```

---

## ✨ Features

### 🤖 AI & Cloud (NEW! Dec 2025)

#### 💎 AI API Cost Calculator
**40+ Models | Prompt Caching | Batch Discounts**

- **OpenAI**: GPT-5/5.2, GPT-4o, o3/o3-mini
- **Anthropic**: Claude Opus/Sonnet/Haiku 4.5, 3.5
- **Google**: Gemini 3 Pro, 2.5 Pro/Flash
- **Others**: xAI Grok 4, DeepSeek V3, Llama 3.3, Mistral

**Unique Features:**
- ✅ Prompt caching simulation (90% savings!)
- ✅ Batch API discounts (50% off)
- ✅ Text-to-token estimation
- ✅ Multi-model comparison
- ✅ Context window optimizer
- ✅ Model recommendations by use case

```bash
# Calculate costs with caching
mathcli-pro ai cost --model claude-sonnet-4.5 --input 2000 --output 1000 \
  --requests 100000 --cache --cache-rate 0.8

# Compare models
mathcli-pro ai compare --models "gpt-5,claude-opus-4.5,gemini-3-pro" \
  --input 1000 --output 500 --requests 50000

# Get recommendation
mathcli-pro ai recommend --use-case coding --budget 500
```

**Real Savings:**
- Prompt caching: **$540/month** saved (90% reduction)
- Batch API: **$281/month** saved (50% discount)
- Model switching: Up to **$5,000+/month** saved

---

#### 💰 MEV Calculator (DeFi)
**Multi-Chain Arbitrage | Liquidations | Flashloans**

**Supported Chains:**
- Ethereum, MultiversX (EGLD), BSC, Polygon, Arbitrum

**Strategies:**
- 🔄 Cross-DEX Arbitrage
- 🥪 Sandwich Attack Simulation (educational)
- 🔫 Liquidation Hunting
- ⚡ Flashloan Profitability

```bash
# Arbitrage opportunity
mathcli-pro mev arbitrage --token EGLD --amount 10000 \
  --priceA 35.20 --priceB 35.80 --chain multiversx

# Liquidation analysis
mathcli-pro mev liquidation --collateral 100000 --debt 90000 --platform Aave

# Flashloan ROI
mathcli-pro mev flashloan --amount 1000000 --profit 5000 --chain ethereum
```

**Real Profit Examples:**
- Arbitrage: **$5,610** net profit
- Liquidation: **$2,190** (5% bonus)
- Flashloan: **$3,575** profit

---

#### ☁️ Serverless Cost Optimizer
**5 Platforms | Database Costs | Optimization Tips**

**Platforms:**
- AWS Lambda, Cloudflare Workers, Vercel, Google Cloud Functions, Azure Functions

**Databases:**
- PlanetScale, Supabase, DynamoDB, MongoDB Atlas

```bash
# Calculate costs
mathcli-pro serverless cost --platform aws-lambda \
  --requests 5000000 --duration 500 --memory 512

# Compare all platforms
mathcli-pro serverless compare --requests 10000000 \
  --duration 300 --memory 256

# Database costs
mathcli-pro serverless db --database planetscale \
  --queries 50000000 --storage 20
```

**Savings:**
- Platform comparison: **$16/month** (65% savings)
- Cold start optimization: **$3.50/month**
- Right-sizing memory: Variable savings

---

### 🧮 Scientific Computing

#### Matrix Operations
```bash
mathcli-pro matrix determinant --data "[[4,3],[2,1]]"
mathcli-pro matrix inverse --data "[[4,7],[2,6]]"
mathcli-pro matrix eigenvalues --data "[[2,1],[1,2]]"
```

#### Linear Equations
```bash
mathcli-pro equations --A "[[2,1,-1],[-3,-1,2],[-2,1,2]]" --b "[8,-11,-3]"
```

#### Numerical Integration
```bash
mathcli-pro integrate "x^2" 0 1 --method simpson
mathcli-pro integrate "sin(x)" 0 3.14159 --method trapezoidal
```

---

### ⚙️ Physics & Engineering

#### Mechanics
```bash
mathcli-pro physics velocity --distance 100 --time 10
mathcli-pro physics projectile --velocity 50 --angle 45
mathcli-pro physics force --mass 10 --acceleration 5
```

#### Electricity (Ohm's Law)
```bash
mathcli-pro electric ohms-law --voltage 12 --current 2
mathcli-pro electric power --voltage 220 --current 5
```

#### Thermodynamics
```bash
mathcli-pro thermo heat-transfer --mass 1 --specific-heat 4186 --temp-change 50
```

---

### 🎮 Gaming & Probability

#### Probability Calculator
```bash
mathcli-pro prob drop-rate --rate 0.01 --trials 100
mathcli-pro prob critical-hit --chance 0.25 --attacks 100 --multiplier 2.5
mathcli-pro prob gacha --config gacha.json
```

#### RNG Tools
```bash
mathcli-pro rng generate --min 1 --max 100 --count 10
mathcli-pro rng generate --crypto  # Cryptographically secure
mathcli-pro rng distribution-test --samples 10000
```

---

### 📊 Classic Features

#### Math Expressions
```bash
mathcli-pro calculate "2+2*5"                    # 12
mathcli-pro calculate "sin(pi/2)+sqrt(16)"       # 5
mathcli-pro calculate "log(100, 10)"             # 2
```

#### Unit Conversions
```bash
mathcli-pro convert "100 cm to m"           # 1 m
mathcli-pro convert "5 kg to lb"            # 11.0231 lb
mathcli-pro convert "100 C to F"            # 212 F
```

#### Optimization
```bash
mathcli-pro optimize "x^2+3x-5" --minimize
```

#### Batch Processing
```bash
mathcli-pro batch --file data.csv --operation "sum(col1)"
```

#### Currency Rates
```bash
mathcli-pro currency USD --api exchangerate
mathcli-pro currency BTC --api coingecko
```

---

## 📚 Complete Feature List

### 🤖 AI & Cloud
- ✅ AI API Cost Calculator (40+ models)
- ✅ Prompt Caching Simulation
- ✅ Batch API Discounts
- ✅ Multi-Model Comparison
- ✅ MEV Arbitrage Calculator
- ✅ Liquidation Hunter
- ✅ Flashloan Profitability
- ✅ Serverless Cost Optimizer
- ✅ Database Cost Estimator

### 🧮 Mathematics
- ✅ Advanced Expressions
- ✅ Matrix Operations
- ✅ Linear Equations
- ✅ Numerical Integration
- ✅ Optimization Problems
- ✅ Statistical Functions

### ⚙️ Physics
- ✅ Mechanics (velocity, force, energy)
- ✅ Electricity (Ohm's law, power)
- ✅ Thermodynamics (heat, ideal gas)
- ✅ Projectile Motion

### 🎮 Gaming
- ✅ Drop Rate Calculator
- ✅ Gacha Probability
- ✅ Critical Hit Analysis
- ✅ Loot Box Expected Value
- ✅ RNG Tools

### 🔄 Utilities
- ✅ Unit Conversions (50+ types)
- ✅ Currency Rates (Fiat + Crypto)
- ✅ Batch Processing (CSV/JSON)
- ✅ ASCII Charts
- ✅ Script Automation
- ✅ History Export

---

## 💡 Usage Examples

### AI Cost Calculation with Caching

```javascript
import { calculateAICost } from 'mathcli-pro';

const cost = await calculateAICost({
  model: 'gpt-5',
  inputTokens: 1000,
  outputTokens: 500,
  requests: 10000,
  promptCaching: true,
  cacheHitRate: 0.8
});

console.log(`💰 Total: $${cost.totalCost}/month`);
console.log(`💾 Caching saves: $${cost.cachingSavings}/month`);
```

### MEV Arbitrage Opportunity

```javascript
import { calculateMEV } from 'mathcli-pro';

const opportunity = await calculateMEV('arbitrage', {
  token: 'EGLD',
  amount: 10000,
  priceA: 35.20,
  priceB: 35.80,
  chain: 'multiversx'
});

if (opportunity.profitable) {
  console.log(`🎯 Profit: $${opportunity.netProfit}`);
  console.log(`📈 ROI: ${opportunity.roi.toFixed(2)}%`);
}
```

### Serverless Platform Comparison

```javascript
import { compareServerless } from 'mathcli-pro';

const comparison = await compareServerless({
  requests: 10000000,
  avgDuration: 300,
  memory: 256
});

console.log(`🥇 Cheapest: ${comparison[0].platform}`);
console.log(`💰 Save: $${comparison[0].savings}/month`);
```

---

## 🛠️ Development

### Prerequisites
- Node.js >= 20.0.0
- npm >= 8.0.0

### Local Development
```bash
# Clone repository
git clone https://github.com/Gzeu/mathcli-pro.git
cd mathcli-pro

# Install dependencies
npm install

# Run locally
node index.js

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure
```
mathcli-pro/
├── commands/
│   ├── ai/
│   │   └── api-cost-calculator.js    # AI API costs
│   ├── defi/
│   │   └── mev-calculator.js         # MEV & DeFi
│   ├── cloud/
│   │   └── serverless-optimizer.js   # Serverless
│   ├── scientific/
│   │   ├── matrix.js                 # Matrix ops
│   │   ├── equations.js              # Linear equations
│   │   └── integration.js            # Integration
│   ├── physics/
│   │   ├── mechanics.js
│   │   ├── electricity.js
│   │   └── thermodynamics.js
│   ├── gaming/
│   │   ├── probability.js
│   │   └── rng.js
│   └── ... (classic features)
├── index.js                          # Main CLI
├── package.json
└── README.md
```

---

## 📖 Documentation

### Full Feature Documentation
- 📘 [High-Potential Features Guide](HIGH_POTENTIAL_FEATURES.md) - Detailed docs for AI, MEV, Serverless
- 📗 [API Reference](#) - Coming soon
- 📙 [Examples Repository](#) - Coming soon

### Quick Links
- [AI Calculator Guide](HIGH_POTENTIAL_FEATURES.md#-ai-api-cost-calculator)
- [MEV Calculator Guide](HIGH_POTENTIAL_FEATURES.md#-mev-calculator-defi-arbitrage)
- [Serverless Guide](HIGH_POTENTIAL_FEATURES.md#️-serverless-cost-optimizer)

---

## 🚀 Roadmap

### Version 5.0 (Q1 2026)

**AI & ML:**
- [ ] Model training cost calculator
- [ ] Inference cost optimizer
- [ ] GPU vs CPU comparison

**Blockchain & Web3:**
- [ ] NFT collection analytics
- [ ] Token economics simulator
- [ ] Validator profitability

**Developer Tools:**
- [ ] API rate limit calculator
- [ ] CDN bandwidth optimizer
- [ ] CI/CD pipeline costs

**Enterprise:**
- [ ] Web dashboard (Next.js)
- [ ] REST API
- [ ] Real-time pricing
- [ ] Cost alerts

### Current Status
- ✅ v4.2.0 - AI, MEV, Serverless, Scientific, Physics
- ✅ v4.1.12 - Scientific Computing, Physics, Gaming
- ✅ v4.0.0 - Core functionality

---

## 🤝 Contributing

### Ways to Contribute
1. **Report Bugs** - [Open an issue](https://github.com/Gzeu/mathcli-pro/issues)
2. **Suggest Features** - Propose new calculators
3. **Submit PRs** - Add features or fix bugs
4. **Improve Docs** - Better examples and guides
5. **Spread the Word** - Star ⭐ and share!

### Development Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📊 Comparison with Competitors

| Feature | DocsBot | CostGoat | TheServerless | **mathcli-pro** |
|---------|---------|----------|---------------|------------------|
| AI Models | 30+ | 20+ | - | **40+** ✅ |
| Prompt Caching | ❌ | ❌ | - | **✅ 90% savings** |
| Batch API | ❌ | ✅ | - | **✅ 50% off** |
| MEV Tools | ❌ | ❌ | - | **✅ Full suite** |
| Multi-chain | - | - | - | **✅ 5 chains** |
| Serverless | - | - | 1 platform | **✅ 5 platforms** |
| Databases | - | - | ❌ | **✅ 4 DBs** |
| Open Source | ❌ | ❌ | ❌ | **✅ MIT** |

---

## 💰 Pricing

### Free Forever
- ✅ All CLI features
- ✅ Unlimited calculations
- ✅ All calculators
- ✅ Open source
- ✅ Community support

### Pro (Coming Soon)
- 🔥 Web dashboard
- 🔥 API access
- 🔥 Real-time pricing
- 🔥 Cost alerts
- 🔥 Export reports

---

## 📞 Support

### Getting Help
- 📖 [Documentation](HIGH_POTENTIAL_FEATURES.md)
- 🐛 [Report Bug](https://github.com/Gzeu/mathcli-pro/issues)
- ✨ [Request Feature](https://github.com/Gzeu/mathcli-pro/issues)
- 🤝 [Contribute](https://github.com/Gzeu/mathcli-pro/pulls)

### FAQ

**Q: Does this work offline?**  
A: Most features work offline. Currency and AI pricing require internet.

**Q: Can I use this in my project?**  
A: Yes! MIT licensed, free for commercial use.

**Q: How accurate are AI cost calculations?**  
A: Pricing updated December 2025. Always verify with official docs.

**Q: Does MEV calculator execute trades?**  
A: No, it's for analysis only. Educational purposes.

**Q: Which serverless platform is cheapest?**  
A: Usually Cloudflare Workers, but depends on your workload.

---

## 📜 Changelog

### v4.2.0 (Latest - Dec 2025)
- 🚀 **NEW: AI API Cost Calculator** - 40+ models, caching, batch discounts
- 🚀 **NEW: MEV Calculator** - Arbitrage, liquidations, flashloans
- 🚀 **NEW: Serverless Optimizer** - 5 platforms, database costs
- 📚 **NEW: Comprehensive documentation** - Full guides for all features
- ✨ Enhanced CLI with new commands

### v4.1.12
- 🔧 Fixed CI/CD pipeline
- ⬆️ Updated Node.js requirement to >=20.0.0
- 🛠️ Improved ES module support

[View full changelog](https://github.com/Gzeu/mathcli-pro/releases)

---

## 📄 License

**MIT License** - Free for commercial use

Copyright (c) 2025 George Pricop

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Gzeu/mathcli-pro&type=Date)](https://star-history.com/#Gzeu/mathcli-pro&Date)

---

## 🙏 Acknowledgments

- Built with [mathjs](https://mathjs.org/)
- Powered by [inquirer](https://www.npmjs.com/package/inquirer)
- Styled with [chalk](https://www.npmjs.com/package/chalk)

---

**Made with ❤️ by [George Pricop](https://github.com/Gzeu)**

⭐ **Star this repo** if you find it useful!

[🐛 Report Bug](https://github.com/Gzeu/mathcli-pro/issues) • [✨ Request Feature](https://github.com/Gzeu/mathcli-pro/issues) • [🤝 Contribute](https://github.com/Gzeu/mathcli-pro/pulls)

---

### 🔥 Quick Start Examples

```bash
# AI: Compare costs of 3 models
mathcli-pro ai compare --models "gpt-5,claude-opus-4.5,deepseek-v3"

# MEV: Find arbitrage profit
mathcli-pro mev arbitrage --token ETH --amount 100

# Serverless: Compare all platforms
mathcli-pro serverless compare --requests 10000000

# Physics: Projectile motion
mathcli-pro physics projectile --velocity 50 --angle 45

# Probability: Gacha simulator
mathcli-pro prob gacha --pull-count 100 --rate 0.01
```
