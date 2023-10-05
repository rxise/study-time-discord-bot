const { SlashCommandBuilder, Colors } = require("discord.js");
const { guildId } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("auto_assign_role")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const guild = interaction.guild

    if (!guild) {
      console.error("Guild not found.");
      return;
    }

    console.log();

    // console.log(guild.members.fetch());
    // const members = await guild.members.fetch();
    // console.log(members);
    // for(member in members){
    //     const membersRole = await members.roles.fetch();
    //     console.log(membersRole);
    // }
    return interaction.reply("pong!");
  },
};
