var openshown = 1;
var closedshown = 0;

function data_initialize(x) {
openFacs = getOpen(allFac,x);
openLibs = getOpen(allLibs,x);
openRests = getOpen(allRests,x);
openDHs = getOpen(allDH,x);
openSnacks = getOpen(allSnacks,x);

closedFacs = getClosed(allFac,x);
closedLibs = getClosed(allLibs,x);
closedRests = getClosed(allRests,x);
closedDHs = getClosed(allDH,x);
closedSnacks = getClosed(allSnacks,x);

var allO = openFacs.concat(openLibs,openRests,openDHs,openSnacks);
var allC = closedFacs.concat(closedLibs,closedRests,closedDHs,closedSnacks);

$('#all_list').html("");

dispC(allC,'all_list',x);
dispO(allO,'all_list',x);

  $('ul#all_list > li').tsort();

//  $('.wd-closed > li').tsort();

//click to expand and contract elements
  $('li.loc_el>div.name').toggle(function() {
      $(this).parent().addClass('expand',200);
      $(this).parent().find('.showexp').removeClass('hidden').removeAttr('style');
    },
    function() {
      $(this).parent().removeClass('expand',200,function() {
      $(this).parent().find('.showexp').addClass('hidden').removeAttr('style') ;});
      }
    );

  favstime = x;

  var options = { valueNames: [ 'name','timeleft','isclosed','type'] };
  var featureList = new List('PlaceList', options);


  $('#filterbuttons').children().each(function(){
    $(this).unbind('click');
  });

  /*
  $('#filter-open').click(function() {
    featureList.filter(function(values) {
      if (values.isclosed == 0) { return true;}
      else { return false; }
    });
    return false;
  });
        
  $('#filter-closed').click(function() {
    featureList.filter(function(values) {
      if (values.isclosed == 1) { return true;}
      else { return false;}
    });
    return false;
  });
  */

  $('#filter-libs').click(function() {
    featureList.filter(function(values) {
      if (values.type == 'lib') { return true;}
      else { return false;}
    });
    return false;
  });

  $('#filter-rests').click(function() {
    featureList.filter(function(values) {
      if (values.type == 'rest') { return true;}
      else { return false;}
    });
    return false;
  });

  $('#filter-snacks').click(function() {
    featureList.filter(function(values) {
      if (values.type == 'snack') { return true;}
      else { return false;}
    });
    return false;
  });

  $('#filter-dhs').click(function() {
    featureList.filter(function(values) {
      if (values.type == 'dh') { return true;}
      else { return false;}
    });
    return false;
  });

  $('#filter-misc').click(function() {
    featureList.filter(function(values) {
      if (values.type == 'misc') { return true;}
      else { return false;}
    });
    return false;
  });

  $('#filter-none').click(function() {
    featureList.filter();
      return false;
  });

}

function initialize() {

  //set favorites on clicking
  /*
  $('input.favbutton').click(function() {
    $(this).parent().parent().toggleClass('fav');
    toggleCookie( $(this).parent().parent().attr('id') );
  });*/

//change time
  $('#input_time').timeEntry({spinnerImage: '',ampmPrefix: ' ', defaultTime:CURTIME});
  $("select#weekday_input option[value="+CURTIME.getDay()+"]").attr("selected", "selected");
  $('#time_set').click( function() {
    var SETTIME = $('#input_time').timeEntry('getTime');
    SETTIME.setYear(2000);
    SETTIME.setMonth(4,$("select#weekday_input option:selected").val());
    data_initialize(SETTIME);
    $("#notifier").html("Time set to " + SETTIME.getHours() +":"+ SETTIME.getMinutes());
 });

//show open and closed buttons

  $('ul.filter > li, #time_set').click(function() {
    if (openshown) {
      $('.open_loc').removeClass('hidden');
    }
    else {
      $('.open_loc').addClass('hidden');
    }
    if (closedshown) {
      $('.closed_loc').removeClass('hidden');
    }
    else {
      $('.closed_loc').addClass('hidden');
    }
  });

  $('#open-toggler').toggle(function() {
      $('.open_loc').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
        $(this).addClass('hidden').removeAttr('style');});
      this.value="Show Open"; openshown = 0;},
    function() {
      $('.open_loc').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $('.open_loc').removeClass('hidden').removeAttr('style');});
      this.value="Hide Open"; openshown = 1;
      });

  $('#closed-toggler').toggle(
    function() {
      $('.closed_loc').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $('.closed_loc').removeClass('hidden').removeAttr('style');});
      this.value="Hide Closed"; closedshown = 1;},
    function() {
            $('.closed_loc').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
        $(this).addClass('hidden').removeAttr('style');});
      this.value="Show Closed"; closedshown = 0;
      });



/*
//change backgrounds
  $('#tab_headers>li>a').click(function() {
    temp = (this+'');
    temp = temp.substring(temp.length-6,temp.length);
    bd = $('#title');
    switch(temp) {
      case '#tab-1': bd.css("background-color","red"); break;
      case '#tab-2': bd.css("background-color","blue"); break;
      case '#tab-3': bd.css("background-color","black"); break;
      case '#tab-4': bd.css("background-color","white"); break;
      case '#tab-5': bd.css("background-color","white"); break;
      default: alert(this.parent());
    }
  });
*/

/*
//Show favorites when last tab is clicked
  $('#tab_headers>li>a').last().click( function() {
    $('#fav_locs,#cfav_locs').html("");
    $('li.fav').each( function(ind,el) {
      var cp = $(this).clone();
      if ($(el).parent().hasClass('wd-open') ) {
        $('#fav_locs').append(cp);
      }
      else {
        $('#cfav_locs').append(cp);
      }
      $(cp).click(function() {
      $(el).toggleClass('fav');
        }).removeClass('expand').find('.showexp').addClass('hidden').removeAttr('style');
    });
    $('#fav_locs').tsort();
    $('#cfav_locs').tsort();

    $('#fav_locs>li.loc_el>div.name,#cfav_locs>li.loc_el>div.name').toggle(function() {
      $(this).parent().addClass('expand',200);
      $(this).parent().find('.showexp').removeClass('hidden').removeAttr('style');
    },
    function() {
      $(this).parent().removeClass('expand',200,function() {
      $(this).parent().find('.showexp').addClass('hidden').removeAttr('style') ;});
      }
    );

    if ($('#fav_locs').html() == "")
      $('#fav_locs').html("No open favorites");
    if ($('#cfav_locs').html() == "")
      $('#cfav_locs').html("No closed favorites"); 
  });
*/

  //set cookie initially

  //favlist = document.cookie;


}

$(document).ready(function() {
  data_initialize(CURTIME);
  initialize();
});


