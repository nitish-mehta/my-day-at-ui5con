/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","jquery.sap.sjax"],function(a,e){"use strict";var r={parse:function(e){if(a.type(e)!=="string"){throw new Error("simpleGherkinParser.parse: parameter 'sText' must be a valid string")}var r=e.split("\n").map(function(a){return a.replace(/^\s*#.*/,"").trim()});var t=null,n=null,s=null,i=[],u=[],p=[];for(var c=0;c<r.length;++c){var o=r[c];var l=!!o.match(/^(?:@[^ @]+)(?:\s+@[^ @]+)*$/);if(l){i=o.split(/\s+/);continue}var m=o.match(/^Feature:(.+)$/);if(m){u=i;t={tags:u,name:m[1].trim(),scenarios:[]};i=[];continue}var h=!!o.match(/^Background:/);if(h){n=t.background={name:"<background>",steps:[]};continue}var f=o.match(/^Scenario Outline:(.+)/);var d=o.match(/^Scenario:(.+)/)||f;if(d){p=u.concat(i);n={tags:p,name:d[1].trim(),steps:[]};if(f){n.examples=[]}t.scenarios.push(n);i=[];continue}var v=o.match(/^(Given|When|Then|And|But|\*)\s+(.+)$/);if(v){s={text:v[2].trim(),keyword:v[1].trim()};n.steps.push(s);continue}var g=o.match(/^Examples:(.+)?/);if(g){n.examples.push({tags:p.concat(i),name:g[1]?g[1].trim():"",data:[]});i=[];continue}var x=o.match(/^\|(.*)\|$/);if(x){var y=x[1].split("|").map(function(a){return a.trim()});if(y.length===1){y=y[0]}if(n.examples){n.examples[n.examples.length-1].data.push(y);continue}s.data=s.data||[];s.data.push(y)}}t.scenarios.forEach(function(e){e.steps.forEach(function(e){if(a.isArray(e.data)&&e.data.length===1&&a.type(e.data[0])==="array"){e.data=e.data[0]}})});return t},parseFile:function(e){if(a.type(e)!=="string"){throw new Error("simpleGherkinParser.parseFile: parameter 'sPath' must be a valid string")}e=a.sap.getModulePath(e,".feature");var r=a.sap.sjax({url:e,dataType:"text"});if(!r.success){throw new Error("simpleGherkinParser.parseFile: error loading URL: "+e)}return this.parse(r.data)}};return r},true);