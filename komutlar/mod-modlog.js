const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`log_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(`<a:red:812354149677137962> Modlog Kanalı Zaten ayarlı değil.`);
    db.delete(`log_${message.guild.id}`)
   message.channel.send(`<a:tik2:810524074509860896> ModLog Kanalı başarıyla sıfırlandı.`);
    return
  }
if (!logk) return message.channel.send(`<a:red:812354149677137962> Yanlış Kullanım Doğru Kullanım: .mod-log #kanal`);

db.set(`log_${message.guild.id}`, logk.id)

message.channel.send(`<a:tik2:810524074509860896> Mod-Log kanalı başarıyla ${logk} olarak ayarlandı.`);
 message.react('810524074509860896')

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog','log-ayarlama','logayarla','log','vkanal','kayıtkanalı','d'],
    permLevel: 3,//Kendi permlerinize göre ayarlayın,
  kategori:'moderasyon'
};

exports.help = {
    name: 'mod-log',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};