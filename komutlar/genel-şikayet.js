const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {


 let kanall = message.guild.channels.cache.find(r => r.name === "şikayet");

let sikayet = args.slice(0).join(' ')
let kisi = message.mentions.members.first()
if(!kisi) return message.channel.send("Kimi şikayet ettiğini belirt")
if(!sikayet) return message.channel.send("Şikayetini yaz!")
if(!kanall) return message.channel.send("Şikayet İsimli Kanal Bulamadım")
message.channel.send(

    new Discord.MessageEmbed()

    .setColor(message.guild.me.displayColor)

    .setTitle(':white_check_mark: Başarılı :white_check_mark:')

    .setDescription('Şikayetiniz gönderildi !'))

   let embed = new Discord.MessageEmbed()

    .setColor(message.guild.me.displayColor)

    .setTitle('Bir Şikayet Geldi!')

    .setAuthor(message.guild.name, client.user.avatarURL)

    .setThumbnail(message.author.avatarURL)

      .addField('Şikayet Eden', `**${message.author.tag}**`)
      .addField('Şikayet Edilen', `**${kisi.user.tag}**`)

      .addField('Şikayet: ', sikayet)

    

    kanall.send(embed)

}

exports.conf = {

	enabled : true,	guildOnly : false,

	aliases : ['şikayet-et'],

	permLevel : 0

}

exports.help = {

	name : 'şikayet',

	description : 'İstek kod',

	usage : 'istek'

}