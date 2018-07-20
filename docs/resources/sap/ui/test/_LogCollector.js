/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","jquery.sap.global","sap/ui/test/_OpaLogger"],function(e,t,s){"use strict";var o;var n="sap.ui.test._LogCollector";var a=s.getLogger(n);var r=e.extend(n,{constructor:function(){this._aLogs=[];this._oListener={onLogEntry:function(e){if(!t.sap.startsWith(e.component,"sap.ui.test")){return}var s=e.message+" - "+e.details+" "+e.component;this._aLogs.push(s);if(this._aLogs.length>500){this._aLogs.length=0;a.error("Opa has received 500 logs without a consumer - "+"maybe you loaded Opa.js inside of an IFrame? "+"The logs are now cleared to prevent memory leaking")}}.bind(this)};t.sap.log.addLogListener(this._oListener)},getAndClearLog:function(){var e=this._aLogs.join("\n");this._aLogs.length=0;return e},destroy:function(){this._aLogs.length=0;t.sap.log.removeLogListener(this._oListener)}});r.getInstance=function(){if(!o){o=new r}return o};return r},true);