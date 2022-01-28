const axios = require('axios');
const config = require('../config');

const URL = `https://mcapi.us/server/status?ip=${config.minecraft.serverIp}`;

const minecraftApiService = axios.create({
    baseURL: URL,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json'
    }
});

module.exports = minecraftApiService;