/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(e){"use strict";var t={};var n="source";var r="target";var o="movedElements";var a="columns";var i="cells";var g="items";function l(t,o,l,s){var d=l.modifier,c=l.view,u=l.appComponent,p=t.getContent(),f=t.getDependentControl(n,l),v=t.getDependentControl(r,l),m=d.getAggregation(v,a),h=function(t,n,r){var o=d.getAggregation(t,i);if(!o){e.sap.log.warning("Aggregation cells to move not found");return}if(n<0||n>=o.length){e.sap.log.warning("Move cells in table item called with invalid index: "+n);return}var a=o[n];d.removeAggregation(t,i,a);d.insertAggregation(t,i,a,r,c)},C=function(e,t){d.getAggregation(v,g).forEach(function(n){if(d.getControlType(n)==="sap.m.GroupHeaderListItem"){return}h(n,e,t)})};if(f!==v){e.sap.log.warning("Moving columns between different tables is not yet supported.");return false}p.movedElements.forEach(function(t){var n=d.bySelector(t.selector,u,c),r,o,i,l,p;if(!n){p=t.selector&&t.selector.id;e.sap.log.warning("The table column with id: '"+p+"' stored in the change is not found and the move operation cannot be applied");return}i=m.indexOf(n);l=t.sourceIndex;o=e.isFunction(s)&&s(i);o=e.isNumeric(o)?o:t.targetIndex;if(i!==o){r=i}else{r=l}d.removeAggregation(v,a,n);d.insertAggregation(v,a,n,o,c);var f=d.getBindingTemplate(v,g);if(f){h(f,r,o);d.updateAggregation(v,g)}else{C(r,o)}},this);return true}t.applyChange=function(e,t,n){var r=[];l(e,t,n,function(e){r.unshift({index:e})});e.setRevertData(r)};t.revertChange=function(e,t,n){var r=e.getRevertData();l(e,t,n,function(){var e=r.shift();return e&&e.index});e.resetRevertData()};t.completeChangeContent=function(e,t,a){var i=a.modifier,g=a.appComponent,l=e.getDefinition(),s=i.bySelector(t.source.id,g),d=i.bySelector(t.target.id,g),c={aggregation:t.source.aggregation,type:i.getControlType(s)},u={aggregation:t.target.aggregation,type:i.getControlType(d)};l.content={movedElements:[]};t.movedElements.forEach(function(e){var t=e.element||i.bySelector(e.id,g);l.content.movedElements.push({selector:i.getSelector(t,g),sourceIndex:e.sourceIndex,targetIndex:e.targetIndex})});e.addDependentControl(t.source.id,n,a,c);e.addDependentControl(t.target.id,r,a,u);e.addDependentControl(t.movedElements.map(function(e){return e.id}),o,a)};return t},true);