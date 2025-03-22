const { ApplicationCommandType, EmbedBuilder, Colors } = require('discord.js');
const os = require('os');
const { version } = require('discord.js');

module.exports = {
    name: 'botstats',
    description: 'Affiche les statistiques avancées du bot',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction) => {
        const uptime = process.uptime();
        const cpuUsage = process.cpuUsage();
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const totalServers = client.guilds.cache.size;
        const totalUsers = client.users.cache.size;
        const totalChannels = client.channels.cache.size;
        
        const embed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setTitle('🤖 Statistiques du Bot')
            .addFields(
                { name: '📡 Uptime', value: `<t:${Math.floor(Date.now() / 1000 - uptime)}:R>`, inline: true },
                { name: '💾 Mémoire utilisée', value: `${memoryUsage.toFixed(2)} MB`, inline: true },
                { name: '🖥️ CPU', value: `${(cpuUsage.user / 1000000).toFixed(2)}%`, inline: true },
                { name: '🌍 Serveurs', value: `${totalServers}`, inline: true },
                { name: '👥 Utilisateurs', value: `${totalUsers}`, inline: true },
                { name: '📚 Salons', value: `${totalChannels}`, inline: true },
                { name: '⚙️ Version de Discord.js', value: `v${version}`, inline: true },
                { name: '🖥️ Système', value: `${os.type()} ${os.arch()}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed] });
    }
};
