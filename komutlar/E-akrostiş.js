const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix
exports.run = (client, msg, args) => {

var isim = args.slice().join(' ')

if(!isim) return msg.reply("Lütfen devamına isim yazın.")

var ku = isim.length

var birh = isim[0]
var ikih = isim[1]
var üçh = isim[2]
var dörth = isim[3]
var beşh = isim[4]
var altıh = isim[5]
var yedih = isim[6]
var sekizh = isim[7]
var dokuzh = isim[8]
var onh = isim[9]

if(ku==1){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+"dir onun baş harfi")
}
if(ku==2){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi")
}
if(ku==3){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi")
}
if(ku==4){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi\n"+dörth+" dir onun dördüncü harfi")
}
if(ku==5){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi\n"+dörth+" dir onun dördüncü harfi\n"+beşh+" dir onun beşinci harfi")
}
if(ku==6){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi\n"+dörth+" dir onun dördüncü harfi\n"+beşh+" dir onun beşinci harfi\n"+altıh+" dir onun altıncı harfi")
}
if(ku==7){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi\n"+dörth+" dir onun dördüncü harfi\n"+beşh+" dir onun beşinci harfi\n"+altıh+" dir onun altıncı harfi\n"+yedih+" dir onun yedinci harfi")
}
if(ku==8){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi\n"+dörth+" dir onun dördüncü harfi\n"+beşh+" dir onun beşinci harfi\n"+altıh+" dir onun altıncı harfi\n"+yedih+" dir onun yedinci harfi\n"+sekizh+" dir onun sekizinci harfi")
}
if(ku==9){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi\n"+dörth+" dir onun dördüncü harfi\n"+beşh+" dir onun beşinci harfi\n"+altıh+" dir onun altıncı harfi\n"+yedih+" dir onun yedinci harfi\n"+sekizh+" dir onun sekizinci harfi\n"+dokuzh+" onun dokuzuncu harfi")
}
if(ku==10){
  msg.channel.send(isim+" İçin Akrostiş Yazdım.\n\n"+birh+" dir onun baş harfi\n"+ikih+" dir onun ikinci harfi\n"+üçh+" dir onun üçüncü harfi\n"+dörth+" dir onun dördüncü harfi\n"+beşh+" dir onun beşinci harfi\n"+altıh+" dir onun altıncı harfi\n"+yedih+" dir onun yedinci harfi\n"+sekizh+" dir onun sekizinci harfi\n"+dokuzh+" onun dokuzuncu harfi\n"+onh+" dir onun onuncu harfi")
}






  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ak"],
  permLevel: 0
};

let use = "akrostiş"

exports.help = {
  name: use,
  description: use,
  usage: use
};