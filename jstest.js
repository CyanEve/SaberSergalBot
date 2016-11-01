var people = ['Sam','Marcus','John','Shira','Cyan'];

var printOption = function(person){
  var options = ["1 " + person + " 2nd", "3 " + person + " 4"];
  console.log(options[Math.round(Math.random())]);
}

for(i=0;i<5;i++){
  printOption(people[Math.floor(Math.random() * 5)]);
}
