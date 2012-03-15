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
      if (x.hours[cday][0][i]<time && time<x.hours[cday][1][i])
        {return true;}
    }
    return false;
  }
}

function closesIn(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  var tHrs = x.hours[cday];
  if (tHrs[1] instanceof Array) {
    for(var i=0;i<tHrs.length;i++) {
      if (time > tHrs[0][i] && time < tHrs[1][i]) {
        if(tHrs[1][i]==24) {
          for (var j=0;j<tHrs.length;j++) {
            if (tHrs[0][j] == 0)
              return (tHrs[1][i]-time+tHrs[1][j]);
          }
          return (tHrs[1][i]-time);
        }
        else { return (tHrs[1][i]-time);}
      }
    }
  }
  else {
    return (tHrs[1]-time);
  }
}

function opensIn(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  var tHrs = x.hours[cday];
  if (tHrs[0] instanceof Array) {
    for(var i=0;i<tHrs.length;i++) { //for every pair of opening and closing times
      if (time < tHrs[0][i]) {
        return (tHrs[0][i]-time);
      }
      else
       {return (24-time+tHrs[0][0]);}
    }
  }
  else {
    if(time<tHrs[0])
      {return (tHrs[0]-time);}
    else
      {return (24-time+tHrs[0]);}
  }
}


function getOpen(list,date) {
  var out=new Array();
  for(var i=0;i<list.length;i++) {
    if (checkOpen(list[i],date))
      {out.push(list[i]);}
  }
  return out;//.sort(sortPlaces);
}


function getClosed(list,date) {
  var out=new Array();
  for(var i=0;i<list.length;i++) {
    if (!checkOpen(list[i],date))
      {out.push(list[i]);}
  }
  return out;//.sort(sortPlaces);
}

function closesSoon( el, time) {
  if (time < 2) {
    $(el).addClass('closing-soon');
  }
}

function dispO(list, dest, date) {
  document.getElementById(dest).innerHTML="";

  var printlist = document.getElementById(dest);
  for (var i=0;i<list.length;i++) {
    var li = document.createElement('li');
    var CT = closesIn(list[i],date);
  li.innerHTML = "{0}&nbsp&nbsp&nbsp&nbsp Closes in: {1} hrs {2} mins".format(list[i].name, Math.floor(CT), htom(CT));
  closesSoon(li,CT);
  printlist.insertBefore(li, printlist.firstChild); 
  }
}

function dispC(list, dest, date) {
  document.getElementById(dest).innerHTML="";

  var printlist = document.getElementById(dest);
  for (var i=0;i<list.length;i++) {
    var li = document.createElement('li');
    var OT = opensIn(list[i],date);
  li.innerHTML = "{0}&nbsp&nbsp&nbsp&nbsp Opens in: {1} hrs {2} mins".format(list[i].name,
    Math.floor(OT), htom(OT));
  printlist.insertBefore(li, printlist.firstChild); 
  }
}

$(document).ready(function() {
    $('#open-toggler').toggle(function() {
      $('.wd-open').addClass('hidden','slow');
      this.value="Show Open";},
    function() {
      $('.wd-open').removeClass('hidden');
      this.value="Hide Open";});
    $('#closed-toggler').toggle(function() {
      $('.wd-closed').removeClass('hidden');
      this.value="Hide Closed";},
      function() {
      $('.wd-closed').addClass('hidden');
      this.value="Show Closed";}
      );
});

