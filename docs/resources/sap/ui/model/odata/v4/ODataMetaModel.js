/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/ClientListBinding","sap/ui/model/ContextBinding","sap/ui/model/Context","sap/ui/model/MetaModel","sap/ui/model/odata/OperationMode","sap/ui/model/odata/type/Int64","sap/ui/model/odata/type/Raw","sap/ui/model/PropertyBinding","sap/ui/thirdparty/URI","./lib/_Helper","./ValueListType"],function(e,t,n,i,o,r,a,s,u,f,p,l,c,d,h){"use strict";var m,y=e.sap.log.Level.DEBUG,g,v,M="sap.ui.model.odata.v4.ODataMetaModel",$,O=/^-?\d+$/,b=new p,w={messageChange:true},C={"Edm.Boolean":{type:"sap.ui.model.odata.type.Boolean"},"Edm.Byte":{type:"sap.ui.model.odata.type.Byte"},"Edm.Date":{type:"sap.ui.model.odata.type.Date"},"Edm.DateTimeOffset":{constraints:{$Precision:"precision"},type:"sap.ui.model.odata.type.DateTimeOffset"},"Edm.Decimal":{constraints:{"@Org.OData.Validation.V1.Minimum/$Decimal":"minimum","@Org.OData.Validation.V1.Minimum@Org.OData.Validation.V1.Exclusive":"minimumExclusive","@Org.OData.Validation.V1.Maximum/$Decimal":"maximum","@Org.OData.Validation.V1.Maximum@Org.OData.Validation.V1.Exclusive":"maximumExclusive",$Precision:"precision",$Scale:"scale"},type:"sap.ui.model.odata.type.Decimal"},"Edm.Double":{type:"sap.ui.model.odata.type.Double"},"Edm.Guid":{type:"sap.ui.model.odata.type.Guid"},"Edm.Int16":{type:"sap.ui.model.odata.type.Int16"},"Edm.Int32":{type:"sap.ui.model.odata.type.Int32"},"Edm.Int64":{type:"sap.ui.model.odata.type.Int64"},"Edm.SByte":{type:"sap.ui.model.odata.type.SByte"},"Edm.Single":{type:"sap.ui.model.odata.type.Single"},"Edm.Stream":{type:"sap.ui.model.odata.type.Stream"},"Edm.String":{constraints:{"@com.sap.vocabularies.Common.v1.IsDigitSequence":"isDigitSequence",$MaxLength:"maxLength"},type:"sap.ui.model.odata.type.String"},"Edm.TimeOfDay":{constraints:{$Precision:"precision"},type:"sap.ui.model.odata.type.TimeOfDay"}},x={},E="@com.sap.vocabularies.Common.v1.ValueListMapping",U={},P="@com.sap.vocabularies.Common.v1.ValueListReferences",T="@com.sap.vocabularies.Common.v1.ValueListWithFixedValues",D=e.sap.log.Level.WARNING;function L(e,t,n,i){var o,r=e.mSchema2MetadataUrl[t];if(!r){r=e.mSchema2MetadataUrl[t]={};r[n]=false}else if(!(n in r)){o=Object.keys(r)[0];if(r[o]){S("A schema cannot span more than one document: "+t+" - expected reference URI "+o+" but instead saw "+n,i)}r[n]=false}}function A(e,n,i,o){var r,a,s,u;function f(e){var t,r;if(!(i in e)){o(D,a," does not contain ",i);return}o(y,"Including ",i," from ",a);for(r in e){if(r[0]!=="$"&&V(r)===i){t=e[r];n[r]=t;j(t,n.$Annotations)}}}if(i in n){return n[i]}u=e.mSchema2MetadataUrl[i];if(u){s=Object.keys(u);if(s.length>1){S("A schema cannot span more than one document: schema is referenced"+" by following URLs: "+s.join(", "),i)}a=s[0];u[a]=true;o(y,"Namespace ",i," found in $Include of ",a);r=e.mMetadataUrl2Promise[a];if(!r){o(y,"Reading ",a);r=e.mMetadataUrl2Promise[a]=t.resolve(e.oRequestor.read(a)).then(e.validate.bind(e,a))}r=r.then(f);if(i in n){return n[i]}n[i]=r;return r}}function I(e,t){if(e===t){return""}if(e.indexOf(t)===0&&e[t.length]==="#"&&e.indexOf("@",t.length)<0){return e.slice(t.length+1)}}function S(t,n){e.sap.log.error(t,n,M);throw new Error(n+": "+t)}function j(e,t,n){var i;function o(e,t){var i;for(i in t){if(n||!(i in e)){e[i]=t[i]}}}for(i in e.$Annotations){if(!(i in t)){t[i]={}}o(t[i],e.$Annotations[i])}delete e.$Annotations}function V(e){return e.slice(0,e.lastIndexOf(".")+1)}g=r.extend("sap.ui.model.odata.v4.ODataMetaContextBinding",{constructor:function(t,n,i){e.sap.assert(!i||i.getModel()===t,"oContext must belong to this model");r.call(this,t,n,i)},initialize:function(){var e=this.oModel.createBindingContext(this.sPath,this.oContext);this.bInitial=false;if(e!==this.oElementContext){this.oElementContext=e;this._fireChange()}},setContext:function(t){e.sap.assert(!t||t.getModel()===this.oModel,"oContext must belong to this model");if(t!==this.oContext){this.oContext=t;if(!this.bInitial){this.initialize()}}}});v=o.extend("sap.ui.model.odata.v4.ODataMetaListBinding",{constructor:function(){o.apply(this,arguments)},_fireFilter:function(){},_fireSort:function(){},checkUpdate:function(e){var t=this.oList.length;this.update();if(e||this.oList.length!==t){this._fireChange({reason:i.Change})}},fetchContexts:function(){var e,n=this.oModel.resolve(this.sPath,this.oContext),i=this;if(!n){return t.resolve([])}e=n.slice(-1)==="@";if(!e&&n!=="/"){n+="/"}return this.oModel.fetchObject(n).then(function(t){if(!t){return[]}if(e){n=n.slice(0,-1)}return Object.keys(t).filter(function(t){return t[0]!=="$"&&e!==(t[0]!=="@")}).map(function(e){return new a(i.oModel,n+e)})})},getContexts:function(e,t){this.iCurrentStart=e||0;this.iCurrentLength=Math.min(t||Infinity,this.iLength,this.oModel.iSizeLimit);return this.getCurrentContexts()},getCurrentContexts:function(){var e=[],t,n=this.iCurrentStart+this.iCurrentLength;for(t=this.iCurrentStart;t<n;t++){e.push(this.oList[this.aIndices[t]])}return e},setContexts:function(e){this.oList=e;this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength()},update:function(){var e=[],t=this.fetchContexts(),n=this;if(t.isFulfilled()){e=t.getResult()}else{t.then(function(e){n.setContexts(e);n._fireChange({reason:i.Change})})}this.setContexts(e)}});$=l.extend("sap.ui.model.odata.v4.ODataMetaPropertyBinding",{constructor:function(){l.apply(this,arguments);this.vValue=undefined},checkUpdate:function(e,t){var n=this;this.oModel.fetchObject(this.sPath,this.oContext,this.mParameters).then(function(o){if(e||o!==n.vValue){n.vValue=o;n._fireChange({reason:t||i.Change})}})},getValue:function(){return this.vValue},setContext:function(e){if(this.oContext!=e){this.oContext=e;if(this.bRelative){this.checkUpdate(false,i.Context)}}},setValue:function(){throw new Error("Unsupported operation: ODataMetaPropertyBinding#setValue")}});var R=s.extend("sap.ui.model.odata.v4.ODataMetaModel",{constructor:function(e,t,i,o,r){s.call(this);this.aAnnotationUris=i&&!Array.isArray(i)?[i]:i;this.sDefaultBindingMode=n.OneTime;this.mETags={};this.dLastModified=new Date(0);this.oMetadataPromise=null;this.oModel=o;this.mMetadataUrl2Promise={};this.oRequestor=e;this.mSchema2MetadataUrl={};this.mSupportedBindingModes={OneTime:true,OneWay:true};this.bSupportReferences=r!==false;this.sUrl=t}});R.prototype._mergeAnnotations=function(e,t){var n=this;this.validate(this.sUrl,e);e.$Annotations={};Object.keys(e).forEach(function(t){if(e[t].$kind==="Schema"){L(n,t,n.sUrl);j(e[t],e.$Annotations)}});t.forEach(function(t,i){var o,r;n.validate(n.aAnnotationUris[i],t);for(r in t){if(r[0]!=="$"){if(r in e){S("A schema cannot span more than one document: "+r,n.aAnnotationUris[i])}o=t[r];e[r]=o;if(o.$kind==="Schema"){L(n,r,n.aAnnotationUris[i]);j(o,e.$Annotations,true)}}}})};R.prototype.attachEvent=function(e){if(!(e in w)){throw new Error("Unsupported event '"+e+"': v4.ODataMetaModel#attachEvent")}return s.prototype.attachEvent.apply(this,arguments)};R.prototype.bindContext=function(e,t){return new g(this,e,t)};R.prototype.bindList=function(e,t,n,i){return new v(this,e,t,n,i)};R.prototype.bindProperty=function(e,t,n){return new $(this,e,t,n)};R.prototype.bindTree=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#bindTree")};R.prototype.fetchCanonicalPath=function(e){return this.fetchUpdateData("",e).then(function(t){if(t.propertyPath){throw new Error("Context "+e.getPath()+" does not point to an entity. It should be "+t.entityPath)}return"/"+t.editUrl})};R.prototype.fetchEntityContainer=function(e){var n,i=this;if(!this.oMetadataPromise){n=[t.resolve(this.oRequestor.read(this.sUrl,false,e))];if(this.aAnnotationUris){this.aAnnotationUris.forEach(function(o){n.push(t.resolve(i.oRequestor.read(o,true,e)))})}if(!e){this.oMetadataPromise=t.all(n).then(function(e){var t=e[0];i._mergeAnnotations(t,e.slice(1));return t})}}return this.oMetadataPromise};R.prototype.fetchModule=function(e){var n;e=e.replace(/\./g,"/");n=sap.ui.require(e);if(n){return t.resolve(n)}return t.resolve(new Promise(function(t,n){sap.ui.require([e],t)}))};R.prototype.fetchObject=function(n,i,o){var r=this.resolve(n,i),s=this;if(!r){e.sap.log.error("Invalid relative path w/o context",n,M);return t.resolve(null)}return this.fetchEntityContainer().then(function(t){var u,f,p,l=true,c,d,h,m=t;function g(t,n){var i,r=t.indexOf("@",2);if(r>-1){return b(D,"Unsupported path after ",t.slice(0,r))}t=t.slice(2);i=t[0]==="."?e.sap.getObject(t.slice(1),undefined,o.scope):e.sap.getObject(t);if(typeof i!=="function"){return b(D,t," is not a function but: "+i)}try{m=i(m,{context:new a(s,n),schemaChildName:d})}catch(e){b(D,"Error calling ",t,": ",e)}return false}function v(e){return e.$kind!=="Action"||(!e.$IsBound&&u===x||e.$IsBound&&u===e.$Parameter[0].$Type)}function $(e){return e&&typeof e.then==="function"}function b(t){var n;if(e.sap.log.isLoggable(t,M)){n=Array.isArray(f)?f.join("/"):f;e.sap.log[t===y?"debug":"warning"](Array.prototype.slice.call(arguments,1).join("")+(n?" at /"+n:""),r,M)}if(t===D){m=undefined}return false}function w(e,n){var i;function o(){f=f||h&&n&&h+"/"+n;return b.apply(this,arguments)}u=m&&m.$Type;if(s.bSupportReferences&&!(e in t)){i=V(e);m=A(s,t,i,o)}if(e in t){h=p=d=e;m=c=t[d];if(!$(m)){return true}}if($(m)&&m.isPending()){return o(y,"Waiting for ",i)}return o(D,"Unknown qualified name ",e)}function C(e,n,i){var o,r;if(e==="$Annotations"){return b(D,"Invalid segment: $Annotations")}if(m!==t&&typeof m==="object"&&e in m){if(e[0]==="$"||O.test(e)){l=false}}else{o=e.indexOf("@@");if(o<0){if(e.length>11&&e.slice(-11)==="@sapui.name"){o=e.length-11}else{o=e.indexOf("@")}}if(o>0){if(!C(e.slice(0,o),n,i)){return false}e=e.slice(o);r=true}if(typeof m==="string"&&!(r&&e[0]==="@"&&(e==="@sapui.name"||e[1]==="@"))&&!E(m,i.slice(0,n))){return false}if(l){if(e[0]==="$"||O.test(e)){l=false}else if(!r){if(e[0]!=="@"&&e.indexOf(".")>0){return w(e)}else if(m&&"$Type"in m){if(!w(m.$Type,"$Type")){return false}}else if(m&&"$Action"in m){if(!w(m.$Action,"$Action")){return false}u=x}else if(m&&"$Function"in m){if(!w(m.$Function,"$Function")){return false}}else if(n===0){h=p=d=d||t.$EntityContainer;m=c=c||t[d];if(e&&e[0]!=="@"&&!(e in c)){return b(D,"Unknown child ",e," of ",d)}}if(Array.isArray(m)){m=m.filter(v);if(e==="@$ui5.overload"){return true}if(m.length!==1){return b(D,"Unsupported overloads")}m=m[0].$ReturnType;h=h+"/0/$ReturnType";if(m){if(e==="value"&&!(t[m.$Type]&&t[m.$Type].value)){p=undefined;return true}if(!w(m.$Type,"$Type")){return false}}}}}if(!e){return n+1>=i.length||b(D,"Invalid empty segment")}if(e[0]==="@"){if(e==="@sapui.name"){m=p;if(m===undefined){b(D,"Unsupported path before @sapui.name")}else if(n+1<i.length){b(D,"Unsupported path after @sapui.name")}return false}if(e[1]==="@"){if(n+1<i.length){return b(D,"Unsupported path after ",e)}return g(e,"/"+i.slice(0,n).join("/")+"/"+i[n].slice(0,o))}}if(!m||typeof m!=="object"){m=undefined;return b(y,"Invalid segment: ",e)}if(l&&e[0]==="@"){m=(t.$Annotations||{})[h]||{};l=false}}if(e!=="@"){p=l||e[0]==="@"?e:undefined;h=l?h+"/"+e:undefined;m=m[e]}return true}function E(e,n){var i;if(f){return b(D,"Invalid recursion")}f=n;l=true;m=t;i=e.split("/").every(C);f=undefined;return i}E(r.slice(1));if($(m)){m=m.then(function(){return s.fetchObject(n,i,o)})}return m})};R.prototype.fetchUI5Type=function(n){var i=this.getMetaContext(n),o=this;if(e.sap.endsWith(n,"/$count")){m=m||new f;return t.resolve(m)}return this.fetchObject(undefined,i).then(function(t){var r,a,s,u,f=b.getName();function p(e,t){if(t!==undefined){r=r||{};r[e]=t}}if(!t){e.sap.log.warning("No metadata for path '"+n+"', using "+f,undefined,M);return b}s=t["$ui5.type"];if(s){return s}if(t.$isCollection){e.sap.log.warning("Unsupported collection type, using "+f,n,M)}else{u=C[t.$Type];if(u){f=u.type;for(a in u.constraints){p(u.constraints[a],a[0]==="@"?o.getObject(a,i):t[a])}if(t.$Nullable===false){p("nullable",false)}}else{e.sap.log.warning("Unsupported type '"+t.$Type+"', using "+f,n,M)}}if(f===b.getName()){t["$ui5.type"]=b}else{t["$ui5.type"]=o.fetchModule(f).then(function(e){s=new e(undefined,r);t["$ui5.type"]=s;return s})}return t["$ui5.type"]})};R.prototype.fetchUpdateData=function(e,n){var i=n.getModel(),o=i.resolve(e,n),r=this;function a(e){var t=new Error(o+": "+e);i.reportError(e,M,t);throw t}return this.fetchObject(this.getMetaPath(o)).then(function(){return r.fetchEntityContainer()}).then(function(i){var r,s=i[i.$EntityContainer],u,f,p,l,c,h,m=false,y;function g(){r.push({path:l,prefix:r.pop(),type:y})}function v(e){var t=e.indexOf("(");return t>=0?e.slice(t):""}function M(e){var t=e.indexOf("(");return t>=0?e.slice(0,t):e}h=o.slice(1).split("/");r=[h.shift()];l="/"+r[0];u=l;p=decodeURIComponent(M(r[0]));f=s[p];if(!f){a("Not an entity set: "+p)}y=i[f.$Type];e="";c="";h.forEach(function(t){var n,o;l+="/"+t;if(O.test(t)){g();u+="/"+t}else{o=decodeURIComponent(M(t));c=d.buildPath(c,o);n=y[o];if(!n){a("Not a (navigation) property: "+o)}y=i[n.$Type];if(n.$kind==="NavigationProperty"){if(c in f.$NavigationPropertyBinding){p=f.$NavigationPropertyBinding[c];f=s[p];c="";r=[encodeURIComponent(p)+v(t)];if(!n.$isCollection){g()}}else{r.push(t)}u=l;e=""}else{e=d.buildPath(e,t)}}});return t.all(r.map(function(e){if(typeof e==="string"){return e}return n.fetchValue(e.path).then(function(t){var n;if(!t){a("No instance to calculate key predicate at "+e.path)}if(d.hasPrivateAnnotation(t,"transient")){m=true;return undefined}n=d.getPrivateAnnotation(t,"predicate");if(!n){a("No key predicate known at "+e.path)}return e.prefix+n},function(t){a(t.message+" at "+e.path)})})).then(function(t){return{editUrl:m?undefined:t.join("/"),entityPath:u,propertyPath:e}})})};R.prototype.fetchValueListMappings=function(e,t,n){var i=this,o=e.getMetaModel();return o.fetchEntityContainer().then(function(r){var a,s=r.$Annotations,u={},f=i===o,p;p=Object.keys(s).filter(function(o){if(d.namespace(o)===t){if(i.getObject("/"+o)===n){return true}if(!f){throw new Error("Unexpected annotation target '"+o+"' with namespace of data service in "+e.sServiceUrl)}}return false});if(!p.length){throw new Error("No annotation '"+E.slice(1)+"' in "+e.sServiceUrl)}a=s[p[0]];Object.keys(a).forEach(function(t){var n=I(t,E);if(n!==undefined){u[n]=a[t]}else if(!f){throw new Error("Unexpected annotation '"+t.slice(1)+"' for target '"+p[0]+"' with namespace of data service in "+e.sServiceUrl)}});return u})};R.prototype.fetchValueListType=function(e){var t=this.getMetaContext(e),n=this;return this.fetchObject(undefined,t).then(function(i){var o,r;if(!i){throw new Error("No metadata for "+e)}o=n.getObject("@",t);if(o[T]){return h.Fixed}for(r in o){if(I(r,P)!==undefined||I(r,E)!==undefined){return h.Standard}}return h.None})};R.prototype.getAdapterFactoryModulePath=function(){return"sap/ui/model/odata/v4/meta/ODataAdapterFactory"};R.prototype.getETags=function(){return this.mETags};R.prototype.getLastModified=function(){return this.dLastModified};R.prototype.getMetaContext=function(e){return new a(this,this.getMetaPath(e))};R.prototype.getMetaPath=function(e){return d.getMetaPath(e)};R.prototype.getOrCreateValueListModel=function(e){var t=new c(this.sUrl).absoluteTo(document.baseURI).pathname().toString(),i,o;o=new c(e).absoluteTo(t).filename("").toString();i=U[o];if(!i){i=new this.oModel.constructor({operationMode:u.Server,serviceUrl:o,synchronizationMode:"None"});i.setDefaultBindingMode(n.OneWay);U[o]=i;i.oRequestor.mHeaders["X-CSRF-Token"]=this.oModel.oRequestor.mHeaders["X-CSRF-Token"]}return i};R.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#getOriginalProperty")};R.prototype.getObject=d.createGetMethod("fetchObject");R.prototype.getProperty=R.prototype.getObject;R.prototype.getUI5Type=d.createGetMethod("fetchUI5Type",true);R.prototype.getValueListType=d.createGetMethod("fetchValueListType",true);R.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#isList")};R.prototype.refresh=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#refresh")};R.prototype.requestObject=d.createRequestMethod("fetchObject");R.prototype.requestUI5Type=d.createRequestMethod("fetchUI5Type");R.prototype.requestValueListType=d.createRequestMethod("fetchValueListType");R.prototype.requestValueListInfo=function(t){var n=this.getMetaPath(t),i=n.slice(0,n.lastIndexOf("/")+1),o=this;return Promise.all([this.requestObject(i+"@sapui.name"),this.requestObject(n),this.requestObject(n+"@"),this.requestObject(n+T)]).then(function(n){var i=n[2],r=n[3],a={},s=d.namespace(n[0]),u=n[1],f={};function p(n,i,o,s){if(a[i]){throw new Error("Annotations '"+E.slice(1)+"' with identical qualifier '"+i+"' for property "+t+" in "+a[i]+" and "+o)}if(r&&f[""]){throw new Error("Annotation '"+T.slice(1)+"' but multiple '"+E.slice(1)+"' for property "+t)}a[i]=o;f[r?"":i]=e.extend(true,{$model:s},n)}if(!u){throw new Error("No metadata for "+t)}Object.keys(i).filter(function(e){return I(e,E)!==undefined}).forEach(function(e){p(i[e],I(e,E),o.sUrl,o.oModel)});return Promise.all(Object.keys(i).filter(function(e){return I(e,P)!==undefined}).map(function(e){var t=i[e];return Promise.all(t.map(function(e){var t=o.getOrCreateValueListModel(e);return o.fetchValueListMappings(t,s,u).then(function(n){Object.keys(n).forEach(function(i){p(n[i],i,e,t)})})}))})).then(function(){if(!Object.keys(f).length){throw new Error("No annotation '"+P.slice(1)+"' for "+t)}return f})})};R.prototype.resolve=function(e,t){var n,i;if(!e){return t?t.getPath():undefined}i=e[0];if(i==="/"){return e}if(!t){return undefined}if(i==="."){if(e[1]!=="/"){throw new Error("Unsupported relative path: "+e)}e=e.slice(2)}n=t.getPath();return i==="@"||n.slice(-1)==="/"?n+e:n+"/"+e};R.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#setLegacySyntax")};R.prototype.toString=function(){return M+": "+this.sUrl};R.prototype.validate=function(e,t){var n,i,o,r,a,s;if(!this.bSupportReferences){return t}for(s in t.$Reference){a=t.$Reference[s];s=new c(s).absoluteTo(this.sUrl).toString();if("$IncludeAnnotations"in a){S("Unsupported IncludeAnnotations",e)}for(n in a.$Include){r=a.$Include[n];if(r in t){S("A schema cannot span more than one document: "+r+" - is both included and defined",e)}L(this,r,s,e)}}o=t.$LastModified?new Date(t.$LastModified):null;this.mETags[e]=t.$ETag?t.$ETag:o;i=t.$Date?new Date(t.$Date):new Date;o=o||i;if(this.dLastModified<o){this.dLastModified=o}delete t.$Date;delete t.$ETag;delete t.$LastModified;return t};return R});