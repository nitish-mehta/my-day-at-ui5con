/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./ExpressionParser","sap/ui/model/BindingMode","sap/ui/model/Filter","sap/ui/model/Sorter","jquery.sap.script"],function(t,e,n,r,i){"use strict";var o={_keepBindingStrings:false};var s=/^\{\s*[a-zA-Z$_][a-zA-Z0-9$_]*\s*:/;var a=/(\\[\\\{\}])|(\{)/g;var f=/([\\\{\}])/g;function u(t,e){function n(){var n,r=t.length,i=new Array(r);for(n=0;n<r;n+=1){i[n]=t[n].apply(this,arguments)}if(e){return e.apply(this,i)}return r>1?i.join(" "):i[0]}n.textFragments=e&&e.textFragments||"sap.ui.base.BindingParser: composeFormatters";return n}function p(t){var e=function(){var e=[],n=t.length,r;for(r=0;r<n;r++){if(typeof t[r]==="number"){e.push(arguments[t[r]])}else{e.push(t[r])}}return e.join("")};e.textFragments=t;return e}function c(t){var e=t.indexOf(">"),n={path:t};if(e>0){n.model=t.slice(0,e);n.path=t.slice(e+1)}return n}function l(e,n){try{o.mergeParts(e)}catch(e){t.sap.log.error("Cannot merge parts: "+e.message,n,"sap.ui.base.BindingParser")}}function d(e,n){function o(n,r){if(typeof n[r]==="string"){var i,o=n[r];if(n[r][0]==="."){i=t.sap.getObject(n[r].slice(1),undefined,e.oContext);n[r]=e.bStaticContext?i:i&&i.bind(e.oContext)}else{n[r]=t.sap.getObject(n[r])}if(typeof n[r]!=="function"){if(e.bTolerateFunctionsNotFound){e.aFunctionsNotFound=e.aFunctionsNotFound||[];e.aFunctionsNotFound.push(o)}else{t.sap.log.error(r+" function "+o+" not found!")}}}}function s(n){var r;if(typeof n.type==="string"){if(n.type[0]==="."){r=t.sap.getObject(n.type.slice(1),undefined,e.oContext)}else{r=t.sap.getObject(n.type)}if(typeof r==="function"){n.type=new r(n.formatOptions,n.constraints)}else{n.type=r}delete n.formatOptions;delete n.constraints}}function a(t){if(t!=null&&typeof t==="object"){for(var e in t){o(t,e)}}}function f(t,e){var n=t[e];if(Array.isArray(n)){n.forEach(function(t,e){f(n,e)});return}if(n&&typeof n==="object"){o(n,"test");f(n,"filters");f(n,"condition");t[e]=new r(n)}}function u(t,e){var n=t[e];if(Array.isArray(n)){n.forEach(function(t,e){u(n,e)});return}if(n&&typeof n==="object"){o(n,"group");o(n,"comparator");t[e]=new i(n)}}if(typeof n==="object"){if(Array.isArray(n.parts)){n.parts.forEach(function(t){d(e,t)})}s(n);f(n,"filters");u(n,"sorter");a(n.events);o(n,"formatter");o(n,"factory");o(n,"groupHeaderFactory")}return n}function g(e,n,r){var i=t.sap.parseJS,o,a;if(s.test(n.slice(r))){o=i(n,r);d(e,o.result);return o}a=n.indexOf("}",r);if(a<r){throw new SyntaxError("no closing braces found in '"+n+"' after pos:"+r)}return{result:c(n.slice(r+1,a)),at:a+1}}o.simpleParser=function(e,n){if(t.sap.startsWith(e,"{")&&t.sap.endsWith(e,"}")){return c(e.slice(1,-1))}};o.simpleParser.escape=function(t){return t};o.complexParser=function(t,r,i,s,f){var u=false,c={parts:[]},d=false,h={oContext:r,aFunctionsNotFound:undefined,bStaticContext:f,bTolerateFunctionsNotFound:s},y=[],x,m=0,b,F;function v(n,r,i){var o=e.parse(g.bind(null,h),t,r);function s(t,e){if(t.parts){t.parts.forEach(function(e,n){if(typeof e==="string"){e=t.parts[n]={path:e}}s(e,n)});u=u||e!==undefined}else{t.mode=i}}if(n.charAt(o.at)!=="}"){throw new SyntaxError("Expected '}' and instead saw '"+n.charAt(o.at)+"' in expression binding "+n+" at position "+o.at)}o.at+=1;if(o.result){s(o.result)}else{y[y.length-1]=String(o.constant);x=true}return o}a.lastIndex=0;while((b=a.exec(t))!==null){if(m<b.index){y.push(t.slice(m,b.index))}if(b[1]){y.push(b[1].slice(1));x=true}else{y.push(c.parts.length);if(t.indexOf(":=",b.index)===b.index+1){F=v(t,b.index+3,n.OneTime)}else if(t.charAt(b.index+1)==="="){F=v(t,b.index+2,n.OneWay)}else{F=g(h,t,b.index)}if(F.result){c.parts.push(F.result);d=d||"parts"in F.result}a.lastIndex=F.at}m=a.lastIndex}if(m<t.length){y.push(t.slice(m))}if(c.parts.length>0){if(y.length===1){c=c.parts[0];d=u}else{c.formatter=p(y)}if(d){l(c,t)}if(o._keepBindingStrings){c.bindingString=t}if(h.aFunctionsNotFound){c.functionsNotFound=h.aFunctionsNotFound}return c}else if(i&&x){return y.join("")}};o.complexParser.escape=function(t){return t.replace(f,"\\$1")};o.mergeParts=function(t){var e=[],n=[];t.parts.forEach(function(t){var r,i=function(){return t},o,s=n.length;function a(){return arguments[s]}if(t&&typeof t==="object"){if(t.parts){for(o in t){if(o!=="formatter"&&o!=="parts"){throw new Error("Unsupported property: "+o)}}n=n.concat(t.parts);r=n.length;if(t.formatter){i=function(){return t.formatter.apply(this,Array.prototype.slice.call(arguments,s,r))}}else if(r-s>1){i=function(){return Array.prototype.slice.call(arguments,s,r).join(" ")}}else{i=a}}else if(t.path){n.push(t);i=a}}e.push(i)});t.parts=n;t.formatter=u(e,t.formatter)};o.parseExpression=function(t,n,r,i){return e.parse(g.bind(null,r||{}),t,n,i)};return o},true);