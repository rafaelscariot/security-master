const axios = require('axios');

const getUserId = token => {
    const res = axios.post('http://localhost:3000/token/validator', { token });
    return res;
}

module.exports = getUserId;