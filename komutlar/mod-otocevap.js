const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {
  let prefix = ayarlar.prefix  
  let yazılar = db.fetch(`${message.guild.id}.otocevap.yazılar`)
  let cevaplar = db.fetch(`${message.guild.id}.otocevap.cevaplar`)
  let footer = db.fetch("footer")
  let efemm = args.slice(1).join(' ')
  let efemmm = args.slice(2).join(' ')
  let bilmefe = efemm.split(" | ")
  let bilmefee = efemmm.split(" | ")
  let ifefe = message.content.includes(" | ")
  var ekle = ["ekle","+","add"]
  var sil = ["sil","-","remove", "delete", "rm"]
  var list = ["liste","list"]
  var edit = ["edit","düzenle"]
if (list.includes(args[0])) {
  var efe = ""
  let xefe = db.fetch(`${message.guild.id}.otocevap.yazılar`).filter(a=> a !== null).length
  for (var i = 0; i < (db.fetch(`${message.guild.id}.otocevap.yazılar`) ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length : 0); i++) {
    efe += `${i +1}) *${yazılar[i]}* - **${cevaplar[i]}** \n`
  }
      if (!db.fetch(`${message.guild.id}.otocevap.yazılar`)) {
      efe += "Eklenmiş hiç bir otomatik olarak cevap verilecek mesaj yok."
    }
     if (db.fetch(`${message.guild.id}.otocevap.yazılar`).length == 0) {
      efe += "Eklenmiş hiç bir otomatik olarak cevap verilecek mesaj yok."
    }
const basarili = new Discord.MessageEmbed()
.setAuthor(`${message.author.username},`, message.author.avatarURL({ dynamic: true }))
.setDescription(efe)
.setColor("GREEN")
.setFooter(footer)
message.channel.send(basarili)
} else if (ekle.includes(args[0])) {
    if (!efemm) return message.channel.send("Olamaz! yanlış bir biçimde kullandın. Örnek kullanım: " + prefix +"otocevap ekle Senin Yazacağın Yazı | Botun Yazacağı")
    if (!ifefe) return message.channel.send("Yazdığın cümle-kelimelerin arasına boşluk bırakarak | koyman gerekiyor. Ayrıca | den **önce** ve **sonra** kelime-cümle yazmalısın.")
    if (!bilmefe[0]) return message.channel.send("Yazdığın cümle-kelimelerin arasına boşluk bırakarak | koyman gerekiyor. Ayrıca | den **önce** ve **sonra** kelime-cümle yazmalısın.")
  if (!bilmefe[1]) return message.channel.send("Yazdığın cümle-kelimelerin arasına boşluk bırakarak | koyman gerekiyor. Ayrıca | den **önce** ve **sonra** kelime-cümle yazmalısın.")
  if (yazılar ? yazılar.includes(bilmefe[0]) : 0) return message.channel.send("Bu otocevap zaten ekli.")
 db.push(`${message.guild.id}.otocevap.yazılar`, bilmefe[0]) 
 db.push(`${message.guild.id}.otocevap.cevaplar`, bilmefe[1]) 
const basarili = new Discord.MessageEmbed()
.setAuthor(`${message.author.username},`, message.author.avatarURL({ dynamic: true }))
.setDescription("Başarılı bir şekilde beklenen mesaj olarak `" + bilmefe[0] + "` eklendi, cevap olarak ise `" + bilmefe[1] + "` eklendi.")
.setColor("GREEN")
.setFooter(footer)
message.channel.send(basarili)
} else if (sil.includes(args[0])) {
  if (!yazılar) return message.channel.send("Eklenmiş hiç bir otocevap yok!")
  if (!args[1]) return message.channel.send("Silinmesi için bir otocevap ismi yazmalısın!")
  if (!yazılar.includes(efemm)) return message.channel.send("Uyarı! Yazılan otocevap ismi otocevaplar arasında bulunamadı.")
    for (var i = 0; i < (db.fetch(`${message.guild.id}.otocevap.yazılar`) ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length : 0); i++) {
    if (efemm == yazılar[i]) {
        const basarili = new Discord.MessageEmbed()
       .setAuthor(`${message.author.username},`, message.author.avatarURL({ dynamic: true }))
       .setDescription("Başarılı bir şekilde beklenen mesaj olarak `" + yazılar[i] + "` **silindi**, cevap olarak ise `" + cevaplar[i] + "` **silindi**.")
       .setColor("GREEN")
       .setFooter(footer)
      const asd = db.fetch(`${message.guild.id}.otocevap.yazılar`)
      asd.splice(i,1)
      db.set(`${message.guild.id}.otocevap.yazılar`, asd);
      const asdd = db.fetch(`${message.guild.id}.otocevap.cevaplar`)
      asdd.splice(i,1)
      db.set(`${message.guild.id}.otocevap.cevaplar`, asdd);
      message.channel.send(basarili)
  }}
} else if (edit.includes(args[0])) {
  if (!yazılar) return message.channel.send("Eklenmiş hiç bir otocevap yok!")
  if (!args[1]) return message.channel.send("Düzenlemek için bir otocevap ismi yazmalısın!")
  if (!yazılar.includes(args[1])) return message.channel.send("Uyarı! Yazılan otocevap ismi otocevaplar arasında bulunamadı.")
      if (!efemmm) return message.channel.send("Olamaz! yanlış bir biçimde kullandın. Örnek kullanım: " + prefix +"otocevap düzenle &lt;otocevapmesajı&gt; &lt;beklenecekmesaj&gt; | &lt;cevap&gt;")
    if (!ifefe) return message.channel.send("Yazdığın cümle-kelimelerin arasına boşluk bırakarak | koyman gerekiyor. Ayrıca | den **önce** ve **sonra** kelime-cümle yazmalısın.")
    if (!bilmefee[0]) return message.channel.send("Yazdığın cümle-kelimelerin arasına boşluk bırakarak | koyman gerekiyor. Ayrıca | den **önce** ve **sonra** kelime-cümle yazmalısın.")
  if (!bilmefee[1]) return message.channel.send("Yazdığın cümle-kelimelerin arasına boşluk bırakarak | koyman gerekiyor. Ayrıca | den **önce** ve **sonra** kelime-cümle yazmalısın.")
  for (var i = 0; i < (db.fetch(`${message.guild.id}.otocevap.yazılar`) ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length : 0); i++) {
    if (args[1] == yazılar[i]) {
        const basarili = new Discord.MessageEmbed()
       .setAuthor(`${message.author.username},`, message.author.avatarURL({ dynamic: true }))
       .setDescription("Başarılı bir şekilde eskiden beklenen mesaj olarak `" + yazılar[i] + "` **" + bilmefee[0] + "** olarak değiştirildi, cevap olarak ise `" + cevaplar[i] + "` **" + bilmefee[1] + "** olarak değiştirildi.")
       .setColor("GREEN")
       .setFooter(footer)
      const asd = db.fetch(`${message.guild.id}.otocevap.yazılar`)
      asd.splice(i,1)
      db.set(`${message.guild.id}.otocevap.yazılar`, asd);
      db.push(`${message.guild.id}.otocevap.yazılar`, bilmefee[0])
      const asdd = db.fetch(`${message.guild.id}.otocevap.cevaplar`)
      asdd.splice(i,1)
      db.set(`${message.guild.id}.otocevap.cevaplar`, asdd);
      db.push(`${message.guild.id}.otocevap.cevaplar`, bilmefee[1])
      message.channel.send(basarili)
  }}
} else {
  const embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username},`, message.author.avatarURL({ dynamic: true }))
.setDescription(`
Bu komutu kullanırken bilmen gerekenler:


**${ekle.join(", ")}** yazarsan yeni bir otocevap ekler.
**${sil.join(", ")}** yazarsan bir otocevabı siler.
**${list.join(", ")}** yazarsan sunucudaki otocevapları listeler.
**${edit.join(", ")}** yazarsan bir otocevabı editlersin.

Ek Bilgiler:
Bir otocevap eklerken veya editlerken **cevap** verilecek kısımda

**{sunucuadı}** yazarsanız {sunucuadı} yazılan kısımda sunucunun adı gözükecektir.
**{üyesayı}** yazarsanız {üyesayı} yazılan kısımda sunucudaki üye sayısı gözükecektir.

Eklenmesini istediğiniz başka şeyler varsa lütfen ulaşın.
`)
.setColor("GREEN")
.setFooter(footer)
  message.channel.send(embed) 
}}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  kategori: "moderasyon"
};
exports.help = {
  name: 'otocevap',
  description: 'Otomatik cevaplayıcı komutu.',
  usage: 'otocevap'
};