const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'clean chat',
    async execute(message, args)
    {

        const user = message.member;

        if (!user.hasPermission('ADMINISTRATOR', true)) return message.channel.send(`You need to be a administrator`);

        const messageNumber = args[0];

        if (!messageNumber) return message.channel.send(`Please type a number between 1 and 100`);
        if (messageNumber <= 0) return message.channel.send(`Please type a number between 1 and 100`);

        const messageFetch = await message.channel.messages.fetch({ limit: messageNumber});

        return message.channel.bulkDelete(messageFetch).then(() => {
            const AlertEmbed = new Discord.MessageEmbed()
              .setAuthor('Youbi', '')
              .setDescription('Sucessfully messages delete');

            return message.channel.send(AlertEmbed);
        }).catch((err) => {
            const AlertEmbed = new Discord.MessageEmbed()
            .setAuthor('Youbi', '')
            .setDescription(err.message);

            return message.channel.send(AlertEmbed);
        })
    }
}