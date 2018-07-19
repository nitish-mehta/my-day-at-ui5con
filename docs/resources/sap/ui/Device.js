/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={}}if(typeof window.sap.ui!=="object"){window.sap.ui={}}(function(){"use strict";if(typeof window.sap.ui.Device==="object"||typeof window.sap.ui.Device==="function"){var e="1.56.4";window.sap.ui.Device._checkAPIVersion(e);return}var n={};function i(e,n){return("000"+String(e)).slice(-n)}var t=0,r=1,o=2,a=3,s=4,u=5;var d=function(){this.defaultComponent="DEVICE";this.sWindowName=window.top==window?"":"["+window.location.pathname.split("/").slice(-1)[0]+"] ";this.log=function(e,n,d){d=d||this.defaultComponent||"";var l=new Date,f={time:i(l.getHours(),2)+":"+i(l.getMinutes(),2)+":"+i(l.getSeconds(),2),date:i(l.getFullYear(),4)+"-"+i(l.getMonth()+1,2)+"-"+i(l.getDate(),2),timestamp:l.getTime(),level:e,message:n||"",component:d||""};if(window.console){var c=f.date+" "+f.time+" "+this.sWindowName+f.message+" - "+f.component;switch(e){case t:case r:console.error(c);break;case o:console.warn(c);break;case a:console.info?console.info(c):console.log(c);break;case s:console.debug?console.debug(c):console.log(c);break;case u:console.trace?console.trace(c):console.log(c);break}}return f}};var l=new d;l.log(a,"Device API logging initialized");n._checkAPIVersion=function(e){var n="1.56.4";if(n!=e){l.log(o,"Device API version differs: "+n+" <-> "+e)}};var f={};function c(e,n,i){if(!f[e]){f[e]=[]}f[e].push({oListener:i,fFunction:n})}function m(e,n,i){var t=f[e];if(!t){return this}for(var r=0,o=t.length;r<o;r++){if(t[r].fFunction===n&&t[r].oListener===i){t.splice(r,1);break}}if(t.length==0){delete f[e]}}function v(e,n){var i=f[e],t;if(i){i=i.slice();for(var r=0,o=i.length;r<o;r++){t=i[r];t.fFunction.call(t.oListener||window,n)}}}var w={WINDOWS:"win",MACINTOSH:"mac",LINUX:"linux",IOS:"iOS",ANDROID:"Android",BLACKBERRY:"bb",WINDOWS_PHONE:"winphone"};function p(e){e=e||navigator.userAgent;var n,i;function t(){var n=navigator.platform;if(n.indexOf("Win")!=-1){var i=/Windows NT (\d+).(\d)/i;var t=e.match(i);var r="";if(t[1]=="6"){if(t[2]==1){r="7"}else if(t[2]>1){r="8"}}else{r=t[1]}return{name:w.WINDOWS,versionStr:r}}else if(n.indexOf("Mac")!=-1){return{name:w.MACINTOSH,versionStr:""}}else if(n.indexOf("Linux")!=-1){return{name:w.LINUX,versionStr:""}}l.log(a,"OS detection returned no result");return null}n=/Windows Phone (?:OS )?([\d.]*)/;i=e.match(n);if(i){return{name:w.WINDOWS_PHONE,versionStr:i[1]}}if(e.indexOf("(BB10;")>0){n=/\sVersion\/([\d.]+)\s/;i=e.match(n);if(i){return{name:w.BLACKBERRY,versionStr:i[1]}}else{return{name:w.BLACKBERRY,versionStr:"10"}}}n=/\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;i=e.match(n);if(i){var r=/iPhone|iPad|iPod/;var o=/PlayBook|BlackBerry/;if(i[0].match(r)){i[3]=i[3].replace(/_/g,".");return{name:w.IOS,versionStr:i[3]}}else if(i[2].match(/Android/)){i[2]=i[2].replace(/\s/g,"");return{name:w.ANDROID,versionStr:i[3]}}else if(i[0].match(o)){return{name:w.BLACKBERRY,versionStr:i[4]}}}n=/\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;i=e.match(n);if(i){return{name:w.ANDROID,versionStr:i.length==3?i[2]:""}}return t()}function h(e){n.os=p(e)||{};n.os.OS=w;n.os.version=n.os.versionStr?parseFloat(n.os.versionStr):-1;if(n.os.name){for(var i in w){if(w[i]===n.os.name){n.os[i.toLowerCase()]=true}}}}h();n._setOS=h;var S={INTERNET_EXPLORER:"ie",EDGE:"ed",FIREFOX:"ff",CHROME:"cr",SAFARI:"sf",ANDROID:"an"};var g=navigator.userAgent;
/*!
	 * Taken from jQuery JavaScript Library v1.7.1
	 * http://jquery.com/
	 *
	 * Copyright 2011, John Resig
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 * Copyright 2011, The Dojo Foundation
	 * Released under the MIT, BSD, and GPL Licenses.
	 *
	 * Date: Mon Nov 21 21:11:03 2011 -0500
	 */function E(e){var n=(e||g).toLowerCase();var i=/(webkit)[ \/]([\w.]+)/;var t=/(opera)(?:.*version)?[ \/]([\w.]+)/;var r=/(msie) ([\w.]+)/;var o=/(trident)\/[\w.]+;.*rv:([\w.]+)/;var a=/(edge)[ \/]([\w.]+)/;var s=/(mozilla)(?:.*? rv:([\w.]+))?/;var u=a.exec(n)||o.exec(n)||i.exec(n)||t.exec(n)||r.exec(n)||n.indexOf("compatible")<0&&s.exec(n)||[];var d={browser:u[1]||"",version:u[2]||"0"};d[d.browser]=true;return d}function b(e,n){var i=E(e);var t=e||g;var r=n||window.navigator;var o;var a;if(i.mozilla){o=/Mobile/;if(t.match(/Firefox\/(\d+\.\d+)/)){var s=parseFloat(RegExp.$1);a={name:S.FIREFOX,versionStr:""+s,version:s,mozilla:true,mobile:o.test(t)}}else{a={mobile:o.test(t),mozilla:true,version:-1}}}else if(i.webkit){var u=t.toLowerCase().match(/webkit[\/]([\d.]+)/);var d;if(u){d=u[1]}o=/Mobile/;var l=t.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);var f=t.match(/FxiOS\/(\d+\.\d+)/);var c=t.match(/Android .+ Version\/(\d+\.\d+)/);if(l||f||c){var m,s,v;if(l){m=S.CHROME;v=o.test(t);s=parseFloat(l[2])}else if(f){m=S.FIREFOX;v=true;s=parseFloat(f[1])}else if(c){m=S.ANDROID;v=o.test(t);s=parseFloat(c[1])}a={name:m,mobile:v,versionStr:""+s,version:s,webkit:true,webkitVersion:d}}else{var w=/(Version|PhantomJS)\/(\d+\.\d+).*Safari/;var p=r.standalone;if(w.test(t)){var h=w.exec(t);var s=parseFloat(h[2]);a={name:S.SAFARI,versionStr:""+s,fullscreen:false,webview:false,version:s,mobile:o.test(t),webkit:true,webkitVersion:d,phantomJS:h[1]==="PhantomJS"}}else if(/iPhone|iPad|iPod/.test(t)&&!/CriOS/.test(t)&&!/FxiOS/.test(t)&&(p===true||p===false)){a={name:S.SAFARI,version:-1,fullscreen:p,webview:!p,mobile:o.test(t),webkit:true,webkitVersion:d}}else{a={mobile:o.test(t),webkit:true,webkitVersion:d,version:-1}}}}else if(i.msie||i.trident){var s;if(document.documentMode&&!e){if(document.documentMode===7){s=8}else{s=parseFloat(document.documentMode)}}else{s=parseFloat(i.version)}a={name:S.INTERNET_EXPLORER,versionStr:""+s,version:s,msie:true,mobile:false}}else if(i.edge){var s=s=parseFloat(i.version);a={name:S.EDGE,versionStr:""+s,version:s,edge:true}}else{a={name:"",versionStr:"",version:-1,mobile:false}}if((window.chrome||window.Intl&&window.Intl.v8BreakIterator)&&"CSS"in window){a.blink=true}return a}n._testUserAgent=b;function A(){n.browser=b();n.browser.BROWSER=S;if(n.browser.name){for(var e in S){if(S[e]===n.browser.name){n.browser[e.toLowerCase()]=true}}}}A();n.support={};n.support.touch=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch);if(n.browser.phantomJS){n.support.touch=false}n.support.pointer=!!window.PointerEvent;n.support.matchmedia=!!window.matchMedia;var D=n.support.matchmedia?window.matchMedia("all and (max-width:0px)"):null;n.support.matchmedialistener=!!(D&&D.addListener);if(n.browser.safari&&n.browser.version<6&&!n.browser.fullscreen&&!n.browser.webview){n.support.matchmedialistener=false}n.support.orientation=!!("orientation"in window&&"onorientationchange"in window);n.support.retina=window.retina||window.devicePixelRatio>=2;n.support.websocket="WebSocket"in window;n.support.input={};n.support.input.placeholder="placeholder"in document.createElement("input");n.media={};var R={SAP_3STEPS:"3Step",SAP_4STEPS:"4Step",SAP_6STEPS:"6Step",SAP_STANDARD:"Std",SAP_STANDARD_EXTENDED:"StdExt"};n.media.RANGESETS=R;n.media._predefinedRangeSets={};n.media._predefinedRangeSets[R.SAP_3STEPS]={points:[520,960],unit:"px",name:R.SAP_3STEPS,names:["S","M","L"]};n.media._predefinedRangeSets[R.SAP_4STEPS]={points:[520,760,960],unit:"px",name:R.SAP_4STEPS,names:["S","M","L","XL"]};n.media._predefinedRangeSets[R.SAP_6STEPS]={points:[241,400,541,768,960],unit:"px",name:R.SAP_6STEPS,names:["XS","S","M","L","XL","XXL"]};n.media._predefinedRangeSets[R.SAP_STANDARD]={points:[600,1024],unit:"px",name:R.SAP_STANDARD,names:["Phone","Tablet","Desktop"]};n.media._predefinedRangeSets[R.SAP_STANDARD_EXTENDED]={points:[600,1024,1440],unit:"px",name:R.SAP_STANDARD_EXTENDED,names:["Phone","Tablet","Desktop","LargeDesktop"]};var T=R.SAP_STANDARD;var P=n.support.matchmedialistener?0:100;var O={};var N=null;function _(e,n,i){i=i||"px";var t="all";if(e>0){t=t+" and (min-width:"+e+i+")"}if(n>0){t=t+" and (max-width:"+n+i+")"}return t}function I(e){if(!n.support.matchmedialistener&&N==y()[0]){return}if(O[e].timer){clearTimeout(O[e].timer);O[e].timer=null}O[e].timer=setTimeout(function(){var n=L(e,false);if(n){v("media_"+e,n)}},P)}function x(e,n){var i=O[e].queries[n];var t={from:i.from,unit:O[e].unit};if(i.to>=0){t.to=i.to}if(O[e].names){t.name=O[e].names[n]}return t}function L(e,i,t){t=t||n.media.matches;if(O[e]){var r=O[e].queries;var a=null;for(var s=0,u=r.length;s<u;s++){var d=r[s];if((d!=O[e].currentquery||i)&&t(d.from,d.to,O[e].unit)){if(!i){O[e].currentquery=d}if(!O[e].noClasses&&O[e].names&&!i){k(e,O[e].names[s])}a=x(e,s)}}return a}l.log(o,"No queryset with name "+e+" found","DEVICE.MEDIA");return null}function k(e,n,i){var t="sapUiMedia-"+e+"-";C(t+n,i,t)}function C(e,n,i){var t=document.documentElement;if(t.className.length==0){if(!n){t.className=e}}else{var r=t.className.split(" ");var o="";for(var a=0;a<r.length;a++){if(i&&r[a].indexOf(i)!=0||!i&&r[a]!=e){o=o+r[a]+" "}}if(!n){o=o+e}t.className=o}}function y(){return[window.innerWidth,window.innerHeight]}function F(e,n){if(n==="em"||n==="rem"){var i=window.getComputedStyle||function(e){return e.currentStyle};var t=i(document.documentElement).fontSize;var r=t&&t.indexOf("px")>=0?parseFloat(t,10):16;return e*r}return e}function M(e,n,i,t){e=F(e,i);n=F(n,i);var r=t[0];var o=e<0||e<=r;var a=n<0||r<=n;return o&&a}function z(e,n,i){return M(e,n,i,y())}function B(e,n,i){var t=_(e,n,i);var r=window.matchMedia(t);return r&&r.matches}n.media.matches=n.support.matchmedia?B:z;n.media.attachHandler=function(e,n,i){var t=i||T;c("media_"+t,e,n)};n.media.detachHandler=function(e,n,i){var t=i||T;m("media_"+t,e,n)};n.media.initRangeSet=function(e,i,t,r,o){var s;if(!e){s=n.media._predefinedRangeSets[T]}else if(e&&n.media._predefinedRangeSets[e]){s=n.media._predefinedRangeSets[e]}else{s={name:e,unit:(t||"px").toLowerCase(),points:i||[],names:r,noClasses:!!o}}if(n.media.hasRangeSet(s.name)){l.log(a,"Range set "+s.name+" has already been initialized","DEVICE.MEDIA");return}e=s.name;s.queries=[];s.timer=null;s.currentquery=null;s.listener=function(){return I(e)};var u,d,f;var c=s.points;for(var m=0,v=c.length;m<=v;m++){u=m==0?0:c[m-1];d=m==c.length?-1:c[m];f=_(u,d,s.unit);s.queries.push({query:f,from:u,to:d})}if(s.names&&s.names.length!=s.queries.length){s.names=null}O[s.name]=s;if(n.support.matchmedialistener){var w=s.queries;for(var m=0;m<w.length;m++){var p=w[m];p.media=window.matchMedia(p.query);p.media.addListener(s.listener)}}else{window.addEventListener("resize",s.listener,false);window.addEventListener("orientationchange",s.listener,false)}s.listener()};n.media.getCurrentRange=function(e,i){if(!n.media.hasRangeSet(e)){return null}return L(e,true,isNaN(i)?null:function(e,n,t){return M(e,n,t,[i,0])})};n.media.hasRangeSet=function(e){return e&&!!O[e]};n.media.removeRangeSet=function(e){if(!n.media.hasRangeSet(e)){l.log(a,"RangeSet "+e+" not found, thus could not be removed.","DEVICE.MEDIA");return}for(var i in R){if(e===R[i]){l.log(o,"Cannot remove default rangeset - no action taken.","DEVICE.MEDIA");return}}var t=O[e];if(n.support.matchmedialistener){var r=t.queries;for(var s=0;s<r.length;s++){r[s].media.removeListener(t.listener)}}else{window.removeEventListener("resize",t.listener,false);window.removeEventListener("orientationchange",t.listener,false)}k(e,"",true);delete f["media_"+e];delete O[e]};var X={TABLET:"tablet",PHONE:"phone",DESKTOP:"desktop",COMBI:"combi"};n.system={};function V(e,i){var t=W(i);var r=n.os.windows&&n.os.version>=8;var o=n.os.windows&&n.os.version===7;var a={};a.tablet=!!((n.support.touch&&!o||r||!!e)&&t);a.phone=!!(n.os.windows_phone||(n.support.touch&&!o||!!e)&&!t);a.desktop=!!(!a.tablet&&!a.phone||r||o);a.combi=!!(a.desktop&&a.tablet);a.SYSTEMTYPE=X;for(var s in X){C("sap-"+X[s],!a[X[s]])}return a}function W(e){var i=e||navigator.userAgent;var t=n.os.windows&&n.os.version>=8;if(n.os.name===n.os.OS.IOS){return/ipad/i.test(i)}else{if(n.support.touch){if(t){return true}if(n.browser.chrome&&n.os.android&&n.os.version>=4.4){return!/Mobile Safari\/[.0-9]+/.test(i)}else{var r=window.devicePixelRatio?window.devicePixelRatio:1;if(n.os.android&&n.browser.webkit&&parseFloat(n.browser.webkitVersion)>537.1){r=1}var o=Math.min(window.screen.width/r,window.screen.height/r)>=600;if(se()&&(window.screen.height===552||window.screen.height===553)&&/Nexus 7/i.test(i)){o=true}return o}}else{var a=/(?=android)(?=.*mobile)/i.test(i);return n.browser.msie&&i.indexOf("Touch")!==-1||n.os.android&&!a}}}function H(e,i){n.system=V(e,i);if(n.system.tablet||n.system.phone){n.browser.mobile=true}}H();n._getSystem=V;n.orientation={};n.resize={};n.orientation.attachHandler=function(e,n){c("orientation",e,n)};n.resize.attachHandler=function(e,n){c("resize",e,n)};n.orientation.detachHandler=function(e,n){m("orientation",e,n)};n.resize.detachHandler=function(e,n){m("resize",e,n)};function q(e){e.landscape=se(true);e.portrait=!e.landscape}function U(){q(n.orientation);v("orientation",{landscape:n.orientation.landscape})}function Y(){K(n.resize);v("resize",{height:n.resize.height,width:n.resize.width})}function K(e){e.width=y()[0];e.height=y()[1]}function J(){var e=n.orientation.landscape;var i=se();if(e!=i){U()}if(!Q){Q=window.setTimeout(j,150)}}function j(){Y();Q=null}var G=false;var Z=false;var $;var Q;var ee;var ne=y()[1];var ie=y()[0];var te=false;var re;var oe=/INPUT|TEXTAREA|SELECT/;var ae=n.os.ios&&n.browser.name==="sf"&&(n.system.phone&&n.os.version>=7&&n.os.version<7.1||n.system.tablet&&n.os.version>=7);function se(e){if(n.support.touch&&n.support.orientation&&n.os.android){if(te&&e){return!n.orientation.landscape}if(te){return n.orientation.landscape}}else if(n.support.matchmedia&&n.support.orientation){return!!window.matchMedia("(orientation: landscape)").matches}var i=y();return i[0]>i[1]}function ue(e){if(e.type=="resize"){if(ae&&oe.test(document.activeElement.tagName)&&!G){return}var n=y()[1];var i=y()[0];var t=(new Date).getTime();if(n===ne&&i===ie){return}Z=true;if(ne!=n&&ie==i){if(!re||t-re>300){te=n<ne}Y()}else{ie=i}re=t;ne=n;if(ee){window.clearTimeout(ee);ee=null}ee=window.setTimeout(le,1200)}else if(e.type=="orientationchange"){G=true}if($){clearTimeout($);$=null}$=window.setTimeout(de,50)}function de(){if(Z&&(G||n.system.tablet&&n.os.ios&&n.os.version>=9)){U();Y();G=false;Z=false;if(ee){window.clearTimeout(ee);ee=null}}$=null}function le(){G=false;Z=false;ee=null}n._update=function(e){g=navigator.userAgent;l.log(o,"Device API values manipulated: NOT PRODUCTIVE FEATURE!!! This should be only used for test purposes. Only use if you know what you are doing.");A();h();H(e)};K(n.resize);q(n.orientation);window.sap.ui.Device=n;if(n.support.touch&&n.support.orientation){window.addEventListener("resize",ue,false);window.addEventListener("orientationchange",ue,false)}else{window.addEventListener("resize",J,false)}n.media.initRangeSet();n.media.initRangeSet(R["SAP_STANDARD_EXTENDED"]);if(sap.ui.define){sap.ui.define("sap/ui/Device",[],function(){return n})}})();