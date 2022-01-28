module.exports = {
	name: 'ping',
	description: 'Pong!',
	execute(message) {
		message.channel.send(`Latency: ${Date.now() - message.createdTimestamp}ms :bar_chart:`);
	}
};