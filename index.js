async function getStockData() {
    // grab whatever the user typed into the input box
    const ticker = document.getElementById("tickerInput").value.toUpperCase();
    // create url variable
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`;
    
    // send the request and wait for a response
    const response = await fetch(url);

    // store the raw data — .json() converts it into a JS object we can use
    const data = await response.json();

    // looking at the response data for now
    const quote = data["Global Quote"];
    console.log(quote); 
    
    // pull out just the fields we care about
    const price = quote["05. price"];
    const change = quote["09. change"];
    const changePercent = quote["10. change percent"];

    // write it into the page
    document.getElementById("result").innerHTML = `
        <h2>${ticker}</h2>
        <p>Price: $${price}</p>
        <p>Change: ${change} (${changePercent})</p>
    `;
}

