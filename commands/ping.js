const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'displays ms',
    async execute(message, args)
    {
        const ping = Date.now() - message.createdTimestamp;
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#7730a6s')
            .setTitle('The bot ping is')
            .setAuthor('Youbi', '')
            .addField('Ping: ', `${ping}ms`);
        
        return message.channel.send(pingEmbed);
    }
}