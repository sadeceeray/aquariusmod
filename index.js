const Discord = require("discord.js");
const client = new Discord.Client();
const jimp = require("jimp");
const db = require("quick.db");
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const wiodb = require('wio.db');
const { readdirSync } = require("fs");
const { join } = require("path");
const Canvas = require('canvas');
require("./util/eventLoader")(client);


//--------------------Oto Rol-----------------///
client.on("guildMemberAdd", member => {
let botrol = '' 
let üyerol = '803642313364471809'
  if (member.user.bot) {
  member.roles.add(botrol) 
  member.roles.add(botrol)
  member.roles.add(botrol) 
 } else {
member.roles.add(üyerol) 
member.roles.add(üyerol) 
member.roles.add(üyerol) 
};
});
//--------------------Oto Rol SON-----------------///


//-------------------- Eklenince-Atılınca mesaj bildirimi--------------------//


client.on("guildCreate", guild => {
  let xfalcon = client.channels.cache.get("835711393042006017") //Eklenince ve Atılınca Mesaj Atılcak Kanal ID.

 const darkmo = new Discord.MessageEmbed()
.setTitle("Sunucuya Eklendim")
.setColor("GREEN")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
xfalcon.send(darkmo)
});

client.on("guildDelete", guild => {
  let xfalcon = client.channels.cache.get("835711393042006017") //Eklenince ve Atılınca Mesaj Atılcak Kanal ID.

 const devtr = new Discord.MessageEmbed()
.setTitle("Sunucudan Atıldım")
.setColor("RED")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
xfalcon.send(devtr)
});
//-------------------- Eklenince-Atılınca mesaj bildirimi SON --------------------//

//-------------------- Genel Komutlar Burayı Elleme--------------------//

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
});

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


client.login(process.env.token);

//-------------------- Genel Komutlar SON --------------------//

//-------------------- Küfür Engel --------------------//


