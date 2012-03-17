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
  var j=-1;
  var min=0;
  if (tHrs[0] instanceof Array) {
    for(var i=0;i<tHrs.length;i++) { //for every pair of opening and closing times
      if (time < tHrs[0][i]) { //j==-1 unless the current time is less than some opening time
        if (j==-1) j=i;
        else if (tHrs[0][i] < tHrs[0][j]) j=i;
      }
      if (tHrs[0][i] < tHrs[0][min]) min = i; //find min opening time
    }
    if (j!=-1) {return (tHrs[0][j]-time);}
    else {return (24-time+tHrs[0][min]);}
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
    $(li).addClass('loc_el');
    var disphr = Math.floor(CT);
    var dispmin = htom(CT);
    var hrtag = "hrs";
    var mintag = "mins";
    var rating = "*****";
    var maplink = "Maplink!";
    var address = "20 Elm St.";
    var openhours = "Hours: MWF 11AM - 9PM"
    if (disphr==1) hrtag = "hr";
    if (dispmin==1) mintag = "min";
    $(li).html('<div class="name">{0}</div><div class="timeleft">Closes in {1} {2} {3} {4}</div><div class="ratings hidden showexp">{5}</div><div class="map hidden showexp"><input type="button" class="favbutton" value="Favorite"></div><div class="address hidden showexp">{7}</div><div class="hours hidden showexp">{8}</div>'.format(list[i].name,disphr,hrtag,dispmin,mintag,rating,maplink,address,openhours ) ).attr('id',list[i].name);
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
    $(li).addClass('loc_el');
    var disphr = Math.floor(OT);
    var dispmin = htom(OT);
    var hrtag = "hrs";
    var mintag = "mins";
    var rating = "*****";
    var maplink = "Maplink!";
    var address = "20 Elm St.";
    var openhours = "Hours: MWF 11AM - 9PM"
    if (disphr==1) hrtag = "hr";
    if (dispmin==1) mintag = "min";
    $(li).html('<div class="name">{0}</div><div class="timeleft">Opens in {1} {2} {3} {4}</div><div class="ratings hidden showexp">{5}</div><div class="map hidden showexp"><input type="button" class="favbutton" value="Favorite"></div><div class="address hidden showexp">{7}</div><div class="hours hidden showexp">{8}</div>'.format(list[i].name,disphr,hrtag,dispmin,mintag,rating,maplink,address,openhours ) ).attr('id',list[i].name);
  printlist.insertBefore(li, printlist.firstChild); 
  }
}




