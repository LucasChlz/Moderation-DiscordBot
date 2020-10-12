const mongoose = require('mongoose');
require('../models/Channel');
const ChannelModel = mongoose.model("Channel");

module.exports = {
    name: 'setchannel',
    description: 'define a channel where the bot will act',
    async execute(message, args)
    {
        const channelSelect = await message.mentions.channels.first();
        if (!channelSelect) return message.channel.send('Mention a channel');

        const filter = message.guild.id

        return ChannelModel.findOne({ name: `${filter}`}).then((channel) => {
            channel.id_channel = channelSelect.id;     
            channel.save().then(() => {
                return message.channel.send(`new channel set: ${channelSelect.name}`);
            });     
        }).catch(() => {
            ChannelModel.create({
                name: filter,
                id_channel: channelSelect.id
            }).then(() => {
                return message.channel.send(`new channel set: ${channelSelect.name}`);
            }).catch(err => {
                return message.channel.send(err.message);
            });
        });
    }
}