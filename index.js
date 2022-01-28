const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const minecraftApiService = require('./services/minecraftApi');

client.login(config.discord.token);

client.on('ready', () => {
    console.log('🌐 Signed in as ' + client.user.username);

    setInterval(async () => {
        const server = await minecraftApiService.request();

        if (server.data.online) {
            client.user.setPresence({
                status: 'online',
                type: 'WATCHING',
                game: {
                    name: `${server.data.players.now}/${server.data.players.max} online`
                }
            })
        } else {
            client.user.setPresence({
                status: 'dnd',
                game: {
                    name: `${config.minecraft.serverIp} is offline ❌`
                }
            });
        }
    }, 60000);
});