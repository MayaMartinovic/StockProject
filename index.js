async function getStockAPI() {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`;
    // 1. Send the request and wait for a response
    const response = await fetch(url);

    // 2. The response comes back as raw data — .json() converts it into a JS object we can use
    const data = await response.json();

    // 3. Now data is just a normal JS object, use it however you want
    console.log(data.message); // this is the URL of the api
}

getStockAPI();