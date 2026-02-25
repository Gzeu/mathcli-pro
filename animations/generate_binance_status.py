#!/usr/bin/env python3
# Script pentru generarea fișierului binance-status.json
# Folosește API-ul Binance Futures pentru a obține pozițiile și a calcula riscurile de lichidare.

import os
import json
import hmac
import hashlib
import time
import requests
from urllib.parse import urlencode

# Citim API Key și Secret Key din variabile de mediu
BINANCE_API_KEY = os.getenv('BINANCE_API_KEY')
BINANCE_SECRET_KEY = os.getenv('BINANCE_SECRET_KEY')

if not BINANCE_API_KEY or not BINANCE_SECRET_KEY:
    raise ValueError("API Key și Secret Key pentru Binance nu sunt setate în variabilele de mediu.")

# URL-uri API Binance
BASE_URL = "https://fapi.binance.com"
ENDPOINT_POSITIONS = "/fapi/v2/positionRisk"
ENDPOINT_ACCOUNT = "/fapi/v2/account"

# Funcție pentru semnarea request-urilor
def sign_request(params):
    query_string = urlencode(params)
    signature = hmac.new(
        BINANCE_SECRET_KEY.encode('utf-8'),
        query_string.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    return f"{query_string}&signature={signature}"

# Funcție pentru obținerea pozițiilor
def get_positions():
    params = {
        'timestamp': int(time.time() * 1000),
        'recvWindow': 5000
    }
    signed_params = sign_request(params)
    url = f"{BASE_URL}{ENDPOINT_POSITIONS}?{signed_params}"
    headers = {
        'X-MBX-APIKEY': BINANCE_API_KEY
    }
    response = requests.get(url, headers=headers)
    return response.json()

# Funcție pentru obținerea prețurilor curente
def get_current_prices(symbols):
    prices = {}
    for symbol in symbols:
        endpoint = f"/fapi/v1/ticker/price?symbol={symbol}"
        url = f"{BASE_URL}{endpoint}"
        response = requests.get(url)
        data = response.json()
        prices[symbol] = float(data['price'])
    return prices

# Funcție pentru calcularea riscurilor
def calculate_risk(positions, prices):
    results = []
    for pos in positions:
        symbol = pos['symbol']
        if symbol not in prices:
            continue

        current_price = prices[symbol]
        entry_price = float(pos['entryPrice'])
        quantity = float(pos['positionAmt'])
        leverage = int(pos['leverage'])
        side = pos['positionSide']  # 'LONG' sau 'SHORT'

        # Calculăm prețul de lichidare
        if side == 'LONG':
            liquidation_price = entry_price * (1 - 1 / leverage)
        else:  # SHORT
            liquidation_price = entry_price * (1 + 1 / leverage)

        # Calculăm riscul (distanță față de prețul de lichidare)
        if side == 'LONG':
            risk = (current_price - liquidation_price) / liquidation_price
        else:  # SHORT
            risk = (liquidation_price - current_price) / liquidation_price

        results.append({
            'symbol': symbol,
            'side': side,
            'entry_price': entry_price,
            'current_price': current_price,
            'quantity': quantity,
            'leverage': leverage,
            'liquidation_price': liquidation_price,
            'risk': risk
        })

    return results

# Funcție principală
def main():
    try:
        # Obținem pozițiile
        positions = get_positions()
        symbols = [pos['symbol'] for pos in positions if float(pos['positionAmt']) != 0]

        if not symbols:
            print("Nu există poziții deschise.")
            return

        # Obținem prețurile curente
        prices = get_current_prices(symbols)

        # Calculăm riscurile
        results = calculate_risk(positions, prices)

        # Salvăm rezultatele în binance-status.json
        with open('binance-status.json', 'w') as f:
            json.dump({'positions': results}, f, indent=2)

        print("Fișierul binance-status.json a fost generat cu succes.")

    except Exception as e:
        print(f"Eroare: {e}")

if __name__ == "__main__":
    main()