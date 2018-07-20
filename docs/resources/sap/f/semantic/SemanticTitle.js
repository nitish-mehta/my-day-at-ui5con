/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/m/library","./SemanticContainer"],function(t,n,o){"use strict";var i=n.ButtonType;var e=o.extend("sap.f.semantic.SemanticTitle",{constructor:function(t,n){o.call(this,t,n);this._iMainActionCount=0;this._aSemanticTextActions=[];this._aSemanticSimpleIconActions=[];this._aSemanticNavIconActions=[];this._aCustomTextActions=[];this._aCustomIconActions=[]}});e.mPlacementMethodMap={titleText:"TextContent",titleIcon:"IconContent",shareIcon:"ShareContent"};e.prototype.addContent=function(t,n){this["_insertSemantic"+e.mPlacementMethodMap[n]].call(this,t);return this};e.prototype.removeContent=function(t,n){this["_removeSemantic"+e.mPlacementMethodMap[n]].call(this,t);return this};e.prototype.destroy=function(){this._aSemanticSimpleIconActions=null;this._aSemanticTextActions=null;this._aCustomTextActions=null;this._aCustomIconActions=null;this._aSemanticNavIconActions=null;return o.prototype.destroy.call(this)};e.prototype.addCustomTextAction=function(t){t.setType(i.Transparent);this._callContainerAggregationMethod("insertAction",t,this._getCustomTextActionInsertIndex());this._aCustomTextActions.push(t);return this};e.prototype.insertCustomTextAction=function(t,n){t.setType(i.Transparent);this._callContainerAggregationMethod("insertAction",t,this._getCustomTextActionInsertIndex(n));this._aCustomTextActions.splice(n,0,t);return this};e.prototype.indexOfCustomTextAction=function(t){return this._aCustomTextActions.indexOf(t)};e.prototype.removeCustomTextAction=function(t){var n=this._aCustomTextActions.indexOf(t),o=this._callContainerAggregationMethod("removeAction",t);this._aCustomTextActions.splice(n,1);return o};e.prototype.removeAllCustomTextActions=function(){var t=[];this._aCustomTextActions.forEach(function(n){var o=this._callContainerAggregationMethod("removeAction",n);if(o){t.push(n)}},this);this._aCustomTextActions=[];return t};e.prototype.destroyCustomTextActions=function(){this.removeAllCustomTextActions().forEach(function(t){t.destroy()});return this};e.prototype.getCustomTextActions=function(){return this._aCustomTextActions};e.prototype.addCustomIconAction=function(t){t.setType(i.Transparent);this._callContainerAggregationMethod("insertAction",t,this._getCustomIconActionInsertIndex());this._aCustomIconActions.push(t);return this};e.prototype.insertCustomIconAction=function(t,n){t.setType(i.Transparent);this._callContainerAggregationMethod("insertAction",t,this._getCustomIconActionInsertIndex(n));this._aCustomIconActions.splice(n,0,t);return this};e.prototype.indexOfCustomIconAction=function(t){return this._aCustomIconActions.indexOf(t)};e.prototype.removeCustomIconAction=function(t){var n=this._aCustomIconActions.indexOf(t),o=this._callContainerAggregationMethod("removeAction",t);this._aCustomIconActions.splice(n,1);return o};e.prototype.removeAllCustomIconActions=function(){var t=[];this._aCustomIconActions.forEach(function(n){var o=this._callContainerAggregationMethod("removeAction",n);if(o){t.push(n)}},this);this._aCustomIconActions=[];return t};e.prototype.destroyCustomIconActions=function(){this.removeAllCustomIconActions().forEach(function(t){t.destroy()});return this};e.prototype.getCustomIconActions=function(){return this._aCustomIconActions};e.prototype._insertSemanticTextContent=function(t){var n=this._getControl(t),o=this._isMainAction(t),i;this._aSemanticTextActions.push(t);if(o){this._iMainActionCount++;i=this._getSemanticTextMainActionInsertIndex()}else{i=this._getSemanticTextActionInsertIndex(t)}this._callContainerAggregationMethod("insertAction",n,i);return this};e.prototype._removeSemanticTextContent=function(t){var n=this._getControl(t),o=this._aSemanticTextActions.indexOf(t),i=this._isMainAction(t);if(i){this._iMainActionCount--}this._aSemanticTextActions.splice(o,1);this._callContainerAggregationMethod("removeAction",n);return this};e.prototype._insertSemanticIconContent=function(t){var n=this._getControl(t),o,i;if(this._isNavigationAction(t)){this._aSemanticNavIconActions.push(t);i=this._getSemanticNavIconActionInsertIndex(t);o="insertNavigationAction"}else{this._aSemanticSimpleIconActions.push(t);i=this._getSemanticSimpleIconActionInsertIndex(t);o="insertAction"}this._callContainerAggregationMethod(o,n,i);return this};e.prototype._removeSemanticIconContent=function(t){var n=this._getControl(t),o,i;if(this._isNavigationAction(t)){i=this._aSemanticNavIconActions.indexOf(t);this._aSemanticNavIconActions.splice(i,1);o="removeNavigationAction"}else{i=this._aSemanticTextActions.indexOf(t);this._aSemanticSimpleIconActions.splice(i,1);o="removeAction"}this._callContainerAggregationMethod(o,n);return this};e.prototype._insertSemanticShareContent=function(t){var n=this._getControl(t),o=this._getSemanticShareMenuInsertIndex();this._callContainerAggregationMethod("insertAction",n,o);return this};e.prototype._removeSemanticShareContent=function(t){var n=this._getControl(t);this._callContainerAggregationMethod("removeAction",n);return this};e.prototype._getSemanticTextMainActionInsertIndex=function(){return 0};e.prototype._getCustomTextActionInsertIndex=function(t){var n=this._aCustomTextActions.length;if(t===undefined){return this._iMainActionCount+n}t=t>=n?n:t;t+=this._iMainActionCount;return t};e.prototype._getSemanticTextActionInsertIndex=function(t){this._aSemanticTextActions.sort(this._sortControlByOrder.bind(this));return this._getCustomTextActionInsertIndex()+this._aSemanticTextActions.indexOf(t)-this._iMainActionCount};e.prototype._getCustomIconActionInsertIndex=function(t){var n=this._aCustomIconActions.length,o=this._aCustomTextActions.length+this._aSemanticTextActions.length;if(t===undefined){return o+n}t=t>=n?n:t;t+=o;return t};e.prototype._getSemanticSimpleIconActionInsertIndex=function(t){this._aSemanticSimpleIconActions.sort(this._sortControlByOrder.bind(this));return this._getCustomIconActionInsertIndex()+this._aSemanticSimpleIconActions.indexOf(t)};e.prototype._getSemanticNavIconActionInsertIndex=function(t){this._aSemanticNavIconActions.sort(this._sortControlByOrder.bind(this));return this._aSemanticNavIconActions.indexOf(t)};e.prototype._getSemanticShareMenuInsertIndex=function(){return this._callContainerAggregationMethod("getActions").length};e.prototype._getContainerBar=function(){var t=this._getContainer();if(t){return t.getAggregation("_overflowToolbar")}return null};return e});