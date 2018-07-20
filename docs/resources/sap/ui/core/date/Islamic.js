/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./UniversalDate"],function(t,e){"use strict";var a=e.extend("sap.ui.core.date.Islamic",{constructor:function(){var t=arguments;if(t.length>1){t=f(t)}this.oDate=this.createDate(Date,t);this.sCalendarType=sap.ui.core.CalendarType.Islamic}});a.UTC=function(){var t=f(arguments);return Date.UTC.apply(Date,t)};a.now=function(){return Date.now()};var r=1400,o=1721425.5,n=1948439.5,i=-425215872e5,s=864e5;var u=null;function l(t){var e=t.year,a=t.month,r=t.day,i,s,u,l,h,f,c;f=0;if(a+1>2){f=d(e)?-1:-2}c=o-1+365*(e-1)+Math.floor((e-1)/4)+-Math.floor((e-1)/100)+Math.floor((e-1)/400)+Math.floor((367*(a+1)-362)/12+f+r);c=Math.floor(c)+.5;h=c-n;l=Math.floor(h/29.530588853);if(l<0){i=Math.floor(l/12)+1;s=l%12;if(s<0){s+=12}u=h-m(i,s)+1}else{l++;while(g(l)>h){l--}i=Math.floor(l/12)+1;s=l%12;u=h-g(12*(i-1)+s)+1}return{day:u,month:s,year:i}}function h(t){var e=t.year,a=t.month,r=t.day,i=e<1?m(e,a):g(12*(e-1)+a),s=r+i+n-1,u=Math.floor(s-.5)+.5,l=u-o,h=Math.floor(l/146097),f=p(l,146097),c=Math.floor(f/36524),y=p(f,36524),M=Math.floor(y/1461),C=p(y,1461),I=Math.floor(C/365),T=h*400+c*100+M*4+I,v,D,U,_,F,Y,w,b;if(!(c==4||I==4)){T++}U=o+365*(T-1)+Math.floor((T-1)/4)-Math.floor((T-1)/100)+Math.floor((T-1)/400);_=u-U;F=o-1+365*(T-1)+Math.floor((T-1)/4)-Math.floor((T-1)/100)+Math.floor((T-1)/400)+Math.floor(739/12+(d(T)?-1:-2)+1);w=0;if(u<F){w=0}else{w=d(T)?1:2}v=Math.floor(((_+w)*12+373)/367);Y=o-1+365*(T-1)+Math.floor((T-1)/4)-Math.floor((T-1)/100)+Math.floor((T-1)/400);b=0;if(v>2){b=d(T)?-1:-2}Y+=Math.floor((367*v-362)/12+b+1);D=u-Y+1;return{day:D,month:v-1,year:T}}function f(t){var e=Array.prototype.slice.call(t),a,r;a={year:t[0],month:t[1],day:t[2]!==undefined?t[2]:1};r=h(a);e[0]=r.year;e[1]=r.month;e[2]=r.day;return e}function c(){var e,a;u={};e=sap.ui.getCore().getConfiguration().getFormatSettings().getLegacyDateFormat();a=sap.ui.getCore().getConfiguration().getFormatSettings().getLegacyDateCalendarCustomizing();a=a||[];if(!e&&!a.length){t.sap.log.info("No calendar customizations.");return}if(e&&!a.length||!e&&a.length){t.sap.log.warning("There is an inconsistency between customization data ["+JSON.stringify(a)+"] and the date format ["+e+"]. Calendar customization won't be used.");return}a.forEach(function(t){if(t.dateFormat===e){var a=y(t.gregDate);var r=new Date(Date.UTC(a.year,a.month-1,a.day));var o=r.getTime();var n=(o-i)/s;a=y(t.islamicMonthStart);var l=(a.year-1)*12+a.month-1;u[l]=n}});t.sap.log.info("Working with date format: ["+e+"] and customization: "+JSON.stringify(a))}function y(t){return{year:parseInt(t.substr(0,4),10),month:parseInt(t.substr(4,2),10),day:parseInt(t.substr(6,2),10)}}function g(t){if(!u){c()}var e=u[t];if(!e){var a=Math.floor(t/12)+1;var r=t%12;e=m(a,r)}return e}function m(t,e){return Math.ceil(29.5*e)+(t-1)*354+Math.floor((3+11*t)/30)}function p(t,e){return t-e*Math.floor(t/e)}function d(t){return!(t%400)||!(t%4)&&!!(t%100)}a.prototype._getIslamic=function(){return l({day:this.oDate.getDate(),month:this.oDate.getMonth(),year:this.oDate.getFullYear()})};a.prototype._setIslamic=function(t){var e=h(t);return this.oDate.setFullYear(e.year,e.month,e.day)};a.prototype._getUTCIslamic=function(){return l({day:this.oDate.getUTCDate(),month:this.oDate.getUTCMonth(),year:this.oDate.getUTCFullYear()})};a.prototype._setUTCIslamic=function(t){var e=h(t);return this.oDate.setUTCFullYear(e.year,e.month,e.day)};a.prototype.getDate=function(t){return this._getIslamic().day};a.prototype.getMonth=function(){return this._getIslamic().month};a.prototype.getYear=function(){return this._getIslamic().year-r};a.prototype.getFullYear=function(){return this._getIslamic().year};a.prototype.setDate=function(t){var e=this._getIslamic();e.day=t;return this._setIslamic(e)};a.prototype.setMonth=function(t,e){var a=this._getIslamic();a.month=t;if(e!==undefined){a.day=e}return this._setIslamic(a)};a.prototype.setYear=function(t){var e=this._getIslamic();e.year=t+r;return this._setIslamic(e)};a.prototype.setFullYear=function(t,e,a){var r=this._getIslamic();r.year=t;if(e!==undefined){r.month=e}if(a!==undefined){r.day=a}return this._setIslamic(r)};a.prototype.getUTCDate=function(t){return this._getUTCIslamic().day};a.prototype.getUTCMonth=function(){return this._getUTCIslamic().month};a.prototype.getUTCFullYear=function(){return this._getUTCIslamic().year};a.prototype.setUTCDate=function(t){var e=this._getUTCIslamic();e.day=t;return this._setUTCIslamic(e)};a.prototype.setUTCMonth=function(t,e){var a=this._getUTCIslamic();a.month=t;if(e!==undefined){a.day=e}return this._setUTCIslamic(a)};a.prototype.setUTCFullYear=function(t,e,a){var r=this._getUTCIslamic();r.year=t;if(e!==undefined){r.month=e}if(a!==undefined){r.day=a}return this._setUTCIslamic(r)};return a});