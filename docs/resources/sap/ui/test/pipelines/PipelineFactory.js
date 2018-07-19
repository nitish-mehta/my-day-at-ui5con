/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object"],function(n,e){"use strict";var t=n;return e.extend("sap.ui.test.pipelines.PipelineFactory",{constructor:function(n){this._oOptions=n},create:function(e){var i=[];if(t.isArray(e)){i=e}else if(e){i=[e]}else{n.sap.log.error(this._oOptions.name+" were defined, but they were neither an array nor a single element: "+e)}i=i.map(function(e){var t;if(e[this._oOptions.functionName]){return e}else if(typeof e=="function"){t={};t[this._oOptions.functionName]=e;return t}n.sap.log.error("A "+this._oOptions.name+" was defined, but it is no function and has no '"+this._oOptions.functionName+"' function: "+e)}.bind(this)).filter(function(n){return!!n});return i}})});