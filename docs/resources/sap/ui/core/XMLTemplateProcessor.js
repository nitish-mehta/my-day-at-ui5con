/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/DataType","sap/ui/base/ManagedObject","sap/ui/core/CustomData","./mvc/View","./mvc/EventHandlerResolver","./ExtensionPoint","./StashedControlSupport","sap/ui/base/SyncPromise"],function(e,t,n,r,a,i,o,s,u){"use strict";function l(e,r,a,i){var o=n.bindingParser(r,i,true);if(o&&typeof o==="object"){return o}var s=r=o||r;var u=t.getType(e);if(u){if(u instanceof t){s=u.parseValue(r,{context:i})}}else{throw new Error("Property "+a+" has unknown type "+e)}return typeof s==="string"?n.bindingParser.escape(s):s}function f(e){return e.localName||e.baseName||e.nodeName}function c(e){if(e.isRejected()){throw e.getResult()}return e.getResult()}function p(e,t){function n(e,n,r){var a,i,o=[];for(a=e.firstChild;a;a=a.nextSibling){i=t(e,n,r,a);if(i){o.push(c(i))}}return u.resolve(o)}function r(e,n,r){var a,i=Promise.resolve(),o=[];for(a=e.firstChild;a;a=a.nextSibling){i=i.then(t.bind(null,e,n,r,a));o.push(i)}return Promise.all(o)}return e?r:n}var g={};g.loadTemplate=function(t,n){var r=e.sap.getResourceName(t,"."+(n||"view")+".xml");return e.sap.loadResource(r).documentElement};g.loadTemplatePromise=function(t,n){var r=e.sap.getResourceName(t,"."+(n||"view")+".xml");return e.sap.loadResource(r,{async:true}).then(function(e){return e.documentElement})};g.parseViewAttributes=function(e,t,n){var r=t.getMetadata().getAllProperties();for(var a=0;a<e.attributes.length;a++){var i=e.attributes[a];if(i.name==="controllerName"){t._controllerName=i.value}else if(i.name==="resourceBundleName"){t._resourceBundleName=i.value}else if(i.name==="resourceBundleUrl"){t._resourceBundleUrl=i.value}else if(i.name==="resourceBundleLocale"){t._resourceBundleLocale=i.value}else if(i.name==="resourceBundleAlias"){t._resourceBundleAlias=i.value}else if(i.name==="class"){t.addStyleClass(i.value)}else if(!n[i.name]&&r[i.name]){n[i.name]=l(r[i.name].type,i.value,i.name,t._oContainingView.oController)}}};g.enrichTemplateIds=function(e,t){g.enrichTemplateIdsPromise(e,t,false);return e};g.enrichTemplateIdsPromise=function(e,t,n){return d(e,t,true,n).then(function(){return e})};g.parseTemplate=function(e,t){return c(g.parseTemplatePromise(e,t,false))};g.parseTemplatePromise=function(e,t,n,r){return d(e,t,false,n,r)};function d(t,d,m,v,h){var w=[],y=u.resolve(),C=d._sProcessingMode||sap.ui.getCore().getConfiguration().getXMLProcessingMode();v=v&&C==="sequential";e.sap.log.debug("XML processing mode is "+(v?"sequential":"default"),"","XMLTemplateProcessor");var b=sap.ui.getCore().getConfiguration().getDesignMode();if(b){d._sapui_declarativeSourceInfo={xmlNode:t,xmlRootNode:d._oContainingView===d?t:d._oContainingView._sapui_declarativeSourceInfo.xmlRootNode}}var _=d.sViewName||d._sFragmentName;if(!_){var x=d;var N=0;while(++N<1e3&&x&&x!==x._oContainingView){x=x._oContainingView}_=x.sViewName}if(d.isSubView()){T(t,true)}else{if(t.localName==="View"&&t.namespaceURI!=="sap.ui.core.mvc"){e.sap.log.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+t.namespaceURI+"'"+(_?" (View name: "+_+")":""))}A(t)}var I=0;function R(){for(;I<w.length;I++){var e=w[I];if(e&&typeof e.then==="function"){return e.then(V).then(R)}}return w}function V(e){var t=[I,1].concat(e);Array.prototype.splice.apply(w,t)}return y.then(R);function M(e){return e}function P(e){return d._oContainingView.createId(e)}function T(t,n,r){if(t.nodeType===1){var a=f(t);if(t.namespaceURI==="http://www.w3.org/1999/xhtml"||t.namespaceURI==="http://www.w3.org/2000/svg"){w.push("<"+a+" ");var i=false;for(var o=0;o<t.attributes.length;o++){var s=t.attributes[o];var u=s.value;if(s.name==="id"){i=true;u=B(d,t)}w.push(s.name+'="'+e.sap.encodeHTML(u)+'" ')}if(n===true){w.push("data-sap-ui-preserve"+'="'+d.getId()+'" ');if(!i){w.push("id"+'="'+d.getId()+'" ')}}w.push(">");var l=t;if(window.HTMLTemplateElement&&t instanceof HTMLTemplateElement&&t.content instanceof DocumentFragment){l=t.content}A(l);w.push("</"+a+">")}else if(a==="FragmentDefinition"&&t.namespaceURI==="sap.ui.core"){A(t,false,true)}else{y=y.then(function(){return E(t).then(function(e){for(var t=0;t<e.length;t++){var n=e[t];if(d.getMetadata().hasAggregation("content")){d.addAggregation("content",n)}else if(d.getMetadata().hasAssociation("content")){d.addAssociation("content",n)}}return e})});w.push(y)}}else if(t.nodeType===3&&!r){var c=t.textContent||t.text,p=f(t.parentNode);if(c){if(p!="style"){c=e.sap.encodeHTML(c)}w.push(c)}}}function A(e,t,n){var r=e.childNodes;for(var a=0;a<r.length;a++){T(r[a],t,n)}}function S(t,n){var r;var a=sap.ui.getCore().getLoadedLibraries();e.each(a,function(e,a){if(t===a.namespace||t===a.name){r=a.name+"."+(a.tagNames&&a.tagNames[n]||n)}});r=r||t+"."+n;function i(t){if(!t){e.sap.log.error("Control '"+r+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");t=e.sap.getObject(r)}if(!t){e.sap.log.error("Can't find object class '"+r+"' for XML-view","","XMLTemplateProcessor")}return t}var o=e.sap.getResourceName(r,"");var s=sap.ui.require(o);if(!s){if(v){return new Promise(function(e){sap.ui.require([o],function(t){t=i(t);e(t)})})}else{s=sap.ui.requireSync(o);s=i(s)}}return s}function U(e){if(e.namespaceURI==="http://www.w3.org/1999/xhtml"||e.namespaceURI==="http://www.w3.org/2000/svg"){var t=e.attributes["id"]?e.attributes["id"].textContent||e.attributes["id"].text:null;if(m){return g.enrichTemplateIdsPromise(e,d,v).then(function(){return[]})}else{var n=function(n){var r={id:t?B(d,e,t):undefined,xmlNode:e,containingView:d._oContainingView};if(d.fnScopedRunWithOwner){return d.fnScopedRunWithOwner(function(){return new n(r)})}return new n(r)};if(v){return new Promise(function(e,t){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(t){e([n(t)])})})}else{var r=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return u.resolve([n(r)])}}}else{return E(e)}}function E(e){if(f(e)==="ExtensionPoint"&&e.namespaceURI==="sap.ui.core"){if(m){return u.resolve([])}else{var t=d instanceof a?d._oContainingView:d;return u.resolve(o._factory(t,e.getAttribute("name"),function(){var t=u.resolve();var n=[];var r=e.childNodes;for(var a=0;a<r.length;a++){var i=r[a];if(i.nodeType===1){t=t.then(U.bind(null,i));n.push(t)}}return u.all(n).then(function(e){var t=[];e.forEach(function(e){t=t.concat(e)});return t})}))}}else{var n=S(e.namespaceURI,f(e));if(n&&typeof n.then==="function"){return n.then(function(t){return L(e,t)})}else{return L(e,n)}}}function L(t,o){var w=t.namespaceURI,y={},C="",_=[],x=null,N=null;if(!o){return u.resolve([])}var I=o.getMetadata();var R=I.getAllSettings();if(!m){for(var V=0;V<t.attributes.length;V++){var T=t.attributes[V],A=T.name,S=R[A],E=T.value;if(A==="id"){y[A]=B(d,t,E)}else if(A==="class"){C+=E}else if(A==="viewName"){y[A]=E}else if(A==="fragmentName"){y[A]=E;y["containingView"]=d._oContainingView}else if(A==="binding"&&!S||A==="objectBindings"){var L=n.bindingParser(E,d._oContainingView.oController);if(L){y.objectBindings=y.objectBindings||{};y.objectBindings[L.model||undefined]=L}}else if(A==="metadataContexts"){var j=null;try{j=g._calculatedModelMapping(E,d._oContainingView.oController,true)}catch(t){e.sap.log.error(d+":"+t.message)}if(j){y.metadataContexts=j;if(g._preprocessMetadataContexts){g._preprocessMetadataContexts(o.getMetadata().getName(),y,d._oContainingView.oController)}}}else if(A.indexOf(":")>-1){if(T.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"){var D=f(T);_.push(new r({key:D,value:l("any",E,D,d._oContainingView.oController)}))}else if(T.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1"){N=E}else if(A.indexOf("xmlns:")!==0){if(!x){x={}}if(!x.hasOwnProperty(T.namespaceURI)){x[T.namespaceURI]={}}x[T.namespaceURI][f(T)]=T.nodeValue;e.sap.log.debug(d+": XMLView parser encountered unknown attribute '"+A+"' (value: '"+E+"') with unknown namespace, stored as sap-ui-custom-settings of customData")}}else if(S&&S._iKind===0){y[A]=l(S.type,E,A,d._oContainingView.oController)}else if(S&&S._iKind===1&&S.altTypes){y[A]=l(S.altTypes[0],E,A,d._oContainingView.oController)}else if(S&&S._iKind===2){var L=n.bindingParser(E,d._oContainingView.oController);if(L){y[A]=L}else{e.sap.log.error(d+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+A+"='"+E+"')")}}else if(S&&S._iKind===3){y[A]=P(E)}else if(S&&S._iKind===4){y[A]=E.split(/[\s,]+/g).filter(M).map(P)}else if(S&&S._iKind===5){var X=i.resolveEventHandler(E,d._oContainingView.oController);if(X){y[A]=X}else{e.sap.log.warning(d+': event handler function "'+E+'" is not a function or does not exist in the controller.')}}else if(S&&S._iKind===-1){if(a.prototype.isPrototypeOf(o.prototype)&&A=="async"){y[A]=l(S.type,E,A,d._oContainingView.oController)}else{e.sap.log.warning(d+": setting '"+A+"' for class "+I.getName()+" (value:'"+E+"') is not supported")}}else{e.sap.assert(A==="xmlns",d+": encountered unknown setting '"+A+"' for class "+I.getName()+" (value:'"+E+"')");if(g._supportInfo){g._supportInfo({context:t,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+A+"' for class "+I.getName()}})}}}if(x){_.push(new r({key:"sap-ui-custom-settings",value:x}))}if(_.length>0){y.customData=_}}var q=p(v,W);function W(t,n,r,a,i){var o;if(a.nodeType===1){if(a.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1"){y[f(a)]=a.querySelector("*");return}o=a.namespaceURI===w&&r&&r[f(a)];if(o){return q(a,o)}else if(n){if(!i&&a.getAttribute("stashed")==="true"&&!m){s.createStashedControl(B(d,a),{sParentId:y["id"],sParentAggregationName:n.name,fnCreate:function(){var e=v;v=false;try{return c(W(t,n,r,a,true))}finally{v=e}}});return}return U(a).then(function(t){for(var r=0;r<t.length;r++){var a=t[r];var i=n.name;if(n.multiple){if(!y[i]){y[i]=[]}if(typeof y[i].path==="string"){e.sap.assert(!y[i].template,"list bindings support only a single template object");y[i].template=a}else{y[i].push(a)}}else{e.sap.assert(!y[i],"multiple aggregates defined for aggregation with cardinality 0..1");y[i]=a}}return t})}else if(f(t)!=="FragmentDefinition"||t.namespaceURI!=="sap.ui.core"){throw new Error("Cannot add direct child without default aggregation defined for control "+I.getElementName())}}else if(a.nodeType===3){if(e.trim(a.textContent||a.text)){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+e.trim(a.textContent||a.text))}}}var k=I.getDefaultAggregation();var F=I.getAllAggregations();return q(t,k,F).then(function(){var e;if(m&&t.hasAttribute("id")){O(d,t)}else if(!m){if(a.prototype.isPrototypeOf(o.prototype)&&typeof o._sType==="string"){var n=function(){return sap.ui.view(y,undefined,o._sType)};if(d.fnScopedRunWithOwner){e=d.fnScopedRunWithOwner(n)}else{e=n()}}else{var r=function(){if(d.fnScopedRunWithOwner){return d.fnScopedRunWithOwner(function(){return new o(y)})}else{return new o(y)}};if(h&&h.fnRunWithPreprocessor){e=h.fnRunWithPreprocessor(r)}else{e=r()}}if(C&&e.addStyleClass){e.addStyleClass(C)}}if(!e){e=[]}else if(!Array.isArray(e)){e=[e]}if(g._supportInfo&&e){for(var i=0,s=e.length;i<s;i++){var u=e[i];if(u&&u.getId()){var l=g._supportInfo({context:t,env:{caller:"createRegularControls",nodeid:t.getAttribute("id"),controlid:u.getId()}}),f=N?N+",":"";f+=l;g._supportInfo.addSupportInfo(u.getId(),f)}}}if(b){e.forEach(function(e){if(I.getCompositeAggregationName){var n=t.getElementsByTagName(e.getMetadata().getCompositeAggregationName());for(var r=0;r<n.length;r++){t.removeChild(n[0])}}e._sapui_declarativeSourceInfo={xmlNode:t,xmlRootNode:d._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:I.getName()==="sap.ui.core.Fragment"?y["fragmentName"]:null}})}return e})}function B(e,t,n){if(t.getAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id")){return t.getAttribute("id")}else{return P(n?n:t.getAttribute("id"))}}function O(e,t){t.setAttribute("id",P(t.getAttribute("id")));t.setAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id",true)}}g._preprocessMetadataContexts=null;g._calculatedModelMapping=function(e,t,r){var a,i={},o=n.bindingParser(e,t);function s(e){if(e.length%2===0){throw new Error("The last entry is no binding")}for(var t=1;t<=e.length;t=t+2){if(typeof e[t-1]=="string"){throw new Error("Binding expected not a string")}if(e[t]){if(typeof e[t]!="string"||e[t]!=","){throw new Error("Missing delimiter ','")}}}}if(o){if(!o.formatter){a=o;o={parts:[a]}}else{s(o.formatter.textFragments)}for(var u=0;u<o.parts.length;u++){a=o.parts[u];i[a.model]=i[a.model]||(r?[]:null);if(Array.isArray(i[a.model])){i[a.model].push(a)}else{i[a.model]=a}}}return i};return g},true);