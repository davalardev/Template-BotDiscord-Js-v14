const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Test si le bot fonctionne correctement',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        const ping = client.ws.ping; // Récupère le ping du bot en ms

        // Création de l'embed
        const embed = new EmbedBuilder()
            .setColor(Colors.Green) // Couleur verte pour indiquer que tout va bien
            .setTitle('🏓 Pong !')
            .setDescription(`✅ Le bot est en ligne !\n📡 **Ping :** ${ping}ms`)
            .setTimestamp() // Ajoute la date et l'heure du message
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        // Envoie de l'embed en réponse
        interaction.reply({ embeds: [embed] });
    }
};
