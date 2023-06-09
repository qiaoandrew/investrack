export const SUMMARY_FIELDS = {
  'Previous Close': [{ key: 'previousClose', type: 'number' }],
  Open: [{ key: 'open', type: 'number' }],
  Bid: [
    { key: 'bid', type: 'number' },
    ' x ',
    { key: 'bidSize', type: 'number' },
  ],
  Ask: [
    { key: 'ask', type: 'number' },
    ' x ',
    { key: 'askSize', type: 'number' },
  ],
  "Day's Range": [
    { key: 'dayLow', type: 'number' },
    ' - ',
    { key: 'dayHigh', type: 'number' },
  ],
  '52 Week Range': [
    { key: 'fiftyTwoWeekLow', type: 'number' },
    ' - ',
    { key: 'fiftyTwoWeekHigh', type: 'number' },
  ],
  Volume: [{ key: 'volume', type: 'number' }],
  'Avg. Volume': [{ key: 'averageVolume', type: 'number' }],
  'Market Cap': [{ key: 'marketCap', type: 'number' }],
  Beta: [{ key: 'beta', type: 'number' }],
  'Forward PE Ratio': [{ key: 'forwardPE', type: 'number' }],
  'Trailing PE Ratio': [{ key: 'trailingPE', type: 'number' }],
  'Forward EPS': [{ key: 'forwardEps', type: 'number' }],
  'Trailing EPS': [{ key: 'trailingEps', type: 'number' }],
  'Dividend & Yield': [
    { key: 'dividendRate', type: 'number' },
    ' (',
    { key: 'dividendYield', type: 'number' },
    '%)',
  ],
  'Price to Book Ratio': [{ key: 'priceToBook', type: 'number' }],
  'Shares Outstanding': [{ key: 'sharesOutstanding', type: 'number' }],
  Currency: [{ key: 'currency', type: 'string' }],
};

export const PROFILE_FIELDS = {
  Sector: [{ key: 'sector', type: 'string' }],
  Industry: [{ key: 'industryDisp', type: 'string' }],
  Employees: [{ key: 'fullTimeEmployees', type: 'number' }],
  Website: [{ key: 'website', type: 'string' }],
  Address: [{ key: 'address1', type: 'string' }],
  City: [{ key: 'city', type: 'string' }],
  State: [{ key: 'state', type: 'string' }],
  Country: [{ key: 'country', type: 'string' }],
  Zip: [{ key: 'zip', type: 'string' }],
  Phone: [{ key: 'phone', type: 'string' }],
  'Overall Risk': [{ key: 'overallRisk', type: 'number' }],
  'Audit Risk': [{ key: 'auditRisk', type: 'number' }],
  'Board Risk': [{ key: 'boardRisk', type: 'number' }],
  'Compensation Risk': [{ key: 'compensationRisk', type: 'number' }],
  'Shareholder Rights Risk': [{ key: 'shareHolderRightsRisk', type: 'number' }],
};

export const PERIODS = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '1wk' },
  { label: '1M', value: '1mo' },
  { label: '6M', value: '6mo' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' },
  { label: 'Max', value: 'max' },
];

export const INTERVALS = ['2m', '15m', '1h', '1d', '1d', '5d', '1mo'];
