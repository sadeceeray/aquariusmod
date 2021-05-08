const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (client, message, args) => {
  
const ok = message.client.emojis.cache.get("");
  
var embed = new Discord.MessageEmbed()

.setAuthor('#' + message.channel.name, message.guild.iconURL)
.addField(" ID", message.channel.id)

if (message.channel.nsfw) {
  
embed.addField(" NSFW", "Evet", true) 
} 
  
else {
  
embed.addField(" NSFW", "Hayır", true)
}
  
embed.addField('Oluşturulduğu Tarih:', moment(message.channel.createdAt).format('DD/MM/YYYY'), true)
  
.setColor('BLACK')
.setThumbnail(message.guild.iconURL)
.setFooter(`Aquarius Moderasyon`,  client.user.avatarURL)
  
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kanal-bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'kanalbilgi',
  description: 'Kanal ile ilgili bilgi verir.',
  usage: 'kanalbilgi'
}