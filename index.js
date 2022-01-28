const fs = require('fs');
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
            });
        } else {
            client.user.setPresence({
                status: 'dnd',
                game: {
                    name: `${config.minecraft.serverIp} is offline :x:`
                }
            });
        }
    }, 60000);
});

client.on('message', message => {
    if (message.content.startsWith(config.discord.prefix) || !message.author.bot) {
        const args = message.content.slice(config.discord.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        // message.delete();

        if (client.commands.has(command)) {
            client.commands.get(command).execute(message, args);
        } else {
            message.reply('this command doesn\'t exists :x:');
        }
    };
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}