# MathCLI Pro – Test Script (PowerShell)
# Acest script rulează toate funcțiile principale și cele nou adăugate pe Windows PowerShell.

Write-Host "1. Calcul matematic simplu"
node index.js calculate "2+2*5"

Write-Host "2. Calcul matematic avansat"
node index.js calculate "sin(pi/2) + sqrt(16)"
node index.js calculate "log(100, 10)"
node index.js calculate "pow(2,8)"

Write-Host "3. Conversii unități"
node index.js convert "100 cm to m"
node index.js convert "5 kg to lb"
node index.js convert "32 C to F"
node index.js convert "1 mi to km"

Write-Host "4. Optimizare matematică cu chart ASCII"
node index.js optimize "minimize 2*x^2-8*x+6"

Write-Host "5. Curs valutar (fiat & crypto)"
node index.js fetch-currency USD exchangerate.host
node index.js fetch-currency EUR frankfurter.app
node index.js fetch-currency BTC coingecko

Write-Host "6. Batch calculation din fișier CSV/JSON"
node index.js calculate-from-file test.csv "sum(col1)" --output=output.json
node index.js calculate-from-file data.json "avg(col2)"

Write-Host "7. Script automation"
node index.js run-script script.txt

Write-Host "8. CLI chart output"
node index.js plot-chart 3 1 4 1 5 9 2 6

Write-Host "9. Istoric persistent și export"
node index.js history
node index.js history --export=csv
node index.js history --export=json

Write-Host "10. Help și documentație"
node index.js help

Write-Host "11. Testare funcții definite de utilizator (plugin/script)"
# Exemplu: script.txt cu comenzi CLI

Write-Host "12. Testare import/export Excel (dacă este implementat)"
# node index.js calculate-from-file test.xlsx "sum(col1)"

Write-Host "13. Testare mod batch & automatizare (output sumarizat, erori pe fiecare linie)"
# node index.js calculate-from-file batch.csv "sum(col1)" --batch

Write-Host "14. Testare export chart ASCII în fișier text"
# node index.js plot-chart 1 2 3 4 5 6 --export=chart.txt

Write-Host "15. Testare advanced currency calculator (funcții avansate valută)"
# node index.js fetch-currency BTC coingecko --details

Write-Host "16. Testare documentație interactivă"
# node index.js help --interactive

Write-Host "Testare completă. Înlocuiește fișierele de test (test.csv, data.json, script.txt etc.) cu date reale pentru testare completă."
