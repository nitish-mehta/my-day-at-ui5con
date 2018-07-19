/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/format/NumberFormat","sap/ui/model/CompositeType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/core/LocaleData"],function(t,e,a,i,n,o,r){"use strict";var s=a.extend("sap.ui.model.type.Unit",{constructor:function(t,e,i){a.apply(this,arguments);this.sName="Unit";this.bUseRawValues=true;this.aDynamicFormatOptionNames=i}});s.prototype._createInstance=function(a){if(this.oFormatOptions){a=t.extend({},this.oFormatOptions,a)}return e.getUnitInstance(a)};s.prototype._getInstance=function(e,a){var i=this.createFormatOptions(e);if(a){var n=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var o=r.getInstance(n);var c=o.getUnitFromMapping(a)||a;var u=o.getUnitFormat(c);if(u){var p=t.extend({},u);p.decimals=i.decimals!=undefined?i.decimals:p.decimals;p.precision=i.precision!=undefined?i.precision:p.precision;i.customUnits={};i.customUnits[a]=p}}if(this.getMetadata().getClass()!==s){var m=this.getMetadata();m._mTypeInstanceCache=m._mTypeInstanceCache||{};var h=t.sap.hashCode(JSON.stringify(i)||"");var f=m._mTypeInstanceCache[h];if(!f){f=this._createInstance(i);m._mTypeInstanceCache[h]=f}return f}else{return this._createInstance(i)}};s.prototype._clearInstances=function(){if(this.getMetadata().getClass()!==s){var t=this.getMetadata();if(t._mTypeInstanceCache){t._mTypeInstanceCache={}}}};s.prototype.createFormatOptions=function(t){var e={};if(this.aDynamicFormatOptionNames&&t.length>=this.aDynamicFormatOptionNames.length){this.aDynamicFormatOptionNames.forEach(function(a,i){if(a){e[a]=t[i]}})}return e};s.prototype.extractArguments=function(t){return Array.isArray(t)&&t.length>2?t.slice(2):[]};s.prototype.formatValue=function(t,e){var a=t;if(t==undefined||t==null){return null}if(this.oInputFormat){a=this.oInputFormat.parse(t)}if(!Array.isArray(a)){throw new i("Cannot format Unit: "+t+" has the wrong format")}if(a[0]==undefined||a[0]==null){return null}switch(this.getPrimitiveType(e)){case"string":this.aDynamicValues=this.extractArguments(a);this.oOutputFormat=this._getInstance(this.aDynamicValues,a[1]);return this.oOutputFormat.format(a);case"int":case"float":case"any":default:throw new i("Don't know how to format Unit to "+e)}};s.prototype.parseValue=function(t,e){var a,i;switch(this.getPrimitiveType(e)){case"string":this.oOutputFormat=this.oOutputFormat||this._getInstance();a=this.oOutputFormat.parse(t);if(!Array.isArray(a)){i=sap.ui.getCore().getLibraryResourceBundle();throw new n(i.getText("Unit.Invalid",[t]))}break;case"int":case"float":default:throw new n("Don't know how to parse Unit from "+e)}if(this.oInputFormat){a=this.oInputFormat.format(a)}return a};s.prototype.validateValue=function(a){if(this.oConstraints){var i=sap.ui.getCore().getLibraryResourceBundle(),n=[],r=[],s=a,c;if(this.oInputFormat){s=this.oInputFormat.parse(a)}c=s[0];t.each(this.oConstraints,function(t,a){switch(t){case"minimum":if(c<a){n.push("minimum");r.push(i.getText("Unit.Minimum",[a]))}break;case"maximum":if(c>a){n.push("maximum");r.push(i.getText("Unit.Maximum",[a]))}break;case"decimals":var o=e._shiftDecimalPoint(c,a);if(Math.floor(o)!==o){n.push("decimals");r.push(i.getText("Unit.Decimals",[a]))}break}});if(n.length>0){throw new o(r.join(" "),n)}}};s.prototype.setFormatOptions=function(t){this.oFormatOptions=t;this._clearInstances();this._createInputFormat()};s.prototype._handleLocalizationChange=function(){this._clearInstances();this._createInputFormat()};s.prototype._createInputFormat=function(){var a=this.oFormatOptions.source;if(a){if(t.isEmptyObject(a)){a={groupingEnabled:false,groupingSeparator:",",decimalSeparator:"."}}this.oInputFormat=e.getUnitInstance(a)}};return s});