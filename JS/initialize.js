var openshown = 1;
var closedshown = 0;
var initpress = 0;
var allO;
var allC;
var currentlist;
var updateVar;
var timefly;

function data_initialize(x) {

currentlist = allplaceslist.concat(allplaceslist2,allplaceslist3);
var i;
for(i=0;i<currentlist.length;i++) {
  currentlist[i].uniqid = i;
}

allO = getOpen(currentlist,x);
allC = getClosed(currentlist,x);

$('#all_list').html("");

dispC(allC,'all_list',x);
dispO(allO,'all_list',x);

  $('ul#all_list > li').tsort();

//  $('.wd-closed > li').tsort();

//click to expand and contract elements
  $('li.loc_el>div.name').click(function() {
      if ( $(this).parent().hasClass('expand') ) {
        $(this).parent().removeClass('expand',200,function() {
        $(this).find('.showexp').addClass('hidden').removeAttr('style') ;});
      }
      else {
        $(this).parent().addClass('expand',200).find('.showexp').removeClass('hidden').removeAttr('style');
      }
    });

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


function timeUpdate(el,open,date) {
  var text;
  var thisel=$(el);
  var elID = thisel.attr('id');
  var loc = currentlist[elID];

  if (open) {
    var CT = closesIn(loc,date);
    text = getClosingText(CT,loc,date);
  }
  else {
    var OT = opensIn(loc,date);
    text = getOpeningText(OT,loc,date);
  }
  thisel.find('div.timeleft').html(text);
}

function int2day(x) {
  switch(x) {
    case '0': return 'Sunday';
    case '1': return 'Monday';
    case '2': return 'Tuesday';
    case '3': return 'Wednesday';
    case '4': return 'Thursday';
    case '5': return 'Friday';
    case '6': return 'Saturday';
    default: return 'Some Day';
  }

}

function bgimg(x) {
  switch(x) {
    case 'filter-libs': return 'bglib';
    case 'filter-dhs': return 'bgrest';
    case 'filter-rests': return 'bgrest';
    case 'filter-snacks': return 'bgsnack';
    case 'filter-misc': return 'bgrest';
    default: return 'bgdef';
  }
}



function updateEls(type) {
    if(type==0) {CURTIME = new Date();}
    else if (type==1) { CURTIME.setMinutes( CURTIME.getMinutes() + 1);}
    else if (type==2) { CURTIME.setHours( CURTIME.getHours() + 1);}
    if(type!=0) {
      $("#notifier").html("<span style='color:red'>Traveling forward through time! Now at " + prettyHrs(CURTIME.getHours()+(CURTIME.getMinutes()/60)) + " on " + int2day(''+CURTIME.getDay()) +"</span>");
      }
    else {$("#notifier").html("");}

    $('.loc_el').each(function() {
      var x;
      var locid = $(this).attr('id');
      var loc = currentlist[locid];
      var change = 0;
/*
      if(loc==undefined) {
        alert('hi');
      }
*/
      x = checkOpen(loc,CURTIME);

      if ( x && $(this).hasClass('closed_loc') ) {
        change = 1; //change to open
        }
      if ( !(x) && !($(this).hasClass('closed_loc')) ) {
        change = -1; //change to closed
        }
      timeUpdate(this,x,CURTIME);
      
      if(change != 0) {
        if (change == 1) { //to open
          $(this).animate({
            backgroundColor:"#DCDCDC",
            color:"#000000"
            },500,function(){
              $(this).removeClass('closed_loc').addClass('open_loc');
              if (openshown) {
                $(this).slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
                $(this).removeClass('hidden').removeAttr('style');}); }
              else {
                $(this).animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
                $(this).addClass('hidden').removeAttr('style');}); }
            });
        }
        else { //to closed
          $(this).animate({
            backgroundColor:"#666666",
            color:"#FFFFFF"
            },500,function(){
              $(this).addClass('closed_loc').removeClass('open_loc');
              if (closedshown) {
                $(this).slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
                $(this).removeClass('hidden').removeAttr('style');}); }
              else {
                $(this).animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
                $(this).addClass('hidden').removeAttr('style');}); }
            });
        }
      }

    });
}

function beginUpdating() {
  CURTIME = new Date();
  updateEls(0);
  updateVar = setInterval( function() {
    updateEls(0);
    },60000);
}

var t1on=0;
var t2on=0;

