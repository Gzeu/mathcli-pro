#!/usr/bin/env node
// Script pentru alertă de lichidare Binance Futures (ES Modules)
// Citește binance-status.json și trimite alerte în Telegram dacă riscul depășește un prag.

import fs from 'fs';
import axios from 'axios';

// Configurare
const RISK_THRESHOLD = 0.1; // Prag de risc (10% distanță față de lichidare)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Limite API
const MAX_ALERTS_PER_HOUR = 5;
const ALERT_COOLDOWN_MINUTES = 10;
const MIN_RISK_CHANGE_FOR_ALERT = 0.02; // 2% schimbare în risc pentru a trimite alertă

// Limite API Mistral (40 request-uri/minut)
const MAX_API_REQUESTS_PER_MINUTE = 30; // Rămânem sub limita de 40
const API_REQUEST_COOLDOWN_MS = 2000; // 2 secunde între cereri
const CACHE_EXPIRY_MINUTES = 5; // Cache-ul expiră după 5 minute

// Cache pentru rezultate API (symbol: { data, timestamp })
let apiCache = {};

// Încarcă cache-ul existent (dacă există)
function loadApiCache() {
    try {
        if (fs.existsSync('api-cache.json')) {
            const data = fs.readFileSync('api-cache.json', 'utf8');
            apiCache = JSON.parse(data);
        }
    } catch (error) {
        console.error("Eroare la încărcarea cache-ului API:", error.message);
    }
}

// Salvează cache-ul pentru următoarea rulare
function saveApiCache() {
    try {
        fs.writeFileSync('api-cache.json', JSON.stringify(apiCache, null, 2));
    } catch (error) {
        console.error("Eroare la salvarea cache-ului API:", error.message);
    }
}

// Verifică dacă cache-ul este valid (nu a expirat)
function isCacheValid(symbol) {
    if (!apiCache[symbol]) return false;
    const cacheTime = new Date(apiCache[symbol].timestamp).getTime();
    const now = Date.now();
    const minutesSinceCache = (now - cacheTime) / (1000 * 60);
    return minutesSinceCache < CACHE_EXPIRY_MINUTES;
}

// Obține date din cache sau face un nou apel API
async function getWithCache(symbol, fetchFunction) {
    loadApiCache();
    if (isCacheValid(symbol)) {
        console.log(`Folosesc cache pentru ${symbol}.`);
        return apiCache[symbol].data;
    }
    
    console.log(`Apel API pentru ${symbol}...`);
    const data = await fetchFunction();
    apiCache[symbol] = {
        data: data,
        timestamp: new Date().toISOString()
    };
    saveApiCache();
    return data;
}

// Funcție pentru a limita rate-ul de cereri API
async function rateLimitedApiCall(apiFunction) {
    const startTime = Date.now();
    const result = await apiFunction();
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, API_REQUEST_COOLDOWN_MS - elapsedTime);
    
    if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
    }
    
    return result;
}

// Cache pentru ultimile alerte trimise (symbol: { lastAlertTime, lastRisk })
let alertCache = {};

// Încarcă cache-ul existent (dacă există)
function loadAlertCache() {
    try {
        if (fs.existsSync('alert-cache.json')) {
            const data = fs.readFileSync('alert-cache.json', 'utf8');
            alertCache = JSON.parse(data);
        }
    } catch (error) {
        console.error("Eroare la încărcarea cache-ului de alerte:", error.message);
    }
}

// Salvează cache-ul pentru următoarea rulare
function saveAlertCache() {
    try {
        fs.writeFileSync('alert-cache.json', JSON.stringify(alertCache, null, 2));
    } catch (error) {
        console.error("Eroare la salvarea cache-ului de alerte:", error.message);
    }
}

// Verifică dacă poate trimite o alertă pentru un simbol
function canSendAlert(symbol) {
    const now = Date.now();
    const lastAlert = alertCache[symbol];
    
    // Dacă nu a trimis niciodată pentru acest simbol, poate trimite
    if (!lastAlert) return true;
    
    // Verifică cooldown-ul
    const lastAlertTime = new Date(lastAlert.lastAlertTime).getTime();
    const minutesSinceLastAlert = (now - lastAlertTime) / (1000 * 60);
    
    if (minutesSinceLastAlert < ALERT_COOLDOWN_MINUTES) {
        console.log(`Cooldown activ pentru ${symbol}. Mai așteaptă ${(ALERT_COOLDOWN_MINUTES - minutesSinceLastAlert).toFixed(1)} minute.`);
        return false;
    }
    
    return true;
}

// Actualizează cache-ul după trimiterea unei alerte
function updateAlertCache(symbol, risk) {
    alertCache[symbol] = {
        lastAlertTime: new Date().toISOString(),
        lastRisk: risk
    };
    saveAlertCache();
}

