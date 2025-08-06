export function showHelp() {
  return `\nMathCLI Pro - Advanced Mathematical CLI Calculator\n\nUsage:\n  node index.js calculate "2+2*5"\n  node index.js convert "100 cm to m"\n  node index.js history\n  node index.js optimize "minimize x^2+3x-5"\n  node index.js calculate-from-file <file.csv|json> "sum(column)" [--output results.json|results.csv]\n  node index.js fetch-currency USD\n  node index.js help\n`;
}
