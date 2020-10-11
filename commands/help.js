const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'displays all commands',
    async execute(message, args)
    {
        const helperEmbed = new Discord.MessageEmbed()
            .setColor('#7730a6')
            .setAuthor('Youbi', '')
            .setDescription('All commands are here')
            .setThumbnail('')
            .addFields(
                { name: 'ban', value: 'a person of your choice is banned with the maximum limit of 1 week'},
                { name: 'unban', value: 'unban a person (obs: you need to write nickname not mention)'},
                { name: 'clear', value: 'delete messages, limit 100'},
                { name: 'setprefix', value: 'change the default prefix'},
            )

        return message.channel.send(helperEmbed);
    }
}