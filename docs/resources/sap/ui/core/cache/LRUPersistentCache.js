/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*!
 * Portions of this module ("Least Recently Used" logic) are taken from the node-lru-cache project (see https://github.com/isaacs/node-lru-cache/blob/v2.7.3/README.md),
 * but modified. Please see the OpenUI5 LICENSE file for license information respecting node-lru-cache.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";var t={name:"LRUPersistentCache",defaultOptions:{databaseName:"ui5-cachemanager-db",_contentStoreName:"content-store",_metadataStoreName:"metadata-store",_metadataKey:"metadataKey"},_db:{},init:function(){this._metadata={};this._mru=-1;this._lru=-1;return f(this)},_destroy:function(){if(this._db.close){this._db.close()}this._metadata=null;this._ui5version=null},set:function(t,a){if(L(t)){e.sap.log.warning("Cache Manager ignored 'set' for key ["+t+"]");return Promise.resolve()}if(t==null){return Promise.reject("Cache Manager does not accept undefined or null as key")}if(typeof a==="undefined"){return Promise.reject("Cache Manager does not accept undefined as value")}e.sap.log.debug("Cache Manager LRUPersistentCache: adding item with key ["+t+"]...");var r=this,s="[sync ] fnSet: total[sync]  key ["+t+"]",o="[sync ] fnSet: txStart[sync]  key ["+t+"]",i="[sync ] fnSet: storeOpen[sync]  key ["+t+"]",u="[sync ] fnSet: putContent[sync]  key ["+t+"]",c="[sync ] fnSet: putMetadata[sync]  key ["+t+"]",d="[sync ] fnSet: serialize[sync]  key ["+t+"]";return new Promise(function l(f,g){e.sap.measure.start(s,"CM",n);var _,b,M,w,P;P=h(r._metadata);w=new p(t,a,typeof a,++r._mru,d,n).serialize();e.sap.measure.start(o,"CM",n);var O=r._db.transaction([r.defaultOptions._contentStoreName,r.defaultOptions._metadataStoreName],"readwrite");e.sap.measure.end(o);O.onerror=function(t){var a="Cache Manager cannot complete add/put transaction for entry with key: "+w.oData.key+". Details: "+D(t);e.sap.log.error(a);r._metadata=P;y(r);g(a)};O.onabort=function(n){r._metadata=P;y(r);var s=C(r);if(S(n)&&s>0){e.sap.log.warning("Cache Manager is trying to free some space to add/put new item");v(r,t,a).then(function(){e.sap.log.debug("Cache Manager LRUPersistentCache: set completed after freeing space. ItemCount changed from "+s+" to "+C(r));f()},function(t){var a="Cache Manager LRUPersistentCache: set unsuccessful. Cannot free space to add/put entry. Details: "+t;e.sap.log.error(a);g(a)})}else{var o="Cache Manager LRUPersistentCache: set failed: "+D(n);e.sap.log.error(o);g(o)}};O.oncomplete=function(){e.sap.log.debug("Cache Manager LRUPersistentCache: adding item with key ["+t+"]... done");f()};e.sap.measure.start(i,"CM",n);_=O.objectStore(r.defaultOptions._contentStoreName);M=O.objectStore(r.defaultOptions._metadataStoreName);e.sap.measure.end(i);e.sap.measure.start(u,"CM",n);b=_.put(w.oData,w.oData.key);e.sap.measure.end(u);e.sap.measure.end(s);b.onsuccess=function(){m(r,w);e.sap.measure.start(c,"CM",n);M.put(r._metadata,r.defaultOptions._metadataKey);e.sap.measure.end(c)};if(e.sap.log.getLevel()>=e.sap.log.LogLevel.DEBUG){e.sap.log.debug("Cache Manager LRUPersistentCache: measurements: "+s+": "+e.sap.measure.getMeasurement(s).duration+"; "+d+": "+e.sap.measure.getMeasurement(d).duration+"; "+o+": "+e.sap.measure.getMeasurement(o).duration+"; "+i+": "+e.sap.measure.getMeasurement(i).duration+"; "+u+": "+e.sap.measure.getMeasurement(u).duration+"; "+c+": "+e.sap.measure.getMeasurement(c).duration)}})},has:function(t){if(L(t)){e.sap.log.warning("Cache Manager ignored 'has' for key ["+t+"]");return Promise.resolve(false)}return this.get(t).then(function(e){return typeof e!=="undefined"})},_getCount:function(){return Promise.resolve(C(this))},_getAll:function(e){var t=this,n,r="[sync ] _getAll: deserialize";return new Promise(function(e,s){var o=[],i=t._db.transaction([t.defaultOptions._contentStoreName],"readonly"),u=i.objectStore(t.defaultOptions._contentStoreName);i.onerror=function(e){s(D(e))};i.oncomplete=function(t){e(o)};u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&t.value){n=new p(t.value,r,a).deserialize();o.push({key:n.oData.key,value:n.oData.value});t.continue()}}})},_loadMetaStructure:function(){var t=this;return new Promise(function(a,n){var r=t._db.transaction([t.defaultOptions._metadataStoreName],"readonly");r.onerror=function(t){if(!r.errorHandled){r.errorHandled=true;var a="Cache Manager cannot complete transaction for read metadata. Details: "+r.error;e.sap.log.error(a);n(a)}};var s=r.objectStore(t.defaultOptions._metadataStoreName);try{var o=s.get(t.defaultOptions._metadataKey);o.onsuccess=function(n){t._metadata=o.result?o.result:_(t._ui5version);if(t._metadata.__ui5version!==t._ui5version){t.reset().then(a,function(t){e.sap.log.error("Cannot reset the cache. Details:"+t);r.abort()})}else{a()}};o.onerror=function(t){e.sap.log.error("Cache Manager cannot complete transaction for read metadata items. Details: "+t.message);n(t.message)}}catch(a){e.sap.log.error("Cache Manager cannot read metadata entries behind key: "+t.defaultOptions._metadataKey+". Details: "+a.message);n(a.message)}})},get:function(t){if(L(t)){e.sap.log.warning("Cache Manager ignored 'get' for key ["+t+"]");return Promise.resolve()}return i(this,t)},del:function(t){if(L(t)){e.sap.log.warning("Cache Manager ignored 'del' for key ["+t+"]");return Promise.resolve()}return o(this,t)},reset:function(){var t=this;return new Promise(function(a,n){var r,s,o,i,u;u=t._db.transaction([t.defaultOptions._contentStoreName,t.defaultOptions._metadataStoreName],"readwrite");u.onerror=u.onabort=function(t){if(!u.errorHandled){u.errorHandled=true;var a="Cache Manager LRUPersistentCache: transaction for reset() failed. Details: "+u.error;e.sap.log.error(a);n(a)}};u.oncomplete=function(e){a()};r=u.objectStore(t.defaultOptions._contentStoreName);s=u.objectStore(t.defaultOptions._metadataStoreName);try{o=r.clear();o.onerror=function(){u.abort()};o.onsuccess=function(){i=s.clear();i.onerror=function(){u.abort()};i.onsuccess=function(){t._metadata=_(sap.ui.version);y(t)}}}catch(e){u.abort()}})}};var a="LRUPersistentCache,get",n="LRUPersistentCache,set",r=0;function s(t){var a=t._db.transaction([t.defaultOptions._contentStoreName,t.defaultOptions._metadataStoreName],"readwrite");a.onerror=a.onabort=function(t){e.sap.log.warning("Cache Manager cannot persist the information about usage of an entry. This may lead to earlier removal of the entry if browser storage space is over. Details: "+a.error)};try{a.objectStore(t.defaultOptions._metadataStoreName).put(t._metadata,t.defaultOptions._metadataKey)}catch(t){e.sap.log.warning("Cache Manager cannot persist the information about usage of an entry. This may lead to earlier removal of the entry if browser storage space is over. Details: "+t.message)}}function o(t,a){return new Promise(function(n,r){var s,o;s=t._db.transaction([t.defaultOptions._contentStoreName,t.defaultOptions._metadataStoreName],"readwrite");o=h(t._metadata);function i(n){t._metadata=o;y(t);var s="Cache Manager LRUPersistentCache: cannot delete item with key: "+a+". Details: "+D(n);e.sap.log.error(s);r(s)}s.onerror=i;s.onabort=i;s.oncomplete=function(){if(C(t)===0){t._lru=-1;t._mru=-1;t._metadata=_(t._ui5version)}e.sap.log.debug("Cache Manager LRUPersistentCache: item with key "+a+" deleted");n()};e.sap.log.debug("Cache Manager LRUPersistentCache: deleting item ["+a+"]");var u=s.objectStore(t.defaultOptions._contentStoreName).delete(a);u.onsuccess=function(){e.sap.log.debug("Cache Manager LRUPersistentCache: request for deleting item ["+a+"] is successful, updating metadata...");w(t,a);s.objectStore(t.defaultOptions._metadataStoreName).put(t._metadata,t.defaultOptions._metadataKey)}})}function i(t,n){if(t.getCounter===undefined){t.getCounter=0}t.getCounter++;var r="[sync ] fnGet"+t.getCounter+": total[sync]  key ["+n+"]",o="[sync ] fnGet"+t.getCounter+": txStart[sync]  key ["+n+"]",i="[sync ] fnGet"+t.getCounter+": storeOpen[sync]  key ["+n+"]",u="[sync ] fnGet"+t.getCounter+": access result[sync]  key ["+n+"]",c="[sync ] fnGet"+t.getCounter+": putMetadata[sync]  key ["+n+"]",d="[sync ] fnGet"+t.getCounter+": deserialize[sync]  key ["+n+"]",l="[sync ]  _instance.get",f="[sync ]  getRequest.onSuccess";e.sap.log.debug("Cache Manager LRUPersistentCache: get for key ["+n+"]...");e.sap.measure.start(l,"CM",a);var g=new Promise(function l(g,_){var h,y,C,b;e.sap.measure.start(r,"CM",a);e.sap.measure.start(o,"CM",a);y=t._db.transaction([t.defaultOptions._contentStoreName,t.defaultOptions._metadataStoreName],"readwrite");e.sap.measure.end(o);y.onerror=function(t){var a="Cache Manager cannot complete delete transaction for entry with key: "+n+". Details: "+y.error;e.sap.log.error(a);_(a)};try{e.sap.measure.start(i,"CM",a);C=y.objectStore(t.defaultOptions._contentStoreName).get(n);e.sap.measure.end(i);C.onsuccess=function(r){e.sap.measure.start(f,"CM",a);e.sap.measure.start(u,"CM",a);b=new p(C.result,d,a);e.sap.measure.end(u);N("Cache Manager LRUPersistentCache: accessing the result",n,u);if(b.oData){e.sap.measure.start(c,"CM",a);if(b.oData.lu!==t._mru){b.oData.lu=++t._mru;m(t,b);s(t)}e.sap.measure.end(c);h=b.deserialize().oData.value}e.sap.measure.end(f);e.sap.log.debug("Cache Manager LRUPersistentCache: get for key ["+n+"]...done");g(h)};C.onerror=function(t){e.sap.log.error("Cache Manager cannot get entry with key: "+n+". Details: "+t.message);_(t.message)}}catch(t){e.sap.log.error("Cache Manager cannot get entry with key: "+n+". Details: "+t.message);_(t.message);return}e.sap.measure.end(r)});e.sap.measure.end(l);return g}function u(t){var a=b(t);if(a==undefined){var n="Cache Manager LRUPersistentCache: deleteItemAndUpdateMetadata cannot find item to delete";e.sap.log.debug(n);return Promise.reject(n)}return d(t,a).then(function(){return Promise.resolve().then(function(){w(t,a);return c(t).then(function(){return a},function(){e.sap.log.warning("Cache Manager LRUPersistentCache: Free space algorithm deleted item "+"but the metadata changes could not be persisted. This won't break the functionality.");return a})})})}function c(t){return new Promise(function(a,n){try{var r=t._db.transaction([t.defaultOptions._contentStoreName,t.defaultOptions._metadataStoreName],"readwrite");r.onerror=s;r.onabort=s;r.oncomplete=function(){e.sap.log.debug("Cache Manager LRUPersistentCache: persistMetadata - metadata was successfully updated");a()};r.objectStore(t.defaultOptions._metadataStoreName).put(t._metadata,t.defaultOptions._metadataKey)}catch(e){s(null,e)}function s(t,a){var r="Cache Manager LRUPersistentCache: persistMetadata error - metadata was not successfully persisted. Details: "+D(t)+". Exception: "+(a?a.message:"");e.sap.log.debug(r);n(r)}})}function d(t,a){return new Promise(function(n,r){var s=t._db.transaction([t.defaultOptions._contentStoreName,t.defaultOptions._metadataStoreName],"readwrite");function o(t){var n="Cache Manager LRUPersistentCache: internalDel cannot complete delete transaction for entry with key: "+a+". Details: "+D(t);e.sap.log.warning(n);r(t)}s.onerror=o;s.onabort=o;s.oncomplete=function(){if(C(t)===0){t._lru=0;t._mru=0;t._metadata=_(t._ui5version)}e.sap.log.debug("Cache Manager LRUPersistentCache: internalDel deleting item ["+a+"]...done");n()};e.sap.log.debug("Cache Manager LRUPersistentCache: internalDel deleting item ["+a+"]...");s.objectStore(t.defaultOptions._contentStoreName).delete(a)})}function l(t,a,r){return new Promise(function(s,o){var i,u,c,d="[sync ] internalSet: serialize[sync]  key ["+a+"]";c=h(t._metadata);var l=new p(a,r,typeof r,++t._mru,d,n).serialize();e.sap.log.debug("Cache Manager: LRUPersistentCache: internal set with parameters: key ["+l.oData.key+"], access index ["+l.oData.lu+"]");u=t._db.transaction([t.defaultOptions._contentStoreName,t.defaultOptions._metadataStoreName],"readwrite");u.onerror=f;u.onabort=f;function f(a){e.sap.log.debug("Cache Manager: LRUPersistentCache: internal set failed. Details: "+D(a));t._metadata=c;y(t);o(a)}u.oncomplete=function(){e.sap.log.debug("Cache Manager: LRUPersistentCache: Internal set transaction completed. ItemCount: "+C(t));s()};i=u.objectStore(t.defaultOptions._contentStoreName).put(l.oData,l.oData.key);i.onsuccess=function(){m(t,l);u.objectStore(t.defaultOptions._metadataStoreName).put(t._metadata,t.defaultOptions._metadataKey)}})}function m(t,a){if(t._metadata.__byKey__[a.oData.key]!=null){var n=t._metadata.__byKey__[a.oData.key];delete t._metadata.__byIndex__[n];e.sap.log.debug("Cache Manager LRUPersistentCache: set/internalset - item already exists, so its indexes are updated")}t._metadata.__byIndex__[a.oData.lu]=a.oData.key;t._metadata.__byKey__[a.oData.key]=a.oData.lu;P(t)}function f(t){t._ui5version=sap.ui.version;return new Promise(function a(n,r){var s;e.sap.log.debug("Cache Manager "+"_initIndexedDB started");function o(){try{s=window.indexedDB.open(t.defaultOptions.databaseName,1)}catch(t){e.sap.log.error("Could not open Cache Manager database. Details: "+t.message);r(t.message)}}o();s.onerror=function(t){e.sap.log.error("Could not initialize Cache Manager database. Details: "+t.message);r(t.error)};s.onsuccess=function(a){var o=U("init_onsuccess");t._db=s.result;t._db.onversionchange=function(e){if(!e.newVersion){e.target.close()}};t._loadMetaStructure().then(function(){e.sap.log.debug("Cache Manager "+" metadataLoaded. Serialization support: "+O()+", resolving initIndexDb promise");n(t)},r);o.endSync()};s.onupgradeneeded=function(a){var n=a.target.result;n.onerror=function(t){e.sap.log.error("Cache Manager error. Details: "+t.message);r(n.error)};try{var s=n.createObjectStore(t.defaultOptions._contentStoreName);n.createObjectStore(t.defaultOptions._metadataStoreName)}catch(t){e.sap.log.error("Could not initialize Cache Manager object store. Details: "+t.message);throw t}s.createIndex("ui5version","ui5version",{unique:false})}})}function g(e,t,a,n){this.key=e;this.sOrigType=a;this.value=t;this.lu=n}function p(e,t,a,n,r,s){if(arguments.length===3){this.oData=e;this.sMeasureId=t;this.sMsrCat=a}else{this.oData=new g(e,t,a,n)}}p.prototype.deserialize=function(){if(O()&&this.oData.sOrigType==="object"){e.sap.measure.start(this.sMeasureId,this.sMeasureId,this.sMsrCat);this.oData.value=JSON.parse(this.oData.value);e.sap.measure.end(this.sMeasureId);N("Cache Manager LRUPersistentCache: de-serialization the result",this.oData.key,this.sMeasureId)}return this};p.prototype.serialize=function(){if(O()&&this.oData.sOrigType==="object"){e.sap.measure.start(this.sMeasureId,this.sMeasureId,this.sMsrCat);this.oData.value=JSON.stringify(this.oData.value);e.sap.measure.end(this.sMeasureId);N("Cache Manager LRUPersistentCache: serialization of the value",this.oData.key,this.sMeasureId)}return this};function _(e){return{__byKey__:{},__byIndex__:{},__ui5version:e}}function h(e){var t=_(e.__ui5version);for(var a in e.__byIndex__){t.__byIndex__[a]=e.__byIndex__[a]}for(var n in e.__byKey__){t.__byKey__[n]=e.__byKey__[n]}return t}function y(t){var a=M(t._metadata.__byIndex__);t._mru=a.mru;t._lru=a.lru;e.sap.log.debug("Cache Manager LRUPersistentCache: LRU counters are assigned to the CM: "+JSON.stringify(a))}function C(e){return Object.keys(e._metadata.__byKey__).length}function b(e){var t=e._metadata.__byIndex__[e._lru];if(t==undefined&&!P(e)){return null}else{return e._metadata.__byIndex__[e._lru]}}function M(e){var t=-1,a=-1,n=Number.MAX_VALUE,r=Object.keys(e),s=r.length;if(s===0){return{mru:-1,lru:-1}}else{while(++t<s){var o=parseInt(r[t],10);if(a<o){a=o}if(n>o){n=o}}return{mru:a,lru:n}}}function v(t,a,n){return new Promise(function(r,s){var o=0;i(t,a,n);function i(t,a,n){o++;e.sap.log.debug("Cache Manager LRUPersistentCache: cleanAndStore: freeing space attempt ["+o+"]");u(t).then(function(o){e.sap.log.debug("Cache Manager LRUPersistentCache: cleanAndStore: deleted item with key ["+o+"]. Going to put "+a);return l(t,a,n).then(r,function(r){if(S(r)){e.sap.log.debug("Cache Manager LRUPersistentCache: cleanAndStore: QuotaExceedError during freeing up space...");if(C(t)>0){i(t,a,n)}else{s("Cache Manager LRUPersistentCache: cleanAndStore: even when the cache is empty, the new item with key ["+a+"] cannot be added")}}else{s("Cache Manager LRUPersistentCache: cleanAndStore: cannot free space: "+D(r))}})},s)}})}function S(e){return e&&e.target&&e.target.error&&e.target.error.name==="QuotaExceededError"}function w(e,t){var a=e._metadata.__byKey__[t];delete e._metadata.__byKey__[t];delete e._metadata.__byIndex__[a];P(e)}function P(e){while(e._lru<=e._mru&&e._metadata.__byIndex__[e._lru]==undefined){e._lru++}return e._lru<=e._mru}function D(e){if(!e){return""}var t=e.message;if(e.target&&e.target.error&&e.target.error.name){t+=" Error name: "+e.target.error.name}return t}function O(){return sap.ui.getCore().getConfiguration().isUI5CacheSerializationSupportOn()}function k(){return sap.ui.getCore().getConfiguration().getUI5CacheExcludedKeys()}function L(e){return k().some(function(t){return e.indexOf(t)>-1})}function U(t,a){r++;var n="[async]  "+t+"["+a+"]- #"+r,s="[sync ]  "+t+"["+a+"]- #"+r;e.sap.measure.start(n,"CM",["LRUPersistentCache",t]);e.sap.measure.start(s,"CM",["LRUPersistentCache",t]);return{sMeasureAsync:n,sMeasureSync:s,endAsync:function(){e.sap.measure.end(this.sMeasureAsync)},endSync:function(){e.sap.measure.end(this.sMeasureSync)}}}function N(t,a,n){if(e.sap.log.getLevel()>=e.sap.log.LogLevel.DEBUG){e.sap.log.debug(t+" for key ["+a+"] took: "+e.sap.measure.getMeasurement(n).duration)}}return t},false);