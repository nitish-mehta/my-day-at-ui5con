/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";function e(){sap.ui.define("sap/ui/core/plugin/LessSupport",["jquery.sap.global","sap/ui/core/Core","sap/ui/core/ThemeCheck"],function(e,t,s){var i="library.source";var r="library";var a=function(){};a.prototype.startPlugin=function(t,i){e.sap.log.info("Starting LessSupport plugin.");e.sap.log.warning("  NOT FOR PRODUCTIVE USAGE! LessSupport is an experimental feature which might change in future!");var r=e.sap.getUriParameters();var a=r.get("sap-ui-xx-noless");if(a){a=a.toLowerCase()}try{if(a!=="false"&&(window.top.JsUnit||window.sap.ui.test&&window.sap.ui.test.qunit)){e.sap.log.info("  LessSupport has been deactivated for JSUnit Testrunner or QUnit.");return}}catch(e){}if(a&&a!=="false"){e.sap.log.info("  LessSupport has been deactivated by URL parameter.");return}else{e.sap.log.info('  LessSupport can be deactivated by adding the following parameter to your URL: "sap-ui-xx-noless=X".')}window.less=window.less||{env:"development",relativeUrls:true,errorReporting:function(e,t,s){if(e==="add"&&window.console){window.console.error("Failed to parse: "+s,t)}}};e.sap.require("sap.ui.thirdparty.less");this.oCore=t;this.bActive=true;this.oCore.includeLibraryTheme=e.proxy(this.includeLibraryTheme,this);this.oCore.applyTheme=e.proxy(this.applyTheme,this);var o=this,n=false;var l=[];e("link[id^=sap-ui-theme-]").each(function(){var e=o.initLink(this);n=e||n;if(e){l.push(this.id.substr(13))}});this.refreshLess(n);var p=0;function d(){var i=true;var r;for(var a=0;a<l.length;a++){r=s.checkStyle("less:"+l[a],true);if(r){e.sap.byId("sap-ui-theme-"+l[a]).attr("data-sap-ui-ready","true")}i=i&&r}p++;if(p>100){i=true;e.sap.log.warning("LessSupport: Max theme check cycles reached.")}if(i){s.themeLoaded=true;e.sap.delayedCall(0,t,"fireThemeChanged",[{theme:t.sTheme}])}else{o.iCheckThemeAppliedTimeout=e.sap.delayedCall(100,null,d)}}if(n){this.iCheckThemeAppliedTimeout=e.sap.delayedCall(100,null,d)}};a.prototype.stopPlugin=function(){e.sap.log.info("Stopping LessSupport plugin.");if(this.bActive){e.sap.delayedCall(this.iCheckThemeAppliedTimeout);delete this.iCheckThemeAppliedTimeout;e("link[id^=sap-ui-theme-]").each(function(){var t=this.id.substr(13);e.sap.byId("less:"+t).remove()});delete this.oCore.includeLibraryTheme;delete this.oCore.applyTheme;this.oCore=null}};a.prototype.initLink=function(t){var s=this.updateLink(t);e("<style>").attr("id","less:"+t.id.substr(13)).attr("type","text/css").attr("media",this.media||"screen").insertAfter(t);return s};a.prototype.updateLink=function(t){var s=t.id.substr(13);var a;if((a=s.indexOf("-["))>0){s=s.substr(0,a)}var o=this.oCore._getThemePath(s,this.oCore.sTheme);var n=this.getLastModified(o+i+".less");var l=this.getLastModified(o+r+".css");var p=n==0&&l>0||n>l;if(!p){var d=this.oCore._getThemePath(s,"base");var h=this.getLastModified(d+i+".less");var u=this.getLastModified(d+r+".css");p=h==0&&u>0||h>u}var c=p?i:r;e.sap.log.debug("LessSupport.updateLink: "+o+c+": "+(p?"LESS":"CSS"));if(!p){if(t.title){delete t.title}t.rel="stylesheet";t.href=o+c+".css";this.unregisterLink(t);return false}t.title=s;t.rel="stylesheet/less";t.href=o+c+".less";this.registerLink(t);return true};a.prototype.getLastModified=function(t){var s;e.ajax({url:t,type:"HEAD",async:false,success:function(e,t,i){var r=i.getResponseHeader("Last-Modified");s=r?Date.parse(r):0},error:function(e,t,i){s=-1}});e.sap.log.debug("CSS/LESS head-check: "+t+"; last-modified: "+s);return s};a.prototype.applyTheme=function(t,s){sap.ui.core.Core.prototype.applyTheme.apply(this.oCore,arguments);var i=this,r=false;e("link[id^=sap-ui-theme-]").each(function(){r=i.updateLink(this)||r});this.refreshLess(r)};a.prototype.includeLibraryTheme=function(t){sap.ui.core.Core.prototype.includeLibraryTheme.apply(this.oCore,arguments);var s=this,i=false;e("link[id='sap-ui-theme-"+t+"']").each(function(){i=s.initLink(this)||i});this.refreshLess(i)};a.prototype.registerLink=function(e){if(window.less&&window.less.sheets){var t=window.less.sheets.indexOf(e);if(t===-1){window.less.sheets.push(e)}}};a.prototype.unregisterLink=function(t){if(window.less&&window.less.sheets){var s=t.id.substr(13);var i=window.less.sheets.indexOf(t);if(i>=0){window.less.sheets.splice(i,1);e.sap.byId("less:"+s).html("")}}};a.prototype.refreshLess=function(t){if(t){if(!document.getElementById("sap-ui-ide-less-mode")){e("<span>").attr("id","sap-ui-ide-less-mode").css("position","absolute").css("right","10px").css("bottom","10px").css("padding","10px").css("border","3px solid red").css("border-radius","10px").css("opacity","0.75").css("color","black").css("background-color","white").css("font-weight","bold").css("z-index","99999").append(e("<span>").text("LESS MODE").css({display:"block","text-align":"center"})).append(e("<a>").attr("href","#").text("Deactivate").attr("title","Less mode is active. Click to deactivate it (requires page refresh).").css({float:"left",clear:"left","font-size":"0.75em","text-decoration":"underline","margin-right":"0.5em"}).bind("click",function(e){e.preventDefault();if(window.confirm("Deactivating the Less Mode refreshes the page. Do you want to proceed?")){var t=window.location.search;window.location.search=(t.charAt(0)==="?"?t+"&":"?")+"sap-ui-xx-noless=true"}})).append(e("<a>").attr("href","#").text("Hide").attr("title","Less mode is active. Click to hide this information.").css({float:"right","font-size":"0.75em","text-decoration":"underline"}).bind("click",function(t){t.preventDefault();e(this).parent().css("display","none")})).appendTo(window.document.body)}}else{e("#sap-ui-ide-less-mode").remove()}if(window.less&&window.less.refresh&&window.less.sheets.length>0){var s={};var i={};e(window.less.sheets).each(function(){i[this.href]=e(this).attr("id").substr(13)});var r=window.less.tree.Rule.prototype.eval;window.less.tree.Rule.prototype.eval=function(t){if(this.variable&&typeof this.name==="string"&&this.name.indexOf("@_PRIVATE_")!==0){var a=i[this.currentFileInfo.rootFilename];if(!a){e.sap.log.warning("LessSupport: could not find libary ("+this.currentFileInfo.rootFilename+")")}var o=s[a];if(!o){o=s[a]={}}try{o[this.name.substr(1)]=this.value.eval(t).toCSS(t)}catch(e){}}return r.apply(this,arguments)};window.less.refresh();var a=sap.ui.requireSync("sap/ui/core/theming/Parameters");a._setOrLoadParameters(s);window.less.tree.Rule.prototype.eval=r}};var o=new a;sap.ui.getCore().registerPlugin(o);a.refresh=function(){o.refreshLess(true);if(o.oCore.oThemeCheck){o.oCore.oThemeCheck.fireThemeChangedEvent(false)}};return a},true)}if(!(window.sap&&window.sap.ui&&window.sap.ui.define)){var t=function(){document.removeEventListener("DOMContentLoaded",t,false);e()};document.addEventListener("DOMContentLoaded",t,false)}else{e()}})();