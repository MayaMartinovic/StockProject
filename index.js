/* REAL DATA STUFF */

// function to get normal stock data
async function getStockData() {
    // grab whatever the user typed into the input box
    const symbol = document.getElementById("stockInput").value.toUpperCase();
    
    // create url variable
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    
    // send the request and wait for a response
    const response = await fetch(url);

    // store the raw data — .json() converts it into a JS object we can use
    const data = await response.json();

    // looking at the response data for now
    const quote = data["Global Quote"];
    console.log(quote); 

    // if something went wrong
    if (!quote) {
        document.getElementById("result").innerHTML = `<p>Something went wrong — check the console.</p>`;
        console.log(data);
        return;
    }

    // pull out just the fields we care about
    const price = quote["05. price"];
    const change = quote["09. change"];
    const changePercent = quote["10. change percent"];

    // write it into the page
    document.getElementById("result").innerHTML = `
        <h2>${symbol}</h2>
        <p>Price: $${price}</p>
        <p>Change: ${change} (${changePercent})</p>
    `;

    return symbol; 
}

// creating a new function to handle getting the histry
async function getHistory(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(data); // log the WHOLE response, not just the series

    const series = data["Time Series (Daily)"];

    if (!series) {
        console.log("No history data — check the log above for why.");
        return null;
    }

    return series;
}

// function to call eveyrthing test wise
async function testWithRealData() {
    const symbol = await getStockData();
    const priceHistory = await getHistory(symbol);
    
    if (!priceHistory) {
        console.log("Skipping chart — no history data available.");
        return;
    }

    currentPriceHistory = priceHistory; // ADD THIS LINE

    drawChart(priceHistory);
}

/* FAKE DATA STUFF */

// tester: for fake stuff
async function getFakeStockData() {
    // write it into the page
    document.getElementById("result").innerHTML = `
        <h2>Appl</h2>
        <p>Price: $1000.00</p>
        <p>Change: $3.78 (5%)</p>
    `;
}
let currentPriceHistory = null;
// creating a new function to handle getting the histry
async function fakeGetHistory(symbol) {
    const fakeData = {
        "2026-09-04": { "1. open": "328.30", "2. high": "328.93", "3. low": "317.86", "4. close": "319.97", "5. volume": "38069554" },
        "2026-09-03": { "1. open": "326.10", "2. high": "329.50", "3. low": "324.80", "4. close": "328.21", "5. volume": "29812340" },
        "2026-09-02": { "1. open": "322.00", "2. high": "326.75", "3. low": "321.10", "4. close": "325.10", "5. volume": "31204500" },
        "2026-09-01": { "1. open": "320.50", "2. high": "323.90", "3. low": "319.20", "4. close": "322.50", "5. volume": "27650200" },
        "2026-08-29": { "1. open": "334.00", "2. high": "335.20", "3. low": "329.10", "4. close": "330.00", "5. volume": "33012800" },
        "2026-08-28": { "1. open": "330.75", "2. high": "336.40", "3. low": "329.90", "4. close": "334.75", "5. volume": "28901100" },
        "2026-08-27": { "1. open": "331.20", "2. high": "332.80", "3. low": "327.50", "4. close": "329.40", "5. volume": "25764300" },
        "2026-08-26": { "1. open": "336.00", "2. high": "337.10", "3. low": "330.20", "4. close": "331.10", "5. volume": "30450900" },
        "2026-08-25": { "1. open": "333.50", "2. high": "337.80", "3. low": "332.90", "4. close": "336.20", "5. volume": "26890700" },
        "2026-08-22": { "1. open": "329.00", "2. high": "334.60", "3. low": "328.40", "4. close": "333.50", "5. volume": "24567800" }
    };
    console.log(fakeData);
    return fakeData;
}

// function to call eveyrthing test wise
async function testWithFakeData() {
    await getFakeStockData();
    const priceHistory = await fakeGetHistory();
    
    currentPriceHistory = priceHistory; // ADD THIS LINE

    drawChart(priceHistory);
}

/* CHART RENDERING */

// function to handle the graphing of the data
function drawChart(priceHistory, field = "4. close") {
    const entries = Object.entries(priceHistory).reverse();

    const labels = entries.map(([date, values]) => date);
    const values = entries.map(([date, vals]) => parseFloat(vals[field]));

    // to remove previous chart created if there is one already
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    window.chartInstance = new Chart(document.getElementById("priceChart"), {
        type: "line", // chart type is line
        data: {
            labels: labels, // x - axis
            datasets: [{
                label: field,
                data: values // y - axis
            }]
        }
    });
}

function updateChart(field) {
    if (!currentPriceHistory) return;
    drawChart(currentPriceHistory, field);
}