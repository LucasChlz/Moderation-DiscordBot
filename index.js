const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ disableMentions: 'none'});
const mongoose = require('mongoose');
const { prefix, token } = require('./config.json');

var botPrefix;
var setChannelId;

require('./models/Prefix');
require('./models/Channel');

const PrefixModel = mongoose.model("Prefix")
const ChannelModel = mongoose.model("Channel");


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    const mongoDB = 'mongodb://127.0.0.1/youbidb';
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error'));

    console.log('Youbi is ready!');
});

client.on('message', async message => {
    const filter = message.guild.id;
    const filterChannel = message.channel.id;

    await PrefixModel.findOne({ name: `${filter}`}).then((prefix) => {
        return botPrefix = prefix.prefix;
    }).catch((err) => {
        return botPrefix = "d!";
    });

    if (!message.content.startsWith(botPrefix) || message.author.bot) return;

    await ChannelModel.findOne({ name: filter}).then((channel) => {
        return setChannelId = channel.id_channel;
    }).catch(() => {
        return setChannelId = filterChannel;
    });

    if (filterChannel != setChannelId) return message.channel.send("I can't type commands on that channel");

   
    const args = message.content.slice(botPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        message.channel.send(`This command does not exist`);
    } else {
        try {
            client.commands.get(command).execute(message, args);
        } catch(err) {
            console.log(err);
            message.channel.send(`there was an error trying to execute that command!`);
        }
    }
});



client.login(token);