client.on("message", async msg => {
  
  let kisi = msg.author.id
   let kufurlog = await db.fetch(`küfürlog_${msg.author.id}`);
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "orospu", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();


                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", msg => {
  
  
 const i = db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
               const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "orospu", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

//--------------------Küfür Engel SON-----------------------//

//-------------------- Bota dm den atılan mesajlar --------------------//
client.on("message", msg => {
var dm = client.channels.cache.get("835711393042006017") //kanal id
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});
//-------------------- Bota dm den atılan mesajlar SON--------------------//

//-------------------- Sayaç --------------------//
client.on('guildMemberAdd', async member => {
  let user = member.user;
  let guild = member.guild;
  const sistemKanalID = await data.fetch(`sayaç.kanal.${guild.id}`);
  if(!sistemKanalID) return;
  let channel = guild.channels.cache.get(sistemKanalID);
  const sistemSayı = await data.fetch(`sayaç.sayı.${guild.id}`);
  if(!sistemSayı) return;
  let sayı = Number(sistemSayı);
  if(!sayı) return;
  let rol;
  const otoRole = await data.fetch(`oto.role.${guild.id}`);
  if(otoRole) {
  rol = `>>> **Sunucuya katılan kullanıcıya ${guild.roles.cache.get(otoRole)} rolü direk verildi!**`
  } else {
  rol = ''
  }
  if(guild.memberCount >= sayı) {
  data.delete(`sayaç.sayı.${guild.id}`);
  data.delete(`sayaç.kanal.${guild.id}`);
  channel.send(`> \`${user.tag}\` **az önce katıldı... yoksa katılmadı mı?**
  
  > **Toplam da** \`${guild.memberCount}\` **Kişi olduk! Sayaç tamamlandı! 🎉**
  
  ${rol}`)
  } else {
  channel.send(`> \`${user.tag}\` **az önce katıldı... yoksa katılmadı mı?**
  
  > **Toplam da** \`${guild.memberCount}\` **Kişi olduk!** \`${sayı}\` **Kullanıcı olmasına** \`${sayı-Number(guild.memberCount)}\` **Kullanıcı kaldı!**
  
  ${rol}`)
  }
  
})

client.on('guildMemberRemove', async member => {
  let user = member.user;
  let guild = member.guild;
  const sistemKanalID = await data.fetch(`sayaç.kanal.${guild.id}`);
  if(!sistemKanalID) return;
  let channel = guild.channels.cache.get(sistemKanalID);
  const sistemSayı = await data.fetch(`sayaç.sayı.${guild.id}`);
  if(!sistemSayı) return;
  let sayı = Number(sistemSayı);
  if(!sayı) return;
  const attachment = new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/766636339361480727/766636500891729930/giphy.gif');
  channel.send(`> \`${user.tag}\` **Gittiğini fark ettim Aaaaaa!**
  
  > **Toplam da** \`${guild.memberCount}\` **Kişi olduk!** \`${sayı}\` **Kullanıcı olmasına** \`${sayı-Number(guild.memberCount)}\` **Kullanıcı kaldı!**`, attachment)
  
})
//-------------------- Sayaç SON --------------------//
//--------------- Bilinmiyor--------------------//
client.on('guildMemberAdd', async member => {
let user = member.user;
let guild = member.guild;

const systemTagData = await data.fetch(`ototag.${guild.id}`);
const systemChannelData = await data.fetch(`ototag.log.${guild.id}`);
const systemNameData = await data.fetch(`otoisim.${guild.id}`);
if(!systemNameData) return;

let systemChannel;
if(systemChannelData) systemChannel = guild.channels.cache.get(systemChannelData);

let systemTag;
if(systemTagData) systemTag = String(systemTagData);

let replacedName;
if(systemTag) {
replacedName = systemNameData.replace('+kullanıcı', user.username).replace('+tag', systemTag);
} else {
replacedName = systemNameData.replace('+kullanıcı', user.username);
};

member.setNickname(replacedName);
if(systemChannel) systemChannel.send(`${member} giriş yaptı. Değişiklik: ${user.username} -> ${replacedName}`);
});
//-------------------- Bilinmiyor Son --------------------//
//-------------------- Prefix Sistemi --------------------//

client.on("message", async message => {

  if (message.author.bot) return;

  if (!message.guild) return;

  let prefix = db.get(`prefix_${message.guild.id}`);

  if (prefix === null) prefix = prefix;



  if (!message.content.startsWith(prefix)) return;



  if (!message.member)

    message.member = await message.guild.fetchMember(message);



  const args = message.content

    .slice(prefix.length)

    .trim()

    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  
  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

});

//-------------------- Prefix Sistemi SON --------------------//


//-------------------- AFK Sistemi --------------------//
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.reply(`Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){

       msg.reply(`Afk'lıktan Çıktınız`)
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});
//-------------------- AFK Sistemi SON --------------------//

module.exports = message => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let karaliste = db.fetch(`devtr.karaliste_${message.author.id}`)
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.cache.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.cache.get(client.aliases.cache.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    if(karaliste) return message.channel.send(`:x: Komutları Kullanman Sahibim Tarafından Yasaklandı!`)
    cmd.run(client, message, params, perms);
  }
};


//-------DM-HG----------////
client.on('guildMemberAdd', async member => {
  let mesaj = await db.fetch(`dmhg_${member.guild.id}`)
  if (!mesaj) return;
  member.send(mesaj ? mesaj.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
});

//-------DM-HG SON----------////


//-------------------- MOD-LOG Sistemi --------------------//

client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal**", `${kanal}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Silme")

.addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Silme")

.addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi**", `${entry.reason}`)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

.setTimestamp()
.setColor("RANDOM")
.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)
client.channels.cache.get(modlog).send(embed)

})



client.on('messageDelete', async message => {    
        if(message.author.bot) return
      
        const kanal = message.guild.channels.cache.find(c => c.id === '833277382822461460')
        if (!kanal) return;


          let dcs = new Discord.MessageEmbed()
                          .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                          .setTitle("Mesaj silindi")                
                          .addField(`Silinen mesaj :`,`\`${message.content}\``)
                          .addField(`Kanal:`,`\`${message.channel.name}\``)
                          .setTimestamp()
                          .setColor("RED")
      
                          kanal.send(dcs)
      });
      
      client.on('messageUpdate', async(oldMessage, newMessage) => {
          if(oldMessage.author.bot) return;
          if(oldMessage.content == newMessage.content) return;

        const kanal = oldMessage.guild.channels.cache.find(c => c.id === '833277746594971664')
        if (!kanal) return;


      
          let dcs2 = new Discord.MessageEmbed()
          .setTitle("Mesaj güncellendi!")
          .addField("Eski mesaj : ",`${oldMessage.content}`)
          .addField("Yeni mesaj : ",`${newMessage.content}`)
          .addField("Kanal : ",`${oldMessage.channel.name}`)
          .setTimestamp()
          .setColor("YELLOW")
      
          kanal.send(dcs2)
      });

