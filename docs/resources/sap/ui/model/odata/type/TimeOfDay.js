/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","jquery.sap.strings","sap/ui/core/format/DateFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType"],function(t,e,i,n,o,a,r){"use strict";function s(t){return sap.ui.getCore().getLibraryResourceBundle().getText("EnterTime",[t.formatValue("13:47:26","string")])}function l(e){var n="HH:mm:ss",o;if(!e.oModelFormat){o=e.oConstraints&&e.oConstraints.precision;if(o){n+="."+t.sap.padRight("","S",o)}e.oModelFormat=i.getTimeInstance({pattern:n,strictParsing:true,UTC:true})}return e.oModelFormat}function u(e){var n;if(!e.oUiFormat){n=t.extend({strictParsing:true},e.oFormatOptions);n.UTC=true;e.oUiFormat=i.getTimeInstance(n)}return e.oUiFormat}function f(e,i){var n,o;e.oConstraints=undefined;if(i){n=i.nullable;o=i.precision;if(n===false){e.oConstraints={nullable:false}}else if(n!==undefined&&n!==true){t.sap.log.warning("Illegal nullable: "+n,null,e.getName())}if(o===Math.floor(o)&&o>0&&o<=12){e.oConstraints=e.oConstraints||{};e.oConstraints.precision=o}else if(o!==undefined&&o!==0){t.sap.log.warning("Illegal precision: "+o,null,e.getName())}}}var p=r.extend("sap.ui.model.odata.type.TimeOfDay",{constructor:function(t,e){r.apply(this,arguments);this.oModelFormat=undefined;this.rTimeOfDay=undefined;this.oUiFormat=undefined;f(this,e);this.oFormatOptions=t}});p.prototype._handleLocalizationChange=function(){this.oUiFormat=null};p.prototype.formatValue=function(t,e){var i,o;if(t===undefined||t===null){return null}switch(this.getPrimitiveType(e)){case"any":return t;case"string":o=t.indexOf(".");if(o>=0){t=t.slice(0,o+4)}i=l(this).parse(t);if(i){return u(this).format(i)}throw new n("Illegal "+this.getName()+" value: "+t);default:throw new n("Don't know how to format "+this.getName()+" to "+e)}};p.prototype.getModelFormat=function(){return l(this)};p.prototype.getName=function(){return"sap.ui.model.odata.type.TimeOfDay"};p.prototype.parseValue=function(t,e){var i;if(t===""||t===null){return null}if(this.getPrimitiveType(e)!=="string"){throw new o("Don't know how to parse "+this.getName()+" from "+e)}i=u(this).parse(t);if(!i){throw new o(s(this))}return l(this).format(i)};p.prototype.validateValue=function(t){var e;if(t===null){if(this.oConstraints&&this.oConstraints.nullable===false){throw new a(s(this))}return}if(!this.rTimeOfDay){e=this.oConstraints&&this.oConstraints.precision;this.rTimeOfDay=new RegExp("^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d"+(e?"(\\.\\d{1,"+e+"})?":"")+")?$")}if(!this.rTimeOfDay.test(t)){throw new a("Illegal sap.ui.model.odata.type.TimeOfDay value: "+t)}};return p});