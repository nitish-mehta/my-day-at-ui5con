/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../Element","../library","./DragAndDrop"],function(e,t){"use strict";var r=e.extend("sap.ui.core.dnd.DragDropBase",{metadata:{abstract:true,library:"sap.ui.core",properties:{groupName:{type:"string",defaultValue:null,invalidate:false},enabled:{type:"boolean",defaultValue:true}}}});r.prototype.isDraggable=function(e){return false};r.prototype.isDroppable=function(e,t){return false};r.prototype.setEnabled=function(e){return this.setProperty("enabled",e,!this.isA("sap.ui.core.dnd.IDragInfo"))};r.prototype.setProperty=function(t,r,a){a=a||(this.getMetadata().getProperty(t).appData||{}).invalidate===false;return e.prototype.setProperty.call(this,t,r,a)};return r});