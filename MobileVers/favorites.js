var cookieList = function(cookieName) {
//So we will split the cookie by comma to get the original array
var cookie = $.cookie(cookieName);
//Load the items or a new array if null.
var items = cookie ? cookie.split(/,/) : new Array();

//Return a object that we can use to access the array.
//while hiding direct access to the declared items array
//this is called closures see http://www.jibbering.com/faq/faq_notes/closures.html
return {
    "add": function(val) {
        //Add to the items.
        items.push(val);
        //Save the items to a cookie.
        //EDIT: Modified from linked answer by Nick see 
        //      http://stackoverflow.com/questions/3387251/how-to-store-array-in-jquery-cookie
        $.cookie(cookieName, items.join(','), {expires:1000});
    },
    "remove": function (val) { 
        //EDIT: Thx to Assef and luke for remove.
        indx = items.indexOf(val); 
        if(indx!=-1) items.splice(indx, 1); 
        $.cookie(cookieName, items.join(','), {expires:1000});},
    "clear": function() {
        items = null;
        //clear the cookie.
        $.cookie(cookieName, null);
    },
    "items": function() {
        //Get all the items.
        return items;
    }
  }
}

var favlist;
var favstime;
var favcookie = new cookieList();

function findPlacesByNames(places,names) {
  var out = new Array();
  var j=0;
  for (var i=0;i<places.length;i++) {
    if (names.length==j);
    if (places.name==names[j]) {
      out.push(places[i]);
      j++;
      }
  }
  return out;
}


function toggleCookie(x) {
  if($.inArray(x, favcookie.items() ) > -1) { //in array
    favcookie.remove(x);
  }
  else {
    favcookie.add(x);
  }
}



