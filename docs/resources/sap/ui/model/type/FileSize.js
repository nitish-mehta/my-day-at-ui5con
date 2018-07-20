/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/format/FileSizeFormat","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException"],function(t,e,i,o,n,r){"use strict";var s=i.extend("sap.ui.model.type.FileSize",{constructor:function(){i.apply(this,arguments);this.sName="FileSize"}});s.prototype.formatValue=function(t,e){var i;if(t==undefined||t==null){return null}if(this.oInputFormat&&typeof t==="string"){i=this.oInputFormat.parse(t);if(isNaN(i)){throw new o("Cannot format file size: "+t+" has the wrong format")}}else if(!this.oInputFormat&&typeof t==="string"){throw new o("Cannot format file size: "+t+" of type string without input/source formatter")}else if(typeof t==="number"){i=t}else{throw new o("Cannot format file size: "+t+" has wrong type: "+typeof t)}if(i==undefined||i==null){return null}switch(this.getPrimitiveType(e)){case"string":return this.oOutputFormat.format(i);case"int":return Math.floor(i);case"float":case"any":return i;default:throw new o("Don't know how to format FileSize to "+e)}};s.prototype.parseValue=function(t,e){var i,o;if(t==undefined||t==null){return null}switch(this.getPrimitiveType(e)){case"string":i=this.oOutputFormat.parse(t);if(isNaN(i)){o=sap.ui.getCore().getLibraryResourceBundle();throw new n(o.getText("FileSize.Invalid"))}break;case"int":case"float":i=t;break;default:throw new n("Don't know how to parse FileSize from "+e)}if(this.oInputFormat){i=this.oInputFormat.format(i)}return i};s.prototype.validateValue=function(e){if(this.oConstraints){var i=sap.ui.getCore().getLibraryResourceBundle(),o=[],n=[],s=this.oInputFormat;if(s&&typeof e==="string"){e=s.parse(e)}else if(!s&&typeof e==="string"){throw new Error("No Validation possible: '"+e+"' is of type string but not input/source format specified.")}t.each(this.oConstraints,function(t,r){if(s&&typeof r==="string"){r=s.parse(r)}else if(!s&&typeof r==="string"){throw new Error("No Validation possible: Compare value ("+t+") '"+r+"' is of type string but not input/source format specified.")}switch(t){case"minimum":if(e<r){o.push("minimum");n.push(i.getText("FileSize.Minimum",[r]))}break;case"maximum":if(e>r){o.push("maximum");n.push(i.getText("FileSize.Maximum",[r]))}}});if(o.length>0){throw new r(this.combineMessages(n),o)}}};s.prototype.setFormatOptions=function(t){this.oFormatOptions=t;this._handleLocalizationChange()};s.prototype._handleLocalizationChange=function(){this.oOutputFormat=e.getInstance(this.oFormatOptions);if(this.oFormatOptions.source){this.oInputFormat=e.getInstance(this.oFormatOptions.source)}};return s});