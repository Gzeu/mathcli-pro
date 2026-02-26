// Forțează reîncărcarea modului
delete require.cache[require.resolve('./binance-api.cjs')];
const binanceAPI = require('./binance-api.cjs');
const config = require('./config.json');
const fs = require('fs');
const axios = require('axios');

// MOD PROD: Use env vars and respect dryRun
config.dryRun = process.env.DRY_RUN === 'true' || false;
config.telegramToken = process.env.TELEGRAM_TOKEN;
config.telegramChatId = process.env.CHAT_ID;

console.log("[DEBUG] TELEGRAM_TOKEN:", config.telegramToken ? "*** (setat)" : "N/A");
console.log("[DEBUG] CHAT_ID:", config.telegramChatId || "N/A");

const LOG_FILE = 'binance-alerts.log';

let logStream = null;
if (!config.telegramToken || !config.telegramChatId) {
  console.error("⚠️ Telegram config missing. Fallback: Logging alerts to binance-alerts.log");
  logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });
  logStream.write(`\n=== ALERT CRITICĂ ${new Date().toISOString()} ===\n`);
}

// Canale suportate pentru alerte (doar Telegram, WhatsApp a fost eliminat din cauza erorilor cron)
const channels = ['telegram'];

console.log("[CONFIG] dryRun:", config.dryRun);
console.log("[CONFIG] telegramToken exists:", !!config.telegramToken);

async function checkLiquidationRisk() {
  try {
    console.log(`[${new Date().toISOString()}] Verificare risc lichidare...`);
    const positions = await binanceAPI.getOpenPositions();

    if (!positions.length) {
      console.log(`✅ Niciuna poziție deschisă. (Last check: ${new Date().toISOString()})`);
      process.exit(0);
      return;
    }

    console.log(`Found ${positions.length} open position(s)`);

    for (const pos of positions) {
      const liquidationPrice = parseFloat(pos.liquidationPrice);
      const markPrice = parseFloat(pos.markPrice);
      const entryPrice = parseFloat(pos.entryPrice);

      // Ignoră pozițiile cu date invalide
      if (!liquidationPrice || liquidationPrice <= 0 || isNaN(liquidationPrice)) {
        continue;
      }

      // Calcul corect al riscului în funcție de side
      let riskPct;
      let effectiveSide = pos.positionSide;

      if (effectiveSide === 'BOTH') {
        // Hedge mode: determinăm side-ul real din positionAmt
        const amt = parseFloat(pos.positionAmt);
        if (amt > 0) {
          effectiveSide = 'LONG';
        } else if (amt < 0) {
          effectiveSide = 'SHORT';
        } else {
          console.log(`⚠️ Poziție BOTH fără valoare (${pos.symbol}). Ignor.`);
          continue;
        }
      }

      if (effectiveSide === 'LONG') {
        riskPct = ((markPrice - liquidationPrice) / (entryPrice - liquidationPrice)) * 100;
      } else if (effectiveSide === 'SHORT') {
        riskPct = ((liquidationPrice - markPrice) / (liquidationPrice - entryPrice)) * 100;
      } else {
        console.log(`⚠️ Poziție invalidă (${pos.positionSide}) pentru ${pos.symbol}. Ignor.`);
        continue;
      }

      // Validare rezultate
      if (isNaN(riskPct) || !isFinite(riskPct) || riskPct < 0) {
        riskPct = 0;
        console.log(`⚠️ Calcul risc invalid pentru ${pos.symbol}. Setat la 0%.`);
      }

      const logMsg = `[${new Date().toISOString()}] ${pos.symbol} | Side: ${effectiveSide} | Entry: ${entryPrice} | Mark: ${markPrice} | Liquidity: ${liquidationPrice} | Risk: ${riskPct.toFixed(2)}%`;
      fs.appendFileSync(LOG_FILE, logMsg + '\n');
      console.log(logMsg);

      // ALERTĂ DOAR DACĂ RISCUL DEPĂȘEȘTE PRAGUL
      if (riskPct > config.liquidationThreshold) {
        const alertMsg = `🚨 ALERTĂ LICHIDARE: ${pos.symbol} | Side: ${effectiveSide} | Risc: ${riskPct.toFixed(2)}% | Entry: ${entryPrice} | Lichidare: ${liquidationPrice}`;
        fs.appendFileSync(LOG_FILE, `ALERT: ${alertMsg}\n`);
        if (logStream) logStream.write(`ALERT: ${alertMsg}\n`);
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

// Rulează o singură dată (cron-ul va relua scriptul la fiecare 5 minute)
console.log("=== Pornire Monitor Lichidare (Single Run) ===");
checkLiquidationRisk();
