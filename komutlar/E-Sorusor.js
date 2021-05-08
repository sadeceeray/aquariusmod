 const Discord = require('discord.js')
const cevaplar = [
'Ben ne bileyim.',
                                    'Hayır.',
                                    'Evet.',
                                    'Evet, Kesinlikle.',
                                    'Buna güvenebilirsin.',
                                    'Gördüğüm kadarıyla, Evet.',
                                    'Büyük olasılıkla.',
                                    'Napim.',
                                    'çok ilginç bi soru düşünmem lazım dostum...',
                                    'Napim.',
                                    'Anlayamadım, tekrar edin.',
                                    'Daha sonra sor.',
                                    'Napim.',
                                    'Tahmin edemiyorum...',
                                    'Konsantre ol ve tekrar sor.',
                                    'Buna güvenme.',
                                    'Cevabım, hayır.',
                                    'Kaynaklarım hayır diyor.',
                                    'Olabilir.',
                                    'Çok şüpheli.',
                                    'Şüpheli.',
                                    'Büyük olasılıkla, hayır.',
                                    'Nasipte varsa.',
                                    'Kararsız kaldım, bidaha sormaya ne dersin?'   
];
exports.run = function(client, message, args) {
    var soru = args.join(' ');
    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
if(!soru) return message.channel.send('Bana sormak istediğin soruyu yazarmısın?')
    else message.reply(cevap)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };  
  exports.help = {
    name: 'sorusor',
    description: 'Bota soru sorarsınız.',
    usage: 'sorusor'
  };
 