const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'ban',
    description: 'ban a user',
    async execute(message, args)
    {
        const author = message.member;

        if(!author.hasPermission('ADMINISTRATOR')) return message.channel.send('You need to be a administrator');

        const memberBan = message.mentions.users.first();

        if(!memberBan) {
            const alertEmbed = new Discord.MessageEmbed()
            .setColor(`#4a34a3`)
            .setDescription(`${prefix}ban <user> <reason> <days>`);
        
            return message.channel.send(alertEmbed);
        }

        const reasonBan = args.slice(1).join(" ");

        if(!reasonBan) return message.channel.send(`What is the reason for the ban?`);

        const timeBan = args[args.length - 1];

        if(!timeBan) return message.channel.send(`Type how many days had he been banned`);
        if(timeBan > 7 || timeBan < 1) return message.channel.send(`The number of days must be between 1 and 7`);

        return await message.guild.members.ban(memberBan, { days: timeBan, reason: reasonBan })
            .then(() => {
                const banMessage = new Discord.MessageEmbed()
                    .setColor('#d62747')
                    .setTitle(`${memberBan.username} has been banned for ${timeBan} days`)
                    .setImage('');

            return message.channel.send(banMessage);
            }).catch(() => {
                return message.channel.send(`Missing permissions`);
            });
        
        
    }
}