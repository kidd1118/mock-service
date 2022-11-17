//this part will be replaced by ANT, please DON'T remove @SPLIT@ tag.
var VERSION_MAP = {};
VERSION_MAP.current = {};
var CURRENT_VERSION = VERSION_MAP.current;
var CURRENT_GC_MAP = (CURRENT_VERSION.gc = {});
var CURRENT_RES_MAP = (CURRENT_VERSION.resources = {});
var CURRENT_INFO_MAP = (CURRENT_VERSION.if = {});
//Replace start @SPLIT@
CURRENT_VERSION.version ="666";//@SPLIT@
CURRENT_VERSION.info ="357";//@SPLIT@
CURRENT_VERSION.splitgame ="88";//@SPLIT@
CURRENT_RES_MAP.common ="440";//@SPLIT@
CURRENT_RES_MAP.engine ="440";//@SPLIT@
CURRENT_RES_MAP.game3 ="440";//@SPLIT@
CURRENT_RES_MAP.game5 ="440";//@SPLIT@
CURRENT_RES_MAP.game6 ="440";//@SPLIT@
CURRENT_RES_MAP.game7 ="440";//@SPLIT@
CURRENT_RES_MAP.game8 ="440";//@SPLIT@
CURRENT_RES_MAP.game9 ="440";//@SPLIT@
CURRENT_RES_MAP.game10 ="440";//@SPLIT@
CURRENT_RES_MAP.game11 ="440";//@SPLIT@
CURRENT_RES_MAP.game12 ="440";//@SPLIT@
CURRENT_RES_MAP.game13 ="440";//@SPLIT@
CURRENT_RES_MAP.game14 ="440";//@SPLIT@
CURRENT_RES_MAP.game15 ="440";//@SPLIT@
CURRENT_RES_MAP.game16 ="440";//@SPLIT@
CURRENT_RES_MAP.game17 ="440";//@SPLIT@
CURRENT_RES_MAP.game18 ="440";//@SPLIT@
CURRENT_RES_MAP.game19 ="440";//@SPLIT@
CURRENT_RES_MAP.game20 ="440";//@SPLIT@
CURRENT_RES_MAP.game21 ="208";//@SPLIT@
CURRENT_RES_MAP.game22 ="440";//@SPLIT@
CURRENT_RES_MAP.game23 ="440";//@SPLIT@
CURRENT_RES_MAP.game24 ="440";//@SPLIT@
CURRENT_RES_MAP.game25 ="210";//@SPLIT@
CURRENT_RES_MAP.game26 ="440";//@SPLIT@
CURRENT_RES_MAP.game27 ="302";//@SPLIT@
CURRENT_RES_MAP.game28 ="441";//@SPLIT@
CURRENT_RES_MAP.game29 ="440";//@SPLIT@
CURRENT_RES_MAP.game30 ="230";//@SPLIT@
CURRENT_RES_MAP.game31 ="213";//@SPLIT@
CURRENT_RES_MAP.game32 ="301";//@SPLIT@
CURRENT_RES_MAP.game33 ="440";//@SPLIT@
CURRENT_RES_MAP.QATool = "266"; //@SPLIT@
CURRENT_RES_MAP.game34 ="300";//@SPLIT@
CURRENT_RES_MAP.game35 ="299";//@SPLIT@
CURRENT_RES_MAP.game36 ="298";//@SPLIT@
CURRENT_RES_MAP.game37 ="297";//@SPLIT@
CURRENT_RES_MAP.game38 ="296";//@SPLIT@
CURRENT_GC_MAP.game38 ="517";//@SPLIT@
CURRENT_GC_MAP.game39 ="524";//@SPLIT@
CURRENT_GC_MAP.template = "160"; //@SPLIT@
CURRENT_RES_MAP.game39 ="294";//@SPLIT@
CURRENT_RES_MAP.game40="293";//@SPLIT@
CURRENT_GC_MAP.game40="515";//@SPLIT@
CURRENT_RES_MAP.game41="106";//@SPLIT@
CURRENT_GC_MAP.game41="442";//@SPLIT@
CURRENT_GC_MAP.game42="514";//@SPLIT@
CURRENT_RES_MAP.game42="292";//@SPLIT@
CURRENT_GC_MAP.game34="521";//@SPLIT@
//CURRENT_GC_MAP.game14="430";//@SPLIT@
CURRENT_GC_MAP.game37="518";//@SPLIT@
CURRENT_INFO_MAP.E30="56";//@SPLIT@
CURRENT_RES_MAP.game43="291";//@SPLIT@
CURRENT_GC_MAP.game43="513";//@SPLIT@
CURRENT_GC_MAP.game30="445";//@SPLIT@
CURRENT_GC_MAP.game31="420";//@SPLIT@
CURRENT_GC_MAP.game36="519";//@SPLIT@
CURRENT_GC_MAP.game35="520";//@SPLIT@
CURRENT_GC_MAP.game32="522";//@SPLIT@
CURRENT_GC_MAP.game27="523";//@SPLIT@
CURRENT_GC_MAP.game44="512";//@SPLIT@
CURRENT_RES_MAP.game44="290";//@SPLIT@
CURRENT_GC_MAP.game25="441";//@SPLIT@
CURRENT_INFO_MAP.E31="60";//@SPLIT@
CURRENT_INFO_MAP.E32="71";//@SPLIT@
CURRENT_GC_MAP.game45="511";//@SPLIT@
CURRENT_RES_MAP.game45="289";//@SPLIT@
CURRENT_GC_MAP.game21="424";//@SPLIT@
CURRENT_GC_MAP.game46="527";//@SPLIT@
CURRENT_RES_MAP.game46="288";//@SPLIT@
CURRENT_INFO_MAP.E33="75";//@SPLIT@
CURRENT_RES_MAP.game47="261";//@SPLIT@
CURRENT_GC_MAP.game47="480";//@SPLIT@

