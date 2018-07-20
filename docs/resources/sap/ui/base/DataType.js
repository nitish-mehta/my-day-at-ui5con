/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";var t=function(){throw new Error};t.prototype.getName=function(){return undefined};t.prototype.getBaseType=function(){return undefined};t.prototype.getPrimitiveType=function(){var e=this;while(e.getBaseType()){e=e.getBaseType()}return e};t.prototype.getComponentType=function(){return undefined};t.prototype.getDefaultValue=function(){return undefined};t.prototype.isArrayType=function(){return false};t.prototype.isEnumType=function(){return false};t.prototype.getEnumValues=function(){return undefined};t.prototype.parseValue=function(e){return e};t.prototype.isValid=undefined;t.prototype.setNormalizer=function(t){e.sap.assert(typeof t==="function","DataType.setNormalizer: fnNormalizer must be a function");this._fnNormalizer=typeof t==="function"?t:undefined};t.prototype.normalize=function(e){return this._fnNormalizer?this._fnNormalizer(e):e};function n(e,n,r){n=n||{};var a=r||t.prototype;var i=Object.create(a);i.getName=function(){return e};if(n.hasOwnProperty("defaultValue")){var u=n.defaultValue;i.getDefaultValue=function(){return u}}if(n.isValid){var o=n.isValid;i.isValid=a.isValid?function(e){if(!a.isValid(e)){return false}return o(e)}:o}if(n.parseValue){i.parseValue=n.parseValue}i.getBaseType=function(){return r};return i}var r=n("array",{defaultValue:[]});function a(n){e.sap.assert(n instanceof t,"DataType.<createArrayType>: componentType must be a DataType");var a=Object.create(t.prototype);a.getName=function(){return n.getName()+"[]"};a.getComponentType=function(){return n};a.isValid=function(e){if(e===null){return true}if(Array.isArray(e)){for(var t=0;t<e.length;t++){if(!n.isValid(e[t])){return false}}return true}return false};a.parseValue=function(e){var t=e.split(",");for(var r=0;r<t.length;r++){t[r]=n.parseValue(t[r])}return t};a.isArrayType=function(){return true};a.getBaseType=function(){return r};return a}function i(e,n){var r={},a;for(var i in n){var o=n[i];if(!a){a=o}if(typeof o!=="string"){throw new Error("Value "+o+" for enum type "+e+" is not a string")}if(!r.hasOwnProperty(o)||i==o){r[o]=i}}var s=Object.create(t.prototype);s.getName=function(){return e};s.isValid=function(e){return typeof e==="string"&&r.hasOwnProperty(e)};s.parseValue=function(e){return n[e]};s.getDefaultValue=function(){return a};s.getBaseType=function(){return u.string};s.isEnumType=function(){return true};s.getEnumValues=function(){return n};return s}var u={any:n("any",{defaultValue:null,isValid:function(e){return true}}),boolean:n("boolean",{defaultValue:false,isValid:function(e){return typeof e==="boolean"},parseValue:function(e){return e=="true"}}),int:n("int",{defaultValue:0,isValid:function(e){return typeof e==="number"&&Math.floor(e)==e},parseValue:function(e){return parseInt(e,10)}}),float:n("float",{defaultValue:0,isValid:function(e){return typeof e==="number"},parseValue:function(e){return parseFloat(e)}}),string:n("string",{defaultValue:"",isValid:function(e){return typeof e==="string"||e instanceof String},parseValue:function(e){return e}}),object:n("object",{defaultValue:null,isValid:function(e){return typeof e==="object"||typeof e==="function"},parseValue:function(e){return e?JSON.parse(e):null}}),function:n("function",{defaultValue:null,isValid:function(e){return e==null||typeof e==="function"},parseValue:function(t,n){if(t===""){return undefined}if(!/^\.?[A-Z_\$][A-Z0-9_\$]*(\.[A-Z_\$][A-Z0-9_\$]*)*$/i.test(t)){throw new Error("Function references must consist of dot separated "+"simple identifiers (A-Z, 0-9, _ or $) only, but was '"+t+"'")}var r,a,i=n&&n.context;if(t[0]==="."){if(i){r=e.sap.getObject(t.slice(1),undefined,i);a=true}}else{r=e.sap.getObject(t)}if(r&&this.isValid(r)){return a?r.bind(i):r}throw new TypeError("The string '"+t+"' couldn't be resolved to a function")}})};t.getType=function(n){e.sap.assert(n&&typeof n==="string","sTypeName must be a non-empty string");var r=u[n];if(!(r instanceof t)){if(n.indexOf("[]",n.length-2)>0){var o=n.slice(0,-2),s=this.getType(o);r=s&&a(s);if(r){u[n]=r}}else if(n!=="array"){r=e.sap.getObject(n);if(r instanceof t){u[n]=r}else if(e.isPlainObject(r)){r=u[n]=i(n,r)}else{if(r){e.sap.log.warning("'"+n+"' is not a valid data type. Falling back to type 'any'.");r=u.any}else{e.sap.log.error("data type '"+n+"' could not be found.");r=undefined}}}}return r};t.createType=function(r,a,i){e.sap.assert(typeof r==="string"&&r,"DataType.createType: type name must be a non-empty string");e.sap.assert(i==null||i instanceof t||typeof i==="string"&&i,"DataType.createType: base type must be empty or a DataType or a non-empty string");if(/[\[\]]/.test(r)){e.sap.log.error("DataType.createType: array types ('something[]') must not be created with createType, "+"they're created on-the-fly by DataType.getType")}if(typeof i==="string"){i=t.getType(i)}i=i||u.any;if(i.isArrayType()||i.isEnumType()){e.sap.log.error("DataType.createType: base type must not be an array- or enum-type")}if(r==="array"||u[r]instanceof t){if(r==="array"||u[r].getBaseType()==null){throw new Error("DataType.createType: primitive or hidden type "+r+" can't be re-defined")}e.sap.log.warning("DataTypes.createType: type "+r+" is redefined. "+"This is an unsupported usage of DataType and might cause issues.")}var o=u[r]=n(r,a,i);return o};var o={};t.registerInterfaceTypes=function(t){for(var n=0;n<t.length;n++){e.sap.setObject(t[n],o[t[n]]=new String(t[n]))}};t.isInterfaceType=function(t){return o.hasOwnProperty(t)&&e.sap.getObject(t)===o[t]};return t},true);