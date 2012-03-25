var CURTIME = new Date();

function htom(x) {
  return ((x%1)*60).toFixed(0);
}

function checkOpen(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  if (!(x.hours[cday][0] instanceof Array)) {
    if (x.hours[cday][0]<=time && time<x.hours[cday][1])
      {return true;}
    return false;
  }
  else {
    for (var i=0;i<x.hours[cday].length;i++) {
      if (x.hours[cday][0][i]<=time && time<x.hours[cday][1][i])
        {return true;}
    }
    return false;
  }
}

/*
          var temp = tHrs[1][i]-time;
          now.setMinutes(now.getMinutes() + temp*60);
          return (temp + closesIn(x,now) );
*/


//Open places closing in __ minutes
function closesIn(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  var tHrs = x.hours[cday];
  if (tHrs[0] instanceof Array) { //many open and close times
    for(var i=0;i<tHrs.length;i++) {
      if (tHrs[0][i] <= time && time < tHrs[1][i]) {
        if(tHrs[1][i]==24) {
          return tHrs[1][i]-time+afterMidnightC(x,cday);
        }
        else { return (tHrs[1][i]-time);}
      }
    }
  }
  else { //one open and close time
    if (tHrs[1]==24) { return tHrs[1]-time+afterMidnightC(x,cday);}
    else { return (tHrs[1]-time);}
  }
}

//Find how many hours place is open starting at midnight
function afterMidnightC(x,prevday) {
  var curday = prevday+1;
  if (curday==7) curday = 0;

  var tHrs=x.hours[curday];
  if (tHrs[0] instanceof Array) {
    for (var j=0;j<tHrs.length;j++) {
      if (tHrs[0][j] == 0) { return (tHrs[1][j]);}
      }
  }
  else {
    if (tHrs[0] == 0) return tHrs[1];
  }
  return 0; //no opening hours at 0 found
}

function closeHr(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;
  var tHrs = x.hours[cday];
  if (tHrs[0] instanceof Array) { //many open and close times
    for(var i=0;i<tHrs.length;i++) {
      if (tHrs[0][i] <= time && time < tHrs[1][i]) {
        if(tHrs[1][i]==24) {
          return afterMidnightC(x,cday);
          }
        else { return tHrs[1][i];}
      }
    }
  }
  else { //one open and close time
    if (tHrs[1]==24) {
      return afterMidnightC(x,cday);
      }
    else { return tHrs[1];}
  }
}

//FIX THIS so it takes correct opening time (next day)
//Closed places opening in __ minutes
function opensIn(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  var tHrs = x.hours[cday];
  var j=-1;
  var min=0;
  if (tHrs[0] instanceof Array) {
    for(var i=0;i<tHrs.length;i++) { //for every pair of opening and closing times
      if (time < tHrs[0][i]) { //j==-1 unless the current time is less than some opening time
        if (j==-1) j=i;
        else if (tHrs[0][i] < tHrs[0][j]) j=i;
      }
      if (tHrs[0][i] < tHrs[0][min]) min = i; //find min opening time that is greater than now
    }
    if (j!=-1) {return (tHrs[0][j]-time);}
    else {return (24-time+fromMidnightOHr(x,cday));}
  }
  else {
    if(tHrs[0] == 0 && tHrs[1] == 0) {return -1;} //closed today
    if(time<tHrs[0])
      {return (tHrs[0]-time);}
    else
      {return (24-time+fromMidnightOHr(x,cday));}
  }
}

function openHr(x,now) {
  var cday = now.getDay(); //0 sun, 6 sat
  var chour = now.getHours();
  var cmin = now.getMinutes();
  var time = chour + cmin/60;

  var tHrs = x.hours[cday];
  var j=-1;
  var min=0;
  if (tHrs[0] instanceof Array) {
    for(var i=0;i<tHrs.length;i++) { //for every pair of opening and closing times
      if (time < tHrs[0][i]) { //j==-1 unless the current time is less than some opening time
        if (j==-1) j=i;
        else if (tHrs[0][i] < tHrs[0][j]) j=i;
      }
      if (tHrs[0][i] < tHrs[0][min]) min = i; //find min opening time that is greater than now
    }
    if (j!=-1) {return tHrs[0][j];}
    else {return fromMidnightOHr(x,cday);}
  }
  else {
    if(tHrs[0] == 0 && tHrs[1] == 0) {return -1;} //closed today
    if(time<tHrs[0])
      {return tHrs[0];}
    else
      {return fromMidnightOHr(x,cday);}
  }
}

