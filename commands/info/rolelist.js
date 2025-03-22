const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'rolelist',
    description: 'Affiche la liste des rôles du serveur avec des détails',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        const { guild } = interaction;
        const roles = guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => `${role.name} - ${role.members.size} membres`)
            .slice(0, 20)
            .join('\n');
        
        const embed = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle(`📜 Liste des rôles de ${guild.name}`)
            .setDescription(roles.length > 0 ? roles : 'Aucun rôle trouvé')
            .setTimestamp()
            .setFooter({ text: `Total des rôles : ${guild.roles.cache.size}`, iconURL: guild.iconURL({ dynamic: true }) });
        
        interaction.reply({ embeds: [embed] });
    }
};
