import axios from 'axios';

// env variable
const proxyURL = process.env.API_GATEWAY_URL || 'http://localhost:8080';

const instance = axios.create({
    baseURL: proxyURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
