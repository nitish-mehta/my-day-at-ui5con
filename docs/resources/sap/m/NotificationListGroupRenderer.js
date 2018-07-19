/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(e){"use strict";var r=e.Priority;var t={};var i="sapMNLG";var a="sapMNLB";var s="sapMLIB";var n="sapMNLB-AuthorPicture";var o="sapMNLB-Header";var d="sapMNLG-Header";var l="sapMNLG-Body";var u="sapMNLB-SubHeader";var v="sapMNLG-SubHeader";var c="sapMNLB-CloseButton";var w="sapMNLB-Priority";var f="sapMNLG-Details";var N="sapMNLB-Bullet";var C="sapMNLG-Description";var g="sapMNLG-Collapsed";var p="sapMNLGNoHdrFooter";var h="sapMNLG-MaxNotifications";var b="sapMNLG-NoNotifications";t.render=function(e,r){if(r.getVisible()){var t=r._getVisibleItemsCount();var n=r.getShowEmptyGroup()||t>0;e.write("<li");e.addClass(i);e.addClass(a);e.addClass(s);if(!n){e.addClass(p)}if(r.getCollapsed()){e.addClass(g)}if(t==0){e.addClass(b)}e.writeClasses();e.writeControlData(r);e.writeAttribute("tabindex","0");e.writeAccessibilityState(r,{labelledby:r._ariaLabbeledByIds});e.write(">");if(n){this.renderHeader(e,r);this.renderSubHeader(e,r);this.renderBody(e,r)}e.write("</li>")}else{this.renderInvisibleItem(e,r)}};t.renderHeader=function(e,r){e.write("<div");e.addClass(o);e.addClass(d);e.writeClasses();e.write(">");this.renderInvisibleInfoText(e,r);this.renderPriorityArea(e,r);this.renderCloseButton(e,r);this.renderTitle(e,r);this.renderDetails(e,r);e.write("</div>")};t.renderTitle=function(e,r){e.renderControl(r._getHeaderTitle())};t.renderCloseButton=function(e,r){if(r.getShowCloseButton()){e.renderControl(r.getAggregation("_closeButton").addStyleClass(c))}};t.renderAuthorPicture=function(e,r){if(!r.getAuthorPicture()){return}e.write("<div");e.addClass(n);e.writeClasses();e.write(">");e.renderControl(r._getAuthorImage());e.write("</div>")};t.renderDetails=function(e,r){e.write('<div class="'+f+'">');this.renderAuthorPicture(e,r);e.write('<div class="'+C+'">');this.renderAuthorName(e,r);if(r.getAuthorName()!=""&&r.getDatetime()!=""){e.write('<span class="'+N+'">&#x00B7</span>')}this.renderDatetime(e,r);e.write("</div></div>")};t.renderInvisibleInfoText=function(e,r){e.renderControl(r.getAggregation("_ariaDetailsText"))};t.renderAuthorName=function(e,r){e.renderControl(r._getAuthorName())};t.renderSubHeader=function(e,r){var t=r.getButtons();e.write("<div");e.addClass(v);e.addClass(u);e.writeClasses();e.write(">");this.renderPriorityArea(e,r);this.renderCollapseGroupButton(e,r);if(t&&t.length&&r.getShowButtons()){e.renderControl(r.getAggregation("_overflowToolbar"))}e.write("</div>")};t.renderPriorityArea=function(e,t){e.write("<div");var i="";var a=t.getPriority();switch(a){case r.Low:i="sapMNLB-Low";break;case r.Medium:i="sapMNLB-Medium";break;case r.High:i="sapMNLB-High";break;default:i="sapMNLB-None";break}e.addClass(w);e.addClass(i);e.writeClasses();e.write(">");e.write("</div>")};t.renderCollapseGroupButton=function(e,r){e.renderControl(r.getAggregation("_collapseButton"))};t.renderInvisibleItem=function(e,r){e.write("<li");e.writeInvisiblePlaceholderData(r);e.write(">");e.write("</li>")};t.renderBody=function(e,r){e.write("<ul class="+l+">");this.renderNotifications(e,r);if(r._maxNumberReached){this.renderMaxNumberReachedMessage(e,r)}e.write("</ul>")};t.renderDatetime=function(e,r){e.renderControl(r._getDateTimeText())};t.renderNotifications=function(e,r){var t=r.getItems();var i=t.length;if(i){for(var a=0;a<r._maxNumberOfNotifications;a++){e.renderControl(t[a])}}};t.renderMaxNumberReachedMessage=function(e,r){var t="<span>"+r._maxNumberOfNotificationsTitle+"</span> <br>"+r._maxNumberOfNotificationsBody;e.write("<div");e.addClass(h);e.writeClasses();e.write(">");e.write(t);e.write("</div>")};return t},true);