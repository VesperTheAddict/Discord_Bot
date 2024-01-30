require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


eventHandler(client);

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;


    if(interaction.commandName === 'credits'){
      const credits = new EmbedBuilder()
      .setTitle("Coffee Distribution Inc Bot brought to you by:")
      .setDescription('VesperTheCoffeeAddict')
      .setColor(0x1CCA90)
      .addFields({
         name: 'Twitter', 
         value: '@TemezRandomTaco', 
         inline: true,

        },{
        name: 'Discord', 
        value: 'vesperthecoffeeaddict', 
        inline: true,
    });
    

      interaction.reply({ embeds: [credits]});
    }
});



client.login(process.env.TOKEN);
