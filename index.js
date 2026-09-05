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

// creating a new function to handle the graphing of the data

async function getHistory(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const series = data["Time Series (Daily)"];
    console.log(series);

    return series;
}