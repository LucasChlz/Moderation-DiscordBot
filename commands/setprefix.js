const Discord = require('discord.js');
const mongoose = require('mongoose');

require('../models/Prefix');
const PrefixModel = mongoose.model("Prefix")

module.exports = {
    name: 'setprefix',
    description: 'change prefix',
    async execute(message, args)
    {
        const author = message.member;
        if(!author.hasPermission('ADMINISTRATOR')) return message.channel.send('You need to be a administrator');

        if(!args[0]) {
            const alertEmbed = new Discord.MessageEmbed()
            .setColor(`#4a34a3`)
            .setDescription(`<Prefix> setPrefix <prefix>`);
        
            return message.channel.send(alertEmbed);
        }

        const filter = message.guild.id;
        const update = args[0]

        return PrefixModel.findOne({ name: `${filter}`}).then((prefix) => {
            prefix.prefix = update
            prefix.save().then(() => {
                return message.channel.send(`New prefix = ${update}`);
            });
        }).catch((err) => {
            PrefixModel.create({
                name: filter,
                prefix: args[0]
            }).then(() => {
                return message.channel.send(`New prefix = ${update}`);
            })
        })
    }
}