const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("Pythonic")
      .setTitle("Çekiliş botun komutları")
      .addField("🎁 Çekiliş 🎁","çekiliş [kanal] [zaman] [kazanan sayısı] [ödül]\nyeniden-çek [ödül ismi]\nbitir [ödül ismi]")
      .setTimestamp()
      .setFooter(`Command Requested By ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("**Yardım menümü dmlerine gönderdim! 💌, bi bak derim**");

    return message.author.send(help);
}

module.exports.help = {
  name: "yardım"
}
