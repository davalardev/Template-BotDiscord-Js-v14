const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'Affiche les statistiques avancées du serveur',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        const { guild } = interaction;
        const owner = await guild.fetchOwner();
        const totalMembers = guild.memberCount;
        const totalBots = guild.members.cache.filter(m => m.user.bot).size;
        const totalHumans = totalMembers - totalBots;
        const totalChannels = guild.channels.cache.size;
        const totalTextChannels = guild.channels.cache.filter(c => c.type === 0).size;
        const totalVoiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
        const totalRoles = guild.roles.cache.size;
        const totalEmojis = guild.emojis.cache.size;
        
        const embed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setTitle(`📊 Statistiques du serveur : ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '👑 Propriétaire', value: `${owner.user.tag}`, inline: true },
                { name: '👥 Membres', value: `Total: ${totalMembers}\nHumains: ${totalHumans}\nBots: ${totalBots}`, inline: true },
                { name: '📚 Salons', value: `Total: ${totalChannels}\nTextuels: ${totalTextChannels}\nVocaux: ${totalVoiceChannels}`, inline: true },
                { name: '🛑 Rôles', value: `${totalRoles}`, inline: true },
                { name: '😀 Emojis', value: `${totalEmojis}`, inline: true },
                { name: '📅 Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `ID du serveur : ${guild.id}`, iconURL: guild.iconURL({ dynamic: true }) });
        
        interaction.reply({ embeds: [embed] });
    }
};
