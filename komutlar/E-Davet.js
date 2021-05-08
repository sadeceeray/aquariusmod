const Discord = require('discord.js')

    exports.run = (client, message, args) => {
        var kelimeler = [
            "Aquarius Bot Linki \n <a:maviok:810524017303093280> https://bit.ly/3b4fQF9",
        ]

        let kelimerandom = kelimeler[Math.floor(Math.random() * kelimeler.length)]

        const kelime = new Discord.MessageEmbed()
        .setDescription("**" + kelimerandom + "**")
        .setColor('RANDOM')
        message.channel.send(kelime)
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davet','davet-linki','invite','botdavet'],
    permLevel: 0
}

exports.help = {
    name: 'davet'
}