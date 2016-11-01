try{
  var Discord = require("discord.js");  //Makes sure you have discord.js installed, and will provide extra information that a crash would not if you do not have discord.js installed in node.js
} catch (e) {
  console.log('Error: could not find Discord.js.  Have you installed it correctly?');
  console.log('Make sure you have done "npm install hydrabolt/discord.js#indev"');
}//dependancy

const mysql = require('mysql');

var botID = "<@240989892601970713>";
var nbotID = "<@!240989892601970713>";

try{
  var AuthDetails = require('./auth.json');  //Tries to make variable AuthDetails using auth.json, if you do not have this file, make sure to contact me, or comment out this code block.
} catch (e){
  console.log('Error: could not find auth.json.  Do you have the file?  Contact Cyan if you do not.');
}

var bot = new Discord.Client();

var prefix = "$";

var botName = "SergalBot";
/*
var connection = mysql.createConnection({
  host: "localhost",
  user: "SergalBot",
  password: AuthDetails.password,
  database:"sergalbot"
});

connection.connect();
*/

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

//NEW COMMAND FUNCTIONS AND SHIT STARTS HERE - Shira
var PingOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "Pong!",
    "*zzz...* !!!!!",
    "Hi!",
    "Oh, uh... Hi there! You pinged me?",
    "Boo!",
    "Hey!",
    "Merp!",
    "Ho fuck...was I sleeping on the job again?",
    "Ah shit...It's too early to get up!",
    "YOU'RE NOT MY REAL MOM",
    "Five more minutes...",
    "I'm responding, okay??"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var PongOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    person + " likes cute Southern sergals.",
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var PetOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*The sergal pets " + person + " gently, being careful with them.*",
    "*She pets " + person + ", trying to comfort them as best she can*",
    "*The sergal smiles at " + person + " before running her paw and claws over their back.*",
    "*She pets " + person + ", trying to resist the urge to rape them.*",
    "*The sergal grins before pulling " + person + " into her lap, and cuddling with them before stroking up and down their back.*",
    "*Sayonaru stands over " + person + " and reaches above their head, giving them a few small pats.*",
    "*Sayonaru grabs " + person + " from behind, nuzzling into them and stroking their chest.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var SelfPetOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*The sergal looks around confused, then gently pets herself.*",
    "*Sayonaru sighs, then snaps back to reality. Her claws gently run down her belly.*",
    "*The female sergal tilts her head, then skritches behind one fuzzy ear.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var RapeOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*Rapes " + person + " gently.*",
    "*She smirks and approaches " + person + " slowly, swaying her tail back and forth.  She then pushes them down, straddling their lap and slowly grinds on them.*",
    "*She throws down " + person + " and grins as she puts on a strapon harness...*",
    "*She grabs " + person + " from behind and smiles before letting her hood squiggle against their rear...*",
    "*The sergal smirks at " + person + " before approaching them slowly, pinning them before moving down, licking at their crotch.*",
    "Hmm... I guess " + person + " IS somewhat attractive...*Sayonaru walks over to them, before pulling them down, and on top of her.*  C'mon, have some fun with me..."
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var SelfRapeOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*The sergal looks around confused. Not knowing what to do, she begins riding the nearest dildo.*",
    "*Sayonaru whimpers as the vibrator quivers against her clitoral hood.*",
    "*She sighs and flops down before she starts playing with her tentaclit.*",
    "*She tilts her head, then flops backward, showing herself off as she begins to play with her prehensile hood.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var MurderOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*She grabs " + person + ", picking them up before slamming them onto the floor, killing them.*",
    "*The sergal brandishes her claws and looks at " + person + " before rushing them, slashing at their throat and killing them.*",
    "*Sayonaru kicks " + person + " with a clawed foot, lacerating their chest as she sends them flying.*",
    "*She rushes " + person + ", catching them as they run and pinning them down before biting down on their neck, killing them.*",
    "*The sergal, clad in armor, traces her paw over a metal blade augment.  She then glares at " + person + " before sinking the long blade into their chest.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var SelfMurderOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*Sayonaru shakes her head slowly before committing seppuku.*",
    "*She sighs, rising and tilting her head at her master before looking down.  She then takes a sharpened claw and slits her own throat.*",
    "*The sergal swallows, whimpering.*  I...have to do what I'm told...But that doesn't mean I want to...*She slowly slides her blade into her chest, killing herself.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var VireOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*No longer unable to resist the urge, Sayonaru steps behind " + person + " and swallows them whole in seconds.*",
    "*Sayonaru's belly rumbles and she decides to stifle it with a helping of " + person + ".*",
    "*Vires " + person + " slowly, savouring their taste.*",
    "*The sergal looks at " + person + " and growls before pouncing on them...and slowly starting to consume them.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var SelfVireOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*The sergal swallows, then starts to gnaw on her tail.*",
    "*She nibbles on her paw, and then looks up at her master* \"Is this what they meant?\""
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var HugOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*The sergal picks up " + person + " in a giant hug.*",
    "*She walks over to " + person + " and gives them a decent hug.*",
    "*Sayonaru pulls " + person + " into her lap as she cuddles with them.*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var SelfHugOptions = function(person){ //I totally didn't copy the randomizer function below.
  var options = [
    "*Sayonaru shrugs and wraps her arms around herself.*",
    "*She shrugs and looks around...seeing no one else named 'Sayonaru'...The sergal then awkwardly hugs herself...*"
  ];
  return options[Math.floor(Math.random() * options.length)]; //even sneakier little code for randomized responses
}

