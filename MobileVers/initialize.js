function data_initialize(x) {
openRests = getOpen(allRests,x);
closedRests = getClosed(allRests,x);

dispO(openRests,'rest',x);
dispC(closedRests,'crest',x);

//  $('.wd-open > li').tsort();
//  $('.wd-closed > li').tsort();

}

function initialize() {


//  $(".tab_content").togglepanels(); nested accordion


//show open and closed buttons
/*
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
  });*/

}

$(document).ready(function() {
  data_initialize(CURTIME);
  initialize();
});


