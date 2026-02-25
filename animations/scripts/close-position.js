const Binance = require('node-binance-api');
const dotenv = require('dotenv');
dotenv.config();

// Config
const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;
const baseURL = 'https://fapi.binance.com';

// Initialize client
const client = new Binance().options({
  APIKEY: apiKey,
  APISECRET: apiSecret,
  futures: true,
});

// Main function
async function closePosition(symbol) {
  try {
    console.log(`[${new Date().toISOString()}] Încerc închiderea poziției ${symbol}...`);

    // Get current position
    const positions = await client.futuresPositionRisk();
    const targetPosition = positions.find(p => p.symbol === symbol);

    if (!targetPosition) {
      console.log(`❌ Poziție ${symbol} nu găsită.`);
      return;
    }

    const amount = parseFloat(targetPosition.positionAmt);
    const side = amount > 0 ? 'SELL' : 'BUY';

    console.log(`Poziție găsită: ${symbol} | Cantitate: ${amount} | Side: ${side}`);

    // Place market order to close
    const order = await client.futuresMarketBuy(symbol, Math.abs(amount).toFixed(3));
    console.log(`Ordin trimis: ${side} ${Math.abs(amount).toFixed(3)} ${symbol}`);

    console.log(`✅ Ordine închisă cu succes:`);
    console.log(order);

    // Verify
    const updatedPosition = await client.getPositionRisk();
    const newPosition = updatedPosition.find(p => p.symbol === symbol);
    console.log(`Poziție actualizată: ${symbol} | Cantitate: ${newPosition.positionAmt}`);

  } catch (error) {
    console.error(`❌ Eroare la închiderea poziției ${symbol}:`, error.message);
    console.error(error.stack);
  }
}

// Run
const symbol = process.argv[2];
if (!symbol) {
  console.error('❌ Simbol lipsă. Folosire: node close-position.js BTCUSDT');
  process.exit(1);
}

closePosition(symbol);