"use strict;"

const Binance = require('./binance-api.cjs');
const config = require('./config.json');
// Simulare notificări în consola
const sendTelegramAlert = async (message) => {
  console.log(`[TELEGRAM ALERT] ${message}`);
};

async function adjustLeverage(symbol, dryRun = true) {
  try {
    // Obține poziția curentă
    const positionData = await Binance.getPosition(symbol);
    const position = positionData.find(p => p.symbol === symbol);

    if (!position) {
      console.log(`⚠️ Nu există poziție deschisă pentru ${symbol}`);
      return;
    }

    const currentLeverage = parseFloat(position.leverage);
    const liquidationPrice = parseFloat(position.liquidationPrice);
    const entryPrice = parseFloat(position.entryPrice);

    // Obține prețul curent
    const ticker = await Binance.getTicker(symbol);
    const currentPrice = parseFloat(ticker.price);

    // Calculează distanța până la lichidare (în %)
    const distanceToLiquidation = Math.abs((currentPrice - liquidationPrice) / currentPrice);
    const isLong = position.positionAmt > 0;

    console.log(`
[${symbol}]`);
    console.log(`- Leverage: ${currentLeverage}×`);
    console.log(`- Preț curent: ${currentPrice}`);
    console.log(`- Preț lichidare: ${liquidationPrice}`);
    console.log(`- Distanță până la lichidare: ${(distanceToLiquidation * 100).toFixed(2)}%`);

    // Verifică dacă este necesară ajustarea
    if (distanceToLiquidation < config.liquidationThreshold && currentLeverage > config.maxLeverage) {
      const newLeverage = config.maxLeverage;

      // Mesaj pentru Telegram
      const alertMessage = `
⚠️ Ajustare leverage pentru ${symbol}:
` +
        `- Leverage actual: ${currentLeverage}×
` +
        `- Leverage țintă: ${newLeverage}×
` +
        `- Distanță până la lichidare: ${(distanceToLiquidation * 100).toFixed(2)}%
` +
        `- Preț curent: ${currentPrice}
` +
        `- Preț lichidare: ${liquidationPrice}
` +
        `- Mod: ${dryRun ? 'DRY-RUN (simulare)' : 'LIVE'}`;

      console.log(alertMessage);

      // Trimite alertă în Telegram
      if (sendTelegramAlert) {
        await sendTelegramAlert(alertMessage);
      }

      // Ajustează leverage-ul (doar dacă nu este dry-run)
      if (!dryRun) {
        await Binance.changeLeverage(symbol, newLeverage);
        const successMessage = `✅ Leverage ajustat la ${newLeverage}× pentru ${symbol}`;
        console.log(successMessage);
        if (sendTelegramAlert) {
          await sendTelegramAlert(successMessage);
        }
      } else {
        console.log('🔄 Dry-run: Nicio modificare reală nu a fost făcută.');
      }
    } else {
      console.log('✅ Nicio ajustare necesară.');
    }
  } catch (error) {
    console.error(`Eroare la ajustarea leverage-ului pentru ${symbol}:`, error.message);
    if (sendTelegramAlert) {
      await sendTelegramAlert(`❌ Eroare la ajustarea leverage-ului pentru ${symbol}: ${error.message}`);
    }
  }
}

// Exemplu de apel
const symbol = 'BTCUSDT';
const dryRun = true; // Schimbă în false pentru modul live
adjustLeverage(symbol, dryRun);