const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json");

client.on("ready", () => {
    console.log("Logged in as Sugar!");
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'runway');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send("${member}", {
    file: "https://cdn.discordapp.com/attachments/596128802594095133/600876942576582688/sugar_guild_welcome.jpg" // Or replace with FileOptions object
});
});

client.on('message', msg => {
  if (msg.content === '!ping') {  //testing code with !ping
    msg.channel.send('pong');
  } else if (msg.content.split(" ")[0] === "!dice") { //Dice Roll with !dice (number of rolls)
    var numTimes = msg.content.split(" ")[1];
    if(isNaN(numTimes) || numTimes <=0) {msg.channel.send("Wrong format, use !dice 'number of rolls'"); return;}
    var numList = []
    for(var i = 0; i < numTimes; i++){
        numList[i] = Math.floor(Math.random()*101);
    }
    console.log(numList);
    msg.channel.send(String(numList));
  }
});

client.login(auth.token);