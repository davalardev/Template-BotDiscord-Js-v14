const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Affiche des informations sur le bot',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        // Récupère les informations du bot
        const uptime = client.uptime; // Temps de fonctionnement du bot en millisecondes
        const uptimeFormatted = formatDuration(uptime); // Formate l'uptime
        const serverCount = client.guilds.cache.size; // Nombre de serveurs
        const userCount = client.users.cache.size; // Nombre d'utilisateurs
        const version = require('discord.js').version; // Version de discord.js
        const createdAt = client.user.createdAt.toLocaleDateString(); // Date de création du bot
        const avatarURL = client.user.displayAvatarURL(); // URL de l'avatar du bot

        // Création de l'embed
        const embed = new EmbedBuilder()
            .setColor(Colors.Blurple) // Couleur bleue pour le bot
            .setTitle('🤖 Informations du Bot')
            .setDescription('Voici les informations du bot :')
            .addFields(
                { name: '👤 Nom du Bot', value: client.user.username, inline: true },
                { name: '🆔 ID du Bot', value: client.user.id, inline: true },
                { name: '📅 Créé le', value: createdAt, inline: true },
                { name: '💻 Version de discord.js', value: version, inline: true },
                { name: '🌍 Serveurs', value: serverCount.toString(), inline: true },
                { name: '👥 Utilisateurs', value: userCount.toString(), inline: true },
                { name: '⏳ Uptime', value: uptimeFormatted, inline: true }
            )
            .setThumbnail(avatarURL) // Ajoute l'avatar du bot
            .setTimestamp() // Ajoute la date et l'heure du message
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        // Envoie de l'embed en réponse
        interaction.reply({ embeds: [embed] });
    }
};

// Fonction pour formater l'uptime en jours, heures, minutes et secondes
function formatDuration(duration) {
    const days = Math.floor(duration / (24 * 60 * 60 * 1000));
    const hours = Math.floor((duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((duration % (60 * 1000)) / 1000);

    return `${days}j ${hours}h ${minutes}m ${seconds}s`;
}