//-------------------- MOD-LOG Sistemi SON --------------------//


//---çekiliş---///

client.on('ready', async () => {
  
      function destructMS(milli) {
        if (isNaN(milli) || milli < 0) {
          return null;
        }
      
        var d, h, m, s;
        s = Math.floor(milli / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        var yazi;
        if (d !== 0) yazi = `${d} gün`;
        if (h !== 0 && yazi) yazi = yazi + `, ${h} saat`;
        if (h !== 0 && !yazi) yazi = `${h} saat`;
        if (m !== 0 && yazi) yazi = yazi + `, ${m} dakika`;
        if (m !== 0 && !yazi) yazi = `${m} dakika`;
        if (s !== 0 && yazi) yazi = yazi + `, ${s} saniye`;
        if (s !== 0 && !yazi) yazi = `${s} saniye`;
        if (yazi) return yazi;
        if (!yazi) return `1 saniye`;
      };
  
      function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}
  
      function cekme(message, array) {
      var eskikazananlar = db.fetch(`cekilis_${message.id}.kazananlar`) || []
      var cekilenkisi = array[Math.floor(Math.random() * array.length)]
      if (!client.users.cache.get(cekilenkisi.id)) {
        return cekme(message, array)
      }
      while (eskikazananlar.includes(cekilenkisi.id)) {
        return cekme(message, array)
      }
      if (!eskikazananlar.includes(cekilenkisi.id)) {
        if (db.has(`cekilis_${message.id}.kazananlar`)) {
          db.push(`cekilis_${message.id}.kazananlar`, cekilenkisi.id)
        }else{
          db.set(`cekilis_${message.id}.kazananlar`, [cekilenkisi.id])
        }
      }
    }
  
  let dasall = db.all().filter(i => i.ID.startsWith('cekilis_'))
  for (const ii of dasall) {
    const channel = client.channels.cache.get(db.fetch(`${ii.ID}.mesaj.kanal`))
    const mesaj = db.fetch(`${ii.ID}.mesaj.id`)
    const bitecegizamanms = db.fetch(`${ii.ID}.bitecek`)
    const kazanacak = db.fetch(`${ii.ID}.kazanacak`)
    const verilecek = db.fetch(`${ii.ID}.verilecek`)
    const cekilisid = db.fetch(`${ii.ID}.cekilisid`)
    let embed = new Discord.MessageEmbed()
    .setAuthor('🎉 Çekiliş 🎉')
    .setTitle('**' + verilecek + '**')
    .setDescription(`Aşağıdaki 🎉 emojisine tıklayarak çekilişe katılabilirsiniz!\n**Kalan süre:** Bekleniyor...`)
    .setFooter(`Kazanan Sayısı: ${kazanacak} \nID: ${cekilisid}`)
    .setColor("#2F3136")
    if(channel) {
channel.messages.fetch(mesaj).then(async msg => {
  msg.edit(embed)
  const reaction = msg.reactions.cache.first()
                const intervaley = setInterval(async function(){
                if (!db.has(ii.ID)) return clearInterval(intervaley)
                const kalanzaman = bitecegizamanms - Date.now()   
                if (kalanzaman <= 0) {
                  embed.setDescription(`Çekiliyor...`)
                  msg.edit(embed)
                  clearInterval(intervaley)
                  reaction.users.fetch().then(async kasiler => {
                    const gercekkisisayisi = kasiler.size - 1
                    if (gercekkisisayisi < kazanacak) {
                        let embed = new Discord.MessageEmbed()
                        .setAuthor('🎉 Çekiliş Bitti 🎉')
                        .setTitle('**' + verilecek + '**')
                        .setDescription(`Yeterli katılım olmadığından kazanan seçilemedi.`)
                        .setFooter(`${kazanacak} kazanan | Çağan#0552 Tarafından Sağlanmıştır | ID: ${cekilisid} | Bitti:`)
                        .setTimestamp(bitecegizamanms)
                        .setColor("#2F3136")
                        msg.edit(embed)
                        msg.reactions.removeAll()
                        db.delete(`cekilis_${msg.id}`)
                        let thall = db.all().filter(i => i.ID.includes(msg.id))
                        for (const uu of thall) {
                          db.delete(uu.ID)
                        }
                    }else{
                        var array = reaction.users.cache.array()
                        var ukuk;
                        for (ukuk = 0; ukuk < kazanacak; ukuk++) {
                          cekme(msg, array)
                        }
                      await sleep(50)
                        let kazananherkes = db.fetch(`cekilis_${msg.id}.kazananlar`)
                            let embed = new Discord.MessageEmbed()
                            .setAuthor('🎉 Çekiliş Bitti 🎉')
                            .setTitle('**' + verilecek + '**')
                            .setDescription(`**Kazananlar:** <@${kazananherkes.join('>, <@')}>`)
                            .setFooter(`Kazanan Sayısı: ${kazanacak} \nID: ${cekilisid}`)
                            .setTimestamp(bitecegizamanms)
                            .setColor("#2F3136")
                            msg.edit(embed)
                            msg.channel.send(`**Tebrikler!** \nKazananlar: <@${kazananherkes.join('>, <@')}>! \nVerilecek: \`${verilecek}\``)
                            db.set(`cekilisidsi_${cekilisid}.kazananlar`, kazananherkes)
                            db.delete(`cekilis_${msg.id}`)
                            let theall = db.all().filter(i => i.ID.includes(msg.id))
                            for (const ua of theall) {
                              db.delete(ua.ID)
                            }
                    }
                  })
                }else{
                const kalanzamanyazi = destructMS(kalanzaman)
                embed.setDescription(`Aşağıdaki 🎉 emojisine tıklayarak çekilişe katılabilirsiniz!\n**Kalan süre:** ${kalanzamanyazi}`)
                msg.edit(embed)
                }
            }, 5000)
         })
    }
  }
})

