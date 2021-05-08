const db = require("quick.db");

const {prefix} = require('../ayarlar.json')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {

      return message.channel.send(

        ""

      );

    }

    if (args.join("") === prefix) {

      db.delete(`prefix_${message.guild.id}`);

      return await message.channel.send("Prefix sıfırlandı!");

    }



    db.set(`prefix_${message.guild.id}`, args[0]);

    await message.channel.send(

      `Bot prefixi değiştirildi. Yeni prefix: \`${args[0]}\``

    );

  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "prefix",
  description: "Aquarius Moderasyon.",
  usage: "prefix"
};