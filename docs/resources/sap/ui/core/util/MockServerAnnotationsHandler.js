/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/odata/ODataModel","jquery.sap.xml"],function(t,e){"use strict";return{parse:function(a,n){if(!this._index){this._index=0}var r="/annotationhandler"+this._index+++"/";var i=new t({rootUri:r,requests:[{method:"GET",path:new RegExp("\\$metadata"),response:function(t){t.respond(200,{"Content-Type":"application/xml;charset=utf-8"},n)}}]});i.start();var o={annotationURI:[r+"$metadata"],json:true};var s=new e(r,o);var u=s.getServiceAnnotations();i.destroy();return u}}},true);