const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
 let kanal = message.mentions.channels.first()
if (!kanal) return message.channel.send('Kanal Etiketle')
   
  db.set(`küfürlog_${message.guild.id}`, kanal.id)
  message.channel.send(`Sunucuya Küfür Edenin Logu Buraya **${kanal}** Gelecektir.`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 3,
kategori:"yetkili"
};

exports.help = {
 name: 'küfürlog',
 description: 'kayıt Log kanalı seçersiniz',
 usage: 'kayıt-log <#kanal>'
};