const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Affiche les informations du serveur',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        const { guild } = interaction;
        const owner = await guild.fetchOwner(); // Récupérer le propriétaire du serveur
        
        const embed = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle(`Informations sur ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '📆 Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: '👑 Propriétaire', value: `${owner.user.tag}`, inline: true },
                { name: '👥 Membres', value: `${guild.memberCount}`, inline: true },
                { name: '🌍 Région', value: `${guild.preferredLocale}`, inline: true },
                { name: '🔐 Vérification', value: `${guild.verificationLevel}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `ID du serveur : ${guild.id}`, iconURL: guild.iconURL({ dynamic: true }) });
        
        interaction.reply({ embeds: [embed] });
    }
};
