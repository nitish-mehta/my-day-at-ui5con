/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";var t=function(e){this._errorPrefix=e.errorPrefix};var r={validationInfo:{type:"object",mandatory:true},inputToValidate:{type:"object",mandatory:true},allowUnknownProperties:"bool"};function n(e){if(typeof e==="string"){return{type:e,mandatory:false}}return e}t.prototype={validate:function(e){this._validate({inputToValidate:e,validationInfo:r});this._validate(e)},_validate:function(e){var t=this._getErrors(e);if(t.length===1){throw new Error(this._errorPrefix+" - "+t[0])}if(t.length){t.unshift("Multiple errors where thrown "+this._errorPrefix);throw new Error(t.join("\n"))}},_getErrors:function(e,r,a){var i=e.validationInfo,o=e.inputToValidate,u=e.allowUnknownProperties;if(!r){r=[]}if(!a){a=""}Object.keys(o).forEach(function(e){var t=n(i[e]);if(!u&&!t){r.push("the property '"+a+e+"' is not defined in the API")}});Object.keys(i).forEach(function(e){var s=o[e],f=n(i[e]);if((!f.hasOwnProperty("type")||!f.hasOwnProperty("mandatory"))&&s){a+=e+".";r.concat(this._getErrors({validationInfo:f,inputToValidate:s,allowUnknownProperties:u},r,a));return}var p=a+e;if(f.mandatory&&(s===undefined||s===null)){r.push("No '"+p+"' given but it is a mandatory parameter")}if(s===undefined||s===null){return}var d=t.types[f.type];var l=d(s,p);if(l){r.push(l)}}.bind(this));return r}};t.types={func:function(t,r){if(e.isFunction(t)){return""}return"the '"+r+"' parameter needs to be a function but '"+t+"' was passed"},array:function(t,r){if(e.isArray(t)){return""}return"the '"+r+"' parameter needs to be an array but '"+t+"' was passed"},object:function(t,r){if(e.isPlainObject(t)){return""}return"the '"+r+"' parameter needs to be an object but '"+t+"' was passed"},string:function(t,r){if(e.type(t)==="string"){return""}return"the '"+r+"' parameter needs to be a string but '"+t+"' was passed"},bool:function(t,r){if(e.type(t)==="boolean"){return""}return"the '"+r+"' parameter needs to be a boolean value but '"+t+"' was passed"},numeric:function(t,r){if(e.isNumeric(t)){return""}return"the '"+r+"' parameter needs to be numeric but '"+t+"' was passed"},any:e.noop};return t},true);