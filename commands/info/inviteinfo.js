const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'inviteinfo',
    description: 'Affiche les informations dune invitation',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'lien',
            description: 'Le lien dinvitation à analyser',
            type: 3, // Type 3 pour les chaînes de texte
            required: true
        }
    ],
    execute: async (client, interaction) => {
        const inviteCode = interaction.options.getString('lien').split('/').pop();
        
        try {
            const invite = await client.fetchInvite(inviteCode);
            
            const embed = new EmbedBuilder()
                .setColor(Colors.Purple)
                .setTitle('Informations sur linvitation')
                .addFields(
                    { name: '🆔 Code', value: `${invite.code}`, inline: true },
                    { name: '📌 Serveur', value: `${invite.guild.name}`, inline: true },
                    { name: '👥 Nombre dutilisateurs en ligne', value: `${invite.presenceCount || 'Non disponible'}`, inline: true },
                    { name: '📅 Créée le', value: `<t:${Math.floor(invite.createdTimestamp / 1000)}:D>`, inline: true },
                    { name: '🔗 Lien', value: `[Clique ici](https://discord.gg/${invite.code})`, inline: false }
                )
                .setTimestamp()
                .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
            
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            interaction.reply({ content: '❌ Linvitation est invalide ou a expiré.', ephemeral: true });
        }
    }
};
