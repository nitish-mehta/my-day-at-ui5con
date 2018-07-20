/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/support/Plugin","jquery.sap.keycodes"],function(e,t){"use strict";var s=e;var i=t.extend("sap.ui.core.support.plugins.Debugging",{constructor:function(e){t.apply(this,["sapUiSupportDebugging","Debugging",e]);this._oStub=e;this._aEventIds=[this.getId()+"ReceiveClasses",this.getId()+"ReceiveClassMethods",this.getId()+"SaveUrlIfNew",this.getId()+"AppendUserUrls"];this._breakpointId="sapUiSupportBreakpoint";this._localStorageId="sapUiSupportLocalStorage";this._techInfoId="sapUiSupportTechInfo";this._aClasses=[];this._mAddedClasses={};this._sSelectedClass="";this._mRebootUrls={}}});i.prototype.isToolPlugin=function(){return true};i.prototype.isAppPlugin=function(){return false};i.prototype.init=function(e){t.prototype.init.apply(this,arguments);var i=this.$();i.on("click","#sapUiSupportDebuggingReboot",s.proxy(this._onUseOtherUI5Version,this));i.on("change","#sapUiSupportDebuggingRebootSelect",this._onUI5VersionDropdownChanged);i.on("keyup","#sapUiSupportDebuggingClassInput",s.proxy(this._autoComplete,this));i.on("blur","#sapUiSupportDebuggingClassInput",s.proxy(this._updateSelectOptions,this));i.on("change","#sapUiSupportDebuggingClassSelect",s.proxy(this._selectOptionsChanged,this));i.on("click","#sapUiSupportDebuggingAddClass",s.proxy(this._onAddClassClicked,this));i.on("click","#sapUiSupportDebuggingClassList li div",s.proxy(this._onSelectClass,this));i.on("click","#sapUiSupportDebuggingClassList li img.remove-class",s.proxy(this._onRemoveClass,this));i.on("keyup","#sapUiSupportDebuggingMethodInput",s.proxy(this._autoComplete,this));i.on("blur","#sapUiSupportDebuggingMethodInput",s.proxy(this._updateSelectOptions,this));i.on("change","#sapUiSupportDebuggingMethodSelect",s.proxy(this._selectOptionsChanged,this));i.on("click","#sapUiSupportDebuggingAddBreakpoint",s.proxy(this._onAddBreakpointClicked,this));i.on("click","#sapUiSupportDebuggingBreakpointList li img.remove-breakpoint",s.proxy(this._onRemoveBreakpoint,this));this.renderContainer();this._populateRebootUrls();this._oStub.sendEvent(this._breakpointId+"RequestClasses",{callback:this.getId()+"ReceiveClasses"})};i.prototype.exit=function(e){t.prototype.exit.apply(this,arguments);var s=this.$();s.off("keyup","#sapUiSupportDebuggingClassInput");s.off("blur","#sapUiSupportDebuggingClassInput");s.off("change","#sapUiSupportDebuggingClassSelect");s.off("click","#sapUiSupportDebuggingAddClass");s.off("click","#sapUiSupportDebuggingClassList li div");s.off("click","#sapUiSupportDebuggingClassList li img.remove-class");s.off("keyup","#sapUiSupportDebuggingMethodInput");s.off("blur","#sapUiSupportDebuggingMethodInput");s.off("change","#sapUiSupportDebuggingMethodSelect");s.off("click","#sapUiSupportDebuggingAddBreakpoint");s.off("click","#sapUiSupportDebuggingBreakpointList li img.remove-breakpoint")};i.prototype.renderContainer=function(){var e=sap.ui.getCore().createRenderManager();e.write('<div id="sapUiSupportDebuggingRebootContainer" class="sapUiSupportContainer">');e.write('<div class="sapUISupportLabel">Boot application with different UI5 version on next reload:</div>');e.write('<select id="sapUiSupportDebuggingRebootSelect" class="sapUiSupportSelect">');e.write('<option value="none">Disabled (no custom reboot URL)</option>');e.write('<option value="other" id="sapUiSupportDebuggingRebootOther">Other (enter URL to sap-ui-core.js below)...:</option>');e.write("</select>");e.write('<input type="text" id="sapUiSupportDebuggingRebootInput" disabled="disabled"/>');e.write('<button id="sapUiSupportDebuggingReboot" class="sapUiSupportRoundedButton" style="margin-right:0;">Activate Reboot URL</button>');e.write("</div>");e.write('<div id="sapUiSupportDebuggingClassContainer" class="sapUiSupportContainer"></div>');e.write('<div id="sapUiSupportDebuggingMethodContainer" class="sapUiSupportContainer"></div>');e.flush(this.$().get(0));e.destroy()};i.prototype.renderClasses=function(){var t=this;var i=this._aClasses;var o=sap.ui.getCore().createRenderManager();o.write('<div class="sapUISupportLabel" style="margin-right:5px">Select Class:</div>');o.write('<select id="sapUiSupportDebuggingClassSelect" class="sapUiSupportAutocomplete  sapUiSupportSelect"><option></option>');s.each(i,function(e,s){if(typeof t._mAddedClasses[s]==="undefined"){o.write("<option>");o.writeEscaped(""+s);o.write("</option>")}});o.write("</select>");o.write('<input id="sapUiSupportDebuggingClassInput" class="sapUiSupportAutocomplete" type="text"/>');o.write('<button id="sapUiSupportDebuggingAddClass" class="sapUiSupportRoundedButton">Add class</button>');o.write('<hr class="no-border"/><ul id="sapUiSupportDebuggingClassList" class="sapUiSupportList">');s.each(i,function(s,i){if(typeof t._mAddedClasses[i]==="undefined"){return}var a=t._mAddedClasses[i].bpCount;var p="";if(a){p=a.active+" / "+a.all}o.write('<li data-class-name="');o.writeEscaped(""+i);o.write('"');if(t._sSelectedClass===i){o.write(' class="selected"')}o.write('><div><span class="className">'+e.sap.escapeHTML(i+"")+"</span>"+'<span class="breakpoints">'+e.sap.escapeHTML(p+"")+"</span></div>"+'<img class="remove-class" style="cursor:pointer;margin-left:5px" '+'src="../../debug/images/delete.gif" alt="X"></li>')});o.write("</ul>");o.flush(s("#sapUiSupportDebuggingClassContainer").get(0));o.destroy()};i.prototype.renderMethods=function(t){var i=sap.ui.getCore().createRenderManager();if(typeof t==="undefined"){i.write('<p style="text-align:center;font-weight: bold">Select a class in the list on the left side to add breakpoint.</p>');i.flush(s("#sapUiSupportDebuggingMethodContainer").get(0));i.destroy();return}i.write('<div class="sapUISupportLabel" style="margin-right:5px">Select Method:</div>');i.write('<select id="sapUiSupportDebuggingMethodSelect" class="sapUiSupportAutocomplete sapUiSupportSelect"><option></option>');s.each(t,function(e,t){if(!t.active){i.write('<option data-method-type="');i.writeEscaped(""+t.type);i.write('">');i.writeEscaped(""+t.name);i.write("</option>")}});i.write("</select>");i.write('<input id="sapUiSupportDebuggingMethodInput" class="sapUiSupportAutocomplete" type="text"/>');i.write('<button id="sapUiSupportDebuggingAddBreakpoint" class="sapUiSupportRoundedButton">Add breakpoint</button>');i.write('<hr class="no-border"/><ul id="sapUiSupportDebuggingBreakpointList" class="sapUiSupportList sapUiSupportBreakpointList">');s.each(t,function(t,s){if(!s.active){return}i.write('<li data-method-type="'+e.sap.escapeHTML(s.type+"")+'"><span>'+e.sap.escapeHTML(s.name+"")+"</span>"+'<img class="remove-breakpoint" style="cursor:pointer;margin-left:5px" '+'src="../../debug/images/delete.gif" alt="Remove"></li>')});i.write("</ul>");i.flush(s("#sapUiSupportDebuggingMethodContainer").get(0));i.destroy()};i.prototype.onsapUiSupportDebuggingReceiveClasses=function(e){this._aClasses=JSON.parse(e.getParameter("classes"));this.renderClasses();this.renderMethods();s("#sapUiSupportDebuggingClassInput").focus()};i.prototype.onsapUiSupportDebuggingReceiveClassMethods=function(e){var t=JSON.parse(e.getParameter("methods"));this.renderMethods(t);var i=e.getParameter("className");var o=JSON.parse(e.getParameter("breakpointCount"));this._mAddedClasses[i]={bpCount:o};var a=s('li[data-class-name="'+i+'"] span.breakpoints');a.text(o.active+" / "+o.all).show();s("#sapUiSupportDebuggingMethodInput").focus()};i.prototype._autoComplete=function(t){var i=s(t.target);if(t.keyCode==e.sap.KeyCodes.ENTER){this._updateSelectOptions(t);if(i.attr("id")==="sapUiSupportDebuggingClassInput"){this._onAddClassClicked()}else{this._onAddBreakpointClicked()}}if(t.keyCode>=e.sap.KeyCodes.ARROW_LEFT&&t.keyCode<=e.sap.KeyCodes.ARROW_DOWN){return}var o=i.prev("select"),a=i.val();if(a==""){return}var p=o.find("option").map(function(){return s(this).val()}).get();var r;for(var n=0;n<p.length;n++){r=p[n];if(r.toUpperCase().indexOf(a.toUpperCase())==0){var l=i.cursorPos();if(t.keyCode==e.sap.KeyCodes.BACKSPACE){l--}i.val(r);i.selectText(l,r.length);break}}return};i.prototype._onAddClassClicked=function(){var e=s("#sapUiSupportDebuggingClassInput").val();this._mAddedClasses[e]={};this.renderClasses();s("#sapUiSupportDebuggingClassInput").focus()};i.prototype._onRemoveClass=function(e){var t=s(e.target).prev().find("span.className").text();delete this._mAddedClasses[t];var i=false;if(this._sSelectedClass===t){this._sSelectedClass="";i=true}this._oStub.sendEvent(this._breakpointId+"RemoveAllClassBreakpoints",{className:t});this.renderClasses();if(i){this.renderMethods()}s("#sapUiSupportDebuggingClassInput").focus()};i.prototype._onAddBreakpointClicked=function(){this.changeBreakpoint(s("#sapUiSupportDebuggingClassList li.selected span.className").text(),s("#sapUiSupportDebuggingMethodInput").val(),s("#sapUiSupportDebuggingMethodSelect option:selected").attr("data-method-type"),true)};i.prototype._onRemoveBreakpoint=function(e){this.changeBreakpoint(s("#sapUiSupportDebuggingClassList li.selected span.className").text(),s(e.target).prev().text(),s(e.target).parent("li").attr("data-method-type"),false)};i.prototype._updateSelectOptions=function(e){var t=e.srcElement||e.target;if(t.tagName=="INPUT"){var s=t.value;t=t.previousSibling;var i=t.options;for(var o=0;o<i.length;o++){var a=i[o].value||i[o].text;if(a.toUpperCase()==s.toUpperCase()){t.selectedIndex=o;break}}}var p=t.selectedIndex;var r=t.options[p].value||t.options[p].text;if(t.nextSibling&&t.nextSibling.tagName=="INPUT"){t.nextSibling.value=r}};i.prototype._selectOptionsChanged=function(e){var t=e.srcElement||e.target;var s=t.nextSibling;s.value=t.options[t.selectedIndex].value};i.prototype._onSelectClass=function(e){var t=s(e.target).parents("li");if(t.hasClass("selected")){return}var i=t.find("span.className").text();t.addClass("selected").siblings("li").removeClass("selected");this._sSelectedClass=i;this._oStub.sendEvent(this._breakpointId+"RequestClassMethods",{className:i,callback:this.getId()+"ReceiveClassMethods"})};i.prototype._isClassSelected=function(){var e=false;s.each(this._mClasses,function(t,s){if(s.selected===true){e=true}});return e};i.prototype.changeBreakpoint=function(e,t,s,i){this._oStub.sendEvent(this._breakpointId+"ChangeClassBreakpoint",{className:e,methodName:t,active:i,type:parseInt(s,10),callback:this.getId()+"ReceiveClassMethods"})};i.prototype._populateRebootUrls=function(){this._mRebootUrls={"https://openui5.hana.ondemand.com/resources/sap-ui-core.js":"Public OpenUI5 server","https://openui5beta.hana.ondemand.com/resources/sap-ui-core.js":"Public OpenUI5 PREVIEW server","https://sapui5.hana.ondemand.com/resources/sap-ui-core.js":"Public SAPUI5 server","http://localhost:8080/testsuite/resources/sap-ui-core.js":"Localhost (port 8080), /testsuite ('grunt serve' URL)","http://localhost:8080/sapui5/resources/sap-ui-core.js":"Localhost (port 8080), /sapui5 (maven URL)"};this._testAndAddUrls(this._mRebootUrls);var e=this;window.setTimeout(function(){e._oStub.sendEvent(e._localStorageId+"GetItem",{id:"sap-ui-reboot-URLs",callback:e.getId()+"AppendUserUrls"})},0)};i.prototype._testAndAddUrls=function(t){var s=e("#sapUiSupportDebuggingRebootOther");function i(e){return function(){var i="<option value='"+e+"'>"+t[e]+"</option>";s.before(i)}}for(var o in t){e.ajax({type:"HEAD",url:o,success:i(o)})}};i.prototype.onsapUiSupportDebuggingAppendUserUrls=function(t){var s=t.getParameter("value"),i={},o=s.split(" ");for(var a=0;a<o.length;a++){var p=o[a];if(p&&!this._mRebootUrls[p]){i[p]=e.sap.encodeHTML(p)+" (user-defined URL)"}}this._testAndAddUrls(i)};i.prototype._onUI5VersionDropdownChanged=function(){var t=e("#sapUiSupportDebuggingRebootSelect").val(),s=e("#sapUiSupportDebuggingRebootInput");if(t==="other"){s.removeAttr("disabled")}else{s.attr("disabled","disabled");if(t==="none"){s.val("")}else{s.val(t)}}};i.prototype._onUseOtherUI5Version=function(){var t=e("#sapUiSupportDebuggingRebootSelect").val();if(t==="other"){t=e("#sapUiSupportDebuggingRebootInput").val()}if(!t||t==="none"){this._oStub.sendEvent(this._techInfoId+"SetReboot",{rebootUrl:null});alert("Reboot URL cleared. App will start normally.")}else{this._oStub.sendEvent(this._techInfoId+"SetReboot",{rebootUrl:t});if(!this._mRebootUrls[t]){this._oStub.sendEvent(this._localStorageId+"GetItem",{id:"sap-ui-reboot-URLs",passThroughData:t,callback:this.getId()+"SaveUrlIfNew"})}}};i.prototype.onsapUiSupportDebuggingSaveUrlIfNew=function(e){var t=e.getParameter("value"),s=e.getParameter("passThroughData"),i=t.split(" ");if(i.indexOf(s)===-1){i.push(s.replace(/ /g,"%20"));this._oStub.sendEvent(this._localStorageId+"SetItem",{id:"sap-ui-reboot-URLs",value:i.join(" ")})}};return i});