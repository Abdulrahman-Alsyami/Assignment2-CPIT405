const API_KEY = '537ee1dd4bc41d140a1a8b97fecec8f7';

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultDiv = document.getElementById('result');

    if (amount === '' || amount <= 0) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.color = '#c62828';
        resultDiv.innerHTML = 'Please enter a valid amount!';
        return;
    }

    resultDiv.style.display = 'block';
    resultDiv.style.backgroundColor = '#fff3e0';
    resultDiv.style.color = '#e65100';
    resultDiv.innerHTML = 'Converting...';

    try {
        const response = await fetch(
            `http://api.exchangerate.host/live?access_key=${API_KEY}&source=${fromCurrency}&currencies=${toCurrency}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error.info || 'API Error');
        }

        const rateKey = fromCurrency + toCurrency;
        const rate = data.quotes[rateKey];

        const convertedAmount = (amount * rate).toFixed(2);

        resultDiv.style.backgroundColor = '#e7f3ff';
        resultDiv.style.color = '#0066cc';
        resultDiv.innerHTML = `
            ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}
            <br><small>Rate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}</small>
        `;

    } catch (error) {
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.color = '#c62828';
        resultDiv.innerHTML = 'Error: Unable to convert. Please try again!';
        console.error('Error:', error);
    }
}
