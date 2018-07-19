/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/ui/core/IconPool","sap/m/library","sap/m/Popover","sap/m/Text","sap/ui/layout/form/SimpleForm","sap/m/Button","sap/m/Label","sap/m/Link","sap/ui/core/HTML","sap/ui/core/Title"],function(t,e,a,r,i,n,s,o,p,l,d,u){"use strict";var c=r.PlacementType;var h=e.extend("sap.ui.core.support.controls.InteractionTree",{constructor:function(){this.start=0;this.end=1}});h.expandIcon="sap-icon://navigation-right-arrow";h.collapseIcon="sap-icon://navigation-down-arrow";h.headerIcon='<img class="sapUiInteractionSvgImage" src="HeaderIcon.svg">';h.prototype.setInteractions=function(t){this.interactions=t;this.start=0;this.end=1;this.updateRanges()};h.prototype.setRange=function(t,e){this.start=t;this.end=e;this.updateRanges();this.update()};h.prototype.updateRanges=function(){var t=this.interactions;if(!t||!t.length){return}this.startTime=t[0].start;this.endTime=t[t.length-1].end;var e=this.endTime-this.startTime;this.actualStartTime=this.startTime+this.start*e;this.actualEndTime=this.startTime+this.end*e;this.timeRange=this.actualEndTime-this.actualStartTime};h.prototype.update=function(){if(!this.parent){return}t(this.parent).find("#"+this.getId()).remove();this.renderAt(this.parent)};h.prototype.renderAt=function(t){this.parent=t;var e=sap.ui.getCore().createRenderManager();this.render(e);e.flush(t);e.destroy();this.attachEvents();this.attachInteractionDetailsPopover();this.attachRequestDetailsPopover()};h.prototype.render=function(t){t.write('<div id="'+this.getId()+'" class="sapUiInteractionTreeContainer sapUiSizeCompact">');t.write('<div class="sapUiInteractionGridLinesContainer"></div>');t.write("<ul");t.addClass("sapUiInteractionTree");t.writeClasses();t.write(">");this.renderHeaders(t);var e,a=this.interactions;if(!a||!a.length){return}for(var r=0;r<a.length;r++){e=a[r];this.renderInteraction(t,e,r)}t.write("</ul>");t.write("</div>")};h.prototype.attachEvents=function(){var e=this,a=t(".sapUiInteractionTreeContainer .sapUiInteractionTree");this.gridContainer=t(".sapUiInteractionTreeContainer .sapUiInteractionGridLinesContainer");this.gridContainerWidth=0;a.bind("click",function(a){var r=t(a.target);if(r.hasClass("sapUiInteractionLeft")){e.handleInteractionClick(r)}});this.gridContainer.resize(function(t){e.updateGridLines()});t(window).resize(function(t){e.updateGridLines()});e.updateGridLines()};h.prototype.updateGridLines=function(){var t=this.gridContainer,e=this.timeRange,a=this.gridContainer.width();if(this.gridContainerWidth==a){return}t.empty();t.append('<div style="left:'+(this.getPosition(a,e,0)+6)+'px" class="sapUiInteractionGridLineIntervalText">'+this.formatGridLineDuration(0)+"</div>");var r=this.calculateInterval(a,e);for(var i=r;i<e;i+=r){var n=this.getPosition(a,e,i);if(i+r<e){t.append('<div style="left:'+(n+6)+'px" class="sapUiInteractionGridLineIntervalText">'+this.formatGridLineDuration(i)+"</div>")}t.append('<div style="left:'+n+'px" class="sapUiInteractionGridLine"></div>')}this.gridContainerWidth=a};h.prototype.calculateInterval=function(t,e){var a=4;var r=Math.max(t*a/200,1);var i=e/r;var n=Math.pow(10,Math.floor(Math.log(i)/Math.LN10));var s=[10,5,2,1];for(var o=0;o<s.length;o++){var p=s[o];var l=n*p;if(r<e/l){break}i=l}return i};h.prototype.getPosition=function(t,e,a){var r=t/e*a;return r};h.prototype.handleInteractionClick=function(t){var e=t.find(".sapUiInteractionTreeIcon");if(!e.length){return}var a=e.attr("expanded")=="true";var r=e.parent();e.remove();var i=this.getIconHTML(!a);r.children().eq(0).after(i);var n=r.parent().parent();n.toggleClass("sapUiInteractionItemExpanded");var s=parseInt(n.attr("data-interaction-index"),10);this.interactions[s].isExpanded=!a;var o=n.find("ul");var p=a?"slideUp":"slideDown";o.stop(true,true)[p]("fast",function(){o.toggleClass("sapUiHiddenUiInteractionItems")})};h.prototype.renderHeaders=function(t){t.write("<li>");t.write("<div");t.addClass("sapUiInteractionTreeItem");t.addClass("sapUiInteractionItemDiv");t.addClass("sapUiInteractionHeader");t.writeClasses();t.write(">");t.write('<div class="sapUiInteractionTreeItemLeft">');t.write("<div>");t.write('<span class="sapUiInteractionItemComponentText">');t.writeEscaped("Component");t.write("</span>");t.write("<br/>");t.write('<span class="sapUiInteractionItemTriggerText">');t.writeEscaped("Trigger");t.write("</span>");t.write("</div>");t.write("</div>");t.write('<div class="sapUiInteractionTreeItemRight">');t.write("</div>");t.write("</div>");t.write("</li>")};h.prototype.isInteractionVisible=function(t){var e=t.start;var a=t.end;if(this.actualStartTime>a||this.actualEndTime<e){return false}if(this.actualStartTime<e+t.duration&&this.actualEndTime>e){return true}return this.hasVisibleRequests(t)};h.prototype.hasVisibleRequests=function(t){var e,a,r,i=t.requests;for(var n=0;n<i.length;n++){e=i[n];a=e.fetchStartOffset+e.startTime;r=e.fetchStartOffset+e.startTime+this.getRequestDuration(e);if(this.actualStartTime<r&&this.actualEndTime>a){return true}}return false};h.prototype.renderInteraction=function(t,e,a){var r,i=e.requests;if(!this.isInteractionVisible(e)){return}t.write('<li data-interaction-index="'+a+'"');if(e.isExpanded){t.addClass("sapUiInteractionItemExpanded");t.writeClasses()}t.write(">");this.renderInteractionDiv(t,e);t.write("<ul");t.addClass("sapUiInteractionItem");if(!e.isExpanded){t.addClass("sapUiHiddenUiInteractionItems")}t.writeClasses();t.write(">");for(var n=0;n<i.length;n++){r=i[n];this.renderRequest(t,e,r,n)}t.write("</ul>");t.write("</li>")};h.prototype.renderInteractionDiv=function(t,e){t.write("<div");t.addClass("sapUiInteractionTreeItem");t.addClass("sapUiInteractionItemDiv");t.writeClasses();t.write(">");t.write('<div class="sapUiInteractionLeft sapUiInteractionTreeItemLeft">');t.write("<div>");t.write('<span class="sapUiInteractionItemComponentText">');t.writeEscaped(e.component!=="undetermined"?e.component:"Initial Loading");t.write("</span>");t.write("<br/>");t.write('<span class="sapUiInteractionItemTriggerText">');t.writeEscaped(e.trigger+" / "+e.event);t.write("</span>");t.write("</div>");if(e.requests.length){this.renderIcon(t,e.isExpanded)}if(e.sapStatistics.length&&e.requests.length){t.write('<div class="sapUiInteractionHeaderIcon">'+h.headerIcon+"</div>")}t.write("</div>");t.write('<div class="sapUiInteractionTreeItemRight">');var a=Math.round(e.start+e.duration);this.renderInteractionPart(t,e.start,a,"sapUiInteractionBlue");t.write("</div>");t.write("</div>")};h.prototype.renderInteractionPart=function(t,e,a,r){if(this.actualStartTime>a||this.actualEndTime<e){return}a=Math.min(a,this.actualEndTime);e=Math.max(e,this.actualStartTime);var i=100/this.timeRange*(e-this.actualStartTime);var n=100/this.timeRange*(a-this.actualStartTime);var s=n-i;t.write('<span style="margin-left: '+i+"%; width: "+s+'%" class="sapUiInteractionTimeframe sapUiInteractionTimeInteractionFrame '+r+'"></span>')};h.prototype.renderRequest=function(t,e,a,r){var i=a.fetchStartOffset;var n=i+a.startTime;var s=i+a.startTime+this.getRequestDuration(a);if(this.actualStartTime>s||this.actualEndTime<n){return}t.write('<li data-request-index="'+r+'"');t.addClass("sapUiInteractionTreeItem");t.addClass("sapUiInteractionRequest");t.writeClasses();t.write(">");t.write('<div class="sapUiInteractionTreeItemLeft sapUiInteractionRequestLeft">');var o=a.initiatorType||a.entryType;var p=this.getRequestColorClass(o);t.write('<span class="sapUiInteractionRequestIcon '+p+'"></span>');t.write('<span class="sapUiInteractionItemEntryTypeText">');t.writeEscaped(o);t.write("</span>");if(this.getRequestSapStatistics(e,a)){t.write('<div class="sapUiInteractionRequestHeaderIcon">'+h.headerIcon+"</div>")}t.write("</div>");t.write('<div class="sapUiInteractionTreeItemRight"');t.write(">");var l=this.getRequestRequestStart(a)+i;var d=this.getRequestResponseStart(a)+i;this.renderRequestPart(t,n,l,p+"70");this.renderRequestPart(t,l,d,p);this.renderRequestPart(t,d,s,p+"70");t.write("</div>");t.write("</li>")};h.prototype.getRequestSapStatistics=function(t,e){var a,r=t.sapStatistics;for(var i=0;i<r.length;i++){if(r[i].timing&&e.startTime===r[i].timing.startTime){a=r[i];return a}}return false};h.prototype.getRequestColorClass=function(t){var e;switch(t){case"xmlhttprequest":e="sapUiPurple";break;case"OData":e="sapUiRed";break;case"link":case"css":e="sapUiAccent1";break;default:e="sapUiAccent8";break}return e};h.prototype.attachRequestDetailsPopover=function(){var e,r,h,v,I,f,m,T,S,w,g,y,C,U,x,R,q;var b=this;var L=t(".sapUiInteractionRequest.sapUiInteractionTreeItem .sapUiInteractionTreeItemRight");if(L.length){var D=O();for(var E=0;E<L.length;E++){L[E].addEventListener("click",function(e){A.call(this);M.call(this);P.call(this);var a=t(this).children()[0];D.openBy(a)})}}function P(){var a=t(this);var r=a.parents("li[data-request-index]");var i=a.parents("li[data-interaction-index]");var n=parseInt(i.attr("data-interaction-index"),10);var s=parseInt(r.attr("data-request-index"),10);var o=b.interactions[n];var p=o.requests[s];if(!o||!p){return}var l=b.getRequestSapStatistics(o,p);if(l){if(!g.getParent()){e.addContent(g);e.addContent(y);e.addContent(C);e.addContent(U);e.addContent(x);e.addContent(R);e.addContent(q)}var d=l.statistics;C.setText(b.formatDuration(parseFloat(d.substring(d.indexOf("total=")+"total=".length,d.indexOf(",")))));d=d.substring(d.indexOf(",")+1);x.setText(b.formatDuration(parseFloat(d.substring(d.indexOf("fw=")+"fw=".length,d.indexOf(",")))));d=d.substring(d.indexOf(",")+1);q.setText(b.formatDuration(parseFloat(d.substring(d.indexOf("app=")+"app=".length,d.indexOf(",")))))}else if(g.getParent()){e.removeContent(g);e.removeContent(y);e.removeContent(C);e.removeContent(U);e.removeContent(x);e.removeContent(R);e.removeContent(q)}}function M(){var e=b.getRequestFromElement(t(this));I.setText(e.initiatorType||"");f.setText(e.entryType||"");m.setText(e.name);m.setHref(e.name);var a=b.getRequestDuration(e);var r=e.fetchStartOffset+e.startTime;var i=r+a;T.setText(b.formatTime(r));S.setText(b.formatTime(i));w.setText(b.formatDuration(a))}function A(){var e=b.getRequestFromElement(t(this));var a=e.fetchStartOffset;var i=b.getRequestDuration(e);var n=a+e.startTime;var s=n+i;var o=b.getRequestRequestStart(e)+a;var p=b.getRequestResponseStart(e)+a;var l=o-n;var d=p-o;var u=s-p;var c=Math.floor(100*d/i);var v=Math.floor(100*u/i);var I=Math.floor(100*l/i);var f='<span class="sapUiInteractionTitleSection"><div class="sapUiInteractionTitleText">{Title}</div><div class="sapUiInteractionTitleSubText">{Subtitle}</div></span>';var m='<div class="sapUiInteractionTitle">';m+=f.replace("{Title}","PREPROCESSING").replace("{Subtitle}",b.formatDuration(l));m+=f.replace("{Title}","SERVER").replace("{Subtitle}",b.formatDuration(d));m+=f.replace("{Title}","CLIENT").replace("{Subtitle}",b.formatDuration(u));m+="</div>";r.setContent(m);var T=e.initiatorType||e.entryType;var S=b.getRequestColorClass(T);var w=S+"70";var g="<span class='sapUiSupportIntProgressBar "+w+"'' style=\"width:calc("+I+"% - 1px)\"></span><span class='sapUiSupportIntProgressBarSeparator'></span>";var y="<span class='sapUiSupportIntProgressBar "+S+"' style=\"width:calc("+c+'% - 1px)"></span>'+"<span class='sapUiSupportIntProgressBarSeparator'></span>";var C="<span class='sapUiSupportIntProgressBar "+w+"'' style=\"width:calc("+v+'% - 1px)"></span>';var U="<div class='sapUiSupportIntProgressBarParent'>"+g+y+C+"</div>";h.setContent(U)}function O(){var t=new i({placement:c.Auto,contentWidth:"400px",showHeader:false,showArrow:true,verticalScrolling:true,horizontalScrolling:false,content:[k()]}).addStyleClass("sapUiSupportPopover");t.attachAfterOpen(function(t){t.getSource().$().focus()});return t}function k(){r=new d;h=new d;v=new o({icon:a.getIconURI("decline"),type:"Transparent",press:function(){D.close()}}).addStyleClass("sapUiSupportReqPopoverCloseButton");v.setTooltip("Close");I=(new n).addStyleClass("sapUiSupportIntRequestText");f=(new n).addStyleClass("sapUiSupportIntRequestText");m=new l({target:"_blank",wrapping:true}).addStyleClass("sapUiSupportIntRequestLink");T=(new n).addStyleClass("sapUiSupportIntRequestText");S=(new n).addStyleClass("sapUiSupportIntRequestText");w=(new n).addStyleClass("sapUiSupportIntRequestText");g=new u({text:"SAP STATISTICS FOR ODATA CALLS"});y=new p({text:"Gateway Total"}).addStyleClass("sapUiSupportIntRequestLabel");C=(new n).addStyleClass("sapUiSupportIntRequestText");U=new p({text:"Framework"}).addStyleClass("sapUiSupportIntRequestLabel");x=(new n).addStyleClass("sapUiSupportIntRequestText");R=new p({text:"Application"}).addStyleClass("sapUiSupportIntRequestLabel");q=(new n).addStyleClass("sapUiSupportIntRequestText");e=new s({maxContainerCols:2,minWidth:400,labelMinWidth:100,editable:false,layout:"ResponsiveGridLayout",labelSpanM:3,emptySpanM:0,columnsM:1,breakpointM:0,content:[new u({text:"REQUEST DATA"}),new p({text:"Initiator Type"}).addStyleClass("sapUiSupportIntRequestLabel"),I,new p({text:"Entry Type"}).addStyleClass("sapUiSupportIntRequestLabel"),f,new p({text:"Name"}).addStyleClass("sapUiSupportIntRequestLabel"),m,new p({text:"Start Time"}).addStyleClass("sapUiSupportIntRequestLabel"),T,new p({text:"End Time"}).addStyleClass("sapUiSupportIntRequestLabel"),S,new p({text:"Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),w]});return[r,h,v,e]}};h.prototype.getRequestFromElement=function(t){var e=t.parents("li[data-request-index]");var a=t.parents("li[data-interaction-index]");var r=parseInt(a.attr("data-interaction-index"),10);var i=parseInt(e.attr("data-request-index"),10);var n=this.interactions[r].requests[i];return n};h.prototype.attachInteractionDetailsPopover=function(){var e,r,l,d,h,v,I,f,m;var T=this;var S=t(".sapUiInteractionItemDiv.sapUiInteractionTreeItem .sapUiInteractionTreeItemRight");if(S.length){var w=C();for(var g=0;g<S.length;g++){S[g].addEventListener("click",function(e){y.call(this);var a=t(this).children()[0];w.openBy(a)})}}function y(){var e=t(this).parent().parent();var a=parseInt(e.attr("data-interaction-index"),10);var r=T.interactions[a];if(!r){return}l.setText(T.formatDuration(r.duration));d.setText(T.formatDuration(r.duration-r.roundtrip));h.setText(T.formatDuration(r.requestTime));v.setText(T.formatDuration(r.roundtrip));I.setText(r.bytesReceived);f.setText(r.requests.length);m.setText(T.formatTime(r.start))}function C(){var t=new i({placement:c.Auto,contentWidth:"350px",showHeader:false,showArrow:true,verticalScrolling:true,horizontalScrolling:false,content:[U()]}).addStyleClass("sapUiSupportPopover");t.attachAfterOpen(function(t){t.getSource().$().focus()});return t}function U(){r=new o({icon:a.getIconURI("decline"),type:"Transparent",press:function(){w.close()}}).addStyleClass("sapUiSupportIntPopoverCloseButton");r.setTooltip("Close");l=(new n).addStyleClass("sapUiSupportIntRequestText");d=(new n).addStyleClass("sapUiSupportIntRequestText");h=(new n).addStyleClass("sapUiSupportIntRequestText");v=(new n).addStyleClass("sapUiSupportIntRequestText");I=(new n).addStyleClass("sapUiSupportIntRequestText");f=(new n).addStyleClass("sapUiSupportIntRequestText");m=(new n).addStyleClass("sapUiSupportIntRequestText");e=new s({maxContainerCols:2,minWidth:400,labelMinWidth:100,editable:false,layout:"ResponsiveGridLayout",labelSpanM:7,emptySpanM:0,columnsM:1,breakpointM:0,content:[new u({text:"INTERACTION DATA"}),new p({text:"Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),l,new p({text:"Client Processing Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),d,new p({text:"Total Requests Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),h,new p({text:"Roundtrip Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),v,new p({text:"Bytes Received"}).addStyleClass("sapUiSupportIntRequestLabel"),I,new p({text:"Request Count"}).addStyleClass("sapUiSupportIntRequestLabel"),f,new p({text:"Start Time"}).addStyleClass("sapUiSupportIntRequestLabel"),m]}).addStyleClass("sapUiSupportIntPopoverForm");return[r,e]}};h.prototype.renderRequestPart=function(t,e,a,r){if(this.actualStartTime>a||this.actualEndTime<e){return}a=Math.min(a,this.actualEndTime);e=Math.max(e,this.actualStartTime);var i=100/this.timeRange*(e-this.actualStartTime);var n=100/this.timeRange*(a-this.actualStartTime);var s=n-i;t.write('<span style="margin-left: '+i+"%; width: "+s+'%" class="sapUiInteractionTimeframe sapUiInteractionTimeRequestFrame '+r+'"></span>')};h.prototype.getRequestDuration=function(t){if(t.duration>0){return t.duration}var e=t.responseStart||t.requestStart||t.fetchStart;return e-t.startTime};h.prototype.getRequestRequestStart=function(t){if(t.requestStart>0){return t.requestStart}return t.fetchStart||t.startTime};h.prototype.getRequestResponseStart=function(t){if(t.responseStart>0){return t.responseStart}return t.requestStart||t.fetchStart||t.startTime};h.prototype.pad0=function(t,e){return("000"+String(t)).slice(-e)};h.prototype.formatGridLineDuration=function(t){var e=this.actualStartTime-this.startTime;t+=e;return t>100?(t/1e3).toFixed(2)+" s":t.toFixed(0)+" ms"};h.prototype.formatDuration=function(t){t=Math.max(t,0);if(t<3){return t.toFixed(2)+" ms"}return t>=1e3?(t/1e3).toFixed(3)+" s":t.toFixed(0)+" ms"};h.prototype.formatTime=function(t){var e=new Date(t);return this.pad0(e.getHours(),2)+":"+this.pad0(e.getMinutes(),2)+":"+this.pad0(e.getSeconds(),2)+"."+this.pad0(e.getMilliseconds(),3)};h.prototype.renderIcon=function(t,e){var a=this.getIconHTML(e);t.write(a)};h.prototype.getIconHTML=function(t){var e=t?h.collapseIcon:h.expandIcon;var r="sapUiIcon sapUiInteractionTreeIcon";if(n&&!n.suppressMirroring){r+=" sapUiIconMirrorInRTL"}var i='<span aria-hidden="true" expanded="'+t+'" class="'+r+'" ';var n=a.getIconInfo(e);if(n){i+='data-sap-ui-icon-content="'+n.content+'"';i+=" style=\"font-family:'SAP-icons'\""}i+="></span>";return i};return h});