//---sınırsız-oto-cevap----///
client.on("message", async message => {
  if (message.author.bot) return;
   let yazılar = db.fetch(`${message.guild.id}.otocevap.yazılar`)
   let cevaplar = db.fetch(`${message.guild.id}.otocevap.cevaplar`)
  var efe = ""
  let sunucuadı = message.guild.name
  let üyesayı = message.guild.members.cache.size
      for (var i = 0; i < (db.fetch(`${message.guild.id}.otocevap.yazılar`) ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length : 0); i++) {
    if (message.content.toLowerCase() == yazılar[i].toLowerCase()) {
        efe += `${cevaplar[i].replace("{sunucuadı}", `${sunucuadı}`).replace("{üyesayı}", `${üyesayı}`)}`
        message.channel.send(`${efe}`)
    }
}
})

//--üye--koruma---//
client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`kanal_${member.guild.id}`)
  let rol = await db.fetch(`rol_${member.guild.id}`)
  let security = await db.fetch(`koruma_${member.guild.id}`)
  let user = client.users.cache.get(member.id);

  if (security == 'kapali') return;
  if (security == 'acik') {

  const zaman =  new Date().getTime() - user.createdAt.getTime()
  
  if (zaman < 259200000) { 
  
  client.channels.cache.get(kanal).send(`${member} isimli kullanıcı fake şüphesi ile karantinaya alındı!`)
  member.send("Fake üye olduğun için seni karantinaya aldım!").catch(() => console.log(`DM Kapalı.`))
  member.roles.add(rol)
  
  }
}
})

