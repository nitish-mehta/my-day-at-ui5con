/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","../Plugin","../Support","../ToolsAPI","jquery.sap.encoder","jquery.sap.script"],function(e,t,o,i){"use strict";var r=t.extend("sap.ui.core.support.plugins.TechInfo",{constructor:function(e){t.apply(this,["sapUiSupportTechInfo","Technical Information",e]);this._aEventIds=this.runsAsToolPlugin()?[this.getId()+"Data",this.getId()+"FinishedE2ETrace"]:[this.getId()+"ToggleDebug",this.getId()+"SetReboot",this.getId()+"Refresh",this.getId()+"StartE2ETrace",this.getId()+"ToggleStatistics"];if(this.runsAsToolPlugin()){this.e2eLogLevel="medium";this.e2eTraceStarted=false}}});r.prototype.onsapUiSupportTechInfoData=function(t){var i=this;var r=t.getParameter("data");r.modules.sort();this.e2eTraceStarted=r["e2e-trace"].isStarted;var a=["<div class='sapUiSupportToolbar'>","<button id='",i.getId(),"-Refresh' class='sapUiSupportRoundedButton'>Refresh</button>","<div><div class='sapUiSupportTechInfoCntnt'>","<table border='0' cellpadding='3' class='infoTable'>"];function p(e,t){var o=[];if(e){var i=/^(\d{4})(\d{2})(\d{2})-?(\d{2})(\d{2})$/.exec(e);if(i){e=i[1]+"-"+i[2]+"-"+i[3]+"T"+i[4]+":"+i[5]}o.push("built at "+n(e))}if(t){o.push("last change "+n(t))}return o.length===0?"":" ("+o.join(", ")+")"}var c="SAPUI5";var l="not available";try{var d=sap.ui.getVersionInfo();c=d.name;l="<a href='"+sap.ui.resource("","sap-ui-version.json")+"' target='_blank' class='sapUiSupportLink' title='Open Version Info'>"+n(d.version)+"</a>"+p(d.buildTimestamp,d.scmRevision)}catch(e){}s(a,true,true,c,function(e){e.push(l)});if(!/openui5/i.test(c)){s(a,true,true,"OpenUI5 Version",function(e){e.push(n(r.version)+p(r.build,r.change))})}s(a,true,true,"Loaded jQuery Version",function(e){return r.jquery});s(a,true,true,"User Agent",function(e){return r.useragent+(r.docmode?", Document Mode '"+r.docmode+"'":"")});s(a,true,true,"Debug Sources",function(e){e.push(r.debug?"ON":"OFF","<a href='#' id='",i.getId(),"-tggleDbgSrc' class='sapUiSupportLink'>Toggle</a>")});s(a,true,true,"Application",r.appurl);u(a,true,true,"Configuration (bootstrap)",r.bootconfig);u(a,true,true,"Configuration (computed)",r.config);if(!e.isEmptyObject(r.libraries)){u(a,true,true,"Libraries",r.libraries)}u(a,true,true,"Loaded Libraries",r.loadedLibraries);s(a,true,true,"Loaded Modules",function(t){e.each(r.modules,function(e,o){if(o.indexOf("sap.ui.core.support")<0){t.push("<span>",n(o),"</span>");if(e<r.modules.length-1){t.push(", ")}}})});u(a,true,true,"URI Parameters",r.uriparams);s(a,true,true,"E2E Trace",function(e){e.push("<label class='sapUiSupportLabel'>Trace Level:</label>","<select id='",i.getId(),"-logLevelE2ETrace' class='sapUiSupportTxtFld sapUiSupportSelect'>","<option value='low'"+(i.e2eLogLevel==="low"?" selected":"")+">LOW</option>","<option value='medium'"+(i.e2eLogLevel==="medium"?" selected":"")+">MEDIUM</option>","<option value='high'"+(i.e2eLogLevel==="hight"?" selected":"")+">HIGH</option>","</select>");e.push("<button id='"+i.getId()+"-startE2ETrace' class='sapUiSupportRoundedButton "+(r["e2e-trace"].isStarted?" active":"")+"' style='margin-left: 10px;'>"+(r["e2e-trace"].isStarted?"Running...":"Start")+"</button>");e.push("<div style='margin-top:5px'>");e.push("<label class='sapUiSupportLabel'>XML Output:</label>");e.push("<textarea id='"+i.getId()+"-outputE2ETrace' style='width:100%;height:50px;margin-top:5px;resize:none;box-sizing:border-box'></textarea>");e.push("</div>")});a.push("</table></div>");this.$().html(a.join(""));this.$("tggleDbgSrc").bind("click",function(e){e.preventDefault();o.getStub().sendEvent(i.getId()+"ToggleDebug",{})});this.$("Refresh").bind("click",function(e){e.preventDefault();o.getStub().sendEvent(i.getId()+"Refresh",{})});this.$("outputE2ETrace").bind("click",function(){this.focus();this.select()});this.$("startE2ETrace").bind("click",function(){if(!i.e2eTraceStarted){i.e2eLogLevel=i.$("logLevelE2ETrace").val();i.$("startE2ETrace").addClass("active").text("Running...");i.$("outputE2ETrace").text("");o.getStub().sendEvent(i.getId()+"StartE2ETrace",{level:i.e2eLogLevel});i.e2eTraceStarted=true}});document.title="UI5 Diagnostics - "+r.title};r.prototype.onsapUiSupportTechInfoToggleDebug=function(t){e.sap.debug(!e.sap.debug());a(this)};r.prototype.onsapUiSupportTechInfoSetReboot=function(t){e.sap.setReboot(t.getParameter("rebootUrl"))};r.prototype.onsapUiSupportTechInfoStartE2ETrace=function(e){var t=this,i=e.getParameter("level");sap.ui.require(["sap/ui/core/support/trace/E2eTraceLib"],function(e){e.start(i,function(e){o.getStub().sendEvent(t.getId()+"FinishedE2ETrace",{trace:e})})})};r.prototype.onsapUiSupportTechInfoFinishedE2ETrace=function(e){this.$("startE2ETrace").removeClass("active").text("Start");this.$("outputE2ETrace").text(e.getParameter("trace"));this.e2eTraceStarted=false};r.prototype.onsapUiSupportTechInfoRefresh=function(e){a(this)};r.prototype.onsapUiSupportTechInfoToggleStatistics=function(t){e.sap.statistics(!e.sap.statistics());a(this)};r.prototype.init=function(e){t.prototype.init.apply(this,arguments);if(!this.runsAsToolPlugin()){a(this);return}this.$().html("No Information available")};function a(e){var t=i.getFrameworkInformation();var r={version:t.commonInformation.version,build:t.commonInformation.buildTime,change:t.commonInformation.lastChange,jquery:t.commonInformation.jquery,useragent:t.commonInformation.userAgent,docmode:t.commonInformation.documentMode,debug:t.commonInformation.debugMode,bootconfig:t.configurationBootstrap,config:t.configurationComputed,libraries:t.libraries,loadedLibraries:t.loadedLibraries,modules:t.loadedModules,uriparams:t.URLParameters,appurl:t.commonInformation.applicationHREF,title:t.commonInformation.documentTitle,statistics:t.commonInformation.statistics};var a=sap.ui.require("sap/ui/core/support/trace/E2eTraceLib");r["e2e-trace"]={isStarted:a?a.isStarted():false};o.getStub().sendEvent(e.getId()+"Data",{data:r})}function n(t){return t==null?"":e.sap.encodeHTML(String(t))}function s(e,t,o,i,r){e.push("<tr><td ",t?"align='right' ":"","valign='top'>","<label class='sapUiSupportLabel'>",n(i),"</label></td><td",o?" class='sapUiSupportTechInfoBorder'":"",">");var a=r;if(typeof r==="function"){a=r(e)}e.push(n(a));e.push("</td></tr>")}function u(t,o,i,r,a){s(t,o,i,r,function(t){t.push("<table border='0' cellspacing='0' cellpadding='3' style='width: 100%'>");e.each(a,function(o,i){var r="";if(i){if(typeof i==="string"||typeof i==="string"||typeof i==="boolean"){r=i}else if((Array.isArray(i)||e.isPlainObject(i))&&window.JSON){r=window.JSON.stringify(i)}}s(t,false,false,o,""+r)});t.push("</table>")})}return r});