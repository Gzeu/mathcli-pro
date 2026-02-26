"use strict;"

const axios = require('axios');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

class BinanceAPI {
  constructor() {
    this.baseUrl = 'https://fapi.binance.com';
    this.apiKey = process.env.BINANCE_API_KEY;
    this.secretKey = process.env.BINANCE_SECRET_KEY;
  }

  /**
   * Generează semnătura pentru autentificare
   */
  _generateSignature(queryString) {
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(queryString)
      .digest('hex');
  }

  /**
   * Executa un request autentificat
   */
  async _authRequest(endpoint, method = 'GET', params = {}) {
    const queryString = new URLSearchParams({
      ...params,
      timestamp: Date.now(), // Timestamp actual
      recvWindow: 5000,      // Fereastră de validare (ms)
    }).toString();

    const signature = this._generateSignature(queryString);
    const url = `${this.baseUrl}${endpoint}?${queryString}&signature=${signature}`;

    const headers = {
      'X-MBX-APIKEY': this.apiKey,
    };

    try {
      console.log(`[DEBUG] Request URL: ${url}`);
      console.log(`[DEBUG] Headers: ${JSON.stringify(headers)}`);
      
      const response = await axios({
        method,
        url,
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('[DEBUG] Binance API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }

  /**
   * Obține poziția curentă pentru un simbol
   */
  async getOpenPositions() {
    try {
      const queryString = new URLSearchParams({
        timestamp: Date.now(),
        recvWindow: 5000,
      }).toString();
      const signature = this._generateSignature(queryString);
      const url = `${this.baseUrl}/fapi/v2/positionRisk?${queryString}&signature=${signature}`;
      console.log(`[DEBUG] Fetching positions from: ${url}`);
      const response = await axios.get(url, {
        headers: { 'X-MBX-APIKEY': this.apiKey },
      });
      console.log(`[DEBUG] Raw positions response:`, response.data);
      const openPositions = response.data.filter(pos => parseFloat(pos.positionAmt) !== 0);
      console.log(`[DEBUG] Filtered open positions:`, openPositions);
      return openPositions;
    } catch (error) {
      console.error('[ERROR] Failed to fetch positions:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }

  async ping() {
    try {
      const response = await axios.get(`${this.baseUrl}/fapi/v1/ping`);
      console.log('[DEBUG] Ping successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('[ERROR] Ping failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }

  async getPosition(symbol) {
    return this._authRequest('/fapi/v2/positionRisk', 'GET', { symbol });
  }

  /**
   * Obține prețul curent pentru un simbol
   */
  async getTicker(symbol) {
    const response = await axios.get(
      `${this.baseUrl}/fapi/v1/ticker/price?symbol=${symbol}`
    );
    return response.data;
  }

  /**
   * Schimbă leverage-ul pentru un simbol
   */
  async changeLeverage(symbol, leverage) {
    return this._authRequest('/fapi/v1/leverage', 'POST', {
      symbol,
      leverage,
    });
  }
}

// CLI Handler
const args = process.argv.slice(2);
if (args.includes('--ping')) {
  (async () => {
    try {
      const api = new BinanceAPI();
      await api.ping();
    } catch (error) {
      console.error('[CLI ERROR] Ping failed. Check API keys and permissions.');
      process.exit(1);
    }
  })();
} else if (args.includes('--positions')) {
  (async () => {
    try {
      const api = new BinanceAPI();
      const positions = await api.getOpenPositions();
      console.log('Open Positions:', positions.length > 0 ? positions : 'None');
    } catch (error) {
      console.error('[CLI ERROR] Failed to fetch positions. Check API keys and permissions.');
      process.exit(1);
    }
  })();
}

module.exports = new BinanceAPI();