//----sayaç----//
client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`<a:maviok:810524017303093280> **${member.user.tag}** Sunucudan ayrıldı! <:zgn:812354150062751744> \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`<a:maviok:810524017303093280> **${member.user.tag}** Sunucuya Katıldı! <:mutlu:812354149802967068> \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
//----///
client.on('guildMemberAdd', async member => {
  let user = member.user;
  let guild = member.guild;
  const sistemKanalID = await data.fetch(`sayaç.kanal.${guild.id}`);
  if(!sistemKanalID) return;
  let channel = guild.channels.cache.get(sistemKanalID);
  const sistemSayı = await data.fetch(`sayaç.sayı.${guild.id}`);
  if(!sistemSayı) return;
  let sayı = Number(sistemSayı);
  if(!sayı) return;
  let rol;
  const otoRole = await data.fetch(`oto.role.${guild.id}`);
  if(otoRole) {
  rol = `>>> **Sunucuya katılan kullanıcıya ${guild.roles.cache.get(otoRole)} rolü direk verildi!**`
  } else {
  rol = ''
  }
  if(guild.memberCount >= sayı) {
  data.delete(`sayaç.sayı.${guild.id}`);
  data.delete(`sayaç.kanal.${guild.id}`);
  channel.send(`> \`${user.tag}\` **az önce katıldı... yoksa katılmadı mı?**
  
  > **Toplam da** \`${guild.memberCount}\` **Kişi olduk! Sayaç tamamlandı! 🎉**
  
  ${rol}`)
  } else {
  channel.send(`> \`${user.tag}\` **az önce katıldı... yoksa katılmadı mı?**
  
  > **Toplam da** \`${guild.memberCount}\` **Kişi olduk!** \`${sayı}\` **Kullanıcı olmasına** \`${sayı-Number(guild.memberCount)}\` **Kullanıcı kaldı!**
  
  ${rol}`)
  }
  
})
const data = require('quick.db');
client.on('guildMemberRemove', async member => {
  let user = member.user;
  let guild = member.guild;
  const sistemKanalID = await data.fetch(`sayaç.kanal.${guild.id}`);
  if(!sistemKanalID) return;
  let channel = guild.channels.cache.get(sistemKanalID);
  const sistemSayı = await data.fetch(`sayaç.sayı.${guild.id}`);
  if(!sistemSayı) return;
  let sayı = Number(sistemSayı);
  if(!sayı) return;
  const attachment = new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/766636339361480727/766636500891729930/giphy.gif');
  channel.send(`> \`${user.tag}\` **Gittiğini fark ettim Aaaaaa!**
  
  > **Toplam da** \`${guild.memberCount}\` **Kişi olduk!** \`${sayı}\` **Kullanıcı olmasına** \`${sayı-Number(guild.memberCount)}\` **Kullanıcı kaldı!**`, attachment)
  
})

//---fakesistem--//
client.on('guildMemberAdd', async member => {
let user = member.user;
let guild = member.guild;

const systemRoleData = await data.fetch(`fake.role.${guild.id}`);
if(!systemRoleData) return;

if(user.createdAt.getTime() <= 432000000) {
member.roles.set([]);
member.roles.set([systemRoleData]);
member.user.send(new Discord.MessageEmbed()
.setTitle('Yeni Hesap Kullanıyorsun!')
.setDescription(`>>> \`${guild.name}\` __Sunucusu için, Yeni hesap olduğunuzu tespit ettim. **5 Gün** içerisinde olan hesapları cezalıya atıyorum!__`)
.addField('• Bilgilendirme', '**Sunucu içerisinde ki yetkililere bildirmelisiniz.**')
.setColor('#351742'));
};
});

client.on('message', async message => {
  if(message.channel.type !== 'text') return;
const chimped = await data.fetch(`chimped.${message.guild.id}`);
if(!chimped) return;
let command = chimped.find(a => a.command === message.content.toLocaleLowerCase());
if(command) {
message.channel.send(`${message.author} ${command.respond}`);
};
});


