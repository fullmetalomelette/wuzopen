function initialize() {
dispO(openRests,'rest',CURTIME);
dispO(openLibs,'libs',CURTIME);
dispO(openDHs,'DHs',CURTIME);
dispO(openFacs,'facs',CURTIME);
dispC(closedRests,'crest',CURTIME);
dispC(closedLibs,'clibs',CURTIME);
dispC(closedDHs,'cDHs',CURTIME);
dispC(closedFacs,'cfacs',CURTIME);
}

$(document).ready(function() {
  initialize();
})

