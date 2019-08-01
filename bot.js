const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json");
var request = require('request');
var cheerio = require('cheerio');
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
console.log(Date.now() + " Ping Received");
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
    console.log("Logged in as Sugar!");
    var dayMillseconds = 1000*60;
        setInterval(function(){ // repeat this every 24 hours
            sendMessage();
        }, dayMillseconds);
});

function leftToEight(){
    var d = new Date();
    return (-d + d.setHours(8,0,0,0));
}

function sendMessage(){
    request('https://www.celestialdn.net/', function(err, resp, body) {
        if (err)
                throw err;
        $ = cheerio.load(body);
        $('input').each(function() { 
  var url = ($(this).attr('value'));
  if(String(url).indexOf('DAILY-') != -1){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if(today.getHours() == 7 && today.getMinutes() == 5){
        today = mm + '/' + dd;
        client.channels.find('name', 'daily-coupon').send(today);
        client.channels.find('name', 'daily-coupon').send(String(url));
    }
  }
});
        //console.log(body);
});

}
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'runway');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(String(member), { file: "https://cdn.discordapp.com/attachments/594358849830387732/601281587560316928/sugarguilddiscord.jpg" // Or replace with FileOptions object 
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