///-------koruma-sistemi--------///
client.on("message", async msg => {
  var sistem = await db.fetch(`ddos`);
  if (sistem === true) {
    if (client.ping > 400) {
      var bölgeler = [
        "singapore",
        "eu-central",
        "india",
        "us-central",
        "london",
        "eu-west",
        "amsterdam",
        "brazil",
        "us-west",
        "hongkong",
        "us-south",
        "southafrica",
        "us-east",
        "sydney",
        "frankfurt",
        "russia"
      ];
      var yeniBölge = bölgeler[Math.floor(Math.random() * bölgeler.length)];
      msg.guild.setRegion(yeniBölge);
      let kanal = msg.guild.channels.find(c => c.name === "anti-ddos");
      if (!kanal) {
        msg.guild.createChannel(`anti-ddos`, `text`).then(ch => {
          let ever = msg.guild.roles.find(r => r.name === "@everyone");
          ch.overwritePermissions(ever, {
            VIEW_CHANNEL: false
          });
          setTimeout(async function() {
            ch.send(
              `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
            );
          }, 1500);
        });
      } else {
        kanal.send(
          `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
        );
      }
    }
  } else {
  }
});
client.on("emojiDelete", async emo => {
  var sistem = await db.fetch(`emo`);
  if (emo === null) return;
  else {
    const entry = await emo.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    const exec = await emo.guild.members.get(entry.executor.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    emo.guild.createEmoji(emo.url, emo.name);
    exec.removeRoles(exec.roles);
    setTimeout(async function() {
      let role = emo.guild.roles.find(r => r.name === "Cezalı");
      if (!role) {
        emo.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: emo.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            exec.addRole(rol);
          })
          .catch(e => console.error(e));
        setTimeout(async function() {});
      } else {
        exec.addRole(role);
      }
    }, 400);
  }
});
client.on("channelDelete", async channel => {
  var sistem = await db.fetch(`kanal`);
  if (sistem === null) return;
  else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    const exec = await channel.guild.members.cache.get(entry.executor.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    exec.removeRoles(exec.roles);
    setTimeout(async function() {
      let role = channel.guild.roles.find(r => r.name === "Cezalı");
      if (!role) {
        channel.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: channel.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            exec.addRole(rol);
          })
          .catch(e => console.error(e));
        setTimeout(async function() {});
      } else {
        exec.addRole(role);
      }
    }, 400);
  }
});
client.on("guildMemberAdd", async member => {
  if (!member.user.bot) return;
  var sistem = await db.fetch(`rightbot`);
  if (sistem === null) return;
  let log = await member.guild
    .fetchAuditLogs()
    .then(denetim => denetim.entries.first());
  let botuSokan = log.executor.id;
  if (member.guild.ownerID === botuSokan) return;
  else {
    let botuSokanv2 = await member.guild.members.cache.get(botuSokan);
    let cezalı = member.guild.roles.find(r => r.name === "Cezalı");
    if (!cezalı) {
      try {
        member.guild
          .roles.create({
            name: "Cezalı",
            color: "GREY",
            position: member.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            botuSokanv2.roles.remove(botuSokanv2.roles);
            setTimeout(async function() {
              botuSokanv2.roles.add(rol);
            }, 500).catch(e => console.error(e));
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        botuSokanv2.roles.remove(botuSokanv2.roles);
        setTimeout(async function() {
          botuSokanv2.roles.add(cezalı);
          member.ban(
            `Bot koruma sistemi, ${botuSokanv2.user.tag} tarafından ${member.user.tag} botu sokuldu, sistem tarafından yasaklandı.`
          );
        }, 500);
      } catch (e) {
        console.log(e);
      }
    }
  }
});
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  let eklenenRol = newMember.roles.cache.filter(rol => !oldMember.roles.cache.has(rol.id));
  if (eklenenRol.size > 0) {
    if (
      db.has(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`
      ) === false
    ) {
      db.set(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`,
        eklenenRol.map(r => r.members.map(m => m.id))
      );
    } else {
      db.delete(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`
      );
      setTimeout(async function() {
        db.set(
          `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
            rol => rol.id
          )}`,
          eklenenRol.map(r => r.members.map(m => m.id))
        );
      }, 150);
    }
  }
});
client.on("roleDelete", async role => {
  var sistem = await db.fetch(`rol`);
  if (sistem === null) return;
  let log = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(kay => kay.entries.first());
  let exec = role.guild.members.cache.get(log.executor.id);
  if (exec.hasPermission("ADMINISTRATOR")) return;
  else {
    let cezalı = role.guild.roles.find(r => r.name === "Cezalı");
    if (!cezalı) {
      try {
        role.guild
          .roles.create({
            name: "Cezalı",
            color: "GREY",
            position: role.guild.roles.size - 1,
            permissions: []
          })
          .then(r => {
            exec.roles.remove(exec.roles);
            setTimeout(async function() {
              exec.roles.add(r);
            }, 500);
          })
          .catch(e => console.error(e));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        exec.roles.remove(exec.roles);
        setTimeout(async function() {
          exec.roles.add(cezalı);
        });
      } catch (e) {
        console.log(e);
      }
    }
    let members = await db.fetch(`${role.guild.id}.${role.id}`);
    members.cache.forEach(ui => {
      console.log(ui);
    });
  }
});
client.on("guildBanAdd", async (guild, user) => {
  var sistem = await db.fetch(`rightban`);
  if (sistem === null) return;
  else {
    let log = guild
      .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
      .then(k => k.entries.first());
    let exec = guild.members.cache.get(log.executor.id);
    let banned = guild.members.cache.get(user.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    else {
      exec.removeRol(exec.roles);
      let cezalı = guild.roles.find(r => r.name === "Cezalı");
      if (!cezalı) {
        try {
          guild
            .roles.create({
              name: "Cezalı",
              color: "GREY",
              position: guild.roles.size - 1,
              permissions: []
            })
            .then(r => {
              exec.roles.add(r);
            })
            .catch(e => console.log(e));
          setTimeout(async function() {
            exec.roles.remove(exec.roles);
          }, 200);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          exec.roles.add(cezalı);
          setTimeout(async function() {
            exec.roles.remove(exec.roles);
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
});


///------------sürelimesaj------------//



// oto tepki verme //

client.on('message', async (msg) => {
      if (msg.channel.id !== "799170701968932894") return;//KANALID Diye Belirttiğim Kısma Kanal ID Yaz
await msg. react('812354149684740126')
await msg. react('812354149677137962')
});


// SNİPE //

client.on('messageDelete', message => {
  const anan = require("quick.db")
  anan.set(`snipe.mesaj.${message.guild.id}`, message.content)
  anan.set(`snipe.id.${message.guild.id}`, message.author.id)

})

// 7 / 24 SES //

client.on("ready", () => {
  client.channels.cache.get("835022125026639882").join();
});

// ANTİ RAİD //

client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
  if (!kanal) return;  
  var darknesyt = member.guild.owner
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let darknesguardv2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL())
      .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **!bot-izni kaldır <botid>**.`);
    darknesyt.send(darknesguardv2);
     } else {
       let izinverilmemişbot = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL())
      .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot sunucuya eklendi ve kickledim eğer izin vermek istiyorsanız **" + "!bot-izni ver <botid>**")
       member.kick();// Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
       darknesyt.send(izinverilmemişbot)
}
  }
});

