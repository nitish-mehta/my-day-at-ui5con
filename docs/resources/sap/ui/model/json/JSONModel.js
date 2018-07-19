/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ClientModel","sap/ui/model/Context","./JSONListBinding","./JSONPropertyBinding","./JSONTreeBinding"],function(e,t,r,i,s,o){"use strict";var a=t.extend("sap.ui.model.json.JSONModel",{constructor:function(e,r){this.pSequentialImportCompleted=Promise.resolve();t.apply(this,arguments);this.bObserve=r;if(e&&typeof e=="object"){this.setData(e)}},metadata:{publicMethods:["setJSON","getJSON"]}});a.prototype.setData=function(t,r){if(r){this.oData=e.extend(true,Array.isArray(this.oData)?[]:{},this.oData,t)}else{this.oData=t}if(this.bObserve){this.observeData()}this.checkUpdate()};a.prototype.observeData=function(){var t=this;function r(e){return function(){return e}}function i(e,r){return function(i){o(i,e,r);t.checkUpdate()}}function s(e,t,s){if(typeof s=="function"){e[t]=s}else{Object.defineProperty(e,t,{get:r(s),set:i(e,t)})}}function o(t,r,i){if(Array.isArray(t)){for(var a=0;a<t.length;a++){o(t[a],t,a)}}else if(e.isPlainObject(t)){for(var a in t){o(t[a],t,a)}}if(r){s(r,i,t)}}o(this.oData)};a.prototype.setJSON=function(t,r){var i;try{i=e.parseJSON(t);this.setData(i,r)}catch(t){e.sap.log.fatal("The following problem occurred: JSON parse Error: "+t);this.fireParseError({url:"",errorCode:-1,reason:"",srcText:t,line:-1,linepos:-1,filepos:-1})}};a.prototype.getJSON=function(){return JSON.stringify(this.oData)};a.prototype.loadData=function(t,r,i,s,o,a,n){var c;i=i!==false;s=s||"GET";a=a===undefined?this.bCache:a;this.fireRequestSent({url:t,type:s,async:i,headers:n,info:"cache="+a+";bMerge="+o,infoObject:{cache:a,merge:o}});var u=function(r){if(!r){e.sap.log.fatal("The following problem occurred: No data was retrieved by service: "+t)}this.setData(r,o);this.fireRequestCompleted({url:t,type:s,async:i,headers:n,info:"cache="+a+";bMerge="+o,infoObject:{cache:a,merge:o},success:true})}.bind(this);var f=function(r,c){var u=c||r.textStatus;var r=i?r.request:r;var f=r.status;var p=r.statusText;var h=r.responseText;var l={message:u,statusCode:f,statusText:p,responseText:h};e.sap.log.fatal("The following problem occurred: "+u,h+","+f+","+p);this.fireRequestCompleted({url:t,type:s,async:i,headers:n,info:"cache="+a+";bMerge="+o,infoObject:{cache:a,merge:o},success:false,errorobject:l});this.fireRequestFailed(l)}.bind(this);var p=function(e,o){this._ajax({url:t,async:i,dataType:"json",cache:a,data:r,headers:n,type:s,success:e,error:o})}.bind(this);if(i){c=new Promise(function(e,t){var r=function(e,r,i){t({request:e,textStatus:r,error:i})};p(e,r)});this.pSequentialImportCompleted=this.pSequentialImportCompleted.then(function(){return c.then(u,f).catch(function(t){e.sap.log.error("Loading of data failed: "+t.stack)})})}else{p(u,f)}};a.prototype.bindProperty=function(e,t,r){var i=new s(this,e,t,r);return i};a.prototype.bindList=function(e,t,r,s,o){var a=new i(this,e,t,r,s,o);return a};a.prototype.bindTree=function(e,t,r,i,s){var a=new o(this,e,t,r,i,s);return a};a.prototype.setProperty=function(e,t,r,i){var s=this.resolve(e,r),o,a,n;if(!s){return false}if(s=="/"){this.setData(t);return true}o=s.lastIndexOf("/");a=s.substring(0,o||1);n=s.substr(o+1);var c=this._getObject(a);if(c){c[n]=t;this.checkUpdate(false,i);return true}return false};a.prototype.getProperty=function(e,t){return this._getObject(e,t)};a.prototype._getObject=function(e,t){var i=this.isLegacySyntax()?this.oData:null;if(t instanceof r){i=this._getObject(t.getPath())}else if(t){i=t}if(!e){return i}var s=e.split("/"),o=0;if(!s[0]){i=this.oData;o++}while(i&&s[o]){i=i[s[o]];o++}return i};a.prototype.isList=function(e,t){var r=this.resolve(e,t);return Array.isArray(this._getObject(r))};a.prototype._setMetaModel=function(e){this._oMetaModel=e};a.prototype.getMetaModel=function(){return this._oMetaModel};return a});