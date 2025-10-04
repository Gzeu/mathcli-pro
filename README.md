# MathCLI Pro v4.1.12

[![Build Status](https://github.com/Gzeu/mathcli-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/Gzeu/mathcli-pro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/mathcli-pro.svg)](https://www.npmjs.com/package/mathcli-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/Gzeu/mathcli-pro.svg?style=social)](https://github.com/Gzeu/mathcli-pro)

**Modern CLI calculator for developers, engineers, and power users.**

A comprehensive command-line mathematics toolkit featuring advanced calculations, unit conversions, data visualization, currency tracking, and automation capabilities.

> 🔧 **Latest Update**: Fixed CI/CD pipeline compatibility issues, updated Node.js requirements to >=20.0.0, and improved ES module support for better reliability.

## 🚀 Quick Start

### Installation

```bash
# Global installation (recommended)
npm install -g mathcli-pro

# Or run directly with npx
npx mathcli-pro calculate "2+2*5"
```

### Basic Usage

```bash
# Interactive mode
mathcli-pro

# Direct commands
mathcli-pro calculate "sin(pi/2) + sqrt(16)"
mathcli-pro convert "100 cm to m"
mathcli-pro plot-chart 3 1 4 1 5 9 2 6
```

## ✨ Features

### 🧮 Mathematical Operations
- **Advanced expressions** - Complex mathematical calculations using mathjs
- **Optimization** - Find minimum/maximum values with ASCII visualization
- **Statistical functions** - Basic statistical calculations
- **Function plotting** - ASCII charts and graphs

### 🔄 Unit Conversions
- **Length** - meters, feet, inches, kilometers, miles
- **Mass** - grams, kilograms, pounds, ounces
- **Volume** - liters, gallons, cups, milliliters
- **Temperature** - Celsius, Fahrenheit, Kelvin
- **Speed** - m/s, km/h, mph, knots
- **And many more...**

### 💱 Currency & Financial Data
- **Real-time rates** - Fiat currencies (USD, EUR, RON, etc.)
- **Cryptocurrency** - Bitcoin, Ethereum, and major altcoins
- **Multiple APIs** - exchangerate.host, CoinGecko, Frankfurter
- **Historical data** - Track price changes over time

### 📊 Data Processing
- **Batch calculations** - Process CSV/JSON files
- **File import/export** - Multiple format support
- **Script automation** - Run command sequences
- **Persistent history** - Last 20 operations saved
- **Export capabilities** - CSV, JSON formats

### 🎨 Visualization
- **ASCII charts** - Bar charts, histograms
- **Function plots** - Mathematical function visualization
- **Optimization graphs** - Visual representation of min/max problems
- **Colorized output** - Enhanced terminal experience

## 📚 Usage Examples

### Mathematical Calculations
```bash
# Basic arithmetic
mathcli-pro calculate "2+2*5"
# Result: 12

# Advanced functions
mathcli-pro calculate "sin(pi/2) + sqrt(16) + log(10)"
# Result: 6

# Variables and expressions
mathcli-pro calculate "x = 5; y = 3; x^2 + y^2"
# Result: 34
```

### Unit Conversions
```bash
# Length conversion
mathcli-pro convert "100 cm to m"
# Result: 1 m

# Temperature conversion
mathcli-pro convert "32 F to C"
# Result: 0 C

# Speed conversion
mathcli-pro convert "60 mph to km/h"
# Result: 96.56 km/h
```

### Optimization Problems
```bash
# Find minimum
mathcli-pro optimize "minimize x^2+3x-5"
# Shows minimum point with ASCII graph

# Find maximum
mathcli-pro optimize "maximize -x^2+4x+1"
# Shows maximum point with visualization
```

### Currency and Crypto
```bash
# Fiat currency rates
mathcli-pro fetch-currency USD exchangerate.host
# Shows USD rates against major currencies

# Cryptocurrency prices
mathcli-pro fetch-currency BTC coingecko
# Shows Bitcoin price in USD, EUR, etc.
```

### Data Processing
```bash
# Process CSV file
mathcli-pro calculate-from-file data.csv "sum(col1)" --output=results.json

# Run script file
mathcli-pro run-script calculations.txt

# View calculation history
mathcli-pro history

# Export history
mathcli-pro history --export=csv
```

### Visualization
```bash
# Simple bar chart
mathcli-pro plot-chart 3 1 4 1 5 9 2 6
# Displays ASCII bar chart

# Function plotting (via optimization)
mathcli-pro optimize "minimize x^2-4x+3"
# Shows parabola with minimum point
```

## 🛠️ Development

### Prerequisites
- Node.js >= 20.0.0 (updated from 18.0.0 for better compatibility)
- npm >= 8.0.0

### Local Development
```bash
# Clone repository
git clone https://github.com/Gzeu/mathcli-pro.git
cd mathcli-pro

# Install dependencies
npm install

# Run in development mode
node index.js

# Run tests
npm test

# Run specific command
node index.js calculate "2+2"
```

### Project Structure
```
mathcli-pro/
├── package.json          # npm configuration
├── index.js             # Main CLI entry point
├── bin/                 # Executable scripts
│   └── mathcli-pro     # npm bin entry
├── commands/            # Command implementations
│   ├── calculate.js     # Mathematical calculations
│   ├── convert.js       # Unit conversions
│   ├── optimize.js      # Optimization problems
│   ├── fetchCurrency.js # Currency/crypto rates
│   ├── plotChart.js     # ASCII chart generation
│   ├── runScript.js     # Script automation
│   └── history.js       # History management
├── data/                # Persistent data storage
│   └── .gitkeep        # Keep directory structure
├── config/              # Configuration files
├── tests/               # Test suites
│   └── *.test.mjs      # Jest test files
├── catalog.js           # Feature catalog
└── .github/             # GitHub Actions CI/CD
    └── workflows/
        └── ci.yml      # Fixed CI/CD pipeline
```

### Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `calculate` | Evaluate mathematical expressions | `calculate "2+2*5"` |
| `convert` | Convert between units | `convert "100 cm to m"` |
| `optimize` | Solve optimization problems | `optimize "minimize x^2+3x-5"` |
| `fetch-currency` | Get currency/crypto rates | `fetch-currency USD` |
| `plot-chart` | Generate ASCII charts | `plot-chart 3 1 4 1 5` |
| `calculate-from-file` | Process data files | `calculate-from-file data.csv "sum(col1)"` |
| `run-script` | Execute command scripts | `run-script script.txt` |
| `history` | View calculation history | `history --export=json` |
| `help` | Show help information | `help` |
| `catalog` | Browse feature catalog | `catalog` |

### Aliases
- `calc` → `calculate`
- `conv` → `convert`
- `opt` → `optimize`
- `hist` → `history`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- calculate.test.mjs
```

## 🚀 Roadmap

### Version 5.0 (Planned)
- **Enhanced Testing** - Comprehensive test coverage (90%+)
- **Advanced Math** - Matrix operations, complex numbers, calculus
- **3D Visualization** - 3D ASCII plots and heatmaps
- **Real-time Data** - Stock prices, live crypto feeds
- **Performance** - Caching, parallel processing
- **Plugin System** - Extensible architecture
- **Export Options** - PNG/SVG chart export

### Current Status
- ✅ **Core Features** - All basic functionality implemented
- ✅ **CLI Interface** - Interactive and direct command modes
- ✅ **Data Processing** - CSV/JSON batch operations
- ✅ **Visualization** - ASCII charts and optimization graphs
- ✅ **Currency APIs** - Multiple provider support
- ✅ **CI/CD Pipeline** - Fixed and working properly
- ✅ **ES Module Support** - Improved compatibility
- ⏳ **Advanced Testing** - Expanding test coverage
- ⏳ **Documentation** - Enhanced user guides

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Report bugs** - Use GitHub Issues
- 💡 **Suggest features** - Share your ideas
- 📝 **Improve documentation** - Fix typos, add examples
- 🧪 **Add tests** - Increase test coverage
- 🚀 **Implement features** - Submit pull requests

### Development Process
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Use ES modules (`import/export`)
- Follow existing code patterns
- Add JSDoc comments for functions
- Include tests for new features
- Use meaningful commit messages

## 📄 API Documentation

### Command Functions

```javascript
// calculate.js
export function calculate(expression) {
  // Evaluates mathematical expressions
  // Returns: number | error object
}

// convert.js
export function convert(conversionString) {
  // Converts between units
  // Format: "value unit to unit"
  // Returns: string | error object
}

// optimize.js
export function optimize(query) {
  // Solves optimization problems
  // Format: "minimize/maximize function"
  // Returns: object with result and extremum
}
```

## 🔧 Configuration

### Environment Variables
- `MATHCLI_HISTORY_SIZE` - Number of history entries (default: 20)
- `MATHCLI_DATA_DIR` - Data directory path (default: ./data)
- `MATHCLI_CACHE_TTL` - Cache TTL in seconds (default: 3600)

### Config Files
Configuration files are stored in the `config/` directory:
- `default.json` - Default settings
- `user.json` - User preferences (auto-generated)

## 📊 Performance

### Benchmarks (approximate)
- **Simple calculations**: < 10ms
- **Complex expressions**: < 50ms
- **Unit conversions**: < 5ms
- **Chart generation**: < 100ms
- **File processing**: Depends on file size

### Memory Usage
- **Base usage**: ~20MB
- **With history**: ~25MB
- **Large datasets**: Scales with data size

## 🔒 Security

- **Input validation** - All user inputs are validated
- **Sandboxed evaluation** - Mathematical expressions run in safe context
- **No external execution** - Scripts cannot execute system commands
- **API rate limiting** - Prevents API abuse

## 📞 Support

### Getting Help
- 📖 **Built-in help**: `mathcli-pro help`
- 🐛 **Issues**: [GitHub Issues](https://github.com/Gzeu/mathcli-pro/issues)
- 📧 **Email**: pricopgeorge@gmail.com
- 🚀 **Feature requests**: Use GitHub Issues with "enhancement" label

### FAQ

**Q: How do I install globally?**
A: Use `npm install -g mathcli-pro`

**Q: Can I use custom functions?**
A: Yes, mathjs supports custom functions. See documentation for details.

**Q: How do I export calculation history?**
A: Use `mathcli-pro history --export=csv` or `--export=json`

**Q: Which currency APIs are supported?**
A: exchangerate.host, CoinGecko, Frankfurter, and others. See catalog for full list.

**Q: What Node.js version do I need?**
A: Node.js 20.0.0 or higher is required for optimal compatibility.

## 📜 Changelog

### v4.1.12 (Latest)
- 🔧 **Fixed CI/CD pipeline** - Resolved ES module compatibility issues
- ⬆️ **Updated Node.js requirement** - Now requires Node.js >=20.0.0
- 🛠️ **Improved prepare script** - Better ES module support for npm installs
- 🚀 **Enhanced build process** - Streamlined deployment and testing
- 📝 **Updated documentation** - Reflects latest changes and requirements

### v4.1.6
- Added comprehensive .gitignore
- Cleaned up temporary files
- Added MIT License
- Improved README documentation
- Added data directory structure

### v4.1.5
- Enhanced currency API support
- Improved error handling
- Added catalog system
- Updated dependencies

[View full changelog](https://github.com/Gzeu/mathcli-pro/releases)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [George Pricop](https://github.com/Gzeu)**

⭐ **Star this repo** if you find it useful!

[🐛 Report Bug](https://github.com/Gzeu/mathcli-pro/issues) • [✨ Request Feature](https://github.com/Gzeu/mathcli-pro/issues) • [🤝 Contribute](https://github.com/Gzeu/mathcli-pro/pulls)