//-----------------------TAG-ROL----------------------\\ 

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('798969533016047666'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var ekipTag = "ꂑ"; // Buraya Ekip Tag
  var ekipRolü = "811370994240978944"; // Buraya Ekip Rolünün ID
  var logKanali = "812156113285415002"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.roles.add(ekipRolü);
      await uye.roles.add(ekipRolü);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} Adlı üyemiz güzel tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} Adlı üyemiz tagımızı bırakarak aramızdan ayrıldı.. Vatan Haini!!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\   

client.on("guildMemberAdd", member => {
  let sunucuid = "798969533016047666"; //Buraya sunucunuzun IDsini yazın
  let tag = "ꂑ"; //Buraya tagınızı yazın
  let rol = "811370994240978944"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'tag-log'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('812156113285415002').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\   
//-----------------------OTO-CEVAP----------------------\\   


client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'puşt') {
    msg.reply('Sensin lan PUŞT!');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'ben hileyim') {
    msg.channel.send('Aha! Ban Geliyor Ban Çiki Çiki Ban Ban.');
  }
});


client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'selamin aleyküm') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sea') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 's.a') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'selamın aleyküm') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'selamünaleyküm') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'selamün aleyküm') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
    msg.reply('**Aleykümselam Hoş Geldin!** <a:parlak:829605758529437737>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'günaydın') {
    msg.channel.send('Günaydın Aşk Böceğim <3');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'iyi geceler') {
    msg.channel.send('https://tenor.com/view/iyi-geceler-baby-cute-blanket-tucking-in-gif-17703925');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot') {
    msg.reply('Efendim Tamtlım, Nasıl Yardımcı Olabilirim Sana? <:mutlu:812354149802967068>');
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot nasılsın') {
    msg.reply('Yaaa <:mutlu:812354149802967068>  iyiyim sen nasılsın?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot naber') {
    msg.reply('Bu seni hiç alakadar etmez');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'naber bot') {
    msg.reply('Bu seni hiç alakadar etmez');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'nasılsın bot') {
    msg.reply('Yaaa <:mutlu:812354149802967068>  iyiyim sen nasılsın?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot seni seviyorum') {
    msg.reply('Şapşalllll <:mutlu:812354149802967068>  Bende seni seviyorum :heart:');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'seni seviyorum bot') {
    msg.reply('Şapşalllll :relaxed: Bende seni seviyorum :heart:');
  }
});


