var openshown = 1;
var closedshown = 0;
var allO;
var allC;

function filterloc(type) {
  $('ul#all_list>li').each(function() {
    if ( $(this).hasClass(type) ) {
      $(this).addClass('hidden');
    }
    else
      $(this).removeClass('hidden');
  });
  $('ul').listview('refresh');
}

function data_initialize(x) {

allplaceslist = allplaceslist.concat(allplaceslist2,allplaceslist3);

allO = getOpen(allplaceslist,x);
allC = getClosed(allplaceslist,x);

//dispC(allC,'all_list',x);
dispO(allO,'all_list',x);
dispC(allC,'all_list',x);

$('ul#all_list > li').tsort();

$('ul').listview('refresh');

}

function initialize() {
/*  $('#resttog').ready( $(this).click(function() {
    alert('hi');
    filter('rest');
  }) );*/
//loc_el

/*
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
      $('.open_loc').removeClass('hidden').removeAttr('style');});
      $(this).html("Hide Open"); openshown = 1;
      });

  $('#closed-toggler').toggle(
    function() {
      $('.closed_loc').slideDown('fast').animate({opacity:1,duration:'slow'},function() {  
      $('.closed_loc').removeClass('hidden').removeAttr('style');});
      $(this).html("Hide Closed"); closedshown = 1;},
    function() {
            $('.closed_loc').animate({opacity:0,duration:'fast'}).slideUp('fast', function() {
        $(this).addClass('hidden').removeAttr('style');});
      $(this).html("Show Closed"); closedshown = 0;
      });
*/

}

$(document).ready(function() {
  data_initialize(CURTIME);
  initialize();
});


