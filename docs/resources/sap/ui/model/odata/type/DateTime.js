/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/odata/type/DateTimeBase"],function(e,a){"use strict";function t(a,t){var l={};if(t){switch(t.displayFormat){case"Date":l.isDateOnly=true;break;case undefined:break;default:e.sap.log.warning("Illegal displayFormat: "+t.displayFormat,null,a.getName())}l.nullable=t.nullable}return l}var l=a.extend("sap.ui.model.odata.type.DateTime",{constructor:function(e,l){a.call(this,e,t(this,l))}});l.prototype.getName=function(){return"sap.ui.model.odata.type.DateTime"};return l});