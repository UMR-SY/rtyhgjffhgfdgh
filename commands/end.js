const ms = require('ms');

exports.run = async (client, message, args) => {
  
//Coded by Zero x Pythonic
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Çekiliş yapmak için yeterli yetkiye sahip değilsin');
    }

//Coded by Zero x Pythonic
    if(!args[0]){
        return message.channel.send(':x: Bir mesaj idsi yazman gerekiyor!');
    }
  
//Coded by Zero x Pythonic
    let giveaway = 
//Coded by Zero x Pythonic
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
//Coded by Zero x Pythonic
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

//Coded by Zero x Pythonic
    if(!giveaway){
        return message.channel.send('Bir çekiliş için ödül bulamıyorum: `'+ args.join(' ') + '`.');
    }

//Coded by Zero x Pythonic
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
   //Coded by Zero x Pythonic
    .then(() => {
        //Coded by Zero x Pythonic
        message.channel.send('Bir çekiliş yakın zamanda bitiyor '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Mesaj idsi ${giveaway.messageID} olan çekiliş çoktan bitti.`)){
            message.channel.send('Bu çekiliş zaten bitti');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });

};