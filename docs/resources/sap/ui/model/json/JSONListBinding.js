/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/ChangeReason","sap/ui/model/ClientListBinding"],function(t,e,i){"use strict";var s=i.extend("sap.ui.model.json.JSONListBinding");s.prototype.getContexts=function(e,i){this.iLastStartIndex=e;this.iLastLength=i;if(!e){e=0}if(!i){i=Math.min(this.iLength,this.oModel.iSizeLimit)}var s=this._getContexts(e,i),n=[];if(this.bUseExtendedChangeDetection){try{for(var a=0;a<s.length;a++){n.push(this.getContextData(s[a]))}if(this.aLastContextData&&e<this.iLastEndIndex){s.diff=t.sap.arraySymbolDiff(this.aLastContextData,n)}this.iLastEndIndex=e+i;this.aLastContexts=s.slice(0);this.aLastContextData=n.slice(0)}catch(e){this.bUseExtendedChangeDetection=false;t.sap.log.warning("JSONListBinding: Extended change detection has been disabled as JSON data could not be serialized.")}}return s};s.prototype.getCurrentContexts=function(){if(this.bUseExtendedChangeDetection){return this.aLastContexts||[]}else{return this.getContexts(this.iLastStartIndex,this.iLastLength)}};s.prototype.updateIndices=function(){var t;this.aIndices=[];if(Array.isArray(this.oList)){for(t=0;t<this.oList.length;t++){this.aIndices.push(t)}}else{for(t in this.oList){this.aIndices.push(t)}}};s.prototype.update=function(){var e=this.oModel._getObject(this.sPath,this.oContext);if(e){if(Array.isArray(e)){if(this.bUseExtendedChangeDetection){this.oList=t.extend(true,[],e)}else{this.oList=e.slice(0)}}else{this.oList=t.extend(this.bUseExtendedChangeDetection,{},e)}this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength()}else{this.oList=[];this.aIndices=[];this.iLength=0}};s.prototype.checkUpdate=function(i){if(this.bSuspended&&!this.bIgnoreSuspend&&!i){return}if(!this.bUseExtendedChangeDetection){var s=this.oModel._getObject(this.sPath,this.oContext)||[];if(!t.sap.equal(this.oList,s)||i){this.update();this._fireChange({reason:e.Change})}}else{var n=false;var a=this;var s=this.oModel._getObject(this.sPath,this.oContext)||[];if(this.oList.length!=s.length){n=true}if(!t.sap.equal(this.oList,s)){this.update()}var h=this._getContexts(this.iLastStartIndex,this.iLastLength);if(this.aLastContexts){if(this.aLastContexts.length!=h.length){n=true}else{t.each(this.aLastContextData,function(t,e){var i=a.getContextData(h[t]);if(i!==e){n=true;return false}})}}else{n=true}if(n||i){this._fireChange({reason:e.Change})}}};return s});