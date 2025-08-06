# MathCLI Pro - Advanced Mathematical CLI Calculator

MathCLI Pro is a professional command-line tool for advanced mathematical calculations, unit conversions, persistent history, performance optimizations, CLI charts, and extensibility. The project is modular, scalable, and easy to extend, ideal for developers, students, or technical users who prefer the terminal.

## 📦 Installation
Requirements:
- Node.js >= 18
- npm

Clone the repository:
```sh
git clone https://github.com/gzeu/mathcli-pro.git
cd mathcli-pro
npm install
```

## 🚀 Usage
Start the application with:
```sh
npm start
```

## CLI Functionalities

| Command                | Description                                                        | Example Usage                                         |
|-----------------------|--------------------------------------------------------------------|-------------------------------------------------------|
| calculate             | Advanced math expression evaluation                                 | node index.js calculate "2+2*5"                       |
| convert               | Unit conversions (placeholder)                                      | node index.js convert "100 cm to m"                   |
| history               | Show calculation history (not yet implemented)                      | node index.js history                                 |
| optimize              | Math optimization (placeholder)                                     | node index.js optimize "minimize x^2+3x-5"            |
| calculate-from-file   | Calculate from CSV/JSON file, export result                        | node index.js calculate-from-file data.csv "sum(col1)" --output results.json |
| fetch-currency        | Fetch currency rates from external API                              | node index.js fetch-currency USD frankfurter.app       |
| run-script            | Run multiple commands from a script file                            | node index.js run-script script.txt                   |
| plot-chart            | Plot a bar chart in the terminal from a list of numbers             | node index.js plot-chart 1 2 3 4 5 6                  |
| help                  | Show help and usage examples                                        | node index.js help                                    |

## Example script.txt
```
calculate 2+2*5
fetch-currency USD
calculate sin(pi/2)
plot-chart 1 2 3 4 5 6
```

## Plotting Charts
You can plot a bar chart in the terminal by running:
```sh
node index.js plot-chart 1 2 3 4 5 6
```
Or interactively from the main menu.

## 🗂️ Project Structure & Modularization

MathCLI-Pro/
├── package.json          # npm configurations, scripts, and dependencies
├── bin/                  # npm bin entry point (mathcli-pro)
├── index.js              # CLI entry point (modular)
├── commands/             # CLI commands (calculate, convert, optimize, help, etc.)
├── utils/                # Utility modules (calculations, validations, etc.)
├── data/                 # Persistent data (history, problems)
├── config/               # Global configurations
└── tests/                # Unit and integration tests

### Modular CLI
- Fiecare comandă este implementată ca modul separat în `commands/` pentru mentenanță și testare ușoară.
- CLI-ul folosește importuri moderne ESM și poate fi extins rapid cu noi funcționalități.

### npm & GitHub Ready
- Proiectul include script bin pentru instalare globală (`npm install -g mathcli-pro`).
- Câmpurile `bin`, `author`, `repository`, `keywords` sunt completate pentru publicare npm.
- Structura și codul sunt pregătite pentru open-source și colaborare pe GitHub.

### Publicare npm
1. Rulează `npm publish` după validarea tuturor funcționalităților.
2. Instalează global cu `npm install -g mathcli-pro` și rulează `mathcli-pro` din orice terminal.
3. Contribuie sau raportează probleme pe [GitHub](https://github.com/gzeu/mathcli-pro).
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
# Calcul matematic avansat
node index.js calculate "2+2*5"
node index.js calculate "sin(pi/2) + sqrt(16)"

# Conversie unități (placeholder)
node index.js convert "100 cm to m"

# Calcul din fișier CSV/JSON și export rezultat
node index.js calculate-from-file test.csv "sum(col1)" --output=rezultat.json

# Fetch curs valutar din surse diferite
node index.js fetch-currency USD exchangerate.host
node index.js fetch-currency EUR frankfurter.app

# Rulare script cu comenzi multiple
node index.js run-script script.txt

# Plotare grafic rapid în terminal
node index.js plot-chart 3 1 4 1 5 9 2 6

# Testare automată API-uri valutare
node index.js test-api

# Ajutor și exemple
node index.js help
```

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