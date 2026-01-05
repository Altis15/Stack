document.getElementById('stock-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const symbol = document.getElementById('stock-symbol').value.toUpperCase();
    const apiKey = 'demo'; // Replace with your Alpha Vantage API key (get free at alphavantage.co)
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const quote = data['Global Quote'];
            if (!quote || Object.keys(quote).length === 0) {
                throw new Error('No data found for this symbol.');
            }

            const insight = `
                <h3>Insight for ${symbol} - Week of January 5, 2026</h3>
                <p>Current Price: $${quote['05. price']}</p>
                <p>Change: ${quote['10. change percent']}</p>
                <p>Volume: ${quote['06. volume']}</p>
                <p>Analysis: The share price of ${symbol} has shown a ${quote['10. change percent']} change today. This could indicate market volatility influenced by recent economic trends. Investors should monitor upcoming earnings reports for further insights.</p>
            `;

            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = insight;
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p>Error: ${error.message}. Please check the symbol or API key.</p>`;
            document.getElementById('result').style.display = 'block';
        });
});