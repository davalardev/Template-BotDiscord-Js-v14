const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Affiche des informations sur un utilisateur',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        // Récupère l'utilisateur mentionné ou l'utilisateur qui a exécuté la commande
        const user = interaction.options.getUser('user') || interaction.user;

        // Récupère les informations supplémentaires de l'utilisateur (comme le membre dans le serveur)
        const member = await interaction.guild.members.fetch(user.id);

        // Création de l'embed
        const embed = new EmbedBuilder()
            .setColor(Colors.Blurple) // Couleur bleue pour le bot
            .setTitle('👤 Informations de l\'utilisateur')
            .setThumbnail(user.displayAvatarURL()) // Ajoute l'avatar de l'utilisateur
            .addFields(
                { name: 'Nom d\'utilisateur', value: user.username, inline: true },
                { name: 'Tag', value: user.tag, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Date d\'adhésion', value: member.joinedAt.toLocaleDateString(), inline: true },
                { name: 'Date de création du compte', value: user.createdAt.toLocaleDateString(), inline: true },
                { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', ') || 'Aucun rôle', inline: false }
            )
            .setTimestamp() // Ajoute la date et l'heure du message
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        // Envoie de l'embed en réponse
        interaction.reply({ embeds: [embed] });
    }
};
