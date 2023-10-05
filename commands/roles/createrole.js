const { SlashCommandBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createrole")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option
        .setName("rolename")
        .setDescription("Enter role name!")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;
    console.log(options);
    const roleName = options.getString("rolename");
    console.log(roleName);

    await interaction.guild.roles.create({
      name: roleName, // Replace with your desired role name
      color: Colors.Red, // You can specify the color here (e.g., 'RANDOM', 'RED', 'GREEN', 'BLUE')
      permissions: [], // You can specify role permissions here
    });

    return interaction.reply("pong!");
  },
};
