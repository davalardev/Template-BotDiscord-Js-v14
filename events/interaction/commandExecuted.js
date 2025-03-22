const { EmbedBuilder } = require('discord.js');
const config = require('../../settings/config');

module.exports = {
    name: 'interactionCreate', // L'événement que l'on veut écouter
    async execute(interaction, client) {
        // Vérifier si l'interaction est une commande
        if (!interaction.isCommand()) return;

        // Récupérer des informations sur l'interaction
        const { commandName, guild, channel, user, createdAt } = interaction;

        // Construire un embed pour envoyer les informations
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Commande exécutée')
            .addFields(
                { name: 'Commande', value: `\`${commandName}\`` },
                { name: 'Utilisateur', value: `${user.tag} (${user.id})` },
                { name: 'Serveur', value: `${guild.name} (${guild.id})` },
                { name: 'Salon', value: `${channel.name} (${channel.id})` },
                { name: 'Date et Heure', value: createdAt.toISOString() }
            )
            .setTimestamp()
            .setFooter({ text: 'Bot Discord' });

        // Récupérer le salon de configuration via l'ID
        const logChannel = guild.channels.cache.get(config.logChannelID);
        if (logChannel) {
            logChannel.send({ embeds: [embed] });
        } else {
            console.log('Le salon de log n\'a pas été trouvé.');
        }
    }
};
