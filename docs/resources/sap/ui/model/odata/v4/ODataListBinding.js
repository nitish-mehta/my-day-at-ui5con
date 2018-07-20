/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/FilterOperator","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/Sorter","sap/ui/model/odata/OperationMode","./Context","./lib/_AggregationCache","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","./ODataParentBinding"],function(e,t,i,n,o,r,s,a,h,u,f,d,l,c,p){"use strict";var g="sap.ui.model.odata.v4.ODataListBinding",C={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true,refresh:true};var x=s.extend("sap.ui.model.odata.v4.ODataListBinding",{constructor:function(i,n,o,r,a,h){s.call(this,i,n);if(n.slice(-1)==="/"){throw new Error("Invalid path: "+n)}this.oAggregation=null;this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aApplicationFilters=c.toArray(a);x.checkCaseSensitiveFilters(this.aApplicationFilters);this.oCachePromise=t.resolve();this.sChangeReason=i.bAutoExpandSelect?"AddVirtualContext":undefined;this.aChildCanUseCachePromises=[];this.oDiff=undefined;this.aFilters=[];this.mPreviousContextsByPath={};this.aPreviousData=[];this.oRefreshGroupLock=undefined;this.aSorters=c.toArray(r);this.applyParameters(e.extend(true,{},h));this.oHeaderContext=this.bRelative?null:u.create(this.oModel,this,n);this.setContext(o);i.bindingCreated(this)}});p(x.prototype);x.checkCaseSensitiveFilters=function(e){function t(e){if(e.bCaseSensitive===false){throw new Error("Filter for path '"+e.sPath+"' has unsupported value for 'caseSensitive' : false")}if(e.aFilters){x.checkCaseSensitiveFilters(e.aFilters)}if(e.oCondition){t(e.oCondition)}}e.forEach(t)};x.prototype._delete=function(e,t,i){var o=this;if(!i.isTransient()&&this.hasPendingChanges()){throw new Error("Cannot delete due to pending changes")}return this.deleteFromCache(e,t,String(i.iIndex),function(e,t){var r,s,a,h;if(e===-1){i.destroy();delete o.aContexts[-1]}else{for(s=e;s<o.aContexts.length;s+=1){i=o.aContexts[s];if(i){o.mPreviousContextsByPath[i.getPath()]=i}}h=o.oModel.resolve(o.sPath,o.oContext);o.aContexts.splice(e,1);for(s=e;s<o.aContexts.length;s+=1){if(o.aContexts[s]){a=c.getPrivateAnnotation(t[s],"predicate");r=h+(a||"/"+s);i=o.mPreviousContextsByPath[r];if(i){delete o.mPreviousContextsByPath[r];if(i.getIndex()===s){i.checkUpdate()}else{i.setIndex(s)}}else{i=u.create(o.oModel,o,r,s)}o.aContexts[s]=i}}}o.iMaxLength-=1;o._fireChange({reason:n.Remove})})};x.prototype.applyParameters=function(e,t){var i,n=this.oModel.buildBindingParameters(e,["$$aggregation","$$groupId","$$operationMode","$$ownRequest","$$updateGroupId"]),o;o=n.$$operationMode||this.oModel.sOperationMode;if(!o&&(this.aSorters.length||this.aApplicationFilters.length)){throw new Error("Unsupported operation mode: "+o)}this.sOperationMode=o;this.sGroupId=n.$$groupId;this.sUpdateGroupId=n.$$updateGroupId;this.mQueryOptions=this.oModel.buildQueryOptions(e,true);this.mParameters=e;if("$$aggregation"in n){if("$apply"in this.mQueryOptions){throw new Error("Cannot combine $$aggregation and $apply")}i=c.clone(n.$$aggregation);this.mQueryOptions.$apply=c.buildApply(i);this.oAggregation=i}this.mCacheByContext=undefined;this.fetchCache(this.oContext);this.reset(t)};x.prototype.attachEvent=function(e){if(!(e in C)){throw new Error("Unsupported event '"+e+"': v4.ODataListBinding#attachEvent")}return s.prototype.attachEvent.apply(this,arguments)};x.prototype.create=function(e){var t,i,o,r,s=this.oModel.resolve(this.sPath,this.oContext),a=this;if(!s){throw new Error("Binding is not yet resolved: "+this)}if(this.aContexts[-1]){throw new Error("Must not create twice")}this.checkSuspended();i=s.slice(1);if(this.bRelative&&this.oContext.fetchCanonicalPath){i=this.oContext.fetchCanonicalPath().then(function(e){return c.buildPath(e,a.sPath).slice(1)})}r=this.oModel.lockGroup(this.getUpdateGroupId(),true);o=this.createInCache(r,i,"",e,function(){t.destroy();delete a.aContexts[-1];a._fireChange({reason:n.Remove})}).then(function(){var e;a.iMaxLength+=1;if(a.isRefreshable()){e=a.getGroupId();if(!a.oModel.isDirectGroup(e)&&!a.oModel.isAutoGroup(e)){e="$auto"}return a.refreshSingle(t,a.oModel.lockGroup(e))}},function(e){r.unlock(true);throw e});t=u.create(this.oModel,this,s+"/-1",-1,o);this.aContexts[-1]=t;this._fireChange({reason:n.Add});return t};x.prototype.createContexts=function(e,t,i){var n=false,o=this.oContext,r,s,a=i.$count,h=this.aContexts.length,f=this.bLengthFinal,d=this.oModel,l=d.resolve(this.sPath,o),p,g=this;function C(e){var t;for(t=e;t<g.aContexts.length;t+=1){if(g.aContexts[t]){g.aContexts[t].destroy()}}while(e>0&&!g.aContexts[e-1]){e-=1}g.aContexts.length=e;n=true}for(s=e;s<e+i.length;s+=1){if(this.aContexts[s]===undefined){n=true;p=c.getPrivateAnnotation(i[s-e],"predicate");r=l+(p||"/"+s);if(r in this.mPreviousContextsByPath){this.aContexts[s]=this.mPreviousContextsByPath[r];delete this.mPreviousContextsByPath[r];this.aContexts[s].setIndex(s);this.aContexts[s].checkUpdate()}else{this.aContexts[s]=u.create(d,this,r,s)}}}if(Object.keys(this.mPreviousContextsByPath).length){sap.ui.getCore().addPrerenderingTask(function(){Object.keys(g.mPreviousContextsByPath).forEach(function(e){g.mPreviousContextsByPath[e].destroy();delete g.mPreviousContextsByPath[e]})})}if(a!==undefined){if(this.aContexts.length>a){C(a)}this.iMaxLength=a;this.bLengthFinal=true}else{if(this.aContexts.length>this.iMaxLength){this.iMaxLength=Infinity}if(i.length<t){this.iMaxLength=e+i.length;if(this.aContexts.length>this.iMaxLength){C(this.iMaxLength)}}if(!(e>h&&i.length===0)){this.bLengthFinal=this.aContexts.length===this.iMaxLength}}if(this.bLengthFinal!==f){n=true}return n};x.prototype.destroy=function(){this.aContexts.forEach(function(e){e.destroy()});if(this.oHeaderContext){this.oHeaderContext.destroy()}if(this.aContexts[-1]){this.aContexts[-1].destroy()}this.oModel.bindingDestroyed(this);this.oCachePromise=undefined;this.oContext=undefined;s.prototype.destroy.apply(this)};x.prototype.doCreateCache=function(e,t,i){var n=this.oAggregation&&(this.oAggregation.groupLevels.length||c.hasMinOrMax(this.oAggregation.aggregate));t=this.inheritQueryOptions(t,i);return n?f.create(this.oModel.oRequestor,e,this.oAggregation,t,this.oModel.bAutoExpandSelect):d.create(this.oModel.oRequestor,e,t,this.oModel.bAutoExpandSelect)};x.prototype.doFetchQueryOptions=function(e){var t=this.getOrderby(this.mQueryOptions.$orderby),i=this;return this.fetchFilter(e,this.mQueryOptions.$filter).then(function(e){return i.mergeQueryOptions(i.mQueryOptions,t,e)})};x.prototype.enableExtendedChangeDetection=function(e,t){if(t!==undefined){throw new Error("Unsupported property 'key' with value '"+t+"' in binding info for "+this)}return s.prototype.enableExtendedChangeDetection.apply(this,arguments)};x.prototype.fetchFilter=function(i,n){var r=[],s=this;function a(e,t){var i=e.join(t);return e.length>1?"("+i+")":i}function h(e,t){var i,n=c.formatLiteral(e.oValue1,t),r=decodeURIComponent(e.sPath);switch(e.sOperator){case o.BT:i=r+" ge "+n+" and "+r+" le "+c.formatLiteral(e.oValue2,t);break;case o.EQ:case o.GE:case o.GT:case o.LE:case o.LT:case o.NE:i=r+" "+e.sOperator.toLowerCase()+" "+n;break;case o.Contains:case o.EndsWith:case o.StartsWith:i=e.sOperator.toLowerCase()+"("+r+","+n+")";break;default:throw new Error("Unsupported operator: "+e.sOperator)}return i}function u(e,i,n){var o=[],r={};e.forEach(function(e){r[e.sPath]=r[e.sPath]||[];r[e.sPath].push(e)});e.forEach(function(e){var t;if(e.aFilters){o.push(u(e.aFilters,e.bAnd,n).then(function(e){return"("+e+")"}));return}t=r[e.sPath];if(!t){return}delete r[e.sPath];o.push(f(t,n))});return t.all(o).then(function(e){return e.join(i?" and ":" or ")})}function f(n,r){var l=s.oModel.getMetaModel(),c=l.getMetaContext(s.oModel.resolve(s.sPath,i)),p=l.fetchObject(d(n[0].sPath,r),c);return p.then(function(i){var s;if(!i){throw new Error("Type cannot be determined, no metadata for path: "+c.getPath())}s=n.map(function(t){var n,s,a=t.sOperator;if(a===o.All||a===o.Any){n=t.oCondition;s=t.sVariable;if(a===o.Any&&!n){return t.sPath+"/any()"}r=e.extend({},r);r[s]=d(t.sPath,r);return(n.aFilters?u(n.aFilters,n.bAnd,r):f([n],r)).then(function(e){return t.sPath+"/"+t.sOperator.toLowerCase()+"("+s+":"+e+")"})}return h(t,i.$Type)});return t.all(s).then(function(e){return a(e," or ")})})}function d(e,t){var i=e.split("/");i[0]=t[i[0]];return i[0]?i.join("/"):e}return t.all([u(this.aApplicationFilters,true,{}),u(this.aFilters,true,{})]).then(function(e){if(e[0]){r.push(e[0])}if(e[1]){r.push(e[1])}if(n){r.push(n)}return a(r,") and (")})};x.prototype.fetchValue=function(e,t){var i=this;return this.oCachePromise.then(function(n){var o;if(n){o=i.getRelativePath(e);if(o!==undefined){return n.fetchValue(l.$cached,o,undefined,t)}}if(i.oContext){return i.oContext.fetchValue(e,t)}})};x.prototype.filter=function(e,t){var i=c.toArray(e);x.checkCaseSensitiveFilters(i);this.checkSuspended();if(this.sOperationMode!==h.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server")}if(this.hasPendingChanges()){throw new Error("Cannot filter due to pending changes")}this.createRefreshGroupLock(this.getGroupId(),true);if(t===r.Control){this.aFilters=i}else{this.aApplicationFilters=i}this.mCacheByContext=undefined;this.fetchCache(this.oContext);this.reset(n.Filter);return this};x.prototype.getContexts=function(t,i,o){var r,s=this.oContext,a,h=false,f=false,d,l,c=!!this.sChangeReason,p,C,x=this;e.sap.log.debug(this+"#getContexts("+t+", "+i+", "+o+")",undefined,g);this.checkSuspended();if(t!==0&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" first parameter must be 0 if extended change detection is enabled, but is "+t)}if(o!==undefined&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" third parameter must not be set if extended change detection is enabled")}if(this.bRelative&&!s){this.aPreviousData=[];return[]}r=this.sChangeReason||n.Change;this.sChangeReason=undefined;if(r==="AddVirtualContext"){sap.ui.getCore().addPrerenderingTask(function(){x.sChangeReason="RemoveVirtualContext";x._fireChange({reason:n.Change});x.reset(n.Refresh)},true);C=u.create(this.oModel,this,this.oModel.resolve(this.sPath,this.oContext)+"/-2",-2);return[C]}if(r==="RemoveVirtualContext"){return[]}t=t||0;i=i||this.oModel.iSizeLimit;if(!o||o<0){o=0}p=this.aContexts[-1]?t-1:t;d=this.oRefreshGroupLock;this.oRefreshGroupLock=undefined;if(!this.bUseExtendedChangeDetection||!this.oDiff){l=this.oCachePromise.then(function(e){if(e){d=x.oModel.lockGroup(x.getGroupId(),d);return e.read(p,i,o,d,function(){h=true;x.fireDataRequested()})}else{if(d){d.unlock()}return s.fetchValue(x.sPath).then(function(e){var t;e=e||[];t=e.$count;if(p<0){e=[e[-1]].concat(e.slice(0,i-1))}else{e=e.slice(p,p+i)}e.$count=t;return{value:e}})}});if(l.isFulfilled()&&c){l=Promise.resolve(l)}l.then(function(e){var t;if(!x.bRelative||x.oContext===s){t=x.createContexts(p,i,e.value);if(x.bUseExtendedChangeDetection){x.oDiff={aDiff:x.getDiff(e.value,p),iLength:i}}if(f){if(t){x._fireChange({reason:r})}else{x.oDiff=undefined}}}if(h){x.fireDataReceived({data:{}})}},function(e){if(h){x.fireDataReceived(e.canceled?{data:{}}:{error:e})}throw e})["catch"](function(e){if(d){d.unlock(true)}x.oModel.reportError("Failed to get contexts for "+x.oModel.sServiceUrl+x.oModel.resolve(x.sPath,x.oContext).slice(1)+" with start index "+t+" and length "+i,g,e)});f=true}this.iCurrentBegin=p;this.iCurrentEnd=p+i;if(p===-1){a=this.aContexts.slice(0,p+i);a.unshift(this.aContexts[-1])}else{a=this.aContexts.slice(p,p+i)}if(this.bUseExtendedChangeDetection){if(this.oDiff&&i!==this.oDiff.iLength){throw new Error("Extended change detection protocol violation: Expected "+"getContexts(0,"+this.oDiff.iLength+"), but got getContexts(0,"+i+")")}a.dataRequested=!this.oDiff;a.diff=this.oDiff?this.oDiff.aDiff:[]}this.oDiff=undefined;return a};x.prototype.getCurrentContexts=function(){var e,t=Math.min(this.iCurrentEnd,this.iMaxLength)-this.iCurrentBegin;if(this.iCurrentBegin===-1){e=this.aContexts.slice(0,this.iCurrentBegin+t);e.unshift(this.aContexts[-1])}else{e=this.aContexts.slice(this.iCurrentBegin,this.iCurrentBegin+t)}while(e.length<t){e.push(undefined)}return e};x.prototype.getDiff=function(t,i){var n,o,r=this;o=t.map(function(e,t){return r.bDetectUpdates?JSON.stringify(e):r.aContexts[i+t].getPath()});n=e.sap.arraySymbolDiff(this.aPreviousData,o);this.aPreviousData=o;return n};x.prototype.getDistinctValues=function(){throw new Error("Unsupported operation: v4.ODataListBinding#getDistinctValues")};x.prototype.getHeaderContext=function(){return this.bRelative&&!this.oContext?null:this.oHeaderContext};x.prototype.getLength=function(){var e=this.bLengthFinal?this.iMaxLength:this.aContexts.length+10;if(this.aContexts[-1]){e+=1}return e};x.prototype.getOrderby=function(e){var t=[],i=this;this.aSorters.forEach(function(e){if(e instanceof a){t.push(e.sPath+(e.bDescending?" desc":""))}else{throw new Error("Unsupported sorter: "+e+" - "+i)}});if(e){t.push(e)}return t.join(",")};x.prototype.inheritQueryOptions=function(t,i){var n;if(!Object.keys(this.mParameters).length){n=this.getQueryOptionsForPath("",i);if(t.$orderby&&n.$orderby){t.$orderby+=","+n.$orderby}if(t.$filter&&n.$filter){t.$filter="("+t.$filter+") and ("+n.$filter+")"}t=e.extend({},n,t)}return t};x.prototype.isLengthFinal=function(){return this.bLengthFinal};x.prototype.mergeQueryOptions=function(e,t,i){var n;function o(t,i){if(i&&(!e||e[t]!==i)){if(!n){n=e?c.clone(e):{}}n[t]=i}}o("$orderby",t);o("$filter",i);return n||e};x.prototype.refreshInternal=function(e){var t=this;this.createRefreshGroupLock(e,this.isRefreshable());this.oCachePromise.then(function(i){if(i){t.mCacheByContext=undefined;t.fetchCache(t.oContext)}t.reset(n.Refresh);t.oModel.getDependentBindings(t).forEach(function(t){t.refreshInternal(e,false)})})};x.prototype.refreshSingle=function(e,t,i){var o=this;if(!this.isRefreshable()){throw new Error("Binding is not refreshable; cannot refresh entity: "+e)}if(this.hasPendingChangesForPath(e.getPath())){throw new Error("Cannot refresh entity due to pending changes: "+e)}return this.oCachePromise.then(function(r){var s=false,a;function h(e){if(s){o.fireDataReceived(e)}}function u(){s=true;o.fireDataRequested()}function f(){o.oModel.getDependentBindings(e).forEach(function(e){e.refreshInternal(t.getGroupId(),false)})}function d(e){var t=o.aContexts[e],i;if(e===-1){delete o.aContexts[-1]}else{o.aContexts.splice(e,1);for(i=e;i<o.aContexts.length;i+=1){if(o.aContexts[i]){o.aContexts[i].setIndex(i)}}}t.destroy();o.iMaxLength-=1;o._fireChange({reason:n.Remove})}t.setGroupId(o.getGroupId());a=(i?r.refreshSingleWithRemove(t,e.iIndex,u,d):r.refreshSingle(t,e.iIndex,u)).then(function(){h({data:{}});if(e.oBinding){e.checkUpdate();if(i){f()}}},function(e){h({error:e});throw e})["catch"](function(i){t.unlock(true);o.oModel.reportError("Failed to refresh entity: "+e,g,i)});if(!i){f()}return a})};x.prototype.reset=function(e){var t=this.iCurrentEnd===0,i=this;if(this.aContexts){this.aContexts.forEach(function(e){i.mPreviousContextsByPath[e.getPath()]=e});if(this.aContexts[-1]){this.aContexts[-1].destroy()}}this.aContexts=[];this.iCurrentBegin=this.iCurrentEnd=0;this.iMaxLength=Infinity;this.bLengthFinal=false;if(e&&!(t&&e===n.Change)){this.sChangeReason=e;this._fireRefresh({reason:e})}if(this.getHeaderContext()){this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(e){e.checkUpdate()})}};x.prototype.resumeInternal=function(){this.reset();this.fetchCache(this.oContext);this.oModel.getDependentBindings(this).forEach(function(e){e.resumeInternal(false)});this._fireChange({reason:n.Change})};x.prototype.setAggregation=function(e){this.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot set $$aggregation due to pending changes")}if(!this.oAggregation&&"$apply"in this.mQueryOptions){throw new Error("Cannot override existing $apply : '"+this.mQueryOptions.$apply+"'")}e=c.clone(e);this.mQueryOptions.$apply=c.buildApply(e);this.oAggregation=e;this.mCacheByContext=undefined;this.fetchCache(this.oContext);this.reset(n.Change)};x.prototype.setContext=function(e){var t;if(this.oContext!==e){if(this.bRelative){if(this.aContexts[-1]&&this.aContexts[-1].isTransient()){throw new Error("setContext on relative binding is forbidden if a transient "+"entity exists: "+this)}this.reset();this.fetchCache(e);if(e){t=this.oModel.resolve(this.sPath,e);if(this.oHeaderContext&&this.oHeaderContext.getPath()!==t){this.oHeaderContext.destroy();this.oHeaderContext=null}if(!this.oHeaderContext){this.oHeaderContext=u.create(this.oModel,this,t)}}i.prototype.setContext.call(this,e)}else{this.oContext=e}}};x.prototype.sort=function(e){this.checkSuspended();if(this.sOperationMode!==h.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server")}if(this.hasPendingChanges()){throw new Error("Cannot sort due to pending changes")}this.aSorters=c.toArray(e);this.mCacheByContext=undefined;this.createRefreshGroupLock(this.getGroupId(),true);this.fetchCache(this.oContext);this.reset(n.Sort);return this};x.prototype.updateAnalyticalInfo=function(e){var t={aggregate:{},group:{}},i=false;e.forEach(function(e){var n={};if("total"in e){if("grouped"in e){throw new Error("Both dimension and measure: "+e.name)}if(e.as){n.name=e.name;t.aggregate[e.as]=n}else{t.aggregate[e.name]=n}if(e.min){n.min=true;i=true}if(e.max){n.max=true;i=true}if(e.with){n.with=e.with}}else if(!("grouped"in e)||e.inResult||e.visible){t.group[e.name]=n}});this.oAggregation=t;this.changeParameters({$apply:c.buildApply(t)});if(i){return{measureRangePromise:Promise.resolve(this.oCachePromise.then(function(e){return e.getMeasureRangePromise()}))}}};return x});