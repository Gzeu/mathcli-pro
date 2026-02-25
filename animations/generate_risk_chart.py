import matplotlib.pyplot as plt
import json

# Încarcă datele
data = json.load(open('binance-status.json'))

# Extrage simbolurile și riscurile
symbols = [p['symbol'] for p in data['positions']]
risks = [p['risk']*100 for p in data['positions']]

# Creează graficul
plt.figure(figsize=(10, 6))
bars = plt.bar(symbols, risks, color=['red' if r > 30 else 'orange' if r > 20 else 'green' for r in risks])
plt.title('Riscuri de Lichidare (Binance Futures)')
plt.ylabel('Risc (%)')
plt.ylim(0, 50)

# Adaugă etichete pe bare
for bar, risk in zip(bars, risks):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height(), f'{risk:.1f}%', ha='center', va='bottom')

# Salvează graficul
plt.savefig('risk_chart.png')
print('Grafic salvat ca risk_chart.png')