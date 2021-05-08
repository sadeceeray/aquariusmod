const Discord = require('discord.js');
exports.run = async (client, message, args) => {

let anket = args.slice(0).join(" ")
if(!anket) return message.channel.send("Ne Anketi Yapıcaz?")

let Kexpert = new Discord.MessageEmbed()
.setFooter(message.author.tag, message.author.avatarURL())
.setColor("RANDOM")
.setTitle(message.guild.name +" Anket")
.setDescription(`
${anket}

<a:onay:812354149684740126> → Anketi Kabul Edersiniz.
<a:red:812354149677137962> → Anketi Kabul Etmezsiniz.
`)
message.channel.send(Kexpert).then(async m => {
await m.react("812354149684740126")
await m.react("812354149677137962")
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'anket',
  description: "Discord Anket Komutu",
  usage: '<prefix>anket <ahnketyapılcakmesaj>'
}