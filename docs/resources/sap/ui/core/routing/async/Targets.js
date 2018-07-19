/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";return{display:function(e,r,t){var i=Promise.resolve();return this._display(e,r,t,i)},_display:function(e,r,t,i){var n=this,a=[];if(!Array.isArray(e)){e=[e]}this._attachTitleChanged(e,t);return e.reduce(function(e,t){return n._displaySingleTarget(t,r,e).then(function(e){a.push(e)})},i).then(function(){return a})},_displaySingleTarget:function(r,t,i){var n=this.getTarget(r);if(n!==undefined){return n._display(t,i)}else{var a='The target with the name "'+r+'" does not exist!';e.sap.log.error(a,this);return Promise.resolve({name:r,error:a})}}}});