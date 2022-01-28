require('dotenv').config();

let config = module.exports;

config.discord = {
    token: process.env.DISCORD_TOKEN
}

config.minecraft = {
    serverIp: process.env.SERVER_IP
}