// var tpk=6;

var CDN_HOST = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port; //active CDN:dev.slots-doc-cdn.com
function ReplaceProtocol(url, protocol) {
  if (protocol == "http:") return url;
  return url.replace(/\http:/g, protocol);
}

//
// Retrieve CDN number (old)
//
function getVersionNumber() {
  return "249";
}
//
// Gets CDN powered file url
//
function getCDNHostUrl(gameVersion, gameId) {
  var _gameVersion = gameVersion || "current";
  var url = CDN_HOST + "/m/gc/" + getGCUrl(_gameVersion, gameId);
  return url;
}
//
// Gets index.html powered file url
//
function getHostUrl(gameVersion, gameId) {
  var _gameVersion = gameVersion || "current";
  var url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    "/m/gc/" +
    getGCUrl(_gameVersion, gameId);
  return url;
}

//
// Retrieve CDN number (new)
//
function getCurrentVersionNumber() {
  return VERSION_MAP.current.version;
}

function getGCUrl(gameVersion, gameId) {
  if (!gameVersion || !gameId) return getCurrentVersionNumber();
  var gcVersionMap = VERSION_MAP[gameVersion].gc,
    gcVersion =
      gcVersionMap && gcVersionMap[gameId]
        ? gameId + "/" + gcVersionMap[gameId]
        : VERSION_MAP[gameVersion].version;

  return gcVersion;
}

// function getInfoVersionNumber(gameVersion) {
//   return VERSION_MAP[gameVersion].info;
// }

function getInfoVersionNumber() {
	return VERSION_MAP.current.info;
}

function getSplitGameVersionNumber(gameVersion) {
  return VERSION_MAP[gameVersion].splitgame;
}

function getResourcesVersionNumber(gameVersion, resourcesId) {
  var resourcesVersionMap = VERSION_MAP[gameVersion].resources,
    resourcesVersion =
      resourcesVersionMap && resourcesVersionMap[resourcesId]
        ? resourcesVersionMap[resourcesId]
        : "";

  return resourcesVersion;
}

// function getInfoUrl(gameVersion) {
//   var _gameVersion = gameVersion || "current";
//   var url = CDN_HOST + "/m/info/" + getInfoVersionNumber(_gameVersion);
//   return url;
// }

function getInfoUrl(gameVersion,engineId) {
	var _gameVersion = gameVersion || "current";
	var url = CDN_HOST + "/m/info/" + getInfoUrlByEngine(_gameVersion, engineId);
	return url;
}

function getInfoUrlByEngine(gameVersion, engineId) {
	if (!gameVersion || !engineId) return getInfoVersionNumber();
	var infoVersionMap = VERSION_MAP[gameVersion].if,
	  infoVersion =
		infoVersionMap && infoVersionMap[engineId]
		  ? engineId + "/" + infoVersionMap[engineId]
		  : VERSION_MAP[gameVersion].info;
  
	return infoVersion;
}

function getSplitGameUrl(gameVersion) {
  var _gameVersion = gameVersion || "current";
  var url =
    CDN_HOST + "/m/splitgame/" + getSplitGameVersionNumber(_gameVersion);
  return url;
}

function getResourcesUrl(gameVersion, resourcesId) {
  var _gameVersion = gameVersion || "current";
  var url =
    CDN_HOST +
    "/m/resources/" +
    resourcesId +
    "/" +
    getResourcesVersionNumber(_gameVersion, resourcesId);
  return url;
}

function getSplitGameOriginUrl(gameVersion) {
  var _gameVersion = gameVersion || "current";
  var url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    "/m/splitgame/" +
    getSplitGameVersionNumber(_gameVersion);
  return url;
}
