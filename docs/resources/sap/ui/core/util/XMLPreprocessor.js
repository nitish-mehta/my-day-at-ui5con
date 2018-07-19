/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/core/XMLTemplateProcessor","sap/ui/model/BindingMode","sap/ui/model/CompositeBinding","sap/ui/model/Context"],function(e,t,n,i,r,o,a){"use strict";var s={},u="http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1",f="sap.ui.core.util.XMLPreprocessor",l=[f],d=f+"/insertFragment",c=f+"/getResolvedBinding",g=f+".process",p=Object.prototype.toString,m={},v=n.extend("sap.ui.core.util._with",{metadata:{properties:{any:"any"},aggregations:{child:{multiple:false,type:"sap.ui.core.util._with"}}}}),h=v.extend("sap.ui.core.util._repeat",{metadata:{aggregations:{list:{multiple:true,type:"n/a",_doesNotRequireFactory:true}}},updateList:function(){}});function b(e,t,n,i){function r(t){if(!i){i=e.getBinding("any");if(i instanceof o){i=i.getBindings();if(n!==undefined){i=i[n]}}}return Array.isArray(i)?i[t]:i}function s(e){return e instanceof a?e.getPath():e.getModel().resolve(e.getPath(),e.getContext())}return{getInterface:function(e,n){var o,s,u;if(typeof e==="string"){n=e;e=undefined}r();if(Array.isArray(i)){if(e>=0&&e<i.length){s=i[e]}else{throw new Error("Invalid index of part: "+e)}}else if(e!==undefined){throw new Error("Not the root formatter of a composite binding")}else if(n){s=i}else{throw new Error("Missing path")}if(n){u=s.getModel();if(n.charAt(0)!=="/"){o=s instanceof a?s:u.createBindingContext(s.getPath(),s.getContext())}s=u.createBindingContext(n,o);if(!s){throw new Error("Model could not create binding context synchronously: "+u)}}return b(null,t,undefined,s)},getModel:function(e){var t=r(e);return t&&t.getModel()},getPath:function(e){var t=r(e);return t&&s(t)},getSetting:function(e){if(e==="bindingContexts"||e==="models"){throw new Error("Illegal argument: "+e)}return t[e]}}}function x(e,t,n,i){function o(t,o){var a=t.formatter;t.mode=r.OneTime;if(a&&a.requiresIContext===true){t.formatter=a.bind(null,b(e,n,o))}t.parameters=t.parameters||{};t.parameters.scope=i}try{o(t);if(t.parts){t.parts.forEach(o)}e.bindProperty("any",t);return e.getBinding("any")?e.getAny():s}finally{e.unbindProperty("any",true)}}function y(e,t){return e.namespaceURI===u&&e.localName===t}function w(t){var n=t.getAttribute("template:require");if(n){e.sap.require.apply(e.sap,n.split(" "))}}function C(e){var t,n=e.attributes,i="<"+e.nodeName,r,o;for(r=0,o=n.length;r<o;r+=1){t=n.item(r);i+=" "+t.name+'="'+t.value+'"'}return i+(e.childNodes.length?">":"/>")}function N(e,t){t.visitNode(e)}return{plugIn:function(t,n,i){var r=m[n];if(t!==null&&typeof t!=="function"||t===N){throw new Error("Invalid visitor: "+t)}if(!n||n===u||n==="sap.ui.core"||n.indexOf(" ")>=0){throw new Error("Invalid namespace: "+n)}e.sap.log.debug("Plug-in visitor for namespace '"+n+"', local name '"+i+"'",t,f);if(i){n=n+" "+i;r=m[n]||r}m[n]=t;return r||N},visitNodeWrapper:N,process:function(n,o,b){var N=o.caller,A=e.sap.log.isLoggable(e.sap.log.Level.DEBUG,f),M=A,B=o.name,E={},I,F=0,P={},j=o._supportInfo,O=e.sap.log.isLoggable(e.sap.log.Level.WARNING,f);function R(n){return{getContext:function(e){var i,r,o;e=e||"";if(e[0]==="{"){throw new Error("Must be a simple path, not a binding: "+e)}i=t.simpleParser("{"+e+"}");r=n.getModel(i.model);if(!r){throw new Error("Unknown model '"+i.model+"': "+e)}o=r.resolve(i.path,n.getBindingContext(i.model));if(!o){throw new Error("Cannot resolve path: "+e)}return r.createBindingContext(o)},getResult:function(e,t){var i=$(e,t,n,true);if(i===s){throw new Error("Binding not ready: "+e)}return i},getSettings:function(){return b},getViewInfo:function(){return e.extend(true,{},o)},insertFragment:function(e,t){_(e,t,n)},visitAttribute:function(e,t){Q(e,t,n)},visitAttributes:function(e){Y(e,n)},visitChildNodes:function(e){Z(e,n)},visitNode:function(e){ee(e,n)},with:function(e,t){var i,r=false,o,a=new v;if(!t){n.setChild(a)}for(o in e){i=e[o];r=true;a.setModel(i.getModel(),o);a.bindObject({model:o,path:i.getPath()})}return r||t?R(a):this}}}function U(t){if(A){e.sap.log.debug(T()+Array.prototype.slice.call(arguments,1).join(" "),t&&C(t),f)}}function L(t){if(A){e.sap.log.debug(T()+"Finished","</"+t.nodeName+">",f)}}function S(t,n){t=t+C(n);e.sap.log.error(t,N,f);throw new Error(N+": "+t)}function q(e){var t=e.childNodes,n,i=[],r,o,a=false;for(r=0,o=t.length;r<o;r+=1){n=t.item(r);if(n.nodeType===1){i.push(n)}}if(!i.length||!y(i[0],"then")){return null}for(r=1,o=i.length;r<o;r+=1){n=i[r];if(a){S("Expected </"+e.prefix+":if>, but instead saw ",n)}if(y(n,"else")){a=true}else if(!y(n,"elseif")){S("Expected <"+e.prefix+":elseif> or <"+e.prefix+":else>, but instead saw ",i[r])}}return i}function T(){return(F<10?"[ ":"[")+F+"] "}function k(t){return t&&t.charAt(0)==="."?e.sap.getObject(t.slice(1),undefined,P):e.sap.getObject(t)}function $(n,i,r,o,a){var u;e.sap.measure.average(c,"",l);u=t.complexParser(n,P,o,true,true)||n;if(u.functionsNotFound){if(o){te(i,"Function name(s)",u.functionsNotFound.join(", "),"not found")}e.sap.measure.end(c);return s}if(typeof u==="object"){u=x(r,u,b,P);if(o&&u===s){te(i,"Binding not ready")}}else if(a){a()}e.sap.measure.end(c);return u}function _(t,n,r){var o,a=B;r.$mFragmentContexts=r.$mFragmentContexts||{};if(r.$mFragmentContexts[t]){S("Cyclic reference to fragment '"+t+"' ",n)}F++;U(n,"fragmentName =",t);r.$mFragmentContexts[t]=true;B=t;e.sap.measure.average(d,"",l);o=E[t];if(!o){o=i.loadTemplate(t,"fragment");E[t]=o}o=n.ownerDocument.importNode(o,true);e.sap.measure.end(d);w(o);if(o.namespaceURI==="sap.ui.core"&&o.localName==="FragmentDefinition"){X(o,r,n)}else{n.parentNode.insertBefore(o,n);ee(o,r)}n.parentNode.removeChild(n);B=a;r.$mFragmentContexts[t]=false;L(n);F--}function X(e,t,n){var i;n=n||e;Z(e,t);while(i=e.firstChild){n.parentNode.insertBefore(i,n)}}function D(e,t){var n=te.bind(null,e,"Constant test condition"),i,r=e.getAttribute("test"),o;try{o=$(r,e,t,true,n);if(o===s){o=false}}catch(t){te(e,"Error in formatter:",t);o=undefined}i=!!o&&o!=="false";if(A){if(typeof o==="string"){o=JSON.stringify(o)}else if(o===undefined){o="undefined"}else if(Array.isArray(o)){o="[object Array]"}U(e,"test ==",o,"--\x3e",i)}return i}function W(e,t,n){var i=t.value,r;try{r=$(i,e,n,false);if(r===s){U(e,"Binding not ready for attribute",t.name)}else if(r===undefined){U(e,"Removed attribute",t.name);e.removeAttribute(t.name)}else if(r!==t.value){switch(typeof r){case"boolean":case"number":case"string":U(e,t.name,"=",r);t.value=r;break;default:U(e,"Ignoring",p.call(r),"value for attribute",t.name)}}}catch(n){U(e,"Error in formatter of attribute",t.name,n)}}function G(e,t){var n=e.getAttribute("name"),i,r,o=e.getAttribute("value");if(!n||n.length<=1||n.lastIndexOf(".")!==0){S("Missing proper relative name in ",e)}n=n.slice(1);i=k(o);if(!i){S("Invalid value in ",e)}r=P[n];P[n]=i;X(e,t);e.parentNode.removeChild(e);P[n]=r}function V(e,t){var n=e.getAttribute("name"),i=s,r;try{i=$(n,e,t,true);if(i!==s&&i!==n){U(e,"name =",i)}}catch(t){te(e,"Error in formatter:",t)}var a=sap.ui.require("sap/ui/core/CustomizingConfiguration");if(i!==s&&a){r=a.getViewExtension(B,i,o.componentId);if(r&&r.className==="sap.ui.core.Fragment"&&r.type==="XML"){_(r.fragmentName,e,t);return true}}return false}function z(e,t){var n=e.getAttribute("fragmentName"),i;try{i=$(n,e,t,true)}catch(t){te(e,"Error in formatter:",t);return}if(i!==s){_(i,e,t)}}function J(e,t){var n=q(e),i,r;F++;if(n){r=e;i=n.shift();do{if(D(r,t)){break}r=i=n.shift()}while(r&&r.localName==="elseif")}else if(D(e,t)){i=e}if(i){X(i,t,e)}e.parentNode.removeChild(e);L(e);F--}function H(e,n){var i=e.getAttribute("list")||"",o=t.complexParser(i,P,false,true,true),a,s,u,f,l=e.getAttribute("var");if(l===""){S("Missing variable name for ",e)}if(!o){S("Missing binding for ",e)}if(o.functionsNotFound){te(e,"Function name(s)",o.functionsNotFound.join(", "),"not found")}f=new h;n.setChild(f);o.mode=r.OneTime;f.bindAggregation("list",o);s=f.getBinding("list");f.unbindAggregation("list",true);u=o.model;if(!s){S("Missing model '"+u+"' in ",e)}a=s.getContexts(o.startIndex,o.length);l=l||u;f.setModel(s.getModel(),l);F++;U(e,"Starting");a.forEach(function(t,n){var i=n===a.length-1?e:e.cloneNode(true);f.setBindingContext(t,l);U(e,l,"=",t.getPath());X(i,f,e)});L(e);F--;e.parentNode.removeChild(e)}function K(e,n){var i,r,o,s,u=e.getAttribute("helper"),f,l=e.getAttribute("path"),d,c=e.getAttribute("var");if(c===""){S("Missing variable name for ",e)}o=new v;n.setChild(o);i=t.simpleParser("{"+l+"}");c=c||i.model;if(u||c){r=n.getModel(i.model);if(!r){S("Missing model '"+i.model+"' in ",e)}d=r.resolve(i.path,n.getBindingContext(i.model));if(!d){S("Cannot resolve path for ",e)}f=r.createBindingContext(d);if(u){s=k(u);if(typeof s!=="function"){S("Cannot resolve helper for ",e)}f=s(f)}if(f instanceof a){r=f.getModel();d=f.getPath()}else if(f!==undefined){if(typeof f!=="string"||f===""){S("Illegal helper result '"+f+"' in ",e)}d=f}o.setModel(r,c);o.bindObject({model:c,path:d})}else{o.bindObject(l)}F++;U(e,c,"=",d);if(o.getBindingContext(c)===n.getBindingContext(c)){te(e,"Set unchanged path:",d);o=n}X(e,o);e.parentNode.removeChild(e);L(e);F--}function Q(e,t,n){if(j){j({context:undefined,env:{caller:"visitAttribute",before:{name:t.name,value:t.value}}})}W(e,t,n);if(j){j({context:undefined,env:{caller:"visitAttribute",after:{name:t.name,value:t.value}}})}}function Y(e,t){var n,i=e.attributes;for(n=i.length-1;n>=0;n-=1){Q(e,i.item(n),t)}}function Z(e,t){var n,i=e.childNodes,r=i.length,o=new Array(r);for(n=0;n<r;n+=1){o[n]=i.item(n)}i=null;for(n=0;n<r;n+=1){ee(o[n],t)}}function ee(e,t){var n,i;if(e.nodeType!==1){return}if(j){j({context:e,env:{caller:"visitNode",before:{name:e.tagName}}})}if(e.namespaceURI===u){switch(e.localName){case"alias":G(e,t);return;case"if":J(e,t);return;case"repeat":H(e,t);return;case"with":K(e,t);return;default:S("Unexpected tag ",e)}}else if(e.namespaceURI==="sap.ui.core"){switch(e.localName){case"ExtensionPoint":if(V(e,t)){return}break;case"Fragment":if(e.getAttribute("type")==="XML"){z(e,t);return}break}}else{n=m[e.namespaceURI+" "+e.localName]||m[e.namespaceURI];if(n){F++;U(e,"Calling visitor");i=n(e,R(t));if(i!==undefined){S("Unexpected return value from visitor for ",e)}L(e);F--;return}}Y(e,t);Z(e,t);if(j){j({context:e,env:{caller:"visitNode",after:{name:e.tagName}}})}}function te(t){if(O){if(!M){M=true;e.sap.log.warning("Warning(s) during processing of "+N,null,f)}e.sap.log.warning(T()+Array.prototype.slice.call(arguments,1).join(" "),t&&C(t),f)}}e.sap.measure.average(g,"",l);b=b||{};if(A){U(undefined,"Start processing",N);if(b.bindingContexts instanceof a){U(undefined,"undefined =",b.bindingContexts)}else{for(I in b.bindingContexts){U(undefined,I,"=",b.bindingContexts[I])}}}if(j){j({context:n,env:{caller:"view",viewinfo:e.extend(true,{},o),settings:e.extend(true,{},b),clone:n.cloneNode(true),type:"template"}})}w(n);ee(n,new v({models:b.models,bindingContexts:b.bindingContexts}));U(undefined,"Finished processing",N);e.sap.measure.end(g);return n}}},true);