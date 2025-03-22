const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'roleinfo',
    description: 'Affiche les informations dun rôle',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'rôle',
            description: 'Le rôle dont vous voulez voir les informations',
            type: 8, // Type 8 pour les rôles
            required: true
        }
    ],
    execute: async (client, interaction) => {
        const role = interaction.options.getRole('rôle');
        
        const embed = new EmbedBuilder()
            .setColor(role.color || Colors.Blue)
            .setTitle(`Informations sur le rôle : ${role.name}`)
            .addFields(
                { name: '🆔 ID', value: `${role.id}`, inline: true },
                { name: '🎨 Couleur', value: `${role.hexColor}`, inline: true },
                { name: '📅 Créé le', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:D>`, inline: true },
                { name: '👥 Membres', value: `${role.members.size}`, inline: true },
                { name: '🔒 Mentionnable', value: role.mentionable ? 'Oui' : 'Non', inline: true },
                { name: '🔼 Position', value: `${role.position}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed] });
    }
};
