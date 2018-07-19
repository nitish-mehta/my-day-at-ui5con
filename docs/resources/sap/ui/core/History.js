/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","jquery.sap.storage"],function(t,i){"use strict";var s=i.extend("sap.ui.core.History",{constructor:function(s,r){i.apply(this);if(!r){r={}}var e=r.prefix?r.prefix:document.location.pathname;this._iMaxHistory=r.max?r.max:100;this._sHistoryId=e+s;this._oStorage=t.sap.storage(t.sap.storage.Type.local);this._fFilter=r.filter?r.filter:function(i,s){return i&&(!s||s&&t.sap.startsWithIgnoreCase(i,s))};this._fCheckHistory=r.checkHistory?r.checkHistory:function(t){return t}},_initHistory:function(){if(!this._aHistory){var t=this._oStorage.get(this._sHistoryId);if(typeof t==="string"){t=t.split(",")}else if(!t){t=[]}this._aHistory=this._fCheckHistory(t)}return this._aHistory},get:function(t){var i=this._initHistory();var s=[];for(var r=0;r<i.length;r++){if(this._fFilter(i[r],t)){s.push(i[r])}}return s},remove:function(t){var i=this._initHistory();for(var s=0;s<i.length;s++){if(i[s]==t){i.splice(s,1);break}}},add:function(t){var i=this._initHistory();for(var s=0;s<i.length;s++){if(i[s]===t){i.splice(s,1);break}}i.unshift(t);if(i.length>this._iMaxHistory){i.splice(this._iMaxHistory)}this._oStorage.put(this._sHistoryId,i)},clear:function(){this._oStorage.remove(this._sHistoryId);this._aHistory=null}});return s});