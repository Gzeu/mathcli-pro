// Forțează reîncărcarea modului
delete require.cache[require.resolve('./binance-api.cjs')];
const binanceAPI = require('./binance-api.cjs');
const config = require('./config.json');
const fs = require('fs');
const axios = require('axios');

const LOG_FILE = 'binance-alerts.log';

async function checkLiquidationRisk() {
  try {
    console.log(`[${new Date().toISOString()}] Verificare risc lichidare...`);
    const positions = await binanceAPI.getOpenPositions();
    
    if (!positions.length) {
      console.log("Nu există poziții deschise.");
      return;
    }
    
    for (const pos of positions) {
      const riskPct = ((pos.entryPrice - pos.liquidationPrice) / pos.entryPrice) * 100;
      const logMsg = `[${new Date().toISOString()}] ${pos.symbol}: Entry ${pos.entryPrice} | Liquidation ${pos.liquidationPrice} | Risk ${riskPct.toFixed(2)}%`;
      fs.appendFileSync(LOG_FILE, logMsg + '\n');
      console.log(logMsg);
      
      if (riskPct > config.liquidationThreshold) {
        const alertMsg = `⚠️ ALERTĂ LICHIDARE: ${pos.symbol} | Risc: ${riskPct.toFixed(2)}% | Entry: ${pos.entryPrice} | Liquidation: ${pos.liquidationPrice}`;
        await sendTelegramAlert(alertMsg);
      }
    }
  } catch (err) {
    const errorMsg = `[${new Date().toISOString()}] [EROARE] ${err.message}\n`;
    fs.appendFileSync(LOG_FILE, errorMsg);
    console.error(errorMsg);
  }
}

async function sendTelegramAlert(message) {
  if (config.dryRun) {
    console.log("[DRY RUN] Telegram Alert:", message);
    return;
  }
  try {
    await axios.post(`https://api.telegram.org/bot${config.telegramToken}/sendMessage`, {
      chat_id: config.telegramChatId,
      text: message
    });
    console.log("Alertă Telegram trimisă.");
  } catch (err) {
    console.error("Eroare trimitere Telegram:", err.message);
  }
}

// Rulează imediat și apoi la fiecare 5 minute
console.log("=== Pornire Monitor Lichidare ===");
checkLiquidationRisk();
setInterval(checkLiquidationRisk, 5 * 60 * 1000);