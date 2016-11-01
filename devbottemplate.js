try{
  var Discord = require("discord.js");  //Makes sure you have discord.js installed, and will provide extra information that a crash would not if you do not have discord.js installed in node.js
} catch (e) {
  console.log('Error: could not find Discord.js.  Have you installed it correctly?');
  console.log('Make sure you have done "npm install hydrabolt/discord.js#indev"');
}//dependancy

var botID = "<@220333123861348352>"; //this is the client ID of sergalbot.
var nbotID = "<@!220333123861348352>";

try{
  var AuthDetails = require('./auth.json');  //Tries to make variable AuthDetails using auth.json, if you do not have this file, make sure to contact me, or comment out this code block.
} catch (e){
  console.log('Error: could not find auth.json.  Do you have the file?  Contact Cyan if you do not.');
}

var bot = new Discord.Client();

var prefix = ">";



var findName = function(bot, message, suffix){
  if(suffix.startsWith("<@!")){ //Discord IDs start with <@!, this checks for it in the arguments of commands.
    var userId = suffix.slice(suffix.indexOf("!") + 1, suffix.length - 1); //Stores the ID of the person mentioned, for comparison
    var users = message.channel.server.members //Gets the users of the server
    for(i=0;i<users.length;i++){ //for every user
      if(userId === users[i].id){ //if the userId is equal to a user's id in the server
        suffix = users[i].username; //set the suffix to that user's username.
        return suffix;  //returns the new suffix so that we may use it as a variable in commands.  :>
      }
    }
  } else if (suffix.startsWith("<@")){
    var userId = suffix.slice(suffix.indexOf("@") + 1, suffix.length - 1); //Stores the ID of the person mentioned, for comparison
    var users = message.channel.server.members //Gets the users of the server
    for(i=0;i<users.length;i++){ //for every user
      if(userId === users[i].id){ //if the userId is equal to a user's id in the server
        suffix = users[i].username; //set the suffix to that user's username.
        return suffix;
      }
    }
  }
}
/* !--PROTOTYPE FUNCTION--!
var printHelp = function(bot, message){
  var output = '';
  for (usage in commands){
    console.log(output += usage + ': ' + commands[usage]+'; ');
  }
}
*/

