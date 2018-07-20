/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./DragDropBase"],function(r,t){"use strict";var e=t.extend("sap.ui.core.dnd.DropInfo",{metadata:{library:"sap.ui.core",interfaces:["sap.ui.core.dnd.IDropInfo"],properties:{targetAggregation:{type:"string",defaultValue:null,invalidate:false},dropEffect:{type:"sap.ui.core.dnd.DropEffect",defaultValue:"Move",invalidate:false},dropPosition:{type:"sap.ui.core.dnd.DropPosition",defaultValue:"On",invalidate:false},dropLayout:{type:"sap.ui.core.dnd.DropLayout",defaultValue:"Default",invalidate:false}},events:{dragEnter:{allowPreventDefault:true},dragOver:{},drop:{}}}});e.prototype.getDropTarget=function(){return this.getParent()};e.prototype.isDroppable=function(t,e){this.sTemporaryDropPosition="";if(!this.getEnabled()){return false}var o=this.getDropTarget();if(!o){return false}var a=this.getTargetAggregation();var i=o.getMetadata().getDragDropInfo(a);if(!i.droppable){r.sap.log.warning((a?a+" aggregation of ":"")+o+" is not configured to be droppable");return false}var a=this.getTargetAggregation();if(o===t&&!a){return true}if(t.getParent()===o&&a===t.sParentAggregationName){return true}if(e&&a&&o===t){var n=t.getDomRefForSetting(a);if(n&&n!=e.target&&n.contains(e.target)){e.setMark("DragWithin",a);this.sTemporaryDropPosition="On";return true}}return false};e.prototype.getDropPosition=function(r){if(r&&this.sTemporaryDropPosition){return this.sTemporaryDropPosition}return this.getProperty("dropPosition")};e.prototype.getDropLayout=function(r){var t=this.getProperty("dropLayout");if(!r||t!="Default"){return t}return this.getDropTarget().getMetadata().getDragDropInfo(this.getTargetAggregation()).layout};e.prototype.fireDragEnter=function(r){if(!r||!r.dragSession){return}var t=r.dragSession;return this.fireEvent("dragEnter",{dragSession:r.dragSession,browserEvent:r.originalEvent,target:t.getDropControl()},true)};e.prototype.fireDragOver=function(r){if(!r||!r.dragSession){return}var t=r.dragSession;return this.fireEvent("dragOver",{dragSession:r.dragSession,browserEvent:r.originalEvent,target:t.getDropControl(),dropPosition:t.getDropPosition()})};e.prototype.fireDrop=function(r){if(!r||!r.dragSession){return}var t=r.dragSession;this.fireEvent("drop",{dragSession:r.dragSession,browserEvent:r.originalEvent,dropPosition:t.getDropPosition(),draggedControl:t.getDragControl(),droppedControl:t.getDropControl()})};return e},true);