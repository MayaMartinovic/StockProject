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
}

// creating a new function to handle getting the histry

async function getHistory(symbol) {
    /*const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const series = data["Time Series (Daily)"];
    console.log(series);

    return series;
    */
    // TEMPORARY: fake data while rate-limited, swap back to the real fetch later
    const fakeData = {
        "2026-09-04": { "4. close": "319.97" },
        "2026-09-03": { "4. close": "328.21" },
        "2026-09-02": { "4. close": "325.10" },
        "2026-09-01": { "4. close": "322.50" },
        "2026-08-29": { "4. close": "330.00" },
        "2026-08-28": { "4. close": "334.75" },
        "2026-08-27": { "4. close": "329.40" }
    };
    console.log(fakeData);
    return fakeData;
}

// function to handle the graphing of the data

function drawChart(priceHistory) {
    // Object.entries turns {date: values} into [[date, values], [date, values], ...]
    const entries = Object.entries(priceHistory).reverse(); // oldest to newest, left to right

    const labels = entries.map(([date, values]) => date);
    const prices = entries.map(([date, values]) => parseFloat(values["4. close"]));

    new Chart(document.getElementById("priceChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Closing price",
                data: prices
            }]
        }
    });
}