var commands = {   //commands list, implemented. THIS IS NEW.
  /*"command": {  //how to add a command
    usage: "syntax for usage",
    description: "does x"
    process: function(bot, msg, suffix){
      //does this
    }
  },*/

  "ping": {
      usage: prefix + "ping | <no arguments>",
      description: "responds with stuff, useful for checking if Sayonaru didn't fall asleep",
      process: function(bot, msg, suffix) {
        console.log("Pinged by " + msg.author.name + ". Responding...");
        bot.sendMessage(msg.channel, msg.author.name + "! " + PingOptions(msg.author.name));
        if(suffix){
          bot.sendMessage(msg.channel, "note that " + prefix + "ping takes no arguments!");
        }
      }
    },

  "pong": {
      usage: prefix + "pong | <no arguments>",
      description: "an easter egg stuff thingamajig for Sayonaru",
      process: function(bot, msg, suffix) {
        console.log("Ponged by " + msg.author.name + ". Responding...");
        bot.sendMessage(msg.channel, PongOptions(msg.author.name));
        if(suffix){
          bot.sendMessage(msg.channel, "note that " + prefix + "pong takes no arguments!");
        }
      }
    },

    "kick":{
      usage: prefix + "kick <user>",
      description: "removes a user from the server.",
      process: function(bot, msg, suffix){
        if(client.memberHasRole(msg.author, admin) || client.memberHasRole(msg.author, moderator)) {
          console.log("User " + suffix + " is being removed from the guild " + msg.chanel.server);
          try {
            kickMember(suffix, callback);
          } catch (e) {
            console.log("Invalid user" + suffix + " detected.");
          }
        } else {
          console.log("User " + msg.author + " has failed to kick anyone since they don't have that permission, lol.");
        }
      }
    },

    "ban":{
      usage: prefix + "ban <user>",
      description: "removes a user from the server permanently.",
      process: function(bot, msg, suffix){

      }
    }

  "pet": {
    usage: prefix + "pet | <user>",
    description: "Makes Sayonaru pet a user",
    process: function(bot, msg, suffix){
      if(!suffix){
        console.log("Petting " + msg.author.name + "...");
        bot.sendMessage(msg.channel, PetOptions(msg.author.name));
      } else {
        if(suffix.startsWith("<@")){
          var usr = findName(bot, msg, suffix);
        } else {
          var usr = suffix;
        }
        if(suffix === botID || suffix === nbotID){
          console.log("Trying to make me pet myself, " + msg.author.name + "? lol.");
          bot.sendMessage(msg.channel, SelfPetOptions(msg.author.name));
        } else {
          console.log("Petting " + usr + "...");
          bot.sendMessage(msg.channel, PetOptions(usr))
        }
      }
    }
  },

  "rape": {
    usage: prefix + "rape | <user>",
    description: "Makes Sayonaru rape a user",
    process: function(bot, msg, suffix){
      if(!suffix){
        console.log("Raping " + msg.author.name + "...");
        bot.sendMessage(msg.channel, RapeOptions(msg.author.name));
      } else {
        if(suffix.startsWith("<@")){
          var usr = findName(bot, msg, suffix);
        } else {
          var usr = suffix;
        }
        if(suffix === botID || suffix === nbotID){
          console.log("Trying to make me rape myself, " + msg.author.name + "? lol.");
          bot.sendMessage(msg.channel, SelfRapeOptions(msg.author.name));
        } else {
          console.log("Raping " + usr + "...");
          bot.sendMessage(msg.channel, RapeOptions(usr))
        }
      }
    }
  },

  "murder": {
    usage: prefix + "murder | <user>",
    description: "Makes Sayonaru murder a user",
    process: function(bot, msg, suffix){
      if(!suffix){
        console.log("Murdering " + msg.author.name + "...");
        bot.sendMessage(msg.channel, MurderOptions(msg.author.name));
      } else {
        if(suffix.startsWith("<@")){
          var usr = findName(bot, msg, suffix);
        } else {
          var usr = suffix;
        }
        if(suffix === botID || suffix === nbotID){
          console.log("Trying to make me murder myself, " + msg.author.name + "? lol.");
          bot.sendMessage(msg.channel, SelfMurderOptions(msg.author.name));
        } else {
          console.log("Murdering " + usr + "...");
          bot.sendMessage(msg.channel, MurderOptions(usr))
        }
      }
    }
  },

  "kill": { //Does what murder does...
    usage: prefix + "kill | <user>",
    description: "Makes Sayonaru kill a user",
    process: function(bot, msg, suffix){
      if(!suffix){
        console.log("Killing " + msg.author.name + "...");
        bot.sendMessage(msg.channel, MurderOptions(msg.author.name));
      } else {
        if(suffix.startsWith("<@")){
          var usr = findName(bot, msg, suffix);
        } else {
          var usr = suffix;
        }
        if(suffix === botID || suffix === nbotID){
          console.log("Trying to make me kill myself, " + msg.author.name + "? lol.");
          bot.sendMessage(msg.channel, SelfMurderOptions(msg.author.name));
        } else {
          console.log("killing " + usr + "...");
          bot.sendMessage(msg.channel, MurderOptions(usr))
        }
      }
    }
  },

  "vire": {
    usage: prefix + "vire | <user>",
    description: "Makes Sayonaru vire a user",
    process: function(bot, msg, suffix){
      if(!suffix){
        console.log("Viring " + msg.author.name + "...");
        bot.sendMessage(msg.channel, VireOptions(msg.author.name));
      } else {
        if(suffix.startsWith("<@")){
          var usr = findName(bot, msg, suffix);
        } else {
          var usr = suffix;
        }
        if(suffix === botID || suffix === nbotID){
          console.log("Trying to make me vire myself, " + msg.author.name + "? lol.");
          bot.sendMessage(msg.channel, SelfVireOptions(msg.author.name));
        } else {
          console.log("Viring " + usr + "...");
          bot.sendMessage(msg.channel, VireOptions(usr))
        }
      }
    }
  },

  "hug": {
    usage: prefix + "hug | <user>",
    description: "Makes Sayonaru hug a user",
    process: function(bot, msg, suffix){
      if(!suffix){
        console.log("Hugging " + msg.author.name + "...");
        bot.sendMessage(msg.channel, HugOptions(msg.author.name));
      } else {
        if(suffix.startsWith("<@")){
          var usr = findName(bot, msg, suffix);
        } else {
          var usr = suffix;
        }
        if(suffix === botID || suffix === nbotID){
          console.log("Trying to make me hug myself, " + msg.author.name + "? lol.");
          bot.sendMessage(msg.channel, SelfHugOptions(msg.author.name));
        } else {
          console.log("Viring " + usr + "...");
          bot.sendMessage(msg.channel, HugOptions(usr))
        }
      }
    }
  },

//NEW COMMAND FUNCTIONS AND SHIT ENDS HERE - SHIRA

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
    }
  }
