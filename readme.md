
# MathCLI Pro

[![Build Status](https://github.com/gzeu/mathcli-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/gzeu/mathcli-pro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/mathcli-pro.svg)](https://www.npmjs.com/package/mathcli-pro)
[![GitHub stars](https://img.shields.io/github/stars/gzeu/mathcli-pro.svg?style=social)](https://github.com/gzeu/mathcli-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Advanced, modular, and extensible CLI calculator for developers, engineers, and power users.**

---

## ✨ Features

- 📐 Advanced math expression evaluation (mathjs)
- 🔄 Real unit conversions (length, mass, volume, temp, speed, etc.)
- 📈 Math optimization (min/max, ASCII chart)
- 💱 Currency rates from multiple APIs (fiat & crypto)
- 🗂️ Batch calculations from CSV/JSON
- 📊 CLI bar/line charts (ASCII)
- 🧬 Tree of Life (ASCII art)
- 🕑 Persistent history (last 20 operations)
- 📜 Script automation (run multiple CLI commands)
- 🆘 Full CLI help, tips, FAQ
- 🎨 Modern, colorized output (chalk, figlet)
- 🧩 Extensible catalog (add new commands/APIs easily)

---

## 🎨 Visual CLI Examples

### Math Optimization with ASCII Chart
```bash
$ node index.js optimize "minimize x^2+3x-5"
=== Rezultat Optimizare ===
 minimize x^2+3x-5
 Punct extrem: x = -1.5, y = -7.25
Puncte critice (x, y):
  x = -1.5, y = -7.25 <extremum>
  x = -1000, y = 996995
  x = 1000, y = 1002995
Grafic ASCII (x ∈ [-10,10]):
•
•
•
 ••
  ••
   ••
    ••
     ••      ••
       ••••••
  -10        -5         0         5        10
```

### CLI Chart Output
```bash
$ node index.js plot-chart 3 1 4 1 5 9 2 6
Grafic:
▇▁▆▁▇▃▁▅
```

### Tree of Life (ASCII Art)
```bash
$ node index.js tree-of-life
         🌳
        /|\
       /*|O\
      /*/|\*\
     /X/O|*\X\
    /*/X/|\O\*\
   /O/*/X|*\O\X\
         |
        / \
```

---

## 📋 Quick Start & Example Commands

```bash
# Math expression
node index.js calculate "2+2*5"                  # Result: 12
node index.js calculate "sin(pi/2) + sqrt(16)"   # Result: 5
node index.js calculate "log(100, 10)"           # Result: 2
node index.js calculate "pow(2,8)"               # Result: 256

# Real unit conversions
node index.js convert "100 cm to m"               # 100 cm = 1 m
node index.js convert "5 kg to lb"                # 5 kg = 11.023122100918888 lb
node index.js convert "32 C to F"                 # 32 C = 89.6 F
node index.js convert "1 mi to km"                # 1 mi = 1.609344 km

# Batch calculation from file
node index.js calculate-from-file test.csv "sum(col1)" --output=rezultat.json
node index.js calculate-from-file data.json "avg(col2)"

# Currency rates (fiat & crypto)
node index.js fetch-currency USD exchangerate.host
node index.js fetch-currency EUR frankfurter.app
node index.js fetch-currency BTC coingecko

# Script automation
node index.js run-script script.txt

# Plot chart
node index.js plot-chart 3 1 4 1 5 9 2 6

# Show history
node index.js history

# Help
node index.js help
```

---

## 🗺️ Roadmap (v4.1.3)

| Task                                      | Status   | Version |
|--------------------------------------------|----------|---------|
| Persistent calculation history             |   ✔️     | 4.1.3   |
| Real unit conversions                      |   ✔️     | 4.1.3   |
| Math optimization (min/max, grafic CLI)    |   ✔️     | 4.1.3   |
| CLI output profesional cu grafice ASCII    |   ✔️     | 4.1.3   |
| Input validation & feedback avansat        |   ✔️     | 4.1.3   |
| Testare automată & CI                      |   ✔️     | 4.1.3   |
| Import/export (Excel, batch)               |   ⏳     | 4.1.4   |
| User-defined functions (plugins/scripts)   |   ⏳     | next    |
| User-defined functions (plugins/scripts)   |   ⏳     | 4.1.4   |
| Advanced history/charts (export, CLI/img)  |   ⏳     | next    |
| Advanced history/charts (export, CLI/img)  |   ⏳     | 4.1.4   |
| Batch mode & automation                    |   ⏳     | next    |
| Batch mode & automation                    |   ⏳     | 4.1.4   |
| Advanced currency calculator               |   ⏳     | next    |
| Advanced currency calculator               |   ⏳     | 4.1.4   |
| Interactive documentation & real examples  |   ⏳     | next    |
| Interactive documentation & real examples  |   ⏳     | 4.1.4   |

---

## 🆘 Full CLI Help & Menu

### Main Menu Options

- Calculate expression: Evaluate advanced math expressions (mathjs)
- Convert units: Real unit conversions (length, mass, volume, temp, speed, etc.)
- History: Show persistent calculation history (last 20 operations)
- Optimize math: Math optimization (min/max, ASCII chart)
- Calculate from file: Batch calculations from CSV/JSON, export result
- Fetch currency rates: Get currency rates from multiple APIs (fiat & crypto)
- Run script file: Run multiple commands from a script file
- Plot chart: Plot a bar chart in the terminal
- Help: Show help and usage examples
- Exit: Close the CLI

### Command Syntax & Examples

```bash
# Calculate
node index.js calculate "2+2*5"
node index.js calculate "sin(pi/2) + sqrt(16)"

# Convert
node index.js convert "100 cm to m"
node index.js convert "60 km/h to m/s"

# History
node index.js history

# Optimize
node index.js optimize "minimize x^2+3x-5"

# Calculate from file
node index.js calculate-from-file data.csv "sum(col1)" --output=results.json

# Fetch currency
node index.js fetch-currency USD exchangerate.host
node index.js fetch-currency BTC coingecko

# Run script
node index.js run-script script.txt

# Plot chart
node index.js plot-chart 1 2 3 4 5 6

# Help
node index.js help
```

---

## 📦 Project Structure

```
├── package.json          # npm configurations, scripts, and dependencies
├── bin/                  # npm bin entry point (mathcli-pro)
├── index.js              # CLI entry point (modular)
├── commands/             # CLI commands (calculate, convert, optimize, help, etc.)
├── utils/                # Utility modules (calculations, validations, etc.)
├── data/                 # Persistent data (history, problems)
├── config/               # Global configurations
└── tests/                # Unit and integration tests
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create a new branch (`feature/feature-name`)
3. Make your changes and commit
4. Open a Pull Request
5. Discuss and review

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📢 Contact & Support

- [GitHub Issues](https://github.com/gzeu/mathcli-pro/issues)
- Email: pricopgeorge@gmail.com

---