const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Obtenez les liens d\'invitation du bot, du site web et du support Discord',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        // Définir les liens
        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;
        const websiteLink = 'https://www.votresiteweb.com'; // Remplacez par le lien de votre site web
        const supportLink = 'https://discord.gg/votreSupportDiscord'; // Remplacez par le lien de votre serveur de support Discord

        // Création de l'embed
        const embed = new EmbedBuilder()
            .setColor(Colors.Blurple) // Couleur bleue pour l'invitation
            .setTitle('🔗 Liens utiles du Bot')
            .setDescription('Voici quelques liens utiles pour interagir avec le bot.')
            .addFields(
                { name: 'Invitez-moi dans votre serveur', value: `[Cliquez ici pour inviter le bot](${inviteLink})`, inline: false },
                { name: 'Site Web', value: `[Visitez notre site web](${websiteLink})`, inline: false },
                { name: 'Support Discord', value: `[Rejoignez notre serveur de support Discord](${supportLink})`, inline: false }
            )
            .setTimestamp() // Ajoute la date et l'heure du message
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        // Envoie de l'embed en réponse
        interaction.reply({ embeds: [embed] });
    }
};
