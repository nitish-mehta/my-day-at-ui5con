/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./ChangeReason","./Filter","./FilterType","./ListBinding","./FilterProcessor","./Sorter","./SorterProcessor"],function(t,i,e,s,r,n,o,h){"use strict";var a=r.extend("sap.ui.model.ClientListBinding",{constructor:function(t,i,e,s,n,o){r.apply(this,arguments);this.oModel.checkFilterOperation(this.aApplicationFilters);this.bIgnoreSuspend=false;this.update()},metadata:{publicMethods:["getLength"]}});a.prototype._getContexts=function(i,e){if(!i){i=0}if(!e){e=Math.min(this.iLength,this.oModel.iSizeLimit)}var s=Math.min(i+e,this.aIndices.length),r,n=[],o=this.oModel.resolve(this.sPath,this.oContext);if(o&&!t.sap.endsWith(o,"/")){o+="/"}for(var h=i;h<s;h++){r=this.oModel.getContext(o+this.aIndices[h]);n.push(r)}return n};a.prototype.setContext=function(t){if(this.oContext!=t){this.oContext=t;if(this.isRelative()){this.update();this._fireChange({reason:i.Context})}}};a.prototype.getLength=function(){return this.iLength};a.prototype._getLength=function(){return this.aIndices.length};a.prototype.updateIndices=function(){this.aIndices=[];for(var t=0;t<this.oList.length;t++){this.aIndices.push(t)}};a.prototype.sort=function(t){if(this.bSuspended){this.checkUpdate(true)}if(!t){this.aSorters=null;this.updateIndices();this.applyFilter()}else{if(t instanceof o){t=[t]}this.aSorters=t;this.applySort()}this.bIgnoreSuspend=true;this._fireChange({reason:i.Sort});this._fireSort({sorter:t});this.bIgnoreSuspend=false;return this};a.prototype.applySort=function(){var t=this;if(!this.aSorters||this.aSorters.length==0){return}this.aIndices=h.apply(this.aIndices,this.aSorters,function(i,e){return t.oModel.getProperty(e,t.oList[i])})};a.prototype.filter=function(t,r){this.oModel.checkFilterOperation(t);if(this.bSuspended){this.checkUpdate(true)}this.updateIndices();if(t instanceof e){t=[t]}if(r==s.Application){this.aApplicationFilters=t||[]}else if(r==s.Control){this.aFilters=t||[]}else{this.aFilters=t||[];this.aApplicationFilters=[]}t=this.aFilters.concat(this.aApplicationFilters);if(t.length==0){this.iLength=this._getLength()}else{this.applyFilter()}this.applySort();this.bIgnoreSuspend=true;this._fireChange({reason:i.Filter});if(r==s.Application){this._fireFilter({filters:this.aApplicationFilters})}else{this._fireFilter({filters:this.aFilters})}this.bIgnoreSuspend=false;return this};a.prototype.applyFilter=function(){if(!this.aFilters){return}var t=this.aFilters.concat(this.aApplicationFilters),i=this;this.aIndices=n.apply(this.aIndices,t,function(t,e){return i.oModel.getProperty(e,i.oList[t])});this.iLength=this.aIndices.length};a.prototype.getDistinctValues=function(i){var e=[],s={},r,n=this;t.each(this.oList,function(t,o){r=n.oModel.getProperty(i,o);if(!s[r]){s[r]=true;e.push(r)}});return e};return a});