const config = require('../config');
const minecraftApiService = require('../services/minecraftApi');

module.exports = {
    name: 'version',
    description: 'Returns the server version',
    async execute(message) {
        const server = await minecraftApiService.request();

        if (server.data.online) {
            message.channel.send(`${config.minecraft.serverIp} is running Minecraft version ${server.data.server.name}`);
        } else {
            message.channel.send('The server is currently offline :x:');
        }
    }
};