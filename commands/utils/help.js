const { ApplicationCommandType, EmbedBuilder, Colors, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Exemple d'une structure de commandes avec leur catégorie et description
const commands = [
    {
        name: 'ping',
        description: 'Test si le bot fonctionne correctement',
        category: 'Utilitaires',
    },
    {
        name: 'help',
        description: 'Affiche les commandes disponibles',
        category: 'Utilitaires',
    },
    {
        name: 'invite',
        description: 'Renvoie un lien d\'invitation pour le bot',
        category: 'Utilitaires',
    },
    {
        name: 'botinfo',
        description: 'Affiche des informations sur le bot',
        category: 'Informations',
    },
    {
        name: 'botstats',
        description: 'Affiche les statistiques du bot',
        category: 'Informations',
    },
    {
        name: 'channelInfo',
        description: 'Affiche des informations sur le canal actuel',
        category: 'Informations',
    },
    {
        name: 'inviteInfo',
        description: 'Affiche des informations sur les invitations',
        category: 'Informations',
    },
    {
        name: 'roleInfo',
        description: 'Affiche des informations sur un rôle spécifique',
        category: 'Informations',
    },
    {
        name: 'roleList',
        description: 'Affiche la liste des rôles du serveur',
        category: 'Informations',
    },
    {
        name: 'serverinfo',
        description: 'Affiche des informations sur le serveur',
        category: 'Informations',
    },
    {
        name: 'userinfo',
        description: 'Affiche des informations sur un utilisateur',
        category: 'Informations',
    },
    {
        name: 'stats',
        description: 'Affiche des statistiques diverses du serveur',
        category: 'Informations',
    },
    // Ajoute d'autres commandes ici si nécessaire
];

module.exports = {
    name: 'help',
    description: 'Affiche les commandes disponibles',
    type: ApplicationCommandType.ChatInput,

    execute: async (client, interaction) => {
        // Crée un embed avec un message général de bienvenue
        const embed = new EmbedBuilder()
            .setColor(Colors.Blurple) // Couleur bleue pour le message d'aide
            .setTitle(':books: Commandes du bot')
            .setDescription('Sélectionne une catégorie pour voir les commandes disponibles :')
            .setTimestamp()
            .setFooter({
                text: `Demandé par ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            });

        // Groupement des commandes par catégorie
        const categories = {};
        commands.forEach((cmd) => {
            if (!categories[cmd.category]) {
                categories[cmd.category] = [];
            }
            categories[cmd.category].push(`**/${cmd.name}**: ${cmd.description}`);
        });

        // Crée un menu déroulant (select menu) pour les catégories
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('selectCategory')
            .setPlaceholder('Choisir une catégorie')
            .addOptions(
                Object.keys(categories).map((category) => ({
                    label: category,
                    value: category,
                    description: `Voir les commandes de ${category}`,
                }))
            );

        // Créer un bouton "Retour"
        const backButton = new ButtonBuilder()
            .setCustomId('back')
            .setLabel('Retour')
            .setStyle(ButtonStyle.Primary);

        // Envoie l'embed avec le menu déroulant et le bouton retour
        const row = new ActionRowBuilder().addComponents(selectMenu);
        const rowBack = new ActionRowBuilder().addComponents(backButton);

        // Réponse initiale avec le menu
        await interaction.reply({
            embeds: [embed],
            components: [row, rowBack],
        });

        // Interaction pour le menu déroulant
        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 15000, // Temps limite de 15 secondes pour la sélection
        });

        collector.on('collect', async (i) => {
            if (i.isSelectMenu()) {
                const selectedCategory = i.values[0];
                const categoryCommands = categories[selectedCategory];

                // Créer un nouvel embed avec les commandes de la catégorie choisie
                const categoryEmbed = new EmbedBuilder()
                    .setColor(Colors.Blurple)
                    .setTitle(`:books: Commandes de la catégorie "${selectedCategory}"`)
                    .setDescription(categoryCommands.join('\n'))
                    .setTimestamp()
                    .setFooter({
                        text: `Demandé par ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    });

                // Répondre avec les commandes de la catégorie sélectionnée
                await i.update({
                    embeds: [categoryEmbed],
                    components: [rowBack], // Garder le bouton Retour
                });
            } else if (i.isButton() && i.customId === 'back') {
                // Si le bouton retour est cliqué, revenir à la sélection des catégories
                await i.update({
                    embeds: [embed], // Remettre l'embed initial
                    components: [row, rowBack], // Garder le select menu et le bouton retour
                });
            }
        });

        collector.on('end', async () => {
            // Désactive le select menu et le bouton retour après 15 secondes
            await interaction.editReply({
                components: [],
            });
        });
    },
};
