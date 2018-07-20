/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/ui/core/LocaleData","sap/ui/core/delegate/ItemNavigation","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","sap/ui/unified/library","sap/ui/core/format/DateFormat","sap/ui/core/library","sap/ui/core/Locale","./TimesRowRenderer"],function(e,t,a,i,s,r,n,o,l,g,u){"use strict";var h=l.CalendarType;var c=t.extend("sap.ui.unified.calendar.TimesRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},items:{type:"int",group:"Appearance",defaultValue:12},intervalMinutes:{type:"int",group:"Appearance",defaultValue:60},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}}});c.prototype.init=function(){this._oFormatYyyyMMddHHmm=o.getInstance({pattern:"yyyyMMddHHmm",calendarType:h.Gregorian});this._oFormatLong=o.getDateTimeInstance({style:"long/short"});this._oFormatDate=o.getDateInstance({style:"medium"});this._mouseMoveProxy=e.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified")};c.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._sInvalidateTimes){e.sap.clearDelayedCall(this._sInvalidateTimes)}};c.prototype.onAfterRendering=function(){m.call(this)};c.prototype.onsapfocusleave=function(t){if(!t.relatedControlId||!e.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(t.relatedControlId).getFocusDomRef())){if(this._bMouseMove){w.call(this,true);T.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;U.call(this)}if(this._bMousedownChange){this._bMousedownChange=false;U.call(this)}}};c.prototype.invalidate=function(a){if(!this._bDateRangeChanged&&(!a||!(a instanceof sap.ui.unified.DateRange))){t.prototype.invalidate.apply(this,arguments)}else if(this.getDomRef()&&!this._sInvalidateTimes){if(this._bInvalidateSync){b.call(this)}else{this._sInvalidateTimes=e.sap.delayedCall(0,this,b)}}};c.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("selectedDates");return e};c.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("selectedDates");return e};c.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("specialDates");return e};c.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("specialDates");return e};c.prototype.setIntervalMinutes=function(e){if(e>=720){throw new Error("Only intervals < 720 minutes are allowed; "+this)}if(1440%e>0){throw new Error("A day must be divisible by the interval size; "+this)}this.setProperty("intervalMinutes",e,false);this._oFormatTime=undefined;return this};c.prototype.setDate=function(e){_.call(this,e,false);return this};c.prototype._setDate=function(e){var t=s._createLocalDate(e,true);this.setProperty("date",t,true);this._oUTCDate=e};c.prototype._getDate=function(){if(!this._oUTCDate){this._oUTCDate=s._createUniversalUTCDate(new Date,undefined,true)}return this._oUTCDate};c.prototype.setStartDate=function(e){s._checkJSDateObject(e);var t=e.getFullYear();s._checkYearInValidRange(t);var a=s._createUniversalUTCDate(e,undefined,true);this.setProperty("startDate",e,true);this._oUTCStartDate=this._getIntervalStart(a);if(this.getDomRef()){var i=s._createLocalDate(this._getDate(),true);this._bNoRangeCheck=true;this.displayDate(e);this._bNoRangeCheck=false;if(i&&this.checkDateFocusable(i)){this.displayDate(i)}}return this};c.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=s._createUniversalUTCDate(new Date,undefined,true);this._oUTCStartDate=this._getIntervalStart(this._oUTCStartDate)}return this._oUTCStartDate};c.prototype.displayDate=function(e){_.call(this,e,true);return this};c.prototype._getLocale=function(){var e=this.getParent();if(e&&e.getLocale){return e.getLocale()}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};c.prototype._getLocaleData=function(){var e=this.getParent();if(e&&e._getLocaleData){return e._getLocaleData()}else if(!this._oLocaleData){var t=this._getLocale();var i=new g(t);this._oLocaleData=a.getInstance(i)}return this._oLocaleData};c.prototype._getFormatLong=function(){var e=this._getLocale();if(this._oFormatLong.oLocale.toString()!=e){var t=new g(e);this._oFormatLong=o.getInstance({style:"long/short"},t)}return this._oFormatLong};c.prototype._getFormatTime=function(){var e=this._getLocale();if(!this._oFormatTime||this._oFormatTime.oLocale.toString()!=e){var t=new g(e);var a=this.getIntervalMinutes();var i=this._getLocaleData();var s;this._oFormatTimeAmPm=undefined;if(a%60==0){s=i.getPreferredHourSymbol();if(i.getTimePattern("short").search("a")>=0){this._oFormatTimeAmPm=o.getTimeInstance({pattern:"a"},t)}}else{s=i.getTimePattern("short");s=s.replace("HH","H");s=s.replace("hh","h");if(s.search("a")>=0){this._oFormatTimeAmPm=o.getTimeInstance({pattern:"a"},t);s=s.replace("a","").trim()}}this._oFormatTime=o.getTimeInstance({pattern:s},t)}return this._oFormatTime};c.prototype._getFormatDate=function(){var e=this._getLocale();if(this._oFormatDate.oLocale.toString()!=e){var t=new g(e);this._oFormatDate=o.getDateInstance({style:"medium"},t)}return this._oFormatDate};c.prototype.getIntervalSelection=function(){var e=this.getParent();if(e&&e.getIntervalSelection){return e.getIntervalSelection()}else{return this.getProperty("intervalSelection")}};c.prototype.getSingleSelection=function(){var e=this.getParent();if(e&&e.getSingleSelection){return e.getSingleSelection()}else{return this.getProperty("singleSelection")}};c.prototype.getSelectedDates=function(){var e=this.getParent();if(e&&e.getSelectedDates){return e.getSelectedDates()}else{return this.getAggregation("selectedDates",[])}};c.prototype.getSpecialDates=function(){var e=this.getParent();if(e&&e.getSpecialDates){return e.getSpecialDates()}else{return this.getAggregation("specialDates",[])}};c.prototype._getShowHeader=function(){var e=this.getParent();if(e&&e._getShowItemHeader){return e._getShowItemHeader()}else{return this.getProperty("showHeader")}};c.prototype.getIntervalMinutes=function(){var e=this.getParent();if(e&&e.getIntervalMinutes){return e.getIntervalMinutes()}else{return this.getProperty("intervalMinutes")}};c.prototype.getAriaLabelledBy=function(){var e=this.getParent();if(e&&e.getAriaLabelledBy){return e.getAriaLabelledBy()}else{return this.getAssociation("ariaLabelledBy",[])}};c.prototype.getLegend=function(){var e=this.getParent();if(e&&e.getLegend){return e.getLegend()}else{return this.getAssociation("ariaLabelledBy",[])}};c.prototype._checkDateSelected=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t=0;var a=this.getSelectedDates();var i=new r(e.getTime());i=this._getIntervalStart(i);var n=i.getTime();for(var o=0;o<a.length;o++){var l=a[o];var g=l.getStartDate();var u=0;if(g){g=s._createUniversalUTCDate(g,undefined,true);g=this._getIntervalStart(g);u=g.getTime()}var h=l.getEndDate();var c=0;if(h){h=s._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h);c=h.getTime()}if(n==u&&!h){t=1;break}else if(n==u&&h){t=2;if(h&&n==c){t=5}break}else if(h&&n==c){t=3;break}else if(h&&n>u&&n<c){t=4;break}if(this.getSingleSelection()){break}}return t};c.prototype._getDateType=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t;var a=this.getSpecialDates();var i=new r(e.getTime());i=this._getIntervalStart(i);var n=i.getTime();for(var o=0;o<a.length;o++){var l=a[o];var g=l.getStartDate();var u=0;if(g){g=s._createUniversalUTCDate(g,undefined,true);g=this._getIntervalStart(g);u=g.getTime()}var h=l.getEndDate();var c=0;if(h){h=s._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h);h.setUTCMinutes(h.getUTCMinutes()+this.getIntervalMinutes()-1);c=h.getTime()}else if(g.getUTCHours()==0&&g.getUTCMinutes()==0&&g.getUTCSeconds()==0&&g.getUTCMilliseconds()==0){h=new r(g.getTime());h.setUTCDate(h.getUTCDate()+1);c=h.getTime()}if(n==u&&!h||n>=u&&n<=c){t={type:l.getType(),tooltip:l.getTooltip_AsString()};break}}return t};c.prototype._checkTimeEnabled=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t=e.getTime();var a=this.getParent();if(a&&a._oMinDate&&a._oMaxDate){if(t<a._oMinDate.getTime()||t>a._oMaxDate.getTime()){return false}}return true};c.prototype._handleMouseMove=function(t){if(!this.$().is(":visible")){w.call(this,true)}var a=e(t.target);if(a.hasClass("sapUiCalItemText")){a=a.parent()}if(a.hasClass("sapUiCalItem")){var i=this._getDate();var s=new r(this._oFormatYyyyMMddHHmm.parse(a.attr("data-sap-time"),true).getTime());if(s.getTime()!=i.getTime()){this._setDate(s);T.call(this,s,true);this._bMoveChange=true}}};c.prototype.onmouseup=function(t){if(this._bMouseMove){w.call(this,true);var a=this._getDate();var i=this._oItemNavigation.getItemDomRefs();for(var s=0;s<i.length;s++){var n=e(i[s]);if(n.attr("data-sap-time")==this._oFormatYyyyMMddHHmm.format(a.getJSDate(),true)){n.focus();break}}if(this._bMoveChange){var o=e(t.target);if(o.hasClass("sapUiCalItemText")){o=o.parent()}if(o.hasClass("sapUiCalItem")){a=new r(this._oFormatYyyyMMddHHmm.parse(o.attr("data-sap-time"),true).getTime())}T.call(this,a);this._bMoveChange=false;this._bMousedownChange=false;U.call(this)}}if(this._bMousedownChange){this._bMousedownChange=false;U.call(this)}};c.prototype.onsapselect=function(e){var t=T.call(this,this._getDate());if(t){U.call(this)}e.stopPropagation();e.preventDefault()};c.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};c.prototype.onsappageupmodifiers=function(e){var t=new r(this._getDate().getTime());var a=t.getUTCDate();if(e.metaKey||e.ctrlKey){t.setUTCDate(a-7)}else{t.setUTCDate(a-1)}this.fireFocus({date:s._createLocalDate(t,true),notVisible:true});e.preventDefault()};c.prototype.onsappagedownmodifiers=function(e){var t=new r(this._getDate().getTime());var a=t.getUTCDate();if(e.metaKey||e.ctrlKey){t.setUTCDate(a+7)}else{t.setUTCDate(a+1)}this.fireFocus({date:s._createLocalDate(t,true),notVisible:true});e.preventDefault()};c.prototype.checkDateFocusable=function(e){s._checkJSDateObject(e);if(this._bNoRangeCheck){return false}var t=this._getStartDate();var a=new r(t.getTime());a.setUTCMinutes(a.getUTCMinutes()+this.getItems()*this.getIntervalMinutes());var i=s._createUniversalUTCDate(e,undefined,true);if(i.getTime()>=t.getTime()&&i.getTime()<a.getTime()){return true}else{return false}};c.prototype.applyFocusInfo=function(e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this};c.prototype._getIntervalStart=function(e){var t=e.getTime();var a=new r(e.getTime());a.setUTCHours(0);a.setUTCMinutes(0);a.setUTCSeconds(0);a.setUTCMilliseconds(0);var i=this.getIntervalMinutes();while(a.getTime()<=t){a.setUTCMinutes(a.getUTCMinutes()+i)}var s=new r(a.getTime());s.setUTCMinutes(s.getUTCMinutes()-i);return s};function m(){var t=this._getDate();var a=this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true);var s=0;var r=this.$("times").get(0);var n=this.$("times").children(".sapUiCalItem");for(var o=0;o<n.length;o++){var l=e(n[o]);if(l.attr("data-sap-time")===a){s=o;break}}if(!this._oItemNavigation){this._oItemNavigation=new i;this._oItemNavigation.attachEvent(i.Events.AfterFocus,f,this);this._oItemNavigation.attachEvent(i.Events.FocusAgain,d,this);this._oItemNavigation.attachEvent(i.Events.BorderReached,p,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true)}this._oItemNavigation.setRootDomRef(r);this._oItemNavigation.setItemDomRefs(n);this._oItemNavigation.setFocusedIndex(s);this._oItemNavigation.setPageSize(n.length)}function f(t){var a=t.getParameter("index");var i=t.getParameter("event");if(!i){return}var n=this._getDate();var o=new r(n.getTime());var l=this._oItemNavigation.getItemDomRefs();var g=e(l[a]);o=new r(this._oFormatYyyyMMddHHmm.parse(g.attr("data-sap-time"),true).getTime());this._setDate(o);this.fireFocus({date:s._createLocalDate(o,true),notVisible:false});if(i.type=="mousedown"){v.call(this,i,o,a)}}function d(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}if(a.type=="mousedown"){var i=this._getDate();v.call(this,a,i,t)}}function p(e){var t=e.getParameter("event");var a=this.getItems();var i=this.getIntervalMinutes();var n=this._getDate();var o=new r(n.getTime());if(t.type){switch(t.type){case"sapnext":case"sapnextmodifiers":o.setUTCMinutes(o.getUTCMinutes()+i);break;case"sapprevious":case"sappreviousmodifiers":o.setUTCMinutes(o.getUTCMinutes()-i);break;case"sappagedown":o.setUTCMinutes(o.getUTCMinutes()+i*a);break;case"sappageup":o.setUTCMinutes(o.getUTCMinutes()-i*a);break;default:break}this.fireFocus({date:s._createLocalDate(o,true),notVisible:true})}}function v(e,t,a){if(e.button){return}var i=T.call(this,t);if(i){this._bMousedownChange=true}if(this._bMouseMove){w.call(this,true);this._bMoveChange=false}else if(this.getIntervalSelection()&&this.$().is(":visible")){M.call(this,true)}e.preventDefault();e.setMark("cancelAutoClose")}function _(t,a){s._checkJSDateObject(t);var i=t.getFullYear();s._checkYearInValidRange(i);var r=true;if(!e.sap.equal(this.getDate(),t)){var n=s._createUniversalUTCDate(t,undefined,true);n=this._getIntervalStart(n);r=this.checkDateFocusable(t);if(!this._bNoRangeCheck&&!r){throw new Error("Date must be in visible date range; "+this)}this.setProperty("date",t,true);this._oUTCDate=n}if(this.getDomRef()){if(r){D.call(this,this._oUTCDate,a)}else{C.call(this,a)}}}function D(t,a){var i=this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true);var s=this._oItemNavigation.getItemDomRefs();var r;for(var n=0;n<s.length;n++){r=e(s[n]);if(r.attr("data-sap-time")==i){if(document.activeElement!=s[n]){if(a){this._oItemNavigation.setFocusedIndex(n)}else{this._oItemNavigation.focusItem(n)}}break}}}function C(e){var t=this._getStartDate();var a=this.$("times");if(a.length>0){var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderTimes(i,this,t);i.flush(a[0]);i.destroy()}y.call(this);m.call(this);if(!e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex())}}function y(){var e=this._getStartDate();if(this._getShowHeader()){var t=this.$("Head");if(t.length>0){var a=this._getLocaleData();var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(i,this,a,e);i.flush(t[0]);i.destroy()}}}function T(t,a){if(!this._checkTimeEnabled(t)){return false}var i=this.getSelectedDates();var r;var n=this._oItemNavigation.getItemDomRefs();var o;var l;var g=0;var u=this.getParent();var h=this;var c;if(u&&u.getSelectedDates){h=u}if(this.getSingleSelection()){if(i.length>0){r=i[0];c=r.getStartDate();if(c){c=s._createUniversalUTCDate(c,undefined,true);c=this._getIntervalStart(c)}}else{r=new sap.ui.unified.DateRange;h.addAggregation("selectedDates",r,true)}if(this.getIntervalSelection()&&(!r.getEndDate()||a)&&c){var m;if(t.getTime()<c.getTime()){m=c;c=t;if(!a){r.setProperty("startDate",s._createLocalDate(new Date(c.getTime()),true),true);r.setProperty("endDate",s._createLocalDate(new Date(m.getTime()),true),true)}}else if(t.getTime()>=c.getTime()){m=t;if(!a){r.setProperty("endDate",s._createLocalDate(new Date(m.getTime()),true),true)}}I.call(this,c,m)}else{I.call(this,t);r.setProperty("startDate",s._createLocalDate(new Date(t.getTime()),true),true);r.setProperty("endDate",undefined,true)}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection")}else{var f=this._checkDateSelected(t);if(f>0){for(g=0;g<i.length;g++){c=i[g].getStartDate();if(c){c=s._createUniversalUTCDate(c,undefined,true);c=this._getIntervalStart(c);if(t.getTime()==c.getTime()){h.removeAggregation("selectedDates",g,true);break}}}}else{r=new sap.ui.unified.DateRange({startDate:s._createLocalDate(new Date(t.getTime()),true)});h.addAggregation("selectedDates",r,true)}l=this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true);for(g=0;g<n.length;g++){o=e(n[g]);if(o.attr("data-sap-time")==l){if(f>0){o.removeClass("sapUiCalItemSel");o.attr("aria-selected","false")}else{o.addClass("sapUiCalItemSel");o.attr("aria-selected","true")}}}}}return true}function I(t,a){var i=this._oItemNavigation.getItemDomRefs();var s;var n=0;var o=false;var l=false;if(!a){var g=this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true);for(n=0;n<i.length;n++){s=e(i[n]);o=false;l=false;if(s.attr("data-sap-time")==g){s.addClass("sapUiCalItemSel");s.attr("aria-selected","true");o=true}else if(s.hasClass("sapUiCalItemSel")){s.removeClass("sapUiCalItemSel");s.attr("aria-selected","false")}if(s.hasClass("sapUiCalItemSelStart")){s.removeClass("sapUiCalItemSelStart")}else if(s.hasClass("sapUiCalItemSelBetween")){s.removeClass("sapUiCalItemSelBetween")}else if(s.hasClass("sapUiCalItemSelEnd")){s.removeClass("sapUiCalItemSelEnd")}S.call(this,s,o,l)}}else{var u;for(n=0;n<i.length;n++){s=e(i[n]);o=false;l=false;u=new r(this._oFormatYyyyMMddHHmm.parse(s.attr("data-sap-time"),true).getTime());if(u.getTime()==t.getTime()){s.addClass("sapUiCalItemSelStart");o=true;s.addClass("sapUiCalItemSel");s.attr("aria-selected","true");if(a&&u.getTime()==a.getTime()){s.addClass("sapUiCalItemSelEnd");l=true}s.removeClass("sapUiCalItemSelBetween")}else if(a&&u.getTime()>t.getTime()&&u.getTime()<a.getTime()){s.addClass("sapUiCalItemSel");s.attr("aria-selected","true");s.addClass("sapUiCalItemSelBetween");s.removeClass("sapUiCalItemSelStart");s.removeClass("sapUiCalItemSelEnd")}else if(a&&u.getTime()==a.getTime()){s.addClass("sapUiCalItemSelEnd");l=true;s.addClass("sapUiCalItemSel");s.attr("aria-selected","true");s.removeClass("sapUiCalItemSelStart");s.removeClass("sapUiCalItemSelBetween")}else{if(s.hasClass("sapUiCalItemSel")){s.removeClass("sapUiCalItemSel");s.attr("aria-selected","false")}if(s.hasClass("sapUiCalItemSelStart")){s.removeClass("sapUiCalItemSelStart")}else if(s.hasClass("sapUiCalItemSelBetween")){s.removeClass("sapUiCalItemSelBetween")}else if(s.hasClass("sapUiCalItemSelEnd")){s.removeClass("sapUiCalItemSelEnd")}}S.call(this,s,o,l)}}}function S(e,t,a){if(!this.getIntervalSelection()){return}var i="";var s=[];var r=this.getId();var n=false;i=e.attr("aria-describedby");if(i){s=i.split(" ")}var o=-1;var l=-1;for(var g=0;g<s.length;g++){var u=s[g];if(u==r+"-Start"){o=g}if(u==r+"-End"){l=g}}if(o>=0&&!t){s.splice(o,1);n=true;if(l>o){l--}}if(l>=0&&!a){s.splice(l,1);n=true}if(o<0&&t){s.push(r+"-Start");n=true}if(l<0&&a){s.push(r+"-End");n=true}if(n){i=s.join(" ");e.attr("aria-describedby",i)}}function U(){if(this._bMouseMove){w.call(this,true)}this.fireSelect()}function b(){this._sInvalidateTimes=undefined;C.call(this,this._bNoFocus);this._bDateRangeChanged=undefined;this._bNoFocus=undefined}function M(){e(window.document).bind("mousemove",this._mouseMoveProxy);this._bMouseMove=true}function w(){e(window.document).unbind("mousemove",this._mouseMoveProxy);this._bMouseMove=undefined}return c});