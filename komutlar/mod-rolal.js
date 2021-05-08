const Discord = require('discord.js');
exports.run = (client, message, args) => {

  if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('**Uyarı**', '`rol-al` **adlı komutu özel mesajlarda kullanamazsın.**')
  return message.author.send(ozelmesajuyari); }
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için yeterli yetkin yok.');  //ADMINISTATOR yerini değişip başka bir yetki yazabilirsiniz
  let guild = message.guild
  let rol = message.mentions.roles.first()  
  let user = message.mentions.members.first() 

  if (!user) return message.reply('**Kimden rol alacağım ?**').catch(console.error);
user.roles.remove(rol);
  message.channel.send("**Başarıyla rol alındı**")

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'rol-al',
  description: 'Aquarius Moderasyon',
  usage: 'ping'
};