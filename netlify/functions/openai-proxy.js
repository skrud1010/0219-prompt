const axios = require('axios'); // axios 설치가 필요할 수 있습니다.

exports.handler = async (event) => {
    // Netlify 환경 변수에서 키를 가져옵니다. (코딩상에는 노출 안 됨)
    const apiKey = process.env.OPENAI_API_KEY; 
    const { prompt } = JSON.parse(event.body);

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: response.data.choices[0].message.content })
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};