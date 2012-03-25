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


function htom(x) {
  return ((x%1)*60).toFixed(0);
}

function inttoday(x) {
   if (x==0) return "Sun";
   if (x==1) return "Mon";
   if (x==2) return "Tue";
   if (x==3) return "Wed";
   if (x==4) return "Thu";
   if (x==5) return "Fri";
   if (x==6) return "Sat";
}

function prettyHrs(x) {
  if (0 <= x && x < 1) {return "12:{0} AM".format( htom(x) );}
  if (12 <= x && x < 13) {return "12:{0} PM".format( htom(x) );}
  if (x < 12)
    {return "{0}:{1} AM".format( Math.floor(x), htom(x));}
  else {
    x = x-12;
    return "{0}:{1} PM".format( Math.floor(x), htom(x));
  }
}

//[ [ [1,3] , [2,4] ] , [1,2] ]
//list[0] == [ [1,3], [2,4] ]
//list[0][0] == [1,3]


//FIX THIS
function formatHrs(list) {
  out = new Array();
  for(var i=0;i<list.length;i++) {
    if (list[i][0] instanceof Array) {
      for (var j=0;j<list[i].length;j++) {
        var temp= "{0}-{1}".format(prettyHrs(list[i][j][0]), prettyHrs(list[i][j][1]) );
        out.push(temp);
      }
    }
    else {
      out.push( "{0}-{1}".format(prettyHrs(list[i][0]),prettyHrs(list[i][1])) );
    }
  }
  return out;
}

function printHrs(list) {

  return 0;
}



var reA = /[^a-za-z]/g;
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





