/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return function(){(function(){var t=false,n=false;var e=Promise.prototype.then,r=Promise.prototype.catch,i=window.setTimeout,o=window.setInterval,u=[];function a(t){if(!n){n=true;i(function(){var t=u;u=[];n=false;t.forEach(function(t){t()})},0)}u.push(t)}function c(e,r,i){if(typeof e!=="function"){return e}return function(){var r=Array.prototype.slice.call(arguments);if(t||n){return new Promise(function(t,n){a(function(){var i;try{i=e.apply(window,r);t(i)}catch(t){n(t)}})})}return e.apply(window,r)}}Promise.prototype.then=function(t,n){var r=c(t),i=c(n);return e.call(this,r,i)};Promise.prototype.catch=function(t){var n=c(t);return r.call(this,n)};function f(t){var e=function(){var r;if(n){r=[e,0].concat(arguments);i.apply(window,r)}else{t.apply(window,arguments)}};return e}window.setTimeout=function(t){var n=Array.prototype.slice.call(arguments),e=typeof t==="string"?new Function(t):t,r=f(e);n[0]=r;return i.apply(window,n)};window.setInterval=function(t){var n=Array.prototype.slice.call(arguments),e=typeof t==="string"?new Function(t):t,r=f(e,true);n[0]=r;return o.apply(window,n)};window.XMLHttpRequest=new Proxy(window.XMLHttpRequest,{construct:function(n,e,r){var o=new n,u=false,a=false,c=0,f;function p(n){var e=function(r){var p=o.readyState;function s(){c=p;if(e.active){return n.call(f,r)}}if(!u&&t){a=true}if(a){i(s,0);return true}return s()};n.wrappedHandler=e;e.active=true;return e}function s(t){return l(t.wrappedHandler)}function l(t){if(typeof t==="function"){t.active=false}return t}f=new Proxy(o,{get:function(n,e,r){var i=n[e];switch(e){case"readyState":return c;case"addEventListener":return function(t,e,r){i.call(n,t,p(e),r)};case"removeEventListener":return function(t,e,r){i.call(n,t,s(e),r)};case"open":return function(t,e,r){u=r===false;i.apply(n,arguments);c=n.readyState};case"send":return function(){t=u;i.apply(n,arguments);c=n.readyState;t=false}}if(typeof i==="function"){return function(){return i.apply(n,arguments)}}return i},set:function(t,n,e){if(n.indexOf("on")===0){l(t[n]);if(typeof e==="function"){t[n]=p(e);return true}}t[n]=e;return true}});f.addEventListener("readystatechange",function(){});return f}})})()}});