client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'cinsiyetin ne bot') {
    msg.reply('Botum ben farkında mısın?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot cinsiyetin ne') {
    msg.reply('Botum ben farkında mısın?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot adın ne') {
    msg.reply('Ben Deniz Rüpiter. Memnun oldum. <:mutlu:812354149802967068>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'adın ne bot') {
    msg.reply('Ben Deniz Rüpiter. Memnun oldum. <:mutlu:812354149802967068>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'mal bot') {
    msg.reply('Özür dilerim <:zgn:812354150062751744>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot mal') {
    msg.reply('Özür dilerim <:zgn:812354150062751744>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot nabıyon') {
    msg.reply('Sunucunun daha iyi yerlere gelmesi için çalışıyorum. <a:efekt:810524125684432906> Sen ne yapıyorsun?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot ne yapıyon') {
    msg.reply('Sunucunun daha iyi yerlere gelmesi için çalışıyorum. <a:efekt:810524125684432906> Sen ne yapıyorsun?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot napıyon') {
    msg.reply('Sunucunun daha iyi yerlere gelmesi için çalışıyorum. <a:efekt:810524125684432906> Sen ne yapıyorsun?');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot çok güzelsin') {
    msg.reply('Çok teşekkür ederim şapşall <:mutlu:812354149802967068>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'çok güzelsin bot') {
    msg.reply('Çok teşekkür ederim şapşall <:mutlu:812354149802967068>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot sevgilin var mı') {
    msg.reply('Kimse Beni Sevmiyor ki <:zgn:812354150062751744>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sevgilin var mı bot') {
    msg.reply('Kimse Beni Sevmiyor ki <:zgn:812354150062751744>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot sevgilin var mı?') {
    msg.reply('Kimse Beni Sevmiyor ki <:zgn:812354150062751744>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot benimle çıkar mısın?') {
    msg.reply('Ayrı Dünyaların insanıyız be <:zgn:812354150062751744> ');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot benimle çıkar mısın') {
    msg.reply('Ayrı Dünyaların insanıyız be <:zgn:812354150062751744> ');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'benimle çıkar mısın bot') {
    msg.reply('Ayrı Dünyaların insanıyız be <:zgn:812354150062751744> ');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot ne yazıyon') {
    msg.reply('fetöyü hekliyom ');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot cortex senin yerini almak istiyor') {
    msg.channel.send('Ekmek paramla oynuyor terbiyesiz! <:kizgin:812748201060073472> <:kizgin:812748201060073472>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot eray mal mı') {
    msg.reply('Hayır! O Yakışıklı bir Beyefendi.');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot seni sevmiyorum') {
    msg.reply('O-OLAMAZZ! <:zgn:812354150062751744> Bu Beni 1-2 saniye filen üzer.');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot kedi mi köpek mi') {
    msg.reply('Ben Kedi demek istiyorum.');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot kedi mi köpek mi?') {
    msg.reply('Ben Kedi demek istiyorum.');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot ben malım') {
    msg.reply('Öyle deme şapşalll');
  }
});



client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'bot sahibin kim') {
    msg.reply('Yakışıklı mı yakışıklı, karizma mı karizma, sap mı sap bir <@539405761533575179>');
  }
});





client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tag al') {
    msg.channel.send('<a:tagal:835828957827956768>');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tagal') {
    msg.channel.send('<a:tagal:835828957827956768>');
  }
});



//-------------Kendini Sağirlaştirma Komutu ---------------\\

client.on('voiceStateUpdate', async (___, newState) => {
if (
newState.member.user.bot &&
newState.channelID &&
newState.member.user.id == client.user.id &&
!newState.selfDeaf
) {
newState.setSelfDeaf(true);
}
});
//---------------------------------------------------------\\