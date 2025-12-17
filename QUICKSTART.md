# 🚀 Quick Start Guide - MathCLI Pro v4.2.0

## Installation

```bash
npm install -g mathcli-pro
```

## 🎯 Try These First!

### 1. AI API Cost Calculator 🤖

```bash
# Start interactive mode
mathcli-pro

# Select: AI API Cost Calculator
# Then: Calculate Cost
# Model: gpt-5
# Input tokens: 1000
# Output tokens: 500
# Requests: 10000
# Enable caching: Yes

# Result: See your monthly costs with caching savings!
```

**Direct Command:**
```bash
mathcli-pro ai cost --model gpt-5 --input 1000 --output 500 --requests 10000
```

---

### 2. MEV Arbitrage Calculator 💰

```bash
# Interactive mode
mathcli-pro

# Select: MEV Calculator (DeFi)
# Then: Arbitrage
# Token: EGLD
# Amount: 10000
# Price on DEX A: 35.20
# Price on DEX B: 35.80
# Chain: multiversx

# Result: See if the arbitrage is profitable!
```

**Direct Command:**
```bash
mathcli-pro mev arbitrage --token EGLD --amount 10000 --priceA 35.20 --priceB 35.80 --chain multiversx
```

---

### 3. Serverless Cost Comparison ☁️

```bash
# Interactive mode
mathcli-pro

# Select: Serverless Optimizer
# Then: Compare Platforms
# Requests: 10000000
# Avg duration: 300
# Memory: 256

# Result: Compare AWS, Cloudflare, Vercel, Google, Azure!
```

**Direct Command:**
```bash
mathcli-pro serverless compare --requests 10000000 --duration 300 --memory 256
```

---

## 📊 Classic Features

### Calculator
```bash
mathcli-pro calculate "sin(pi/2) + sqrt(16)"
# Result: 5
```

### Unit Conversion
```bash
mathcli-pro convert "100 cm to m"
# Result: 1 m
```

### Currency Rates
```bash
mathcli-pro currency BTC --api coingecko
# Result: Bitcoin rates in USD, EUR, etc.
```

---

## 🎯 Pro Tips

### 1. Use Caching for AI Cost Savings
```bash
# Without caching
mathcli-pro ai cost --model claude-sonnet-4.5 --input 2000 --output 1000 --requests 100000
# Cost: ~$600/month

# With caching (80% hit rate)
mathcli-pro ai cost --model claude-sonnet-4.5 --input 2000 --output 1000 --requests 100000 --cache --cache-rate 0.8
# Cost: ~$60/month (90% savings!)
```

### 2. Compare Multiple AI Models
```bash
mathcli-pro ai compare --models "gpt-5,claude-opus-4.5,gemini-3-pro,deepseek-v3" --input 1000 --output 500 --requests 100000

# See which model gives you best value for money!
```

### 3. Find MEV Opportunities
```bash
# Check liquidation profitability
mathcli-pro mev liquidation --collateral 100000 --debt 90000 --platform Aave

# Flashloan ROI
mathcli-pro mev flashloan --amount 1000000 --profit 5000 --chain ethereum
```

### 4. Optimize Serverless Costs
```bash
# Single platform
mathcli-pro serverless cost --platform aws-lambda --requests 5000000 --duration 500 --memory 512

# Compare all
mathcli-pro serverless compare --requests 5000000 --duration 500 --memory 512

# Database costs
mathcli-pro serverless db --database planetscale --queries 50000000 --storage 20
```

---

## 📄 Interactive vs Direct Commands

### Interactive Mode (Recommended for Beginners)
```bash
mathcli-pro
# Follow the menu to explore features
```

### Direct Commands (For Power Users)
```bash
# AI
mathcli-pro ai cost [options]
mathcli-pro ai compare [options]
mathcli-pro ai recommend [options]

# MEV
mathcli-pro mev arbitrage [options]
mathcli-pro mev liquidation [options]
mathcli-pro mev flashloan [options]

# Serverless
mathcli-pro serverless cost [options]
mathcli-pro serverless compare [options]
mathcli-pro serverless db [options]

# Classic
mathcli-pro calculate "expression"
mathcli-pro convert "value unit to unit"
mathcli-pro currency CODE --api provider
```

---

## ❓ Common Questions

### Q: Do I need an API key?
A: No! All calculations are done locally. No API keys needed.

### Q: Is the AI pricing accurate?
A: Prices are updated as of December 2025. Always verify with official docs.

### Q: Can I use this for real trading?
A: The MEV calculator is for educational analysis only. Use at your own risk.

### Q: Which serverless platform is cheapest?
A: Usually Cloudflare Workers, but run the comparison for your specific use case!

---

## 📚 Learn More

- [Full Documentation](HIGH_POTENTIAL_FEATURES.md)
- [GitHub Repository](https://github.com/Gzeu/mathcli-pro)
- [Report Issues](https://github.com/Gzeu/mathcli-pro/issues)

---

## 🚀 Next Steps

1. **Try all 3 new calculators** (AI, MEV, Serverless)
2. **Compare results** with your current costs
3. **Star the repo** if you find it useful! ⭐
4. **Share** with friends who need these tools

---

**Made with ❤️ by [George Pricop](https://github.com/Gzeu)**
