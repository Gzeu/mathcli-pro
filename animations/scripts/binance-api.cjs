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
    const queryString = new URLSearchParams({
      timestamp: Date.now(),
      recvWindow: 5000,
    }).toString();
    const signature = this._generateSignature(queryString);
    const url = `${this.baseUrl}/fapi/v2/positionRisk?${queryString}&signature=${signature}`;
    const response = await axios.get(url, {
      headers: { 'X-MBX-APIKEY': this.apiKey },
    });
    return response.data.filter(pos => parseFloat(pos.positionAmt) !== 0);
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

module.exports = new BinanceAPI();