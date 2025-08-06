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
  }
];

export async function fetchCurrency(currency, apiIdx = 0) {
  try {
    const api = currencyApis[apiIdx] || currencyApis[0];
    const url = api.url(currency);
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const rates = api.parse(data);
    if (!rates || typeof rates !== 'object' || Object.keys(rates).length === 0) {
      return { error: 'No rates found or invalid response from API.' };
    }
    return { rates, api: api.name };
  } catch (err) {
    return { error: 'Failed to fetch currency rates: ' + err.message };
  }
}
