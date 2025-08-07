import fetch from 'node-fetch';


const currencyApis = [
  {
    name: 'exchangerate.host',
    url: (currency) => `https://api.exchangerate.host/latest?base=${currency}`,
    parse: data => data.rates
  },
  {
    name: 'frankfurter.app',
    url: (currency) => `https://api.frankfurter.app/latest?from=${currency}`,
    parse: data => data.rates
  },
  {
    name: 'coingecko',
    url: (currency) => {
      // Accepts BTC, ETH, etc. Returns USD, EUR, RON by default
      const ids = {
        BTC: 'bitcoin',
        ETH: 'ethereum',
        SOL: 'solana',
        LTC: 'litecoin',
        DOGE: 'dogecoin',
        XRP: 'ripple',
        BNB: 'binancecoin',
        ADA: 'cardano',
        DOT: 'polkadot',
        AVAX: 'avalanche-2',
        USDT: 'tether',
        USDC: 'usd-coin',
        DAI: 'dai',
        // add more as needed
      };
      const id = ids[currency.toUpperCase()] || currency.toLowerCase();
      return `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd,eur,ron`;
    },
    parse: (data, currency) => {
      // Try to find the right key
      const ids = {
        BTC: 'bitcoin',
        ETH: 'ethereum',
        SOL: 'solana',
        LTC: 'litecoin',
        DOGE: 'dogecoin',
        XRP: 'ripple',
        BNB: 'binancecoin',
        ADA: 'cardano',
        DOT: 'polkadot',
        AVAX: 'avalanche-2',
        USDT: 'tether',
        USDC: 'usd-coin',
        DAI: 'dai',
      };
      const id = ids[currency.toUpperCase()] || currency.toLowerCase();
      if (!data[id]) return null;
      // Return all available vs_currencies for this coin
      return Object.fromEntries(Object.entries(data[id]).map(([k, v]) => [`${currency.toUpperCase()}/${k.toUpperCase()}`, v]));
    }
  }
];

export async function fetchCurrency(currency, apiNameOrIdx = 0) {
  try {
    let api;
    if (typeof apiNameOrIdx === 'string') {
      api = currencyApis.find(a => a.name === apiNameOrIdx) || currencyApis[0];
    } else {
      api = currencyApis[apiNameOrIdx] || currencyApis[0];
    }
    const url = api.url(currency);
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const rates = api.parse(data, currency);
    if (!rates || typeof rates !== 'object' || Object.keys(rates).length === 0) {
      return { error: 'No rates found or invalid response from API.' };
    }
    return { rates, api: api.name };
  } catch (err) {
    return { error: 'Failed to fetch currency rates: ' + err.message };
  }
}
