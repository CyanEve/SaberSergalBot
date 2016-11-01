var Discord = require("discord.js"); //dependancy
const mysql = require('mysql');
var AuthDetails = require('./auth.json');

var bot = new Discord.Client();

var prefix = ">";

var connection = mysql.createConnection({
  host: "localhost",
  user: "SergalBot",
  password: AuthDetails.password,
  database:"sergalbot"
});
connection.connect();

var commands = {   //commands list, implemented.
  /*"command": {  //how to add a command
    usage: "syntax for usage",
    description: "does x"
    process: function(bot, msg, suffix){
      //does this
    }
  },*/
  "ping": {
       usage: ">ping | <no arguments>",
       description: "responds pong, useful for checking if bot is alive",
       process: function(bot, msg, suffix) {
        console.log("Pinged by " + msg.author.name + ", Responding...");
        bot.sendMessage(msg.channel, msg.sender+" PONG!");
        if(suffix){
          bot.sendMessage(msg.channel, "note that !ping takes no arguments!");
        }
      }
   },
   "rape": {
     usage: ">rape | <user>",
     description: "Makes the bot rape a user",
     process: function(bot, msg, suffix){
       if(!suffix){
         console.log("Raping " + msg.author.name + "...");
         bot.sendMessage(msg.channel, "*Rapes " + msg.author.name + " gently*");
       } else {
         if (suffix.startsWith("@")){
           var username = suffix.split("@")[1];
           console.log("Raping " + username + "...");
           bot.sendMessage(msg.channel, "*Rapes " + username + " gently*");
         } else {
           console.log("Raping " + suffix + "...");
           bot.sendMessage(msg.channel, "*Rapes " + suffix + " gently*");
         }
       }
     }
   },
   "murder": {
     usage: ">murder | user",
     description: "Have the bot murder a user.",
     process: function(bot, msg, suffix){
       if(!suffix){
         console.log("Murdering " + msg.author.name + "...");
         bot.sendMessage(msg.channel, "*Murders " + msg.author.name + " not-so-gently*");
       } else {
         if (suffix.startsWith("@")){
           var username = suffix.split("@")[1];
           console.log("Murdering " + username + "...");
           bot.sendMessage(msg.channel, "*Murders " + username + " not-so-gently*");
         } else {
           console.log("Murdering " + suffix + "...");
           bot.sendMessage(msg.channel, "*Murders " + suffix + " not-so-gently*");
         }
       }
     }
   }

};

bot.on("serverCreated", function(server) {  //Run when the bot is added to a server
  console.log("Trying to insert server " + server.name + " into database");
  var info = {
    "servername": "'" + server.name + "'",
    "serverid": server.id,
    "ownerid": server.owner.id,
    "prefix": ">"
  }
  connection.query("INSERT INTO servers SET ?", info, function(error) { //add the server to the database.  !!!SQL!!!
    if(error){
      console.log(error);
    } else {
      console.log("Server added.");
    }
  })
});

bot.on("serverDeleted", function(server) {  //run when the bot is removed from a server
  console.log("Attempting to remove " + server.name + " from the database!");
  connection.query("DELETE FROM servers WHERE serverid = '" + server.id + "'", function(error) { //delete the server from database !!!SQL!!!
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server Removed!");
  })
})

bot.on("ready", function(message){  //run when the bot has loaded
  console.log("Bot online and ready!");
  console.log("Sergal has now spread to: " + bot.servers.length + " willing ~~victims~~ servers");
  bot.setPlayingGame("The game of trying to push updates");
})

//Commands list will be implemented sometime.
bot.on("message", function(message){ //server specific commands.
  if(!message.channel.isPrivate){ //Checks if the channel is private or not, and will only work on a public server
    var input = message.content;
    var cmdText = input.split(" ")[0].substring(1); //splits the input and looks for the command
    var suffix = input.substring(cmdText.length+2); //looks for arguments after the command
    var command = commands[cmdText]; //creates a variable for storing the command, in the dictionary commands
    if(input.startsWith(prefix)) { //Checks to see if a message starts with the defined prefix
      try { //This expects an error, so we don't want the bot to crash if an error happens with a command
        //if (input === command) { //if the input, message.content, is equal to commands[cmdText]
          command.process(bot, message, suffix); //Uses the function stored under the command name in the dictionary.
        /*} else { //tells the bot it doesn't understand if it's not a defined command.
          console.log(message.author.name + " tried " + input);
          bot.sendMessage(message, "Sorry...I didn't understand that command... *confused sergal noises*");
        }*/
      } catch (e) {  //logs an error if one occurs.
        console.log("Command : " + input + " failed...");
        bot.sendMessage(message, "Sorry...I couldn't do that command... *confused sergal noises*");
      }
    }
  }
});
      /*if(input.startsWith(">ping")){
        console.log("Was pinged by " + message.author.name + ", responding...");
        bot.reply(message, "PONG!");
      } else if(input.startsWith(">rape")){
        console.log("Raping " + message.author.name + "...");
        bot.sendMessage(message, "*Rapes " + message.author.name + " gently*");
      } else if(input.startsWith(">murder")){
        console.log("Murdering " + message.author.name + "...")
        bot.sendMessage(message, "*Murders " + message.author.name + " not-so-gently*");
      } else {
      console.log(message.author.name + " tried to use " + input);
      bot.sendMessage(message, "Sorry...I didn't understand that command...*confused sergal noises*"); */

bot.loginWithToken(AuthDetails.token);
