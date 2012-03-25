$(document).ready(function() {
new Accordian('basic-accordian',5,'header_highlight');
dispO(openRests,'rest',CURTIME);
dispO(openLibs,'libs',CURTIME);
dispO(openDHs,'DHs',CURTIME);
dispO(openFacs,'facs',CURTIME);
dispC(closedRests,'crest',CURTIME);
dispC(closedLibs,'clibs',CURTIME);
dispC(closedDHs,'cDHs',CURTIME);
dispC(closedFacs,'cfacs',CURTIME);
$('.wd-open>li').tsort();
$('.wd-closed>li').tsort();
});

