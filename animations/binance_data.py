import json
from binance.client import Client

def fetch_binance_data(api_key, api_secret):
    client = Client(api_key, api_secret)

    # Get account info
    account = client.futures_account()
    balances = [
        {"asset": b["asset"], "usd_value": float(b["balance"]) * float(b.get("usdValue", 0))}
        for b in account["assets"]
        if float(b["balance"]) > 0
    ]

    # Get open positions
    positions = []
    for pos in account["positions"]:
        if float(pos["positionAmt"]) != 0:
            symbol = pos["symbol"]
            leverage = float(pos["leverage"])
            liquidation_price = float(pos["liquidationPrice"])
            current_price = float(client.futures_symbol_ticker(symbol=symbol)["price"])
            positions.append({
                "symbol": symbol,
                "leverage": leverage,
                "liquidation_price": liquidation_price,
                "current_price": current_price
            })

    # Save to JSON
    with open("binance-status.json", "w") as f:
        json.dump({"balances": balances, "positions": positions}, f, indent=2)

# Example usage (replace with your keys)
if __name__ == "__main__":
    fetch_binance_data("YOUR_API_KEY", "YOUR_API_SECRET")