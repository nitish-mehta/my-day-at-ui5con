/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/format/NumberFormat","sap/ui/model/FormatException","sap/ui/model/odata/type/ODataType","sap/ui/model/ParseException","sap/ui/model/ValidateException"],function(t,e,n,a,o,r){"use strict";if(!Math.fround){var i=new window.Float32Array(1);Math.fround=function(t){i[0]=t;return i[0]}}function l(){return sap.ui.getCore().getLibraryResourceBundle().getText("EnterNumber")}function u(n){var a;if(!n.oFormat){a=t.extend({groupingEnabled:true},n.oFormatOptions);n.oFormat=e.getFloatInstance(a)}return n.oFormat}function s(t){return!t.oConstraints||t.oConstraints.nullable!==false}function f(e,n){var a;e.oConstraints=undefined;if(n){a=n.nullable;if(a===false||a==="false"){e.oConstraints={nullable:false}}else if(a!==undefined&&a!==true&&a!=="true"){t.sap.log.warning("Illegal nullable: "+a,null,e.getName())}}e._handleLocalizationChange()}var p=a.extend("sap.ui.model.odata.type.Single",{constructor:function(t,e){a.apply(this,arguments);this.oFormatOptions=t;f(this,e)}});p.prototype.formatValue=function(t,e){var a;if(t===null||t===undefined){return null}if(typeof t==="number"){a=t}else if(typeof t==="string"){a=parseFloat(t)}else if(e!=="any"){throw new n("Illegal "+this.getName()+" value: "+t)}switch(this.getPrimitiveType(e)){case"any":return t;case"float":return a;case"int":return Math.floor(a);case"string":return u(this).format(parseFloat(a.toPrecision(7)));default:throw new n("Don't know how to format "+this.getName()+" to "+e)}};p.prototype.parseValue=function(t,e){var n;if(t===null||t===""){return null}switch(this.getPrimitiveType(e)){case"string":n=u(this).parse(t);if(isNaN(n)){throw new o(l())}break;case"int":case"float":n=t;break;default:throw new o("Don't know how to parse "+this.getName()+" from "+e)}return Math.fround(n)};p.prototype._handleLocalizationChange=function(){this.oFormat=null};p.prototype.validateValue=function(t){if(t===null&&s(this)){return}if(typeof t==="number"){return}throw new r(l())};p.prototype.getName=function(){return"sap.ui.model.odata.type.Single"};return p});