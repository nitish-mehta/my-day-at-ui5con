/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/date/UniversalDate"],function(t,e){"use strict";var a=t.extend("sap.ui.unified.calendar.CalendarDate",{constructor:function(){var t=arguments,e,r,o;switch(t.length){case 0:r=new Date;return this.constructor(r.getFullYear(),r.getMonth(),r.getDate());case 1:case 2:if(!(t[0]instanceof a)){throw"Invalid arguments: the first argument must be of type sap.ui.unified.calendar.CalendarDate."}o=t[1]?t[1]:t[0]._oUDate.sCalendarType;e=new Date(t[0].valueOf());e.setFullYear(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());e.setHours(e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds());this._oUDate=n(e,o);break;case 3:case 4:i(t[0],"Invalid year: "+t[0]);i(t[1],"Invalid month: "+t[1]);i(t[2],"Invalid date: "+t[2]);e=new Date(0,0,1);e.setFullYear(t[0],t[1],t[2]);if(t[3]){o=t[3]}this._oUDate=n(e,o);break;default:throw"Invalid arguments. Accepted arguments are: 1) oCalendarDate, (optional)calendarType"+"or 2) year, month, date, (optional) calendarType"+t}}});a.prototype.getYear=function(){return this._oUDate.getUTCFullYear()};a.prototype.setYear=function(t){i(t,"Invalid year: "+t);this._oUDate.setUTCFullYear(t);return this};a.prototype.getMonth=function(){return this._oUDate.getUTCMonth()};a.prototype.setMonth=function(t){i(t,"Invalid month: "+t);this._oUDate.setUTCMonth(t);return this};a.prototype.getDate=function(){return this._oUDate.getUTCDate()};a.prototype.setDate=function(t){i(t,"Invalid date: "+t);this._oUDate.setUTCDate(t);return this};a.prototype.getDay=function(){return this._oUDate.getUTCDay()};a.prototype.getCalendarType=function(){return this._oUDate.sCalendarType};a.prototype.isBefore=function(t){o(t);return this.valueOf()<t.valueOf()};a.prototype.isAfter=function(t){o(t);return this.valueOf()>t.valueOf()};a.prototype.isSameOrBefore=function(t){o(t);return this.valueOf()<=t.valueOf()};a.prototype.isSameOrAfter=function(t){o(t);return this.valueOf()>=t.valueOf()};a.prototype.isSame=function(t){o(t);return this.valueOf()===t.valueOf()};a.prototype.toLocalJSDate=function(){var t=new Date(this._oUDate.getTime());t.setFullYear(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate());t.setHours(0,0,0,0);return t};a.prototype.toUTCJSDate=function(){var t=new Date(this._oUDate.getTime());t.setUTCHours(0,0,0,0);return t};a.prototype.toString=function(){return this._oUDate.sCalendarType+": "+this.getYear()+"/"+(this.getMonth()+1)+"/"+this.getDate()};a.prototype.valueOf=function(){return this._oUDate.getTime()};a.fromLocalJSDate=function(t,e){if(jQuery.type(t)!=="date"){throw new Error("Date parameter must be a JavaScript Date object: ["+t+"].")}return new a(t.getFullYear(),t.getMonth(),t.getDate(),e)};function n(t,a){if(a){return e.getInstance(r(t),a)}else{return new e(r(t).getTime())}}function r(t){var e=new Date(Date.UTC(0,0,1));e.setUTCFullYear(t.getFullYear(),t.getMonth(),t.getDate());return e}function o(t){if(!(t instanceof a)){throw"Invalid calendar date: ["+t+"]. Expected: sap.ui.unified.calendar.CalendarDate"}}function i(t,e){if(t==undefined||t===Infinity||isNaN(t)){throw e}}return a});