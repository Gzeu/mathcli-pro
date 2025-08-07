




# MathCLI Pro v4.1.5


[![Build Status](https://github.com/gzeu/mathcli-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/gzeu/mathcli-pro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/mathcli-pro.svg)](https://www.npmjs.com/package/mathcli-pro)
[![Version](https://img.shields.io/badge/version-4.1.5-blue.svg)](https://www.npmjs.com/package/mathcli-pro)
[![GitHub stars](https://img.shields.io/github/stars/gzeu/mathcli-pro.svg?style=social)](https://github.com/gzeu/mathcli-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)


**Modern CLI calculator for developers, engineers, and power users.**

---

## Features

- Advanced math expressions (mathjs)
- Unit conversions (length, mass, volume, temperature, speed, etc.)
- Math optimization (min/max) with ASCII chart
- Currency rates (fiat & crypto)
- Batch calculations from CSV/JSON
- CLI ASCII charts
- Persistent history (last 20 operations)
- Script automation
- Colorized output
- Extensible catalog

---

## Usage Examples

```bash
# Math
node index.js calculate "2+2*5"
node index.js calculate "sin(pi/2) + sqrt(16)"

# Conversion
node index.js convert "100 cm to m"
node index.js convert "5 kg to lb"

# Batch
node index.js calculate-from-file test.csv "sum(col1)" --output=output.json

# Currency
node index.js fetch-currency USD exchangerate.host
node index.js fetch-currency BTC coingecko

# Script
node index.js run-script script.txt

# Chart
node index.js plot-chart 3 1 4 1 5 9 2 6

# History
node index.js history

# Help
node index.js help
```

---
## Roadmap

### Delivered
- Persistent calculation history
- Real unit conversions
- Math optimization (min/max, ASCII chart)
- Professional CLI output (color, ASCII graphics)
- Input validation & feedback
- Automated testing & CI
- History export (CSV/JSON)
- Import/export (CSV, batch)
- User-defined functions (plugins/scripts)
- Advanced history/charts (CLI export)
- Batch mode & automation
- Advanced currency calculator
- Interactive documentation & real examples

### In Progress (Next Release)
- Full Excel import/export (xlsx)
- Batch mode extended (summary, error reporting)
- Export chart as image (png/svg)
- Advanced interactive help & real-world examples
- Plugin system for external extensions

### Planned (Long Term)
- CLI auto-complete & suggestions
- Enhanced error handling & reporting
- Advanced currency/crypto analytics
- Customizable themes/output
- Cloud sync & multi-device history
- Web dashboard companion

---


## CLI Help & Usage

- Calculate: `node index.js calculate "2+2*5"`
- Convert: `node index.js convert "100 cm to m"`
- History: `node index.js history`
- Optimize: `node index.js optimize "minimize x^2+3x-5"`
- Batch: `node index.js calculate-from-file data.csv "sum(col1)" --output=results.json`
- Currency: `node index.js fetch-currency USD exchangerate.host`
- Script: `node index.js run-script script.txt`
- Chart: `node index.js plot-chart 1 2 3 4 5 6`
- Help: `node index.js help`

---




## Project Structure

```
├── package.json       # npm config & dependencies
├── bin/               # npm bin entry (mathcli-pro)
├── index.js           # CLI entry point
├── commands/          # CLI commands (calculate, convert, etc.)
├── utils/             # Utility modules
├── data/              # Persistent data (history, etc.)
├── config/            # Global config
└── tests/             # Unit/integration tests
```

---



## Contributing

Contributions and issues are welcome!
1. Fork the repo
2. Create a branch (`feature/your-feature`)
3. Commit your changes
4. Open a Pull Request
5. Discuss and review

---



## License

MIT — see [LICENSE](LICENSE)

---



## Contact & Support

- [GitHub Issues](https://github.com/gzeu/mathcli-pro/issues)
- Email: pricopgeorge@gmail.com

---