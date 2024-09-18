import axios from 'axios';

const proxyURL = process.env.VUE_APP_API_GATEWAY_URL || 'http://localhost:8080';

const instance = axios.create({
    baseURL: proxyURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;