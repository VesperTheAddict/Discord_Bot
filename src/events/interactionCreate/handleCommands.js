const { devs, testServer} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

     try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly){
            if (!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: 'Only devs can use this command',
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.testOnly){
            if (!(interaction.guild.id === testServer)){
                interaction.reply({
                    content: 'this test cannot be run here',
                    ephemeral: true,
                });
                return;
    }
}

if (commandObject.permissionsRequired?.lenght){
    for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)){
            interaction.reply({
                content: 'Not enough permissions.',
                ephemeral: true,
            });
            return;
        }
        
        
    }
}
if (commandObject.botPermissions?.lenght) {
    for (const permissions of commandObject.botPermissions){
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permissions)) {
            interaction.reply({
                content: "I don't have enough permissions.",
                ephemeral: true,
            });
            continue;
        }
    }
}
await commandObject.callback(client, interaction);
     } catch (error) {
        console.log(`there was an error: ${error}`);
     }

};