//PONG IS IN THE NEW COMMANDS - SHIRA
/*
//!--SQL SECTION--!
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
// !--END SQL SECTION--!
*/
bot.on("ready", function(message){  //run when the bot has loaded
  console.log("Bot final got its lazy ass up!");
  bot.setPlayingGame("SERGALSERGALSERGAL");
})

//Commands list will be implemented sometime.
bot.on("message", function(message){ //server specific commands.
  if(!message.channel.isPrivate){ //Checks if the channel is private or not, and will only work on a public server
    if(input.startsWith(prefix)) { //Checks to see if a message starts with the defined prefix
      try { //This expects an error, so we don't want the bot to crash if an error happens with a command
        var input = message.content;
        var start = input.split(" ")[0];
        var cmdText = input.split(" ")[0].substring(prefix.length); //splits the input and looks for the command
        var suffix = input.substring(cmdText.length + prefix.length + 1); //looks for arguments after the command
        var args; //find out how to do later
        var command = commands[cmdText]; //creates a variable for storing the command, in the dictionary commands
        command.process(bot, message, suffix); //Uses the function stored under the command name in the dictionary.
      } catch (e) {  //logs an error if one occurs.
        console.log("Command : " + input + " failed...");
      }
    }
  }
});

try{
  bot.loginWithToken(AuthDetails.token); //You can replace this with the token string if you do not have the auth.json file.
} catch(e){
  console.log("Error: Could not log in successfully.  Do you have the correct token in auth.json?");
}
