// Forțează reîncărcarea modului
delete require.cache[require.resolve('./binance-api.cjs')];
const binanceAPI = require('./binance-api.cjs');
const config = require('./config.json');
const fs = require('fs'); // Adăugat aici pentru a fi disponibil global

// MOD PROD: Use env vars and respect dryRun
config.dryRun = process.env.DRY_RUN === 'true' || false;
config.telegramToken = process.env.TELEGRAM_BOT_TOKEN;
config.telegramChatId = process.env.TELEGRAM_CHAT_ID;

const LOG_FILE = 'binance-alerts.log'; // Definit aici pentru a fi disponibil global

let logStream = null;
if (!config.telegramToken || !config.telegramChatId) {
  console.error("⚠️ Telegram config missing. Fallback: Logging alerts to binance-alerts.log");
  logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });
  logStream.write(`\n=== ALERT CRITICĂ ${new Date().toISOString()} ===\n`);
}

console.log("[CONFIG] dryRun:", config.dryRun);
console.log("[CONFIG] telegramToken exists:", !!config.telegramToken);
const axios = require('axios');

async function checkLiquidationRisk() {
  try {
    console.log(`[${new Date().toISOString()}] Verificare risc lichidare...`);
    const positions = await binanceAPI.getOpenPositions();
    
    // TEST MODE: Simulează o poziție critică
    // MOD PROD: Use real data only
if (!positions.length) {
  console.log(`✅ Niciuna poziție deschisă. (Last check: ${new Date().toISOString()})`);
  return;
}
    
    console.log(`TEST: Found ${positions.length} positions`);
    for (const pos of positions) {
      const liquidationPrice = parseFloat(pos.liquidationPrice);
      const markPrice = parseFloat(pos.markPrice);
      const entryPrice = parseFloat(pos.entryPrice);

      // Ignoră pozițiile cu date invalide (fără spam în loguri)
      if (!liquidationPrice || liquidationPrice <= 0 || isNaN(liquidationPrice)) {
        continue; // Sari peste fără a loga (evită spam-ul)
      }

      // FORCE HIGH RISK FOR TESTING
      let riskPct = 15;
      // Calcul uniform al riscului (indiferent de side)
      riskPct = Math.abs(((markPrice - entryPrice) / (entryPrice - liquidationPrice)) * 100);
      if (isNaN(riskPct) || !isFinite(riskPct)) {
        riskPct = 0; // Resetare dacă calculul eșuează
      }
      if (riskPct < 0) riskPct = 0;

      const logMsg = `[${new Date().toISOString()}] ${pos.symbol} | Side: ${pos.positionSide} | Entry: ${entryPrice} | Mark: ${markPrice} | Liquidity: ${liquidationPrice} | Risk: ${riskPct.toFixed(2)}%`;
      fs.appendFileSync(LOG_FILE, logMsg + '\n');
      console.log(logMsg);
      
      // ALERTĂ DOAR DACĂ RISCUL DEPĂȘEȘTE PRAGUL
      console.log(`TEST: riskPct=${riskPct}, threshold=${config.liquidationThreshold}, token=${!!config.telegramToken}`);
      if (riskPct > config.liquidationThreshold) {
        const alertMsg = `🚨 ALERTĂ LICHIDARE: ${pos.symbol} | Side: ${pos.positionSide} | Risc: ${riskPct.toFixed(2)}% | Entry: ${entryPrice} | Lichidare: ${liquidationPrice}`;
        fs.appendFileSync(LOG_FILE, `ALERT: ${alertMsg}\n`);
        if (logStream) logStream.write(`ALERT: ${alertMsg}\n`);
        else console.log("⚠️ logStream indisponibil, scriu doar în fișier");
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
