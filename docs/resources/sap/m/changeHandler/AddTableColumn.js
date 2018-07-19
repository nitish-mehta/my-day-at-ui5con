/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/changeHandler/ChangeHandlerMediator"],function(e,n){"use strict";var t={};var r="columns";var i="cells";var a="items";t.applyChange=function(t,o,d){var l=d.modifier;var c=d.view;var g=d.appComponent;var p=t.getDefinition();var f=t.getContent();var v=n.getChangeHandlerSettings({scenario:"addODataField",oDataServiceVersion:f.oDataServiceVersion});var u=v&&v.content&&v.content.createFunction;var s=function(e){var n=false;n=e.newFieldSelector&&e.newFieldIndex!==undefined&&e.bindingPath&&e.oDataServiceVersion&&u;return n};if(f&&s(f)){var w=l.getBindingTemplate(o,a,c);var h=l.createControl("sap.m.Text",g,c,f.newFieldSelector.id+"--column",{text:"{/#"+f.entityType+"/"+f.bindingPath+"/@sap:label}"});if(w){var C={appComponent:d.appComponent,view:d.view,fieldSelector:f.newFieldSelector.id+"--field",bindingPath:f.bindingPath};var S=u(l,C);l.insertAggregation(w,i,S,f.newFieldIndex,c);l.updateAggregation(o,a);t.setRevertData(f.newFieldSelector.id+"--field")}var m=l.createControl("sap.m.Column",g,c,f.newFieldSelector);l.insertAggregation(m,"header",h,0,c);l.insertAggregation(o,r,m,f.newFieldIndex,c);return true}else{e.sap.log.error("Change does not contain sufficient information to be applied or ChangeHandlerMediator could not be retrieved: ["+p.layer+"]"+p.namespace+"/"+p.fileName+"."+p.fileType)}};t.revertChange=function(e,n,t){var o=t.modifier;var d=t.view;var l=t.appComponent;var c=e.getContent();var g=o.getBindingTemplate(n,a);if(g){o.removeAggregation(g,i,o.bySelector(e.getRevertData(),l,d));o.updateAggregation(n,a)}o.removeAggregation(n,r,o.bySelector(c.newFieldSelector,l,d));e.resetRevertData();return true};t.completeChangeContent=function(e,n,t){var r=t.appComponent;var i=e.getDefinition();if(!i.content){i.content={}}if(n.parentId){e.addDependentControl(n.parentId,"targetTable",t)}else{throw new Error("oSpecificChangeInfo.parentId attribute required")}if(n.bindingPath){i.content.bindingPath=n.bindingPath}else{throw new Error("oSpecificChangeInfo.bindingPath attribute required")}if(n.entityType){i.content.entityType=n.entityType}else{throw new Error("oSpecificChangeInfo.entityType attribute required")}if(n.newControlId){i.content.newFieldSelector=t.modifier.getSelector(n.newControlId,r)}else{throw new Error("oSpecificChangeInfo.newControlId attribute required")}if(n.index===undefined){throw new Error("oSpecificChangeInfo.targetIndex attribute required")}else{i.content.newFieldIndex=n.index}if(n.oDataServiceVersion===undefined){throw new Error("oSpecificChangeInfo.oDataServiceVersion attribute required")}else{i.content.oDataServiceVersion=n.oDataServiceVersion}};return t},true);