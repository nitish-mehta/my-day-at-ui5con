/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","../Device","../base/Object","jquery.sap.script"],function(t,e,o){"use strict";var n=o.extend("sap.ui.core.FocusHandler",{constructor:function(n,r){o.apply(this);this.oCore=r;this.oCurrent=null;this.oLast=null;this.aEventQueue=[];this.oLastFocusedControlInfo=null;this.fEventHandler=t.proxy(this.onEvent,this);if(n.addEventListener&&!e.browser.msie){n.addEventListener("focus",this.fEventHandler,true);n.addEventListener("blur",this.fEventHandler,true)}else{t(n).bind("activate",this.fEventHandler);t(n).bind("deactivate",this.fEventHandler)}t.sap.log.debug("FocusHandler setup on Root "+n.type+(n.id?": "+n.id:""),null,"sap.ui.core.FocusHandler")}});n.prototype.getCurrentFocusedControlId=function(){var e=null;try{var o=t(document.activeElement);if(o.is(":focus")){e=o.control()}}catch(t){}return e&&e.length>0?e[0].getId():null};n.prototype.getControlFocusInfo=function(t){t=t||this.getCurrentFocusedControlId();if(!t){return null}var e=this.oCore&&this.oCore.byId(t);if(e){return{id:t,control:e,info:e.getFocusInfo(),type:e.getMetadata().getName(),focusref:e.getFocusDomRef()}}return null};n.prototype.updateControlFocusInfo=function(e){if(e&&this.oLastFocusedControlInfo&&this.oLastFocusedControlInfo.control===e){var o=e.getId();this.oLastFocusedControlInfo=this.getControlFocusInfo(o);t.sap.log.debug("Update focus info of control "+o,null,"sap.ui.core.FocusHandler")}};n.prototype.restoreFocus=function(e){var o=e||this.oLastFocusedControlInfo;if(!o){return}var n=this.oCore&&this.oCore.byId(o.id);if(n&&o.info&&n.getMetadata().getName()==o.type&&n.getFocusDomRef()!=o.focusref&&(e||n!==o.control)){t.sap.log.debug("Apply focus info of control "+o.id,null,"sap.ui.core.FocusHandler");o.control=n;this.oLastFocusedControlInfo=o;n.applyFocusInfo(o.info)}else{t.sap.log.debug("Apply focus info of control "+o.id+" not possible",null,"sap.ui.core.FocusHandler")}};n.prototype.destroy=function(o){var n=o.data.oRootRef;if(n){if(n.removeEventListener&&!e.browser.msie){n.removeEventListener("focus",this.fEventHandler,true);n.removeEventListener("blur",this.fEventHandler,true)}else{t(n).unbind("activate",this.fEventHandler);t(n).unbind("deactivate",this.fEventHandler)}}this.oCore=null};n.prototype.onEvent=function(e){var o=t.event.fix(e);t.sap.log.debug("Event "+o.type+" reached Focus Handler (target: "+o.target+(o.target?o.target.id:"")+")",null,"sap.ui.core.FocusHandler");var n=o.type=="focus"||o.type=="focusin"||o.type=="activate"?"focus":"blur";this.aEventQueue.push({type:n,controlId:r(o.target)});if(this.aEventQueue.length==1){this.processEvent()}};n.prototype.processEvent=function(){var t=this.aEventQueue[0];if(!t){return}try{if(t.type=="focus"){this.onfocusEvent(t.controlId)}else if(t.type=="blur"){this.onblurEvent(t.controlId)}}finally{this.aEventQueue.shift();if(this.aEventQueue.length>0){this.processEvent()}}};n.prototype.onfocusEvent=function(e){var o=this.oCore&&this.oCore.byId(e);if(o){this.oLastFocusedControlInfo=this.getControlFocusInfo(e);t.sap.log.debug("Store focus info of control "+e,null,"sap.ui.core.FocusHandler")}this.oCurrent=e;if(!this.oLast){return}if(this.oLast!=this.oCurrent){s(this.oLast,e,this.oCore)}this.oLast=null};n.prototype.onblurEvent=function(e){if(!this.oCurrent){return}this.oLast=e;this.oCurrent=null;t.sap.delayedCall(0,this,"checkForLostFocus")};n.prototype.checkForLostFocus=function(){if(this.oCurrent==null&&this.oLast!=null){s(this.oLast,null,this.oCore)}this.oLast=null};var r=function(e){var o=t(e).closest("[data-sap-ui]").attr("id");if(o){return o}return null};var s=function(e,o,n){var r=e?n&&n.byId(e):null;if(r){var s=o?n.byId(o):null;var u=t.Event("sapfocusleave");u.target=r.getDomRef();u.relatedControlId=s?s.getId():null;u.relatedControlFocusInfo=s?s.getFocusInfo():null;var i=r.getUIArea();var a=null;if(i){a=n.getUIArea(i.getId())}else{var l=n.getStaticAreaRef();if(t.sap.containsOrEquals(l,u.target)){a=n.getUIArea(l.id)}}if(a){a._handleEvent(u)}}};return n});