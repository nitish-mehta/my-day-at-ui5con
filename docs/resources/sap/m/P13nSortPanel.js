/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./P13nConditionPanel","./P13nPanel","./library"],function(t,e,i){"use strict";var o=i.P13nPanelType;var r=e.extend("sap.m.P13nSortPanel",{metadata:{library:"sap.m",properties:{containerQuery:{type:"boolean",group:"Misc",defaultValue:false},layoutMode:{type:"string",group:"Misc",defaultValue:null}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"},sortItems:{type:"sap.m.P13nSortItem",multiple:true,singularName:"sortItem",bindable:"bindable"}},events:{addSortItem:{},removeSortItem:{},updateSortItem:{}}},renderer:function(t,e){if(!e.getVisible()){return}t.write("<section");t.writeControlData(e);t.addClass("sapMSortPanel");t.writeClasses();t.writeStyles();t.write(">");t.write("<div");t.addClass("sapMSortPanelContent");t.addClass("sapMSortPanelBG");t.writeClasses();t.write(">");var i=e.getAggregation("content");var o=i.length;for(var r=0;r<o;r++){t.renderControl(i[r])}t.write("</div>");t.write("</section>")}});r.prototype._getConditions=function(){return this._oSortPanel.getConditions()};r.prototype.setContainerQuery=function(t){this.setProperty("containerQuery",t);this._oSortPanel.setContainerQuery(t);return this};r.prototype.setLayoutMode=function(t){this.setProperty("layoutMode",t);this._oSortPanel.setLayoutMode(t);return this};r.prototype.validateConditions=function(){return this._oSortPanel.validateConditions()};r.prototype.removeInvalidConditions=function(){this._oSortPanel.removeInvalidConditions()};r.prototype.removeValidationErrors=function(){this._oSortPanel.removeValidationErrors()};r.prototype.onBeforeNavigationFrom=function(){return this.validateConditions()};r.prototype.onAfterNavigationFrom=function(){return this.removeInvalidConditions()};r.prototype.setOperations=function(t){this._aOperations=t;if(this._oSortPanel){this._oSortPanel.setOperations(this._aOperations)}return this};r.prototype.init=function(){this.setType(o.sort);this.setTitle(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("SORTPANEL_TITLE"));sap.ui.getCore().loadLibrary("sap.ui.layout");this._aKeyFields=[];this.addStyleClass("sapMSortPanel");if(!this._aOperations){this.setOperations([sap.m.P13nConditionOperation.Ascending,sap.m.P13nConditionOperation.Descending])}this._oSortPanel=new t({autoReduceKeyFieldItems:true,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange()});this._oSortPanel.setOperations(this._aOperations);this._oSortPanel._sAddRemoveIconTooltipKey="SORT";this.addAggregation("content",this._oSortPanel)};r.prototype.exit=function(){var t=function(t){if(t&&t.destroy){t.destroy()}return null};this._aKeyFields=t(this._aKeyFields);this._aOperations=t(this._aOperations)};r.prototype.onBeforeRendering=function(){if(this._bUpdateRequired){this._bUpdateRequired=false;var t=[];var e=(this.getBindingInfo("items")||{}).model;var i=function(t,e,i){var o=i.getBinding(t);if(o&&e){return e.getObject()[o.getPath()]}return i.getMetadata().getProperty(t)?i.getProperty(t):i.getAggregation(t)};this.getItems().forEach(function(o){var r=o.getBindingContext(e);if(o.getBinding("key")){r.getObject()[o.getBinding("key").getPath()]=o.getKey()}t.push({key:o.getColumnKey(),text:i("text",r,o),tooltip:i("tooltip",r,o)})});t.splice(0,0,{key:null,text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_SELECTION_NONE")});this._oSortPanel.setKeyFields(t);var o=[];e=(this.getBindingInfo("sortItems")||{}).model;this.getSortItems().forEach(function(t){var r=t.getBindingContext(e);if(t.getBinding("key")){r.getObject()[t.getBinding("key").getPath()]=t.getKey()}o.push({key:t.getKey(),keyField:i("columnKey",r,t),operation:i("operation",r,t)})});this._oSortPanel.setConditions(o)}};r.prototype.addItem=function(t){e.prototype.addItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};r.prototype.removeItem=function(t){var i=e.prototype.removeItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return i};r.prototype.destroyItems=function(){this.destroyAggregation("items");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};r.prototype.addSortItem=function(t){this.addAggregation("sortItems",t,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};r.prototype.insertSortItem=function(t,e){this.insertAggregation("sortItems",t,e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};r.prototype.updateSortItems=function(t){this.updateAggregation("sortItems");if(t==="change"&&!this._bIgnoreBindCalls){this._bUpdateRequired=true;this.invalidate()}};r.prototype.removeSortItem=function(t){t=this.removeAggregation("sortItems",t,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return t};r.prototype.removeAllSortItems=function(){var t=this.removeAllAggregation("sortItems",true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return t};r.prototype.destroySortItems=function(){this.destroyAggregation("sortItems");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};r.prototype._handleDataChange=function(){var t=this;return function(e){var i=e.getParameter("newData");var o=e.getParameter("operation");var r=e.getParameter("key");var n=e.getParameter("index");var a;if(o==="update"){a=t.getSortItems()[n];if(a){a.setColumnKey(i.keyField);a.setOperation(i.operation)}t.fireUpdateSortItem({key:r,index:n,sortItemData:a});t._notifyChange()}if(o==="add"){a=new sap.m.P13nSortItem({key:r,columnKey:i.keyField,operation:i.operation});t._bIgnoreBindCalls=true;t.fireAddSortItem({key:r,index:n,sortItemData:a});t._bIgnoreBindCalls=false;t._notifyChange()}if(o==="remove"){t._bIgnoreBindCalls=true;t.fireRemoveSortItem({key:r,index:n});t._bIgnoreBindCalls=false;t._notifyChange()}}};r.prototype._notifyChange=function(){var t=this.getChangeNotifier();if(t){t(this)}};return r});