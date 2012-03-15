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

dispO(openRests,'rest',x);
dispO(openLibs,'libs',x);
dispO(openSnacks,'snacks',x);
dispO(openFacs.concat(openDHs),'facs',x);
dispC(closedRests,'crest',x);
dispC(closedLibs,'clibs',x);
dispC(closedSnacks,'csnacks',x);
dispC(closedFacs.concat(closedDHs),'cfacs',x);

  $('.wd-open > li').tsort();
  $('.wd-closed > li').tsort();

  $('.wd-open > li,.wd-closed > li').click(function() {
    

  });
}

function initialize() {
  $('#tabs').tabs({fx: {height:'toggle',duration:'fast'}} );

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
      $('.wd-open').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
        $(this).addClass('hidden').removeAttr('style');});
      this.value="Show Open";},
    function() {
      $('.wd-open').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $('.wd-open').removeClass('hidden').removeAttr('style');});
      this.value="Hide Open";});

  $('#closed-toggler').toggle(function() {
      $('.wd-closed').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $('.wd-closed').removeClass('hidden').removeAttr('style');});
      this.value="Hide Closed";},
      function() {
            $('.wd-closed').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
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
}

$(document).ready(function() {
  data_initialize(CURTIME);
  initialize();
});


