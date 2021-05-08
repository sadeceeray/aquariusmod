const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  const giris = args[0]
  const dmmesaj = await db.fetch(`dmhg_${message.guild.id}`); 
  
  let prefix = ayarlar.prefix
 
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu komutu kullanabilmek için "\`Sunucuyu Yönet\`" yetkisine sahip olmalısın.`);
  
  let mesaj = args.slice(0).join(' ')
  
      if (!mesaj) {
        return message.channel.send(new Discord.MessageEmbed()
                                    .setColor(message.guild.me.displayColor)
                                    .setAuthor(`Sunucunuza birisi girdiğinde ona botun özelden göndereceği mesajı yazınız.`)
                                    .setDescription(`Sunucu adınız için **-sunucu-** , Giren kişinin adı için **-kullanıcı-**` +"\n"+`Örnek kullanım: \`${prefix}dm-hg-ayar Merhaba -kullanıcı- -sunucu- adlı sunucumuza hoşgeldin!\`\nİptal etmek için \`${prefix}dm-hg-ayar sıfırla\``))
    }
  
   if(giris === "sıfırla") {
    if(!dmmesaj) return message.channel.send(`Ayarlanmayan şeyi kapatamazsın!`)
    db.delete(`dmhg_${message.guild.id}`)
    message.channel.send(`Dm Hg Mesajı özelliği başarıyla devredışı bırakıldı!`)
    return
  }
  
    db.set(`dmhg_${message.guild.id}`, mesaj)
    message.channel.send(new Discord.MessageEmbed()
                         .setColor(message.guild.me.displayColor)
                         .setDescription(`Dm hoşgeldin mesajı başarıyla ayarlandı!` +"\n"+`Mesajınız: \`${mesaj}\` olarak ayarlandı.`))
}
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["dm-hg"],
    permLevel: 0
} 

exports.help = {
    name: 'dm-hg-ayar',
    description: 'dm hg işte',
    usage: 'yaz'
}