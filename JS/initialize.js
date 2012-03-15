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
}

function initialize() {
  $('#tabs').tabs({fx: {height:'toggle',duration:'fast'}} );
  $('#input_time').timeEntry({spinnerImage: '',ampmPrefix: ' ', defaultTime:CURTIME});
  $("select#weekday_input option[value="+CURTIME.getDay()+"]").attr("selected", "selected");
  $('#time_set').click( function() {
    var SETTIME = $('#input_time').timeEntry('getTime');
    SETTIME.setYear(2000);
    SETTIME.setMonth(4,$("select#weekday_input option:selected").val());
    data_initialize(SETTIME);
    $("#notifier").html("Time set to " + SETTIME.getHours() +":"+ SETTIME.getMinutes());
 });
  $(".tab_content").togglepanels();
}

$(document).ready(function() {
  data_initialize(CURTIME);
  initialize();
});

