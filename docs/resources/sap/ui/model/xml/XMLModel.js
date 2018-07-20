/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ClientModel","sap/ui/model/Context","./XMLListBinding","./XMLPropertyBinding","./XMLTreeBinding","jquery.sap.xml"],function(e,t,r,s,i,a){"use strict";var o=t.extend("sap.ui.model.xml.XMLModel",{constructor:function(e){t.apply(this,arguments);this.oNameSpaces=null;if(e&&e.documentElement){this.setData(e)}},metadata:{publicMethods:["setXML","getXML","setNameSpace"]}});o.prototype.setXML=function(t){var r=e.sap.parseXML(t);if(r.parseError.errorCode!=0){var s=r.parseError;e.sap.log.fatal("The following problem occurred: XML parse Error for "+s.url+" code: "+s.errorCode+" reason: "+s.reason+" src: "+s.srcText+" line: "+s.line+" linepos: "+s.linepos+" filepos: "+s.filepos);this.fireParseError({url:s.url,errorCode:s.errorCode,reason:s.reason,srcText:s.srcText,line:s.line,linepos:s.linepos,filepos:s.filepos})}this.setData(r)};o.prototype.getXML=function(){return e.sap.serializeXML(this.oData)};o.prototype.setData=function(e){this.oData=e;this.checkUpdate()};o.prototype.loadData=function(t,r,s,i,a,o){var n=this;s=s!==false;i=i||"GET";a=a===undefined?this.bCache:a;this.fireRequestSent({url:t,type:i,async:s,headers:o,info:"cache="+a,infoObject:{cache:a}});this._ajax({url:t,async:s,cache:a,dataType:"xml",data:r,headers:o,type:i,success:function(r){if(!r){e.sap.log.fatal("The following problem occurred: No data was retrieved by service: "+t)}n.setData(r);n.fireRequestCompleted({url:t,type:i,async:s,headers:o,info:"cache="+a,infoObject:{cache:a},success:true})},error:function(r,c,u){var p={message:c,statusCode:r.status,statusText:r.statusText,responseText:r.responseText};e.sap.log.fatal("The following problem occurred: "+c,r.responseText+","+r.status+","+r.statusText);n.fireRequestCompleted({url:t,type:i,async:s,headers:o,info:"cache="+a,infoObject:{cache:a},success:false,errorobject:p});n.fireRequestFailed(p)}})};o.prototype.setNameSpace=function(e,t){if(!t){t=""}if(!this.oNameSpaces){this.oNameSpaces={}}this.oNameSpaces[t]=e};o.prototype.bindProperty=function(e,t,r){var s=new i(this,e,t,r);return s};o.prototype.bindList=function(e,t,r,i,a){var o=new s(this,e,t,r,i,a);return o};o.prototype.bindTree=function(e,t,r,s,i){var o=new a(this,e,t,r,s,i);return o};o.prototype.setProperty=function(t,r,s,i){var a=t.substring(0,t.lastIndexOf("/")+1),o=t.substr(t.lastIndexOf("/")+1);if(!this.resolve(t,s)){return false}if(!this.oData.documentElement){e.sap.log.warning("Trying to set property "+t+", but no document exists.");return false}var n;if(o.indexOf("@")==0){n=this._getObject(a,s);if(n[0]){n[0].setAttribute(o.substr(1),r);this.checkUpdate(false,i);return true}}else{n=this._getObject(t,s);if(n[0]){e(n[0]).text(r);this.checkUpdate(false,i);return true}}return false};o.prototype.getProperty=function(t,r){var s=this._getObject(t,r);if(s&&typeof s!="string"){s=e(s[0]).text()}return s};o.prototype.getObject=function(e,t){var r=this._getObject(e,t);if(Array.isArray(r)){r=r[0]}return r};o.prototype._getObject=function(t,s){var i=this.oData.documentElement;if(!i){return null}var a=this.isLegacySyntax()?[i]:[];if(s instanceof r){a=this._getObject(s.getPath())}else if(s){a=[s]}if(!t){return a}var o=t.split("/"),n,c=0;if(!o[0]){a=i;c++}a=a.length==undefined?[a]:a;a=a[0]?a:null;while(a&&a.length>0&&o[c]){n=o[c];if(n.indexOf("@")==0){a=this._getAttribute(a[0],n.substr(1))}else if(n=="text()"){a=e(a[0]).text()}else if(isNaN(n)){a=this._getChildElementsByTagName(a[0],n)}else{a=[a[n]]}c++}return a};o.prototype._getAttribute=function(e,t){if(!this.oNameSpaces||t.indexOf(":")==-1){return e.getAttribute(t)}var r=this._getNameSpace(t),s=this._getLocalName(t);if(e.getAttributeNS){return e.getAttributeNS(r,s)}else{if(!this.oDocNSPrefixes){this.oDocNSPrefixes=this._getDocNSPrefixes()}var i=this.oDocNSPrefixes[r];t=(i?i+":":"")+s;return e.getAttribute(t)}};o.prototype._getChildElementsByTagName=function(t,r){var s=t.childNodes,i=[];if(this.oNameSpaces){var a=this._getNameSpace(r),o=this._getLocalName(r),n;e.each(s,function(e,t){n=t.localName||t.baseName;if(t.nodeType==1&&n==o&&t.namespaceURI==a){i.push(t)}})}else{e.each(s,function(e,t){if(t.nodeType==1&&t.nodeName==r){i.push(t)}})}return i};o.prototype._getNameSpace=function(e){var t=e.indexOf(":"),r="";if(t>0){r=e.substr(0,t)}return this.oNameSpaces[r]};o.prototype._getLocalName=function(e){var t=e.indexOf(":"),r=e;if(t>0){r=e.substr(t+1)}return r};o.prototype._getDocNSPrefixes=function(){var t={},r=this.oData&&this.oData.documentElement;if(!r){return t}var s=r.attributes;e.each(s,function(e,r){var s=r.name,i=r.value;if(s=="xmlns"){t[i]=""}else if(s.indexOf("xmlns")==0){t[i]=s.substr(6)}});return t};o.prototype._resolve=function(t,r){var s=!e.sap.startsWith(t,"/"),i=t;if(s){if(r){i=r.getPath()+"/"+t}else{i=this.isLegacySyntax()?"/"+t:undefined}}return i};o.prototype.isList=function(e,t){return false};o.prototype._setMetaModel=function(e){this._oMetaModel=e};o.prototype.getMetaModel=function(){return this._oMetaModel};return o});