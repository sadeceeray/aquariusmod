const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
exports.run = async (client, message, args) => {
  this.games = new Set();
  if(this.games.has(message.channel.id)) await message.reply('Kanal başına sadece bir düello meydana gelebilir.');
    const islem = Math.floor(Math.random() * (100 - 1)) + 1
    const fixedlisonuç = islem
    let choice;
    let haklar = 10
    await message.react('👌')
    this.games.add(message.channel.id);
    await message.channel.send(stripIndents`
					${message.author}, 0 ve 100 Arası Sayı Tuttum, Hadi Tahmin Et! <a:ates:812354149831934012>
					\`${haklar}\` Deneme Hakkın Kaldı.
				`);
           let uwu = false;
            while (!uwu && haklar !== 0) {
                const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 15000 });
              if(!response.first()) { 
                this.games.delete(message.channel.id);
                message.channel.send(`${message.author}, Maalesef! Zaman doldu!`)
                message.channel.send(`${message.author}, :shrug: Kaybettin! Sayı: \`${fixedlisonuç}\` :shrug: `)
              }              
                const choice = response.first().content
                if(isNaN(choice)) {
                  continue;
                }
                if (choice !== fixedlisonuç)  {
                  haklar -= 1
                  if(fixedlisonuç > choice) {
                  await message.channel.send(stripIndents`
					          ${message.author}, <:yukari:812354159587360809> Daha büyük numara söylemelisin! <:yukari:812354159587360809>
					          \`${haklar}\` Deneme Hakkın Var.
				          `);
                  continue;
                  }
                  if(fixedlisonuç < choice) {
                    await message.channel.send(stripIndents`
					          ${message.author}, <:assagi:812354159067004948> Daha kücük numara söylemelisin! <:assagi:812354159067004948>
					          \`${haklar}\` Deneme Hakkın Var.
				          `);
                  continue;
                  }
                }
                if (choice == fixedlisonuç) {
                  uwu = true
                }
                }
                if (haklar == 0) {
                  this.games.delete(message.channel.id);
                  await message.channel.send(`${message.author}, :shrug: Kaybettin! Sayı: \`${fixedlisonuç}\` :shrug:`)
                }
                if (uwu) {
                  this.games.delete(message.channel.id);
                  await message.channel.send(`${message.author}, <a:helal:812343763497517106>  Doğru Tahmin! Sayı: \`${fixedlisonuç}\` <a:helal:812343763497517106>`)
                try {
            } catch(e) {
              this.games.delete(message.channel.id);
            message.channel.send('Bir hata oluştu')
        }
    } else {
      this.games.delete(message.channel.id);
      return console.log('Bir hata oluştu')
    }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sayıtahmini', 'sayıtahmin', 'sayı-tahmini'],
  permLevel: 0
};
exports.help = {
    name: 'sayı-tahmin',
  description: 'Rastgele rakam belirler ve siz o rakamı bulmaya çalışırsınız.',
  usage: 'sayı-tahmin'
};