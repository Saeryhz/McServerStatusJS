require('dotenv').config();

let config = module.exports;

config.discord = {
    token: process.env.DISCORD_TOKEN,
    prefix: process.env.DISCORD_PREFIX || '!'
}

config.minecraft = {
    serverIp: process.env.SERVER_IP
}