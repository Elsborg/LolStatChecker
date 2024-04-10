const express = require('express')
const http = require('http')

const app = express();
const PORT = process.env.PORT || 3000

app.get('/riot-api/:region/:endpoint', (req, res) => {
    const { region, endpoint } = req.params
    const apiKey = 'RGAPI-d682f9d9-0da8-441f-957e-d6dd66cdb833'
    const options = {
        hostname: `${region}.api.riotgames.com`,
        path: `/${endpoint}?api_key=${apiKey}`,
        method: 'GET',
    };

    const request = http.request(options, (response) => {
        let data = ''

        response.on('data', (chunk) => {
            data += chunk
        });

        response.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.end(data)
        });
    });

    request.on('error', (error) => {
        console.error('Error fetching data from Riot API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Riot API' })
    });

    request.end()
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})