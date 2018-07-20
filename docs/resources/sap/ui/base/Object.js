/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Interface","./Metadata"],function(t,e,a){"use strict";var n=a.createClass("sap.ui.base.Object",{constructor:function(){if(!(this instanceof n)){throw Error('Cannot instantiate object: "new" is missing!')}}});n.prototype.destroy=function(){};n.prototype.getInterface=function(){var a=new e(this,this.getMetadata().getAllPublicMethods());this.getInterface=t.sap.getter(a);return a};n.defineClass=function(e,n,s){var r=new(s||a)(e,n);var i=r.getClass();i.getMetadata=i.prototype.getMetadata=t.sap.getter(r);if(!r.isFinal()){i.extend=function(t,e,n){return a.createClass(i,t,e,n||s)}}t.sap.log.debug("defined class '"+e+"'"+(r.getParent()?" as subclass of "+r.getParent().getName():""));return r};n.prototype.isA=function(t){return this.getMetadata().isA(t)};n.isA=function(t,e){return t instanceof n&&t.isA(e)};return n},true);