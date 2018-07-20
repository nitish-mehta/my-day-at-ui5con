/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnnotationParser","jquery.sap.global","sap/ui/Device","sap/ui/base/EventProvider"],function(t,e,a,o){"use strict";var s=o.extend("sap.ui.model.odata.ODataAnnotations",{constructor:function(t){o.apply(this,arguments);if(arguments.length!==1){if(typeof arguments[2]==="object"){t=arguments[2]}t.urls=arguments[0];t.metadata=arguments[1]}this.oMetadata=t.metadata;this.oAnnotations=t.annotationData?t.annotationData:{};this.bLoaded=false;this.bAsync=t&&t.async;this.xPath=null;this.oError=null;this.bValidXML=true;this.oRequestHandles=[];this.oLoadEvent=null;this.oFailedEvent=null;this.mCustomHeaders=t.headers?e.extend({},t.headers):{};if(t.urls){this.addUrl(t.urls);if(!this.bAsync){e.sap.assert(!e.isEmptyObject(this.oMetadata),"Metadata must be available for synchronous annotation loading");if(this.oError){e.sap.log.error("OData annotations could not be loaded: "+this.oError.message)}}}},metadata:{publicMethods:["parse","getAnnotationsData","attachFailed","detachFailed","attachLoaded","detachLoaded"]}});s.prototype.getAnnotationsData=function(){return this.oAnnotations};s.prototype.isLoaded=function(){return this.bLoaded};s.prototype.isFailed=function(){return this.oError!==null};s.prototype.fireLoaded=function(t){this.fireEvent("loaded",t);return this};s.prototype.attachLoaded=function(t,e,a){this.attachEvent("loaded",t,e,a);return this};s.prototype.detachLoaded=function(t,e){this.detachEvent("loaded",t,e);return this};s.prototype.fireFailed=function(t){this.fireEvent("failed",t);return this};s.prototype.attachFailed=function(t,e,a){this.attachEvent("failed",t,e,a);return this};s.prototype.detachFailed=function(t,e){this.detachEvent("failed",t,e);return this};s.prototype.setHeaders=function(t){this.mCustomHeaders=e.extend({},t)};s.prototype._createXMLDocument=function(t,o){var s=null;if(typeof t==="string"){o=t;t=null}if(a.browser.msie){s=new ActiveXObject("Microsoft.XMLDOM");s.preserveWhiteSpace=true;if(o.indexOf(" xmlns:xml=")>-1){o=o.replace(' xmlns:xml="http://www.w3.org/XML/1998/namespace"',"").replace(" xmlns:xml='http://www.w3.org/XML/1998/namespace'","")}s.loadXML(o)}else if(t){s=t}else if(window.DOMParser){s=(new DOMParser).parseFromString(o,"application/xml")}else{e.sap.log.fatal("The browser does not support XML parsing. Annotations are not available.")}return s};s.prototype._documentHasErrors=function(t){return t.getElementsByTagName("parsererror").length>0||t.parseError&&t.parseError.errorCode!==0};s.prototype._mergeAnnotationData=function(e,a){if(!this.oAnnotations){this.oAnnotations={}}t.merge(this.oAnnotations,e);this.bLoaded=true;if(!a){this.fireLoaded({annotations:e})}};s.prototype.setXML=function(a,o,s){var r={success:function(){},error:function(){},fireEvents:false};s=e.extend({},r,s);var n=this._createXMLDocument(a,o);var i=function(e){var a={xmlDoc:e};var o=t.parse(this.oMetadata,e);if(o){a.annotations=o;s.success(a);this._mergeAnnotationData(o,!s.fireEvents)}else{s.error(a);if(s.fireEvents){this.fireFailed(a)}}}.bind(this,n);if(this._documentHasErrors(n)){s.error({xmlDoc:n});return false}else{var l=this.oMetadata.getServiceMetadata();if(!l||e.isEmptyObject(l)){this.oMetadata.attachLoaded(i)}else{i()}return true}};s.prototype.addUrl=function(t){var e=this;var a=t;if(Array.isArray(t)&&t.length==0){return Promise.resolve({annotations:this.oAnnotations})}if(!Array.isArray(t)){a=[t]}return new Promise(function(t,o){var s=0;var r={annotations:null,success:[],fail:[]};var n=function(n){s++;if(n.type==="success"){r.success.push(n)}else{r.fail.push(n)}if(s===a.length){r.annotations=e.oAnnotations;if(r.success.length>0){var i={annotations:e.oAnnotations,results:r};e.fireLoaded(i)}if(r.success.length<a.length){var l=new Error("At least one annotation failed to load/parse/merge");l.annotations=r.annotations;l.success=r.success;l.fail=r.fail;o(l)}else{t(r)}}};var i=0;if(e.bAsync){var l=Promise.resolve();for(i=0;i<a.length;++i){var d=e._loadFromUrl.bind(e,a[i]);l=l.then(d,d).then(n,n)}}else{for(i=0;i<a.length;++i){e._loadFromUrl(a[i]).then(n,n)}}})};s.prototype._loadFromUrl=function(t){var a=this;return new Promise(function(o,s){var r={url:t,async:a.bAsync,headers:e.extend({},a.mCustomHeaders,{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()})};var n;var i=function(o,r){if(n&&n.bSuppressErrorHandlerCall){return}a.oError={type:"fail",url:t,message:r,statusCode:o.statusCode,statusText:o.statusText,responseText:o.responseText};if(a.bAsync){a.oFailedEvent=e.sap.delayedCall(0,a,a.fireFailed,[a.oError])}else{a.fireFailed(a.oError)}s(a.oError)};var l=function(e,s,r){a.setXML(r.responseXML,r.responseText,{success:function(e){o({type:"success",url:t,message:s,statusCode:r.statusCode,statusText:r.statusText,responseText:r.responseText})},error:function(t){i(r,"Malformed XML document")},url:t})};e.ajax(r).done(l).fail(i)})};s.prototype.destroy=function(){for(var t=0;t<this.oRequestHandles.length;++t){if(this.oRequestHandles[t]){this.oRequestHandles[t].bSuppressErrorHandlerCall=true;this.oRequestHandles[t].abort();this.oRequestHandles[t]=null}}o.prototype.destroy.apply(this,arguments);if(this.oLoadEvent){e.sap.clearDelayedCall(this.oLoadEvent)}if(this.oFailedEvent){e.sap.clearDelayedCall(this.oFailedEvent)}};return s});