const Discord = require('discord.js')

    exports.run = (client, message, args) =>{
        let kullanıcı = message.mentions.members.first();

        if(kullanıcı){
            const avatar = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setFooter(` ${kullanıcı.user.username} | Yaani Senin Kadar Olmasa da Gideri Var. `)
            .setImage(kullanıcı.user.avatarURL({dynamic: true, size: 2048}))
            message.channel.send(avatar)
        } else {
            const avatar = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setFooter(` Bugün de Mükemmelsin! `)
            .setImage(message.author.avatarURL({dynamic: true, size: 2048}))
            message.channel.send(avatar)
        }
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Avatar','pp','Pp','icon','İcon'],
    permLevel : 0
}

exports.help = {
    name: 'avatar'
}
