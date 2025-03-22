const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'channellist',
    description: 'Affiche la liste des salons du serveur avec des détails',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        const { guild } = interaction;
        const channels = guild.channels.cache
            .sort((a, b) => a.position - b.position)
            .map(channel => `#${channel.name} - ${channel.type}`)
            .slice(0, 20)
            .join('\n');
        
        const embed = new EmbedBuilder()
            .setColor(Colors.Purple)
            .setTitle(`📜 Liste des salons de ${guild.name}`)
            .setDescription(channels.length > 0 ? channels : 'Aucun salon trouvé')
            .setTimestamp()
            .setFooter({ text: `Total des salons : ${guild.channels.cache.size}`, iconURL: guild.iconURL({ dynamic: true }) });
        
        interaction.reply({ embeds: [embed] });
    }
};
