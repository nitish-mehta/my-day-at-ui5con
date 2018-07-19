/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/ui/base/BindingParser","sap/ui/core/Element","sap/ui/model/BindingMode","sap/ui/model/CompositeBinding","sap/ui/model/json/JSONModel","sap/ui/model/base/ManagedObjectModel"],function(e,t,n,r,a,i,s,o){"use strict";var l={resolveEventHandler:function(t,r){var a;t=t.trim();if(sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){a=function(){}}else{var i=t.indexOf("("),l=t;if(i>0){l=t.substring(0,i).trim()}else if(i===0){throw new Error("Event handler name starts with a bracket, must start with a function name "+"(or with a dot followed by controller-local function name): "+t)}switch(l.indexOf(".")){case 0:a=r&&e.sap.getObject(l.slice(1),undefined,r);break;case-1:a=r&&r[l];if(a!=null){break}default:a=e.sap.getObject(l)}if(a&&i>0){var p=t.lastIndexOf(")");if(p>i){if(t.substring(i).indexOf("{=")>-1){e.sap.log.warning("It looks like an event handler parameter contains a binding expression ({=...}). This is not allowed and will cause an error later on "+"because the entire event handler is already considered an expression: "+t)}a=function(e,r){return function(a){var i,l,p=t;if(t.indexOf("$parameters")>-1){i=new s(a.mParameters)}if(t.indexOf("$source")>-1){l=new o(a.getSource())}var f={$controller:r,$event:a};if(e.indexOf(".")>0){var u=e.split(".")[0];f[u]=window[u]}else if(e.indexOf(".")===-1){if(r&&r[e]){p="$controller."+p}else if(window[e]){f[e]=window[e]}}var c=n.parseExpression(p.replace(/^\./,"$controller."),0,{oContext:r},f);if(c.result){try{d(c.result,a.getSource(),r,i,l)}catch(e){e.message="Error when evaluating event handler '"+t+"': "+e.message;throw e}}if(i){i.destroy()}if(l){l.destroy()}}}(l,r)}else{e.sap.log.error("Syntax error in event handler '"+t+"': arguments must be enclosed in a pair of brackets")}}}if(typeof a==="function"){a._sapui_handlerName=t;return[a,r]}e.sap.log.warning("Event handler name '"+t+"' could not be resolved to an event handler function")}};function d(t,n,r,s,o){var l;t.mode=a.OneWay;if(!t.parts){t.parts=[];t.parts[0]={path:t.path,targetType:t.targetType,type:t.type,suspended:t.suspended,formatOptions:t.formatOptions,constraints:t.constraints,model:t.model,mode:t.mode};delete t.path;delete t.targetType;delete t.mode;delete t.model}for(var d=0;d<t.parts.length;d++){var p=t.parts[d];if(typeof p=="string"){p={path:p};t.parts[d]=p}if(!p.path&&p.parts){throw new Error("Bindings in event handler parameters cannot use parts. Just use one single path.")}var f=p.path.indexOf(">");if(f>0){p.model=p.path.substr(0,f);p.path=p.path.substr(f+1)}}var u,c,g=[];t.parts.forEach(function(r){var i;if(r.model==="$parameters"){i=s;u=s.createBindingContext("/")}else if(r.model==="$source"){i=o;u=o.createBindingContext("/")}else{i=n.getModel(r.model);u=n.getBindingContext(r.model)}l=r.type;if(typeof l=="string"){m=e.sap.getObject(l);if(typeof m!=="function"){throw new Error('Cannot find type "'+l+'" used for binding "'+r.path+'"!')}l=new m(r.formatOptions,r.constraints)}c=i.bindProperty(r.path,u,t.parameters);c.setType(l,r.targetType||"any");c.setFormatter(r.formatter);c.setBindingMode(a.OneTime);g.push(c)});if(g.length>1||t.formatter&&t.formatter.textFragments){l=t.type;if(typeof l=="string"){var m=e.sap.getObject(l);l=new m(t.formatOptions,t.constraints)}c=new i(g,t.useRawValues,t.useInternalValues);c.setType(l,p.targetType||"any");c.setBindingMode(a.OneTime)}else{c=g[0]}c.setFormatter(t.formatter);c.initialize();return c.getExternalValue()}return l});