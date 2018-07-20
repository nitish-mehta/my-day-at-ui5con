/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./UniversalDate"],function(t){"use strict";var e=t.extend("sap.ui.core.date.Persian",{constructor:function(){var t=arguments;if(t.length>1){t=i(t)}this.oDate=this.createDate(Date,t);this.sCalendarType=sap.ui.core.CalendarType.Persian}});e.UTC=function(){var t=i(arguments);return Date.UTC.apply(Date,t)};e.now=function(){return Date.now()};var r=1300;function n(t){var e=y(t.year,t.month+1,t.day);return s(e)}function a(t){var e=u(t.year,t.month+1,t.day);return h(e)}function i(t){var e=Array.prototype.slice.call(t),r,n;if(typeof t[0]!=="number"||typeof t[1]!=="number"||t[2]!==undefined&&typeof t[2]!="number"){e[0]=NaN;e[1]=NaN;e[2]=NaN;return e}r={year:t[0],month:t[1],day:t[2]!==undefined?t[2]:1};n=a(r);e[0]=n.year;e[1]=n.month;e[2]=n.day;return e}function o(t){var e=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178],r=e.length,n=t+621,a=-14,i=e[0],o,u,s,y,h,c,d;for(d=1;d<r;d+=1){o=e[d];u=o-i;if(t<o){break}a=a+f(u,33)*8+f(p(u,33),4);i=o}c=t-i;a=a+f(c,33)*8+f(p(c,33)+3,4);if(p(u,33)===4&&u-c===4){a+=1}y=f(n,4)-f((f(n,100)+1)*3,4)-150;h=20+a-y;if(u-c<6){c=c-u+f(u+4,33)*33}s=p(p(c+1,33)-1,4);if(s===-1){s=4}return{leap:s,gy:n,march:h}}function u(t,e,r){while(e<1){e+=12;t--}while(e>12){e-=12;t++}var n=o(t);return y(n.gy,3,n.march)+(e-1)*31-f(e,7)*(e-7)+r-1}function s(t){var e=h(t).year,r=e-621,n=o(r),a=y(e,3,n.march),i,u,s;s=t-a;if(s>=0){if(s<=185){u=1+f(s,31);i=p(s,31)+1;return{year:r,month:u-1,day:i}}else{s-=186}}else{r-=1;s+=179;if(n.leap===1){s+=1}}u=7+f(s,30);i=p(s,30)+1;return{year:r,month:u-1,day:i}}function y(t,e,r){var n=f((t+f(e-8,6)+100100)*1461,4)+f(153*p(e+9,12)+2,5)+r-34840408;n=n-f(f(t+100100+f(e-8,6),100)*3,4)+752;return n}function h(t){var e,r,n,a,i;e=4*t+139361631;e=e+f(f(4*t+183187720,146097)*3,4)*4-3908;r=f(p(e,1461),4)*5+308;n=f(p(r,153),5)+1;a=p(f(r,153),12)+1;i=f(e,1461)-100100+f(8-a,6);return{year:i,month:a-1,day:n}}function f(t,e){return~~(t/e)}function p(t,e){return t-~~(t/e)*e}e.prototype._getPersian=function(){return n({day:this.oDate.getDate(),month:this.oDate.getMonth(),year:this.oDate.getFullYear()})};e.prototype._setPersian=function(t){var e=a(t);return this.oDate.setFullYear(e.year,e.month,e.day)};e.prototype._getUTCPersian=function(){return n({day:this.oDate.getUTCDate(),month:this.oDate.getUTCMonth(),year:this.oDate.getUTCFullYear()})};e.prototype._setUTCPersian=function(t){var e=a(t);return this.oDate.setUTCFullYear(e.year,e.month,e.day)};e.prototype.getDate=function(t){return this._getPersian().day};e.prototype.getMonth=function(){return this._getPersian().month};e.prototype.getYear=function(){return this._getPersian().year-r};e.prototype.getFullYear=function(){return this._getPersian().year};e.prototype.setDate=function(t){var e=this._getPersian();e.day=t;return this._setPersian(e)};e.prototype.setMonth=function(t,e){var r=this._getPersian();r.month=t;if(e!==undefined){r.day=e}return this._setPersian(r)};e.prototype.setYear=function(t){var e=this._getPersian();e.year=t+r;return this._setPersian(e)};e.prototype.setFullYear=function(t,e,r){var n=this._getPersian();n.year=t;if(e!==undefined){n.month=e}if(r!==undefined){n.day=r}return this._setPersian(n)};e.prototype.getUTCDate=function(t){return this._getUTCPersian().day};e.prototype.getUTCMonth=function(){return this._getUTCPersian().month};e.prototype.getUTCFullYear=function(){return this._getUTCPersian().year};e.prototype.setUTCDate=function(t){var e=this._getUTCPersian();e.day=t;return this._setUTCPersian(e)};e.prototype.setUTCMonth=function(t,e){var r=this._getUTCPersian();r.month=t;if(e!==undefined){r.day=e}return this._setUTCPersian(r)};e.prototype.setUTCFullYear=function(t,e,r){var n=this._getUTCPersian();n.year=t;if(e!==undefined){n.month=e}if(r!==undefined){n.day=r}return this._setUTCPersian(n)};return e});