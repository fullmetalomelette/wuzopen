var CURTIME = new Date();

function place(name,hrs) {
  this.name=name;
  this.hours=hrs;
}

String.prototype.format = function() {
    var formatted = this;
    for(arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

var CURTIME = new Date();

function checkOpen(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  if (!(x.hours[cday][0] instanceof Array)) {
    if (x.hours[cday][0]<time && time<x.hours[cday][1])
      {return true;}
    return false;
  }
  else {
    for (var i=0;i<x.hours[cday].length;i++) {
      if (x.hours[cday][0][i]<time&& time<x.hours[cday][1][i])
        {return true;}
    }
    return false;
  }
}

function cTime(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  var tHrs = x.hours[cday];
  if (tHrs[1] instanceof Array) {
    for(var i=0;i<tHrs.length;i++) {
      if (time > tHrs[0][i] && time < tHrs[1][i]) {
        return (tHrs[1][i]-time);
      }
    }
  }
  else {
    return (tHrs[1]-time);
  }
}

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
function sortAlphaNum(a,b) {
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if(aA === bA) {
        var aN = parseInt(a.replace(reN, ""), 10);
        var bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
}

function sortPlaces(a,b) {
  return sortAlphaNum(b.name,a.name);
}

function getOpen(list,date) {
  var out=new Array();
  for(var i=0;i<list.length;i++) {
    if (checkOpen(list[i],date))
      {out.push(list[i]);}
  }
  return out.sort(sortPlaces);
}


function getClosed(list,date) {
  var out=new Array();
  for(var i=0;i<list.length;i++) {
    if (!checkOpen(list[i],date))
      {out.push(list[i]);}
  }
  return out.sort(sortPlaces);
}

function dispOpen(list, dest, date) {
  //document.getElementById('test').innerHTML="default test 1";
  document.getElementById(dest).innerHTML="";
/*
  var testHours = [ [12,20],[12,16],[12,16],[12,16],[12,16],[12,16],[0,24] ];
  var k = new place("TEST",testHours); 
  var x = checkOpen(k);
  document.getElementById('test').innerHTML = x;
*/

  var printlist = document.getElementById(dest);
  for (var i=0;i<list.length;i++) {
    var li = document.createElement('li');
    var CT = cTime(list[i],date);
  li.innerHTML = "{0}&nbsp&nbsp&nbsp&nbsp Closes in: {1} hrs {2} mins".format(list[i].name,
    Math.floor(CT), ((CT%1)*60).toFixed(0) );
  printlist.insertBefore(li, printlist.firstChild); 
  }

}

var allRests = [new place("Miya's Sushi",[[0,0],[0,0],[12.5,22],[12.5,23],[12.5,23],[12.5,24],[12.5,24]]),
  new place("Prime 16",[[12,23],[11.5,23],[11.5,23],[11.5,23],[11.5,23],[11.5,23],[12,23]]),
  new place("Ibiza Restaurant",[[0,0],[17,22],[17,22],[17,22],[17,22],[17,23],[17,23]]),
  new place("Mamoun's",[ [ [11,0],[24,3] ],[ [ [11,0],[24,3] ]],[ [ [11,0],[24,3] ]],[ [ [11,0],[24,3] ]],[ [ [11,0],[24,3] ]],[ [ [11,0],[24,3] ]],[ [ [11,0],[24,3] ]]]),
  new place("Basil Restaurant",[[10.5,22],[11.5,23],[11.5,23],[11.5,23],[11.5,23],[10.5,23],[10.5,23]]),
  new place("Zinc",[[17,21],[17,21],[ [17,12],[21,14.5] ],[ [17,12],[21,14.5] ],[ [17,12],[21,14.5] ],[[17,12],[22,14.5] ],[17,22]]),
  new place("Thali Too",[[12,21.5],[12,22],[12,22],[12,22],[12,22],[12,23],[12,23]]),
  new place("Great Wall of China",[[11,22],[10,21],[10,21],[10,21],[10,21],[10,21],[11,22]]),
  new place("168 York St Cafe",[[ [11,0],[24,1]],[ [0,15],[1,24] ],[ [0,15],[1,24] ],[ [0,15],[1,24] ],[ [0,15],[1,24] ],[ [0,15],[2,24] ],[ [0,14],[2,24] ]]),
  new place("York Street Noodle House",[[12,22],[11.5,22],[11.5,22],[11.5,22],[11.5,22],[11.5,23],[11.5,23]]),
  new place("Zaroka",[ [ [12,17],[15,22.5] ], [ [11.5,17], [15,22.5] ],[[11.5,17], [15,22.5] ],[[11.5,17], [15,22.5] ],[[11.5,17], [15,22.5] ],[[11.5,17], [15,23] ],[[11.5,17], [15,23] ]]),
  new place("Bangkok Gardens",[[12,22],[ [11.5,17],[15,22] ],[[11.5,17],[15,22] ],[[11.5,17],[15,22] ],[[11.5,17],[15,22] ],[[11.5,17],[15,23] ],[12,23]]) ];

/*,
  new place("Yorkside",[[],[],[],[],[],[],[]]),
  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
  new place("Miya's Sushi",[[],[],[],[],[],[],[]]), ];
  */

//new place("Miya's Sushi",[[],[],[],[],[],[],[]]) ];

var allLibs = [new place("Bass Library",[[12,24],[[0,8.5],[1.75,24]],[[0,8.5],[1.75,24]],[[0,8.5],[1.75,24]],[[0,8.5],[1.75,24]],[8.5,21.75],[10,18.75]]),
  new place("Arts Library",[[14,23],[8.5,23],[8.5,23],[8.5,23],[8.5,23],[8.5,17],[10,18]]),
  new place("Music Library",[[1,8.75],[8.5,20.75],[8.5,20.75],[8.5,20.75],[8.5,20.75],[8.5,16.75],[10,16.75]]),
  new place("Sterling Memorial Library",[[12,23.75],[8.5,23.75],[8.5,23.75],[8.5,23.75],[8.5,23.75],[8.5,16.75],[10,16.75]]),
  new place("Classics Library",[[17,21],[8.5,21],[8.5,21],[8.5,21],[8.5,21],[8.5,17],[0,0]])];

var allMisc = [new place("Yale Post Office",[[0,0],[9,17.5],[9,17.5],[9,17.5],[9,17.5],[9,17.5],[8,12]]),
  new place("Undergraduate Career Services",[[11,17],[11,17],[11,17],[11,17],[11,17],[11,17],[11,17]])];
//  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
// new place("Miya's Sushi",[[],[],[],[],[],[],[]])];


var allDH = [new place("Commons Breakfast",[[0,0],[7.75,11],[7.75,11],[7.75,11],[7.75,11],[7.75,11],[0,0]]),
  new place("Commons Lunch",[[0,0],[11,14.5],[11,14.5],[11,14.5],[11,14.5],[11,14.5],[0,0]]),
  new place("All Colleges Breakfast",[[0,0],[8,11],[8,11],[8,11],[8,11],[8,11],[0,0]]),
  new place("Morse and Calhoun Breakfast",[[8,10.5],[0,0],[0,0],[0,0],[0,0],[0,0],[8,10.5]]),
  new place("All Colleges Brunch",[[11,13.5],[0,0],[0,0],[0,0],[0,0],[0,0],[11,13.5]]),
  new place("All Colleges Dinner",[[17,19],[17,19.5],[17,19.5],[17,19.5],[17,19.5],[17,19.5],[17,19]]),
  new place("Calhoun, Stiles, Morse Dinner",[[0,0],[17,20],[17,20],[17,20],[17,20],[0,0],[0,0]]),
  new place("Hall of Graduate Studies Lunch",[[0,0],[11.5,14],[11.5,14],[11.5,14],[11.5,14],[11.5,14],[0,0]]),
  new place("Hall of Graduate Studies Dinner",[[0,0],[17,20],[17,20],[17,20],[17,20],[17,20],[0,0]]),
  new place("Durfee's",[[[0,12],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]], [[0,12],[2.5,24]] ]),
  new place("Slifka Breakfast",[[0,0],[8,10],[8,10],[8,10],[8,10],[8,10],[0,0]]),
  new place("Slifka Brunch",[[11,13],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]),
  new place("Slifka Lunch",[[0,0],[11.5,13.5],[11.5,13.5],[11.5,13.5],[11.5,13.5],[11.5,13.5],[12.5,13.5]]),
  new place("Slifka Dinner",[[17,19.5],[17,19.5],[17,19.5],[17,19.5],[17,19.5],[17,19.5],[19,20]]),
   new place("Bass Cafe",[[12,23],[10,23],[10,23],[10,23],[10,23],[10,17],[12,17]])
  ];

var allFac = [  new place("Payne Whitney Gym",[[9.5,16.5],[6,22],[6,22],[6,22],[6,22],[6,20],[9.5,16.5]]),
 new place("Yale Bookstore",[[12,18],[9,21],[9,21],[9,21],[9,21],[9,22],[9,22]]),
 new place("Yale Post Office",[[0,0],[9,17.5],[9,17.5],[9,17.5],[9,17.5],[9,17.5],[8,12]])
];

//  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
//  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),
//  new place("Miya's Sushi",[[],[],[],[],[],[],[]]),

var openFacs = getOpen(allFac,CURTIME);
var openLibs = getOpen(allLibs,CURTIME);
var openRests = getOpen(allRests,CURTIME);
var openDHs = getOpen(allDH,CURTIME);

var closedFacs = getClosed(allFac,CURTIME);
var closedLibs = getClosed(allLibs,CURTIME);
var closedRests = getClosed(allRests,CURTIME);
var closedDHs = getClosed(allDH,CURTIME);

