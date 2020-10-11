const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'unban',
    description: 'unban a member',
    async execute(message, args)
    {
        const author = message.member;

        if(!author.hasPermission('ADMINISTRATOR')) return message.channel.send('You need to be a administrator');

        const memberUnban = args.slice(0).join(" ");
        
        if(!memberUnban) {
            const alertEmbed = new Discord.MessageEmbed()
            .setColor(`#4a34a3`)
            .setDescription(`${prefix}unban <user>`);
        
            return message.channel.send(alertEmbed);
        }

        const userBanned = await message.guild.fetchBans()
            .then((users) => {
                return users.find(n => n.user.username == memberUnban);
            });
        
        if (!userBanned) return message.channel.send(`Not found any user banned with username: ${memberUnban}`);
        
        return await message.guild.members.unban(userBanned.user.id)
            .then(() => {
                const unbanMessage = new Discord.MessageEmbed()
                    .setColor('#d62747')
                    .setTitle(`${userBanned.user.username} was unbanned`)
                    .setImage('');

                return message.channel.send(unbanMessage);
            });
    }
}