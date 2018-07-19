/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/Device","./_LogCollector","./_OpaLogger","./_ParameterValidator","sap/ui/thirdparty/URI","sap/ui/test/_UsageReport"],function(e,t,r,n,i,a,o){"use strict";var u=n.getLogger("sap.ui.test.Opa"),s=r.getInstance(),c=[],l={},f=-1,g,p,d,m,v=new i({errorPrefix:"sap.ui.test.Opa#waitFor"});function h(e,t){if(window["sap-ui-debug"]){t.timeout=t.debugTimeout}var r=new Date;n();function n(){u.timestamp("opa.check");s.getAndClearLog();var i=e();m=t._stack;if(i.error){p.reject(t);return}if(i.result){_();return}var a=(new Date-r)/1e3;if(t.timeout===0||t.timeout>a){f=setTimeout(n,t.pollingInterval);return}y("Opa timeout after "+t.timeout+" seconds",t);if(t.error){try{t.error(t,i.arguments)}finally{p.reject(t)}}else{p.reject(t)}}}function _(){if(!c.length){if(p){p.resolve()}return true}var e=c.shift();f=setTimeout(function(){h(e.callback,e.options)},(x.config.asyncPolling?e.options.pollingInterval:0)+x.config.executionDelay)}function w(e,t){var r=e.get();if(r){var n=c.splice(c.length-r,r);n.forEach(function(e){e.options._nestedIn=t});c=n.concat(c)}}function k(e){var t=e.toString();if(e.stack){t+="\n"+e.stack}var r="Exception thrown by the testcode:'"+t+"'";return r}function y(e,t,r){var n=s.getAndClearLog();if(n){e+="\nThis is what Opa logged:\n"+n}if(!r&&t._stack){e+=b(t)}if(t.errorMessage){t.errorMessage+="\n"+e}else{t.errorMessage=e}u.error(t.errorMessage,"Opa")}function C(e){e=(e||0)+2;if(t.browser.mozilla){e=e-1}var r=new Error,n=r.stack;if(!n){try{throw r()}catch(e){n=e.stack}}if(!n){return""}n=n.split("\n");n.splice(0,e);return n.join("\n")}function b(e){var t="\nCallstack:\n";if(e._stack){t+=e._stack;delete e._stack}else{t+="Unknown"}if(e._nestedIn){t+=b(e._nestedIn);delete e._nestedIn}return t}var x=function(t){this.and=this;e.extend(this,t)};x.config={};x.extendConfig=function(t){["actions","assertions","arrangements"].forEach(function(e){if(!t[e]){return}Object.keys(x.config[e]).forEach(function(r){if(!t[e][r]){t[e][r]=x.config[e][r]}})});x.config=e.extend(true,x.config,t,O);n.setLevel(x.config.logLevel)};x._parseParam=function(e){var t=parseInt(e,10);return typeof t==="number"&&isNaN(t)?e:t};x._extractOpaUriParams=function(){var e="opa";var t={};var r=(new a).search(true);for(var n in r){if(n.indexOf(e)==0){t[n.substr(e.length,1).toLowerCase()+n.substr(e.length+1)]=this._parseParam(r[n])}}return t};var O=x._extractOpaUriParams();var F=0;var I=t.browser.safari&&!t.browser.phantomJS;if(t.browser.msie||t.browser.edge||I){F=50}x.resetConfig=function(){x.config=e.extend({arrangements:new x,actions:new x,assertions:new x,timeout:15,pollingInterval:400,debugTimeout:0,_stackDropCount:0,executionDelay:F,asyncPolling:false},O)};x.getContext=function(){return l};x.emptyQueue=function t(){if(d){throw new Error("Opa is emptying its queue. Calling Opa.emptyQueue() is not supported at this time.")}d=true;g=null;p=e.Deferred();_();return p.promise().fail(function(e){c=[];if(g){var t=g.qunitTimeout?"QUnit timeout after "+g.qunitTimeout+" seconds":"Queue was stopped manually";e._stack=g.qunitTimeout&&m||C(1);y(t,e)}}).always(function(){c=[];f=-1;p=null;m=null;d=false})};x.stopQueue=function e(){x._stopQueue()};x._stopQueue=function(e){c=[];if(!p){u.warning("stopQueue was called before emptyQueue, queued tests have never been executed","Opa")}else{if(f!==-1){clearTimeout(f)}g=e||{};p.reject(g)}};x.resetConfig();x._usageReport=new o(x.config);n.setLevel(x.config.logLevel);x.prototype={getContext:x.getContext,waitFor:function(t){var r=e.Deferred(),n=x._createFilteredConfig(x._aConfigValuesForWaitFor);t=e.extend({},n,t);this._validateWaitFor(t);t._stack=C(1+t._stackDropCount);delete t._stackDropCount;var i=e.extend({},this);r.promise(i);c.push({callback:function(){var e=true;if(t.check){try{e=t.check.apply(this,arguments)}catch(e){var n="Failure in Opa check function\n"+k(e);y(n,t,e.stack);r.reject(t);return{error:true,arguments:arguments}}}if(g){return{result:true,arguments:arguments}}if(!e){return{result:false,arguments:arguments}}if(t.success){var i=x._getWaitForCounter();try{t.success.apply(this,arguments)}catch(e){var n="Failure in Opa success function\n"+k(e);y(n,t,e.stack);r.reject(t);return{error:true,arguments:arguments}}finally{w(i,t)}}r.resolve();return{result:true,arguments:arguments}}.bind(this),options:t});return i},extendConfig:x.extendConfig,emptyQueue:x.emptyQueue,_validateWaitFor:function(e){v.validate({validationInfo:x._validationInfo,inputToValidate:e})},_schedulePromiseOnFlow:function(e){var t=false;var r;e.done(function(){t=true}).fail(function(e){r="Error while waiting for promise scheduled on flow"+(e?", details: "+e:"")});var n={viewName:null,controlType:null,id:null,searchOpenDialogs:false,autoWait:false};n.check=function(){if(r){throw new Error(r)}return t};return this.waitFor(n)}};x._createFilteredOptions=function(e,t){var r={};e.forEach(function(e){var n=t[e];if(n===undefined){return}r[e]=n});return r};x._createFilteredConfig=function(e){return x._createFilteredOptions(e,x.config)};x._getWaitForCounter=function(){var e=c.length;return{get:function(){var t=c.length-e;return Math.max(t,0)}}};x._aConfigValuesForWaitFor=["errorMessage","timeout","debugTimeout","pollingInterval","_stackDropCount","asyncPolling"];x._validationInfo={error:"func",check:"func",success:"func",timeout:"numeric",debugTimeout:"numeric",pollingInterval:"numeric",_stackDropCount:"numeric",errorMessage:"string",asyncPolling:"bool"};return x},true);