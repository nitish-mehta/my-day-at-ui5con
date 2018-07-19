/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./P13nConditionPanel","./P13nPanel","./library"],function(e,t,o,i){"use strict";var r=i.P13nPanelType;var n=o.extend("sap.m.P13nGroupPanel",{metadata:{library:"sap.m",properties:{maxGroups:{type:"string",group:"Misc",defaultValue:"-1"},containerQuery:{type:"boolean",group:"Misc",defaultValue:false},layoutMode:{type:"string",group:"Misc",defaultValue:null}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"},groupItems:{type:"sap.m.P13nGroupItem",multiple:true,singularName:"groupItem",bindable:"bindable"}},events:{addGroupItem:{parameters:{}},removeGroupItem:{},updateGroupItem:{}}},renderer:function(e,t){e.write("<section");e.writeControlData(t);e.addClass("sapMGroupPanel");e.writeClasses();e.writeStyles();e.write(">");e.write("<div");e.addClass("sapMGroupPanelContent");e.addClass("sapMGroupPanelBG");e.writeClasses();e.write(">");var o=t.getAggregation("content");var i=o.length;for(var r=0;r<i;r++){e.renderControl(o[r])}e.write("</div>");e.write("</section>")}});n.prototype.setMaxGroups=function(e){this.setProperty("maxGroups",e);if(this._oGroupPanel){this._oGroupPanel.setMaxConditions(e)}};n.prototype._getConditions=function(){return this._oGroupPanel.getConditions()};n.prototype.setContainerQuery=function(e){this.setProperty("containerQuery",e);this._oGroupPanel.setContainerQuery(e)};n.prototype.setLayoutMode=function(e){this.setProperty("layoutMode",e);this._oGroupPanel.setLayoutMode(e)};n.prototype.validateConditions=function(){return this._oGroupPanel.validateConditions()};n.prototype.removeInvalidConditions=function(){this._oGroupPanel.removeInvalidConditions()};n.prototype.removeValidationErrors=function(){this._oGroupPanel.removeValidationErrors()};n.prototype.onBeforeNavigationFrom=function(){return this.validateConditions()};n.prototype.onAfterNavigationFrom=function(){return this.removeInvalidConditions()};n.prototype.setOperations=function(e){this._aOperations=e;if(this._oGroupPanel){this._oGroupPanel.setOperations(this._aOperations)}};n.prototype.init=function(){this.setType(r.group);this.setTitle(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("GROUPPANEL_TITLE"));sap.ui.getCore().loadLibrary("sap.ui.layout");this._aKeyFields=[];this.addStyleClass("sapMGroupPanel");if(!this._aOperations){this.setOperations([sap.m.P13nConditionOperation.GroupAscending,sap.m.P13nConditionOperation.GroupDescending])}this._oGroupPanel=new t({maxConditions:this.getMaxGroups(),autoReduceKeyFieldItems:true,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange(),validationExecutor:e.proxy(this._callValidationExecutor,this)});this._oGroupPanel.setOperations(this._aOperations);this._oGroupPanel._sAddRemoveIconTooltipKey="GROUP";this.addAggregation("content",this._oGroupPanel)};n.prototype.exit=function(){var e=function(e){if(e&&e.destroy){e.destroy()}return null};this._aKeyFields=e(this._aKeyFields);this._aOperations=e(this._aOperations)};n.prototype.onBeforeRendering=function(){if(this._bUpdateRequired){this._bUpdateRequired=false;var e=[];var t=(this.getBindingInfo("items")||{}).model;var o=function(e,t,o){var i=o.getBinding(e);if(i&&t){return t.getObject()[i.getPath()]}return o.getMetadata().getProperty(e)?o.getProperty(e):o.getAggregation(e)};this.getItems().forEach(function(i){var r=i.getBindingContext(t);if(i.getBinding("key")){r.getObject()[i.getBinding("key").getPath()]=i.getKey()}e.push({key:i.getColumnKey(),text:o("text",r,i),tooltip:o("tooltip",r,i)})});e.splice(0,0,{key:null,text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_SELECTION_NONE")});this._oGroupPanel.setKeyFields(e);var i=[];t=(this.getBindingInfo("groupItems")||{}).model;this.getGroupItems().forEach(function(e){var r=e.getBindingContext(t);if(e.getBinding("key")){r.getObject()[e.getBinding("key").getPath()]=e.getKey()}i.push({key:e.getKey(),keyField:o("columnKey",r,e),operation:o("operation",r,e),showIfGrouped:o("showIfGrouped",r,e)})});this._oGroupPanel.setConditions(i)}};n.prototype.addItem=function(e){o.prototype.addItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};n.prototype.removeItem=function(e){var t=o.prototype.removeItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return t};n.prototype.destroyItems=function(){this.destroyAggregation("items");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};n.prototype.addGroupItem=function(e){this.addAggregation("groupItems",e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};n.prototype.insertGroupItem=function(e,t){this.insertAggregation("groupItems",e,t,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};n.prototype.updateGroupItems=function(e){this.updateAggregation("groupItems");if(e==="change"&&!this._bIgnoreBindCalls){this._bUpdateRequired=true;this.invalidate()}};n.prototype.removeGroupItem=function(e){e=this.removeAggregation("groupItems",e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return e};n.prototype.removeAllGroupItems=function(){var e=this.removeAllAggregation("groupItems",true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return e};n.prototype.destroyGroupItems=function(){this.destroyAggregation("groupItems");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};n.prototype._handleDataChange=function(){var e=this;return function(t){var o=t.getParameter("newData");var i=t.getParameter("operation");var r=t.getParameter("key");var n=t.getParameter("index");var a;if(i==="update"){a=e.getGroupItems()[n];if(a){a.setColumnKey(o.keyField);a.setOperation(o.operation);a.setShowIfGrouped(o.showIfGrouped)}e.fireUpdateGroupItem({key:r,index:n,groupItemData:a});e._notifyChange()}if(i==="add"){a=new sap.m.P13nGroupItem({key:r,columnKey:o.keyField,operation:o.operation,showIfGrouped:o.showIfGrouped});e._bIgnoreBindCalls=true;e.fireAddGroupItem({key:r,index:n,groupItemData:a});e._bIgnoreBindCalls=false;e._notifyChange()}if(i==="remove"){e._bIgnoreBindCalls=true;e.fireRemoveGroupItem({key:r,index:n});e._bIgnoreBindCalls=false;e._notifyChange()}}};n.prototype.getOkPayload=function(){if(!this.getModel()){return null}var e=[];this._oGroupPanel._oConditionsGrid.getContent().forEach(function(t){var o=t.keyField;e.push(o.getSelectedKey())});return{selectedColumnKeys:e}};n.prototype._callValidationExecutor=function(){var e=this.getValidationExecutor();if(e){e()}};n.prototype._updateValidationResult=function(e){this._oGroupPanel._oConditionsGrid.getContent().forEach(function(t){var o=t.keyField;o.setValueStateText("");o.setValueState("None");var i=o.getSelectedKey();e.forEach(function(e){if(e.columnKey===i){o.setValueStateText(e.messageText);o.setValueState(e.messageType)}})})};n.prototype.setValidationListener=function(t){this.setProperty("validationListener",t);if(t){t(this,e.proxy(this._updateValidationResult,this))}};n.prototype._notifyChange=function(){var e=this.getChangeNotifier();if(e){e(this)}};return n});