// Funcție pentru trimiterea alertelor în Telegram (cu retry și backoff)
async function sendTelegramAlert(message) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error("Token-ul botului Telegram sau Chat ID nu sunt setate.");
        return;
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const params = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
    };

    let retries = 3;
    let delay = 1000; // 1 secundă
    
    while (retries > 0) {
        try {
            await axios.post(url, params);
            console.log("Alertă trimisă în Telegram.");
            return;
        } catch (error) {
            retries--;
            if (retries === 0) {
                console.error("Eroare la trimiterea alertelor în Telegram (ultima încercare):", error.message);
                return;
            }
            console.log(`Reîncercare în ${delay / 1000} secunde... (mai sunt ${retries} încercări)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Backoff exponențial
        }
    }
}

// --- NOI FUNCȚII PENTRU ALERTE AVANSATE ---

// Funcție pentru detectarea pozițiilor NOI (compară cu starea anterioară)
function detectNewPositions(currentPositions, lastKnownPositions = []) {
    return currentPositions.filter(current => {
        return !lastKnownPositions.some(last => last.symbol === current.symbol && last.side === current.side);
    });
}

// Funcție pentru salvarea stării curente (pentru comparare viitoare)
function saveCurrentState(positions) {
    try {
        fs.writeFileSync('last-known-positions.json', JSON.stringify(positions, null, 2));
        console.log("Starea curentă salvată pentru comparare viitoare.");
    } catch (error) {
        console.error("Eroare la salvarea stării:", error.message);
    }
}

// Funcție pentru încărcarea stării anterioare
function loadLastKnownState() {
    try {
        if (fs.existsSync('last-known-positions.json')) {
            const data = fs.readFileSync('last-known-positions.json', 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Eroare la încărcarea stării anterioare:", error.message);
    }
    return []; // Returnează array gol dacă nu există fișier
}

// --- LOGICA ALERTĂRILOR ÎMBUNĂTĂȚITĂ ---
async function checkAndAlert(positions) {
    loadAlertCache(); // Încarcă cache-ul de alerte
    const lastKnownPositions = loadLastKnownState();
    const newPositions = detectNewPositions(positions, lastKnownPositions);
    
    // 1. Alertă pentru POZIȚII NOI
    for (const pos of newPositions) {
        if (canSendAlert(pos.symbol)) {
            const message = `🔍 *NOUĂ POZIȚIE DESCHISĂ*
` +
                           `📊 *Simbol:* ${pos.symbol}
` +
                           `📈 *Tip:* ${pos.side}
` +
                           `💰 *Leverage:* ${pos.leverage}x
` +
                           `📉 *Preț lichidare:* ${pos.liquidation_price.toFixed(2)}
` +
                           `⚠️ *Risc inițial:* ${(pos.risk * 100).toFixed(2)}%`;
            await sendTelegramAlert(message);
            updateAlertCache(pos.symbol, pos.risk);
        }
    }
    
    // 2. Alertă pentru RISC CRITIC (sub 10% distanță față de lichidare)
    const highRiskPositions = positions.filter(pos => pos.risk <= RISK_THRESHOLD);
    for (const pos of highRiskPositions) {
        const lastAlert = alertCache[pos.symbol];
        const riskChangedSignificantly = !lastAlert || Math.abs(pos.risk - lastAlert.lastRisk) >= MIN_RISK_CHANGE_FOR_ALERT;
        
        if (canSendAlert(pos.symbol) && riskChangedSignificantly) {
            const message = `🚨 *ALERTĂ RISC ÎNALT*
` +
                           `📊 *Simbol:* ${pos.symbol}
` +
                           `💥 *Risc:* ${(pos.risk * 100).toFixed(2)}% (sub ${RISK_THRESHOLD * 100}%)
` +
                           `💰 *Preț curent:* ${pos.current_price.toFixed(2)}
` +
                           `🛑 *Preț lichidare:* ${pos.liquidation_price.toFixed(2)}
` +
                           `🔴 *Acțiune:* Monitorizează sau închide poziția!`;
            await sendTelegramAlert(message);
            updateAlertCache(pos.symbol, pos.risk);
        }
    }
    
    // Salvează starea curentă pentru următoarea rulare
    saveCurrentState(positions);
}

// Funcție pentru citirea și procesarea datelor din binance-status.json
async function processBinanceStatus() {
    try {
        const data = fs.readFileSync('E:\\github\\mathcli-pro\\animations\\binance-status.json', 'utf8');
        const binanceData = JSON.parse(data);

        if (!binanceData.positions || binanceData.positions.length === 0) {
            console.log("Nu există poziții deschise.");
            return;
        }

        console.log(`Poziții detectate: ${binanceData.positions.length}`);
        await checkAndAlert(binanceData.positions);
    } catch (error) {
        console.error("Eroare la procesarea datelor:", error.message);
    }
}

// Funcție pentru a obține prețul curent al unui simbol (cu cache și rate limiting)
async function getCurrentPrice(symbol) {
    const fetchPrice = async () => {
        try {
            const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
            return parseFloat(response.data.price);
        } catch (error) {
            console.error(`Eroare la obținerea prețului pentru ${symbol}:`, error.message);
            return null;
        }
    };
    
    return rateLimitedApiCall(async () => {
        return getWithCache(symbol, fetchPrice);
    });
}

// Funcție principală
async function main() {
    console.log("Verificare risc de lichidare...");
    await processBinanceStatus();
}

main();