# Stock Evaluator

A web app that looks up a stock ticker and displays its current price, 
daily change, and a 10-day price history chart — with the ability to 
switch between viewing open, high, low, close, and volume data.

## Features
- Live stock price lookup via the Alpha Vantage API
- Interactive line chart of recent price history (Chart.js)
- Toggle the chart between Open, High, Low, Close, and Volume
- Graceful handling of invalid tickers and API rate limits
- API key kept out of version control via a config file pattern

## Tech Stack
JavaScript (fetch API, async/await), HTML, CSS, Chart.js, Alpha Vantage API

## Setup
1. Get a free API key at [alphavantage.co](https://www.alphavantage.co/support/#api-key)
2. Clone this repo
3. Copy `config.example.js` to a new file called `config.js`
4. Paste your API key into `config.js`
5. Open `index.html` in your browser — no build step or server needed

## Known limitations
Alpha Vantage offers 25 free requests/day.  If you hit the limit, 
the app will show an error rather than crash, and includes a fake-data 
mode used during development to keep testing without burning the quota. 

## Disclaimer
Educational project only — not financial advice.
