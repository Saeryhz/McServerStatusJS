const minecraftApiService = require('../services/minecraftApi');

module.exports = {
    name: 'players',
    description: 'Returns the online players list',
    async execute(message) {
        const server = await minecraftApiService.request();

        if (server.data.online) {
            let players = '';
            let lastUpdate = new Date(server.data.last_updated * 1000);
            server.data.players.sample.forEach(player => { players += ':bust_in_silhouette: ' + player.name + '\n' });

            message.channel.send(`__**Online players:**__\n${players}\n:calendar: Last update: ${lastUpdate.getHours()}h${lastUpdate.getMinutes()}`
            );
        } else {
            message.channel.send('The server is currently offline :x:');
        }
    }
};