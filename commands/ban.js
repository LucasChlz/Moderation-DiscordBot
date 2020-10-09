const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban a user',
    async execute(message, args)
    {
        const author = message.member;

        if(!author.hasPermission('ADMINISTRATOR')) return message.channel.send('You need to be a administrator');

        const memberBan = message.mentions.users.first();
        if(!memberBan) return message.channel.send(`You need to tag someone`);
        const timeBan = args[1];
        if(!timeBan) return message.channel.send(`type how many days had he been banned`);

        return await message.guild.members.ban(memberBan, { days: timeBan })
            .then(() => {
                const banMessage = new Discord.MessageEmbed()
                    .setColor('#d62747')
                    .setTitle(`${memberBan.username} has been banned for ${timeBan} days`)
                    .setImage('');

               return message.channel.send(banMessage);
            });
        
        
    }
}