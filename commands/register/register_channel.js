const { SlashCommandBuilder, Colors, SlashCommandChannelOption, ChannelType } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("register_channel")
    .setDescription("Replies with Pong!")
    .addChannelOption((option) => 
      option
      .setName("voice_channel_name")
      .addChannelTypes(ChannelType.GuildVoice)
      .setDescription("Register voice channel")
      .setRequired(true)
    ),
  async execute(interaction) {
    const {options} = interaction;
    const voiceChannelId = options.getChannel("voice_channel_name").id;
    console.log(voiceChannelId);
  },
};