var petOptions = function(person){ //the whole purpose of these functions is to have a piece of code that makes these variables each time they are used.  This way, the strings change accordingly when the bot responds.
  var options = [
    "*The sergal pets " + person + " gently, being careful with them.*",
    "*She pets " + person + ", trying to comfort them as best she can*",
    "*The sergal smiles at " + person + " before running her paw and claws over their back.*",
    "*She pets " + person + ", trying to resist the urge to rape them.*",
    "*The sergal grins before pulling " + person + " into her lap, and cuddling with them before stroking up and down their back.*",
    "*Sayonaru stands over " + person + " and reaches above their head, giving them a few small pats.*",
    "*Sayonaru grabs " + person + " from behind, nuzzling into them and stroking their chest.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //sneaky little code that returns a random option, no matter how long options get.
}

var memeOptions = function(){
  var options = [
    "http://i.imgur.com/vmWqPDo.jpg", //doge
    "http://i3.kym-cdn.com/photos/images/facebook/000/101/623/are-u-a-WIZARD0.jpg", //wizard
    "http://i1.kym-cdn.com/photos/images/newsfeed/000/943/400/136.gif", //lenny
    "http://i0.kym-cdn.com/photos/images/newsfeed/001/145/465/ec0.jpg", //notfunny
    "http://i1.kym-cdn.com/photos/images/newsfeed/000/176/387/Alot_by_chrispygraphics.jpg", //alot
    "http://i2.kym-cdn.com/photos/images/newsfeed/001/144/532/d35.gif", //why
    "http://i3.kym-cdn.com/photos/images/newsfeed/000/594/707/98e.gif", //oh
    "http://i2.kym-cdn.com/photos/images/newsfeed/000/474/888/511.png", //wat
    "http://i1.kym-cdn.com/photos/images/newsfeed/001/111/933/7af.png"  //coding a bot
  ];
  return options[Math.floor(Math.random() * options.length)];
}

var murderOptions = function(person){
  var options = [
    "*She grabs " + person + ", picking them up before slamming them onto the floor, killing them.*",
    "*The sergal brandishes her claws and looks at " + person + " before rushing them, slashing at their throat and killing them.*",
    "*Sayonaru kicks " + person + " with a clawed foot, lacerating their chest as she sends them flying.*",
    "*She rushes " + person + ", catching them as they run and pinning them down before biting down on their neck, killing them.*",
    "*The sergal, clad in armor, traces her paw over a metal blade augment.  She then glares at " + person + " before sinking the long blade into their chest.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //sneaky little code that returns a random option, no matter how long options get.
}


var commands = {   //commands list, implemented.
  /*"command": {  //how to add a command
    usage: "syntax for usage",
    description: "does x"
    process: function(bot, msg, suffix){
      //does this
    }
  },*/
/* !--PROTOTYPE HELP FUNCTIONS--!
  "help": {
    process: function(bot, msg){
      printHelp(bot,msg);
    }
  },
  "cmds":{
    process: function(bot, msg){
      printHelp(bot,msg);
    }
  }, */
  "ping": {
       usage: ">ping | <no arguments>",
       description: "responds pong, useful for checking if bot is alive",
       process: function(bot, msg, suffix) {
        console.log("Pinged by " + msg.author.name + ", Responding...");
        bot.reply(msg.channel,"PONG!");
        if(suffix){
          bot.sendMessage(msg.channel, "note that !ping takes no arguments!");
        }
      }
   },
     "pet": {
       usage: ">pet | <user>",
       description: "Makes the bot pet a user",
       process: function(bot, msg, suffix){
         if(!suffix){
           console.log("Petting " + msg.author.name + "...");
           bot.sendMessage(msg.channel, petOptions(msg.author.name));
         } else {
           if(suffix.startsWith("<@")){
             var usr = findName(bot, msg, suffix);
           } else {
             var usr = suffix;
           }
           if(usr === "SergalBot" || usr === "Sayonaru"){
             console.log("Trying to make me pet myself?  lol.");
             bot.sendMessage(msg.channel, "I'm not allowed to do that to myself.");
           } else {
             console.log("Petting " + usr + "...");
             bot.sendMessage(msg.channel, petOptions(usr));
           }
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
         if(suffix.startsWith("<@")){
           var usr = findName(bot, msg, suffix);
         } else {
           var usr = suffix;
         }
         if(usr === "SergalBot" || usr === "Sayonaru"){
           console.log("Trying to make me rape myself?  lol.");
           bot.sendMessage(msg.channel, "I'm not allowed to do that to myself.");
         } else {
           console.log("Raping " + usr + "...");
           bot.sendMessage(msg.channel, "*Rapes " + usr + " gently*");
         }
         }
       }
     },
     "murder": {
       usage: ">murder | <user>",
       description: "Makes the bot murder a user",
       process: function(bot, msg, suffix){
         if(!suffix){
           console.log("Murdering " + msg.author.name + "...");
           bot.sendMessage(msg.channel, murderOptions(msg.author.name));
         } else {
           if(suffix.startsWith("<@")){
             var usr = findName(bot, msg, suffix);
           } else {
             var usr = suffix;
           }
           if(usr === "SergalBot" || usr === "Sayonaru"){
             console.log("Trying to make me murder myself?  lol.");
             bot.sendMessage(msg.channel, "I'm not allowed to do that to myself.");
           } else {
             console.log("Murdering " + usr + "...");
             bot.sendMessage(msg.channel, murderOptions(usr));
           }
           }
         }
     },
    "vire": {
      usage: ">vire | user",
      description: "Have the bot vore a user.",
      process: function(bot, msg, suffix){
        if(!suffix){
          console.log("Viring " + msg.author.name + "...");
          bot.sendMessage(msg.channel, "*Vires " + msg.author.name + " slowly, savoring their taste*");
        } else {
          if(suffix.startsWith("<@")){
            var usr = findName(bot, msg, suffix);
          } else {
            var usr = suffix;
          }
          if(usr === "SergalBot" || usr === "Sayonaru"){
            console.log("Trying to make me vire myself?  lol.");
            bot.sendMessage(msg.channel, "I'm not allowed to do that to myself.");
          } else {
            console.log("Viring " + usr + "...");
            bot.sendMessage(msg.channel, "*Vires " + usr + " slowly, enjoying their taste*");
          }
          }
        }
    },
    "meme": {
      usage: ">meme | user",
      description: "Have the bot meme a user.",
      process: function(bot, msg, suffix){
        if(!suffix){
          console.log("Memeing " + msg.author.name + "...");
          bot.sendMessage(msg.channel, "*Memes " + msg.author.name + "* " + memeOptions());
        } else {
          if(suffix.startsWith("<@")){
            var usr = findName(bot, msg, suffix);
          } else {
            var usr = suffix;
          }
          console.log("Memeing " + usr + "...");
          bot.sendMessage(msg.channel, "*Memes " + usr + "* " + memeOptions());
          }
        }
    },
    "algebra": {
      usage: ">algebra",
      description: "do it yourself, you lazy fuck",
      process: function(bot, msg, suffix){
        console.log("I'm not doing algebra.");
        bot.reply(msg, "Do it yourself, I can't do everything for you.  Algebra isn't even that hard anyway.");
      }
    },
    "roll": {
      usage: ">roll <numberofdice>d<type of dice>",
      description: "Rolls a die with user-specified dimmensions",
      process: function(bot, msg, suffix){
        if(!suffix){
          console.log("Rolling 1d6...");
          bot.reply(msg, Math.floor(Math.random() * 6 + 1));
        } else {
          var x = suffix.split("d")[0].substring(0, suffix.split("d")[0].length); //number of dice
          var y = suffix.split("d")[1].substring(0, suffix.split("d")[1].length); //type of dice
        }
        if (suffix.indexOf("d") && x <= 100 && y <= 100) {
          console.log("Rolling " + suffix);
          var results = [];
          for(i=0;i<x;i++){
            results.push(Math.floor((Math.random() * y) + 1));
          }
          bot.reply(msg, results.toString());
        } else {
          console.log("Die error...");
          bot.reply(msg, "The type of die you entered was invalid.  Make sure you're using 'xdy' notation, and that x is less than 10 and y is less than or equal to 100.");
        }
      }
    },
    "pong": {
      usage: ">pong",
      description: "Are you happy now, Shira?",
      process: function(bot, msg, suffix){
        console.log("Ponged by " + msg.author.name + "...");
        bot.sendMessage(msg, msg.author.name + " likes cute southern sergals.");
      }
    }
   }


bot.on("ready", function(message){  //run when the bot has loaded
  console.log("Bot online and ready!");
  console.log("Sergal has now spread to: " + bot.servers.length + " willing ~~victims~~ servers");
  bot.setPlayingGame("Raping and murdering like never before!");
})

//Commands list will be implemented sometime.
bot.on("message", function(message){ //server specific commands.
  if(!message.channel.isPrivate){ //Checks if the channel is private or not, and will only work on a public server
    var input = message.content;
    var cmdText = input.split(" ")[0].substring(prefix.length); //splits the input and looks for the command
    var suffix = input.substring(cmdText.length + prefix.length + 1); //looks for arguments after the command
    var command = commands[cmdText]; //creates a variable for storing the command, in the dictionary commands
    var cinput = input.substring(nbotID.length, input.length);
    if(input.startsWith(prefix)) { //Checks to see if a message starts with the defined prefix
      try { //This expects an error, so we don't want the bot to crash if an error happens with a command
          command.process(bot, message, suffix); //Uses the function stored under the command name in the dictionary.

      } catch (e) {  //logs an error if one occurs.
        console.log("Command : " + input + " failed...");
        bot.sendMessage(message, "Sorry...I couldn't do that command... *confused sergal noises*");
      }
    }
}
});

try{
  bot.loginWithToken(AuthDetails.token); //You can replace this with the token string if you do not have the auth.json file.
} catch(e){
  console.log("Error: Could not log in successfully.  Do you have the correct token in auth.json?");
}
