const { ApplicationCommandType, EmbedBuilder, Colors, ChannelType } = require('discord.js');

module.exports = {
    name: 'channelinfo',
    description: 'Affiche les informations dun salon',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'salon',
            description: 'Le salon dont vous voulez voir les informations',
            type: 7, // Type 7 pour les salons
            required: true
        }
    ],
    execute: async (client, interaction) => {
        const channel = interaction.options.getChannel('salon');
        
        const embed = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle(`Informations sur le salon : #${channel.name}`)
            .addFields(
                { name: '🆔 ID', value: `${channel.id}`, inline: true },
                { name: '📂 Type', value: `${ChannelType[channel.type]}`, inline: true },
                { name: '📅 Créé le', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:D>`, inline: true },
                { name: '🔒 Privé', value: channel.permissionsLocked ? 'Oui' : 'Non', inline: true },
                { name: '👥 Nombre de membres', value: channel.members ? `${channel.members.size}` : 'Non applicable', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed] });
    }
};
