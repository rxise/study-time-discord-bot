const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMembers, 
	GatewayIntentBits.GuildVoiceStates
] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});


client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
	if(newState.channelId == null)
	console.log(`User has left the channel: ${oldState.channelId}`);
	else if(oldState.channelId == null)
	console.log(`User has joined the channel: ${newState.channelId}`);
	else {
		console.log(`User has moved from channel ${oldState.channelId} to ${newState.channelId}`);
	}
	
	const channel = newState.guild.channels.cache.get('1150509368631119904'); // Replace with your text channel ID
    if (channel) {
      channel.send(`User has joined the voice channel: <@${newState.member.user.id}>`);
    }

})

client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);
