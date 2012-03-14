function place(name,hrs) {
  this.name=name;
  this.hours=hrs;
}

function checkOpen(x) {
  var now = new Date();
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

function getOpen(list) {
  var out=new Array();
  for(var i=0;i<list.length;i++) {
    if (checkOpen(list[i]))
      {out.push(list[i]);}
  }
  return out;
}

function disp(list, dest) {
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
  li.innerHTML = list[i].name;
  printlist.insertBefore(li, printlist.firstChild); 
  }

}
//</script>

//<script type="text/javascript">

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

var openPlaces = getOpen(allRests);

