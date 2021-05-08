const Discord = require("discord.js");
exports.run = (client, message, args) => {
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Bu Komutu Kullanabilmek İçin **Üyeleri Yasakla** Yetkisine Sahip Olmalısınız.")
  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
 message.channel.createOverwrite(every, {
    SEND_MESSAGES: false
  });

  message.channel.send("<a:maviok:810524017303093280> Sohbet **Kilitlendi!** :lock:");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sohbetkapat"],
  kategori: "sohbetkapat",
  permLevel: 3
};

exports.help = {
  name: "kilitle",
  description: "Sohbetinizi kapatmaya yarar.",
  usage: "kapat"
};