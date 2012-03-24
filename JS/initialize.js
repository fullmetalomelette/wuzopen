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

dispO(openRests,'rest',x);
dispO(openLibs,'libs',x);
dispO(openSnacks,'snacks',x);
dispO(openFacs,'facs',x);
dispO(openDHs,'dhs',x);
dispC(closedRests,'crest',x);
dispC(closedLibs,'clibs',x);
dispC(closedSnacks,'csnacks',x);
dispC(closedFacs,'cfacs',x);
dispC(closedDHs,'cdhs',x);

  $('.wd-open > li').tsort();
  $('.wd-closed > li').tsort();

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

  var options = { valueNames: [ 'name', 'timeleft'] };
  var featureList = new List('tab-1', options);
}

function initialize() {
  $('#tabs').tabs({fx: {height:'toggle',duration:'fast'}} );

  //set favorites on clicking
  $('input.favbutton').click(function() {
    $(this).parent().parent().toggleClass('fav');
    toggleCookie( $(this).parent().parent().attr('id') );
  });

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

//  $(".tab_content").togglepanels(); nested accordion


//show open and closed buttons

  $('#open-toggler').toggle(function() {
      $('ul.wd-open').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
        $(this).addClass('hidden').removeAttr('style');});
      this.value="Show Open";},
    function() {
      $('ul.wd-open').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $('ul.wd-open').removeClass('hidden').removeAttr('style');});
      this.value="Hide Open";});

  $('#closed-toggler').toggle(function() {
      $('ul.wd-closed').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $('ul.wd-closed').removeClass('hidden').removeAttr('style');});
      this.value="Hide Closed";},
      function() {
            $('ul.wd-closed').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
        $(this).addClass('hidden').removeAttr('style');});
      this.value="Show Closed";}
      );

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

  //set cookie initially

  favlist = document.cookie;

  //for (var i=0;i<
  //$('')


}

$(document).ready(function() {
  data_initialize(CURTIME);
  initialize();
});


