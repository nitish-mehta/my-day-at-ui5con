/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/util/reflection/JsControlTreeModifier"],function(e,r){"use strict";var t={};t.CHANGE_TYPE_MOVE_FIELD="moveSimpleFormField";t.CHANGE_TYPE_MOVE_GROUP="moveSimpleFormGroup";t.sTypeTitle="sap.ui.core.Title";t.sTypeMTitle="sap.m.Title";t.sTypeToolBar="sap.m.Toolbar";t.sTypeOverflowToolBar="sap.m.OverflowToolbar";t.sTypeLabel="sap.m.Label";t.sTypeSmartLabel="sap.ui.comp.smartfield.SmartLabel";t.CONTENT_AGGREGATION="content";var o=function(e,r,t){for(var o=0;o<t.length;o++){var n=e.getControlType(t[o]);if(r.indexOf(n)===-1){if(e.getVisible(t[o])){return true}}else{return false}}};var n=function(r,t,n,a,l){if(o(r,l,t)){var i=a.view;var p=a.appComponent;var v=p.createId(e.sap.uid());var g=r.createControl("sap.ui.core.Title",p,i,v);r.setProperty(g,"text","");r.insertAggregation(n,"content",g,0,i)}return r.getAggregation(n,"content")};var a=function(e,r,t,n){var a;var l=-1;if(o(e,r,t)){l++}for(var i=0;i<t.length;i++){var p=e.getControlType(t[i]);if(r.indexOf(p)>-1){l++;if(l===n){a=t[i];break}}}return t.indexOf(a)};var l=function(e,r,o){if(r>=e.length||r===-1){return true}var n=o.getControlType(e[r]);return t.sTypeTitle===n||t.sTypeToolBar===n||t.sTypeMTitle===n||t.sTypeOverflowToolBar===n};var i=function(e,r,t,o){var n=0;for(n=r+1;n<t.length;++n){var a=e.getControlType(t[n]);if(o.indexOf(a)>-1){break}}return n-r};var p=function(e,r,o){return i(e,o,r,[t.sTypeTitle,t.sTypeMTitle,t.sTypeToolBar,t.sTypeOverflowToolBar,t.sTypeLabel,t.sTypeSmartLabel])};var v=function(r,t,o,n,a){if(!l(t,o,r)){e.sap.log.error("Illegal argument. iIndex has to point to a Label.")}else{n=a?n+1:n;var i=0;var v=o;var g;while(v<t.length&&i<n){++i;g=p(r,t,v);v+=g}return v}};var g=function(e,r,t,o,n){var a=t;for(var l=0;l<n;l++){a.splice(o+l,0,e[r+l])}return a};var c=function(e){var r=e.getTitle();if(!r){r=e.getToolbar()}return r};var s=function(e,o,n,a,l){var i=c(o.element);var p=r.getSelector(e,l.appComponent);var v={elementSelector:r.getSelector(i,l.appComponent),source:{groupIndex:o.sourceIndex},target:{groupIndex:o.targetIndex}};return{changeType:t.CHANGE_TYPE_MOVE_GROUP,targetSelector:p,movedControl:i,movedElements:[v]}};var u=function(e,o,n,a,l){var i=r.getSelector(e,l.appComponent);var p=o.element.getLabel();var v=r.getSelector(p,l.appComponent);var g=c(a.parent);var s=c(n.parent);var u=r.getSelector(g,l.appComponent);var d=r.getSelector(s,l.appComponent);var T={elementSelector:v,source:{groupSelector:d,fieldIndex:o.sourceIndex},target:{groupSelector:u,fieldIndex:o.targetIndex}};return{changeType:t.CHANGE_TYPE_MOVE_FIELD,targetSelector:i,target:g,source:s,movedControl:p,movedElements:[T]}};var d=function(e,r,t,o,n){e.removeAllAggregation(r,t.CONTENT_AGGREGATION);for(var a=0;a<o.length;++a){e.insertAggregation(r,t.CONTENT_AGGREGATION,o[a],a,n)}};t.applyChange=function(r,o,l){var c=l.modifier;var s=l.view;var u=l.appComponent;var T,f;var m=r.getContent();var y=m.movedElements[0];var C=c.getAggregation(o,t.CONTENT_AGGREGATION);if(r.getChangeType()===t.CHANGE_TYPE_MOVE_FIELD){var E=c.bySelector(y.elementSelector||y.element,u,s);var I=C.indexOf(E);var O=p(c,C,I);T=c.bySelector(y.target.groupSelector||y.target.groupId,u,s);var S=C.indexOf(T);var x=c.bySelector(y.source.groupSelector||y.source.groupId,u,s);var b=C.indexOf(x);var G=v(c,C,S,y.target.fieldIndex,b===S&&y.source.fieldIndex<y.target.fieldIndex);var h=p(c,C,G);f=C.slice();var _=f.slice(I,I+O);var A,N,w,M;if(I<G){A=f.slice(0,I);w=f.slice(I+O,G+h);M=f.slice(G+h,f.length);f=A.concat(w.concat(_.concat(M)))}else if(I>G){N=f.slice(0,G+h);w=f.slice(G+h,I);M=f.slice(I+O,f.length);f=N.concat(_.concat(w.concat(M)))}if(I!=G){d(c,o,t,f,s)}}else if(r.getChangeType()===t.CHANGE_TYPE_MOVE_GROUP){var P=[t.sTypeTitle,t.sTypeToolBar,t.sTypeMTitle,t.sTypeOverflowToolBar];var F=c.bySelector(y.elementSelector||y.element,u,s);if(y.target.groupIndex===0||!F){C=n(c,C,o,l,P,m.newControlId)}var L=F?C.indexOf(F):0;var B=a(c,P,C,y.target.groupIndex);T=C[B];var D=i(c,B,C,P);var R=i(c,L,C,P);f=C.slice();f.splice(L,R);B=f.indexOf(T);var V=y.source.groupIndex<y.target.groupIndex?D:0;f=g(C,L,f,B+V,R);d(c,o,t,f,s)}else{e.sap.log.warning("Unknown change type detected. Cannot apply to SimpleForm")}return true};t.completeChangeContent=function(r,t,o){var n;var a=o.modifier;var l=o.view;var i=o.appComponent;var p=a.bySelector(t.selector,i,l);var v=t.movedElements;if(v.length>1){e.sap.log.warning("Moving more than 1 Formelement is not yet supported.")}var g=v[0];g.element=sap.ui.getCore().byId(g.id);var c=e.extend({},t.source);var d=e.extend({},t.target);if(!d.parent){d.parent=sap.ui.getCore().byId(d.id)}if(!c.parent){c.parent=sap.ui.getCore().byId(c.id)}if(p&&g.element&&d.parent){if(t.changeType==="moveSimpleFormGroup"){n=s(p,g,c,d,o)}else if(t.changeType==="moveSimpleFormField"){n=u(p,g,c,d,o)}}else{e.sap.log.error("Element not found. This may caused by an instable id!")}var T=r.getDefinition();T.content.targetSelector=n.targetSelector;T.content.movedElements=n.movedElements;if(n.source&&n.target){r.addDependentControl(n.source,"sourceParent",o);r.addDependentControl(n.target,"targetParent",o)}r.addDependentControl([n.movedControl],"movedElements",o)};return t},true);