function fromMidnightOHr(x,prevday) {
  var curday = prevday + 1;
  if (curday == 7) curday = 0;
  
  var tHrs=x.hours[curday];
  var j=0;
  var min=tHrs[0][0];
  if (tHrs[1] instanceof Array) {
      for(var i=1;i<tHrs.length;i++) { //for every pair of opening and closing times
        if (tHrs[0][i] < tHrs[0][min]) min = i; //find min opening time
      }
    return tHrs[0][min];
  }
  else {
    return tHrs[0];
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


function prettyHrs(x) {
  var mins = htom(x);
  mins = ( (mins < 10) ? '0':'') + mins;
  var AMPM;
  if (0 <= x && x < 1) { x = 12; AMPM = "AM";}
  else if (12 <= x && x < 13) { AMPM = "PM";}
  else if (x < 12) { AMPM = "AM";}
  else { AMPM = "PM"; x=x-12;}
  
  return sprintf("%s:%s %s",Math.floor(x),mins,AMPM);
}

function dispO(list, dest, date) {
//  document.getElementById(dest).innerHTML="";

  var printlist = document.getElementById(dest);
  for (var i=0;i<list.length;i++) {
    var li = document.createElement('li');
    $(li).addClass('loc_el open_loc');
    var CT = closesIn(list[i],date);

    if (CT > 2) {
      var temp = closeHr(list[i],date);
      closetext = sprintf("Closes at %s", prettyHrs(temp) );
    }
    else {
      var disphr = Math.floor(CT);
      var dispmin = htom(CT);
      var hrtag = "hrs";
      var mintag = "mins";
      if (disphr==1) hrtag = "hr";
      if (dispmin==1) mintag = "min";
      if (disphr == 0) {
        closetext = sprintf("Closes in %s %s",dispmin,mintag);
      }
      else {
        closetext = sprintf("Closes in %s %s %s %s",disphr,hrtag,dispmin,mintag);
      }
    }
    var rating = "*****";
    var maplink = "Maplink!";
    var address = list[i].address;
    var openhours = list[i].prettyhrs;
    $(li).html( sprintf('<div class="name">%s</div><div class="timeleft">%s</div><div class="ratings hidden showexp">%s</div><div class="map hidden showexp"><input type="button" class="favbutton" value="Favorite"></div><div class="address hidden showexp">%s</div><div class="hours hidden showexp">%s</div><div class="hidden"><span class="type">%s</span><span class="isclosed">0</span><div>' ,list[i].name,closetext,rating,address,openhours,list[i].type ) ).attr('id',list[i].name);
  closesSoon(li,CT);
  printlist.insertBefore(li, printlist.firstChild); 
  }
}

function dispC(list, dest, date) {
//  document.getElementById(dest).innerHTML="";

  var printlist = document.getElementById(dest);
  for (var i=0;i<list.length;i++) {
    var li = document.createElement('li');
    $(li).addClass('loc_el closed_loc hidden');

    var OT = opensIn(list[i],date);

    if (OT == -1) {
      opentext = "Closed today"; //Possibly change this
    }
    else if (OT > 2) {
      var temp = openHr(list[i],date);
      if (temp < date.getHours()) {
        opentext = "Closed for the day";
      }
      else {
        opentext = sprintf("Opens at %s", prettyHrs(temp) );
      }
    }
    else {
      var disphr = Math.floor(OT);
      var dispmin = htom(OT);
      var hrtag = "hrs";
      var mintag = "mins";
      if (disphr==1) hrtag = "hr";
      if (dispmin==1) mintag = "min";
      if (disphr == 0) {
        opentext = sprintf("Opens in %s %s",dispmin,mintag);
      }
      else {
        opentext = sprintf("Opens in %s %s %s %s",disphr,hrtag,dispmin,mintag);
      }
    }
    var rating = "*****";
    var maplink = "Maplink!";
    var address = list[i].address;
    var openhours = list[i].prettyhrs;
    $(li).html( sprintf('<div class="name">%s</div><div class="timeleft">%s</div><div class="ratings hidden showexp">%s</div><div class="map hidden showexp"><input type="button" class="favbutton" value="Favorite"></div><div class="address hidden showexp">%s</div><div class="hours hidden showexp">%s</div><div class="hidden"><span class="type">%s</span><span class="isclosed">1</span><div>',list[i].name,opentext,rating,address,openhours,list[i].type ) ).attr('id',list[i].name);
  printlist.insertBefore(li, printlist.firstChild); 
  }
}




