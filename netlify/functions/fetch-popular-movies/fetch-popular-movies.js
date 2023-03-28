const axios = require('axios');

const handler = async () => {
    const BASE_URL = process.env.API_BASE_URL;
    const API_KEY = process.env.TMDB_API_KEY;
    const API_LANGUAGE = process.env.API_LANGUAGE;

    const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&${API_LANGUAGE}&region=FR`;

    try {
        const { data } = await axios.get(url);

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        const { status, statusText, headers, data } = error.response;
        return {
            statusCode: status,
            body: JSON.stringify({ status, statusText, headers, data }),
        };
    }
};

module.exports = { handler };
