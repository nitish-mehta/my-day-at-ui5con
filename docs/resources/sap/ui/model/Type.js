/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object"],function(t){"use strict";var e=t.extend("sap.ui.model.Type",{constructor:function(){t.apply(this,arguments);this.sName="Type"},metadata:{abstract:true,publicMethods:["getName"]}});e.prototype.getName=function(){return this.sName};e.prototype.toString=function(){return"Type "+this.getMetadata().getName()};return e});