const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message) => {

message.channel.send("ErayBey| Espri yükleniyor.").then(message => {

    var FwhyCode = [
 
      "<a:maviok:810524017303093280> Saçını sarıya boyatıp kaşlarını zift karası bırakınca doğal sarışın olmuyorsun tatlım. Borussia Dortmund deplasman forması gibi oluyon.",
      "<a:maviok:810524017303093280> Kar üzerinde yürüyen adama ne denir. Karabasan.",
      "<a:maviok:810524017303093280> Yıkanan Ton’a ne denir? Washington!",
      "<a:maviok:810524017303093280> Hava korsanı uçağı kaçıracaktı ama yapamadı çünkü uçağı kaçırdı.",
      "<a:maviok:810524017303093280> Geçen gün taksi çevirdim hala dönüyor.",
      "<a:maviok:810524017303093280> Adamın biri güneşte yanmış, ay da düz.",
      "<a:maviok:810524017303093280> Adamın biri kızmış istemeye gelmişler.",
      "<a:maviok:810524017303093280> Adamın kafası atmış bacakları eşek.",
      "<a:maviok:810524017303093280> Sakla samanı, inekler aç kalsın.",
      "<a:maviok:810524017303093280> Son gülen en geç anlayandır.",
      "<a:maviok:810524017303093280> Bebeğe patik giydirmeye çalışmışlar ama bebek giymemiş. Çünkü bebek anti-patik miş.",
      "<a:maviok:810524017303093280> Acaba rüyanın ortasında uyandığım zaman rüyamdaki karakterler “Anaaaa adam kayboldu gitti lan” diye şaşırıyor mudur?",
      "<a:maviok:810524017303093280> Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.",
      "<a:maviok:810524017303093280> Beni Ayda bir sinemaya götürme, Marsta bir sinemaya götür.",
      "<a:maviok:810524017303093280> Aaa siz çok terlemişsiniz durun size terlik getireyim.",
      "<a:maviok:810524017303093280> Aklımı kaçırdım, 100.000 TL fidye istiyorum."

    ];

    var FwhyCode = FwhyCode[Math.floor(Math.random() * FwhyCode.length)];

    message.edit(`${FwhyCode}`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["espiri", "espri-yap", "yap-espri", "yapbi-espri"],
  permLevel: 0
};

exports.help = {
  name: "espri",
  description: "Espri yapar.",
  usage: "espri"
};