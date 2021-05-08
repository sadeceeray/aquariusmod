const Discord = require('discord.js');
exports.run = async (client, message, args) => {
if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send(`Bu komutu kullanabilmek için \`Move Members\` yetkisine sahip olmasınız.`);
    if (!message.member.voice.channel) { return message.channel.send("Ses kanalında olman lazım!"); }
 let kullanıcı = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
  if (!kullanıcı) return message.channel.send('Kullanıcıyı etiketlemelisin.')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  if(!member.voice.channel) return message.channel.send("Etiketlenen kullanıcı bir ses kanalında değil").then(m =>m.delete({timeout:5000}))
  const voiceChannel = message.member.voice.channel.id;
if(!voiceChannel) return
  member.voice.setChannel(voiceChannel);
   message.react('809770175468666910')
   const voiceChannel1 = message.member.voice.channel.name;
  let embed= new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`**İşlemi Gerçekleştiren** <a:maviok:810524017303093280> <@${message.author.id}>` + `\n **Çekilen** <a:maviok:810524017303093280> ${kullanıcı} \n **Gidilinen Kanal** <a:maviok:810524017303093280>  ` +" \ `"+voiceChannel1+"\`")
    .setFooter(`${message.author.tag}`)
   .setTimestamp()  
  .setThumbnail(message.author.avatarURL())
    message.channel.send(embed).then(m =>m.delete(10000))
 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}
exports.help = {
  name: 'çek',
  description: " ",
  usage: 'çek'
}