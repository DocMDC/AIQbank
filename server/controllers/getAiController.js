const fetch = require('node-fetch');
require('dotenv').config()

const getAi = async (req, res) => {
    const {message} = req.body
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.OPEN_AI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message}],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()
        res.send(data)
    } catch (err) {
        console.error(err)
    }
}

module.exports = { getAi }