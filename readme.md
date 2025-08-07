
# MathCLI Pro

[![npm version](https://img.shields.io/npm/v/mathcli-pro.svg)](https://www.npmjs.com/package/mathcli-pro)
[![GitHub stars](https://img.shields.io/github/stars/gzeu/mathcli-pro.svg?style=social)](https://github.com/gzeu/mathcli-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Advanced, modular, and extensible CLI calculator for developers, engineers, and power users.**

---

## Features

- 📐 Advanced math expression evaluation (mathjs)
- 🔄 Real unit conversions (length, mass, volume, temperature, speed, etc.)
- 🧮 Batch calculations from CSV/JSON

---

## Project Structure

```
mathcli-pro/
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

## Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create a new branch (`feature/feature-name`)
3. Make your changes and commit
4. Open a Pull Request
5. Discuss and review

---

## License

[MIT](LICENSE)

---

## Contact & Support

- [GitHub Issues](https://github.com/gzeu/mathcli-pro/issues)
- Email: pricopgeorge@gmail.com

---

## Roadmap

- [x] Persistent calculation history (data/history.json)
- [x] Real unit conversions (convert-units)
- [ ] Math optimization (min/max with mathjs)
- [ ] Import/export (Excel, Google Sheets, batch)
- [ ] User-defined functions (plugins/scripts)
- [ ] Advanced history/charts (export, filter, CLI/image)
- [ ] Input validation & feedback
- [ ] Batch mode & automation
- [ ] Advanced currency calculator (multi-API, alerts)
- [ ] Automated testing & coverage
- [ ] Interactive documentation & real examples

---

## Help complet din CLI
Rulează `node index.js help` pentru a vedea toate comenzile, exemple și explicații. Pentru detalii suplimentare, consultă și acest README.
🤝 Contributing
Fork the repository.

Create a new branch (feature/feature-name).

Make changes and commit.

Open a Pull Request.

Discuss changes in the review section.

Report suggestions or bugs via GitHub Issues.

📄 License
This project is licensed under the MIT License.

📢 Contact & Support
GitHub Issues

Email: [pricopgeorge@gmail.com]

For more details, check the documentation in commands/help-command.js or use the help command in the CLI.

---


## 📋 Example Commands for Quick Testing

```
# Math expression (with output)
node index.js calculate "2+2*5"                  # Result: 12
node index.js calculate "sin(pi/2) + sqrt(16)"   # Result: 5
node index.js calculate "log(100, 10)"           # Result: 2
node index.js calculate "pow(2,8)"               # Result: 256

# Real unit conversions
node index.js convert "100 cm to m"               # 100 cm = 1 m
node index.js convert "5 kg to lb"                # 5 kg = 11.023122100918888 lb
node index.js convert "32 C to F"                 # 32 C = 89.6 F
node index.js convert "100 m3 to l"               # 100 m3 = 100000 l
node index.js convert "60 km/h to m/s"            # 60 km/h = 16.666666666666668 m/s
node index.js convert "1000 m^3 to l"             # 1000 m^3 = 1000000 l
node index.js convert "1000 ml to l"              # 1000 ml = 1 l
node index.js convert "1 mi to km"                # 1 mi = 1.609344 km

# Batch calculation from file
node index.js calculate-from-file test.csv "sum(col1)" --output=rezultat.json
node index.js calculate-from-file data.json "avg(col2)"

# Currency rates
node index.js fetch-currency USD exchangerate.host
node index.js fetch-currency EUR frankfurter.app

# Script automation
node index.js run-script script.txt

# CLI chart
node index.js plot-chart 3 1 4 1 5 9 2 6
node index.js plot-chart 10 20 30 40 50

# Show history
node index.js history

# Help
node index.js help
```

---

## 🆘 Full CLI Help & Menu

### Main Menu Options

- Calculate expression: Evaluate advanced math expressions (mathjs)
- Convert units: Real unit conversions (length, mass, volume, temp, speed, etc.)
- History: Show persistent calculation history (last 20 operations)
- Optimize math: Math optimization (placeholder)
- Calculate from file: Batch calculations from CSV/JSON, export result
- Fetch currency rates: Get currency rates from multiple APIs
- Run script file: Run multiple commands from a script file
- Plot chart: Plot a bar chart in the terminal
- Help: Show help and usage examples
- Exit: Close the CLI

### Command Syntax & Examples

**Calculate:**
  node index.js calculate "2+2*5"
  node index.js calculate "sin(pi/2) + sqrt(16)"

**Convert:**
  node index.js convert "100 cm to m"
  node index.js convert "60 km/h to m/s"

**History:**
  node index.js history

**Optimize:**
  node index.js optimize "minimize x^2+3x-5"

**Calculate from file:**
  node index.js calculate-from-file data.csv "sum(col1)" --output=results.json

**Fetch currency:**
  node index.js fetch-currency USD exchangerate.host

**Run script:**
  node index.js run-script script.txt

**Plot chart:**
  node index.js plot-chart 1 2 3 4 5 6

**Help:**
  node index.js help

---

---

## 🚦 Roadmap & Task List

- [ ] Implementare istoric calcule (persistent în data/history.json)
- [ ] Conversii unități reale (folosind o librărie sau API)
- [ ] Optimizare matematică reală (ex: minimizare/maximizare cu mathjs)
- [ ] Extindere import/export (suport Excel, mai multe operații pe fișiere)
- [ ] Funcții custom definite de utilizator (plugin-uri sau scripturi)
- [ ] Persistență și vizualizare istoric/grafice (CLI și fișier)
- [ ] Validare și feedback pentru input (CLI și meniu)
- [ ] Documentație extinsă cu exemple reale și troubleshooting
- [ ] Testare automată și acoperire cod (tests/)