function initialize() {

  var z = 60-CURTIME.getSeconds();
  var timer = setTimeout('beginUpdating()',z*1000);
/*
  $('#tester').click(function() {
    CURTIME.setHours(CURTIME.getHours() + 5);
    updateEls(0);
  });
*/
  $('#timedemo').click( function() {
    if(initpress==0) initialAnimate();
    if(!t1on) {
      timefly = setInterval( function() {
        updateEls(1);
      },500);
      $(this).css('color','yellow');
      t1on=1;
    }
    else {
      if(timefly) clearInterval(timefly);
      $(this).removeAttr('style');
      t1on=0;
      }
    });

  $('#timedemo2').click( function() {
    if(initpress==0) initialAnimate();
    if(!t2on) {
      timefly2 = setInterval( function() {
        updateEls(2);
      },1000);
      $(this).css('color','yellow');
      t2on=1;
    }
    else {
      if(timefly2) clearInterval(timefly2);
      $(this).removeAttr('style');
      t2on=0;
      }
    });



  $('body').css('background-size',sprintf('%spx %spx',window.outerWidth,window.outerHeight));


  $('ul.filter>li').click(function() {
    $('ul.filter>li').each(function() {
      $(this).removeClass('btn2select');
      });
    $(this).addClass('btn2select');
  });

//change time
  $('#input_time').timeEntry({spinnerImage: '',ampmPrefix: ' ', defaultTime:CURTIME});
  $("select#weekday_input option[value="+CURTIME.getDay()+"]").attr("selected", "selected");
  $('#time_set').click( function() {
    SETTIME = $('#input_time').timeEntry('getTime');
    if (SETTIME == null) {
      if (initpress) return;
      else { initialAnimate(); return;}
    }
    else {
      CURTIME = SETTIME;
    }
    CURTIME.setYear(2000);
    CURTIME.setMonth(4,$("select#weekday_input option:selected").val());
    data_initialize(CURTIME);
    if (timer) clearTimeout(timer);
    if (updateVar) clearInterval(updateVar);
    if (t1on) $('#timedemo').click();
    if (t2on) $('#timedemo2').click();
  $("#notifier").html("Time set to " + prettyHrs(CURTIME.getHours()+(CURTIME.getMinutes()/60)) + " on " + int2day(''+CURTIME.getDay()) );
    if (initpress) return;
    else initialAnimate();
 });


  $('#input_time').attr('placeholder',prettyHrs(CURTIME.getHours()+(CURTIME.getMinutes()/60)));

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
      $(this).html("Show Open"); openshown = 0;},
    function() {
      $('.open_loc').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $(this).removeClass('hidden').removeAttr('style');});
      $(this).html("Hide Open"); openshown = 1;
      });

  $('#closed-toggler').toggle(
    function() {
      $('.closed_loc').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $(this).removeClass('hidden').removeAttr('style');});
      $(this).html("Hide Closed"); closedshown = 1;},
    function() {
            $('.closed_loc').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
        $(this).addClass('hidden').removeAttr('style');});
      $(this).html("Show Closed"); closedshown = 0;
      });
/*
  $('ul.filter > li').click(function() {
    var temp = $(this).attr('id');
    bg = $('body');
    var cur = bg.attr('class');
    if (bgimg(temp) != cur)
      bg.addClass(bgimg(temp),'fast',function() {bg.removeClass(cur);});
//    bg.switchClass(bg.attr('class'),bgimg(temp),'slow');
  });

*/


/*
  $('#title').hover(  function() {
    $(this).addClass('titlehover','slow');
    },
    function() {
    $(this).removeClass('titlehover','slow');
  });
*/

  $('#searchbox').keypress(function(e) {
    if (initpress) return;
    else if (e.which == 13) {
      initialAnimate();
    }
  });

  $('ul.filter > li').click(function() {
    if (initpress) return;
    else { initialAnimate();}
  });

//  preload(['images/rest.jpg','images/SML.jpg','images/Starr.jpg']);

}

/*
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}
*/


function initialAnimate() {
  $('#wrapper').animate(
  {marginTop: '80px'},300,function() {
    $('#show-hide').slideDown(100,function () {
      $('#all_list').slideDown(300);
      initpress = 1;
      $('#searchbox').attr('placeholder','Type your search here');    
    });
  });
}

function bgimg(x) {
  switch(x) {
    case 'filter-libs': return 'bglib';
    case 'filter-dhs': return 'bgrest';
    case 'filter-rests': return 'bgrest';
    case 'filter-snacks': return 'bgsnack';
    case 'filter-misc': return 'bgrest';
    default: return 'bgdef';
  }
}

$(document).ready(function() {
  data_initialize(CURTIME);
  initialize();
});


