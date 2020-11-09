const ms = require('ms');

exports.run = async (client, message, args) => {

  //Coded by Zero x Pythonic
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Çekiliş başlatmak için yetkiye sahip değilsin.');
    }

   //Coded by Zero x Pythonic
    let giveawayChannel = message.mentions.channels.first();
    //Coded by Zero x Pythonic
    if(!giveawayChannel){
        return message.channel.send(':x: Bir kanal etiketlemen lazım!');
    }

    //Coded by Zero x Pythonic
    let giveawayDuration = args[1];
   //Coded by Zero x Pythonic
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Bi zaman belirtmen lazım (d,h,m,s)!');
    }

//Coded by Zero x Pythonic
    let giveawayNumberWinners = args[2];
   //Coded by Zero x Pythonic
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Kaç kişinin çekilişi kazanacağını yazmalısın!');
    }

   //Coded by Zero x Pythonic
    let giveawayPrize = args.slice(3).join(' ');
    //Coded by Zero x Pythonic
    if(!giveawayPrize){
        return message.channel.send(':x: Bir ödül koymalısın');
    }

//Coded by Zero x Pythonic
    client.giveawaysManager.start(giveawayChannel, {
  //Coded by Zero x Pythonic
        time: ms(giveawayDuration),
//Coded by Zero x Pythonic
        prize: giveawayPrize,
//Coded by Zero x Pythonic
        winnerCount: giveawayNumberWinners,
   //Coded by Zero x Pythonic
        hostedBy: client.config.hostedBy ? message.author : null,
//Coded by Zero x Pythonic
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"çekiliş başladı",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"çekiliş bitti",
            timeRemaining: "Kalan süre: **{duration}**!",
            inviteToParticipate: "Katılamk için 🎉 emojisine basın",
            winMessage: "Tebrikler, {winners}! Kazandığın ödül: **{prize}**!",
            embedFooter: "Çekilişler",
            noWinner: "Çekilişe kimse katılmadığı için sona erdi.",
            hostedBy: "Çekilişi yapan: {user}",
            winners: "kazanan(lar)",
            endedAt: "Bittiği tarih",
            units: {
                seconds: "saniye",
                minutes: "dakika",
                hours: "saat",
                days: "gün",
                pluralS: false //Coded by Zero x Pythonic
            }
        }
    });

    message.channel.send(`bir çekiliş başladı, ${giveawayChannel}!`);

};