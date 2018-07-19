/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/getObject","jquery.sap.global","sap/ui/Global"],function(i,s){"use strict";i.fn.sapui=function(t,e,n){return this.each(function(){var u=null;if(this){if(t.indexOf(".")==-1){t="sap.ui.commons."+t}var a=s(t);if(a){if(typeof n=="object"&&typeof n.press=="function"){n.press=i.proxy(n.press,this)}u=new a(e,n);u.placeAt(this)}}})};return i});