require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [ 
    { 
        name: 'credits',
        description: 'Credits of the creator!',
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands}
        )
        console.log('Slash commands were registered succsessfully!');
    }catch (error) {
        console.log(`There was an error! ${error}`)
    }

})();