/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/base/ManagedObject","sap/ui/base/EventProvider","jquery.sap.script"],function(e,n,t,r){"use strict";var i=n.extend("sap.ui.base.ManagedObjectObserver",{constructor:function(e){if(!e&&typeof e!=="function"){throw new Error("Missing callback function in ManagedObjectObserver constructor")}this._fnCallback=e}});i.prototype.observe=function(e,n){if(!(e instanceof t)){if(e==null){return}throw new TypeError("ManagedObjectObserver can only handle ManagedObjects, but observe was called for "+e)}m(e,n);f(e,this,n)};i.prototype.unobserve=function(e,n){if(!(e instanceof t)){if(e==null){return}throw new TypeError("ManagedObjectObserver can only handle ManagedObjects, but unobserve was called for "+e)}if(n){m(e,n)}g(e,this,n)};i.prototype.isObserved=function(e,n){if(!(e instanceof t)){if(e==null){return false}throw new TypeError("ManagedObjectObserver can only handle ManagedObjects, but isObserved was called for "+e)}return l(e,this,n)};i.prototype.disconnect=function(){d(this)};i.prototype.getConfiguration=function(e){return c(e,this)};var s={},a=Object.create(null);s.propertyChange=function(e,n,t,r){o("properties",e,n,function(){return{type:"property",old:t,current:r}})};s.aggregationChange=function(e,n,t,r){o("aggregations",e,n,function(){return{type:"aggregation",mutation:t,children:Array.isArray(r)?r:null,child:!Array.isArray(r)?r:null}})};s.associationChange=function(e,n,t,r){o("associations",e,n,function(){return{type:"association",mutation:t,ids:r}})};s.eventChange=function(e,n,t,r,i,s){o("events",e,n,function(){return{type:"event",mutation:t,listener:r,func:i,data:s}})};s.bindingChange=function(e,n,t,r,i){o("bindings",e,n,function(){return{type:"binding",mutation:t,bindingInfo:r,memberType:i}})};s.objectDestroyed=function(e){o("destroy",e,null,function(){return{type:"destroy"}});var n=e.getId();if(a[n]){e.detachEvent("EventHandlerChange",b);delete a[n]}delete e._observer};function o(e,n,t,r){var i=n.getId(),s=a[i];if(s){var o;for(var f=0;f<s.listeners.length;f++){if(u(s.configurations[f],e,t)){if(!o){o=r();o.name=t;o.object=n}var c=s.listeners[f];c._fnCallback(o)}}}}function u(e,n,t){if(e==null||!n){return false}if(n!="destroy"&&!t){return false}return e[n]===true||Array.isArray(e[n])&&e[n].indexOf(t)>-1}function f(e,n,t){v(e,n,t,false)}function c(n,t){var r=n.getId();var i=a[r];if(i&&i.listeners){var s=i.listeners.indexOf(t);if(s>=0){var o=e.extend(true,{},i.configurations[s]);return o}}return null}function g(e,n,t){t=t||c(e,n);v(e,n,t,true)}function l(e,n,t){var r=e.getId(),i=a[r];t=t||c(e,n);if(!i){return false}var s=i.listeners.indexOf(n);if(s===-1){return false}else{return h(i.configurations[s].properties,t.properties)&&h(i.configurations[s].aggregations,t.aggregations)&&h(i.configurations[s].associations,t.associations)&&h(i.configurations[s].bindings,t.bindings)&&h(i.configurations[s].events,t.events)&&O(i.configurations[s].destroy,t.destroy)}}function d(e){for(var n in a){var t=a[n];for(var r=0;r<t.listeners.length;r++){if(t.listeners[r]===e){t.listeners.splice(r,1);t.configurations.splice(r,1)}}if(t.listeners&&t.listeners.length===0){delete a[n];t.object._observer=undefined}}}function v(e,n,t,i){var o=e.getId(),u=a[o],f,c;if(i){if(!u){return}c=u.listeners.indexOf(n);if(c>=0){f=u.configurations[c]}}else{if(!u){u=a[o]={listeners:[],configurations:[],object:e}}c=u.listeners.indexOf(n);if(c===-1){u.listeners.push(n);u.configurations.push(t)}else{f=u.configurations[c]}}if(f){f.properties=f.properties||[];y(f.properties,t.properties,i);f.aggregations=f.aggregations||[];y(f.aggregations,t.aggregations,i);f.associations=f.associations||[];y(f.associations,t.associations,i);f.bindings=f.bindings||[];y(f.bindings,t.bindings,i);f.events=f.events||[];y(f.events,t.events,i);if(t.destroy!=null){if(i){delete f.destroy}else{f.destroy=t.destroy}}}var g=p(e,"events");if(e._observer&&i){if(!g&&r.hasListener(e,"EventHandlerChange",b)){e.detachEvent("EventHandlerChange",b)}if(!g&&!p(e,"properties")&&!p(e,"aggregations")&&!p(e,"associations")&&!p(e,"destroy")&&!p(e,"bindings")){delete e._observer;delete a[o]}}else if(!e._observer&&!i){if(g&&!r.hasListener(e,"EventHandlerChange",b)){e.attachEvent("EventHandlerChange",b)}e._observer=s}}function p(e,n){var t=e.getId(),r=a[t];if(r){var i=r.configurations.filter(function(e){return e.hasOwnProperty(n)&&e[n]&&(e[n]===true||e[n].length>0)});return i.length>0}return false}function b(e){var n=e.getSource(),t=e.mParameters.EventId;if(n.getMetadata().hasEvent(t)){if(e.mParameters.type==="listenerAttached"){s.eventChange(n,t,"insert",e.mParameters.listener,e.mParameters.func,e.mParameters.data)}else if(e.mParameters.type==="listenerDetached"){s.eventChange(n,t,"remove",e.mParameters.listener,e.mParameters.func,e.mParameters.data)}}}function y(e,n,t){if(!n){return}for(var r=0;r<n.length;r++){var i=e.indexOf(n[r]);if(i>-1&&t){e.splice(i,1)}else if(i===-1&&!t){e.push(n[r])}}}function h(n,t){if(!Array.isArray(t)||t.length==0){return true}if(!Array.isArray(n)||n.length==0){return false}var r=e.sap.unique(n.concat(t));return n.length===r.length}function O(e,n){if(n==null){return true}return e===n}function m(n,t){var r=n.getMetadata(),i=Object.keys(r.getAllProperties()),s=Object.keys(r.getAllAggregations()),a=Object.keys(r.getAllAssociations()),o=e.sap.unique(i.concat(s)),u=Object.keys(r.getAllEvents());t.properties=t.properties===true?i:t.properties;t.aggregations=t.aggregations===true?s:t.aggregations;t.associations=t.associations===true?a:t.associations;t.bindings=t.bindings===true?o:t.bindings;t.events=t.events===true?u:t.events;t.destroy=t.destroy==null?false:t.destroy}return i});