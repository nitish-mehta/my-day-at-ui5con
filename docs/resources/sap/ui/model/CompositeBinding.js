/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/DataType","./BindingMode","./ChangeReason","./PropertyBinding","./CompositeType","./CompositeDataState"],function(t,e,a,n,i,s,h){"use strict";var r=i.extend("sap.ui.model.CompositeBinding",{constructor:function(t,e,a){i.apply(this,[null,""]);this.aBindings=t;this.aValues=null;this.bRawValues=e;this.bPreventUpdate=false;this.bInternalValues=a},metadata:{publicMethods:["getBindings","attachChange","detachChange"]}});r.prototype.getPath=function(){t.sap.assert(null,"Composite Binding has no path!");return null};r.prototype.getModel=function(){t.sap.assert(null,"Composite Binding has no model!");return null};r.prototype.getContext=function(){t.sap.assert(null,"Composite Binding has no context!");return null};r.prototype.isResolved=function(){var e=false;t.each(this.aBindings,function(t,a){e=a.isResolved();if(!e){return false}});return e};r.prototype.setType=function(t,e){if(t&&!(t instanceof s)){throw new Error("Only CompositeType can be used as type for composite bindings!")}i.prototype.setType.apply(this,arguments);if(this.oType){this.bRawValues=this.oType.getUseRawValues();this.bInternalValues=this.oType.getUseInternalValues();if(this.bRawValues&&this.bInternalValues){throw new Error(this.oType+" has both 'bUseRawValues' & 'bUseInternalValues' set to true. Only one of them is allowed to be true")}}};r.prototype.setContext=function(e){t.each(this.aBindings,function(t,a){if(!e||a.updateRequired(e.getModel())){a.setContext(e)}})};r.prototype.setValue=function(e){var a;if(this.bSuspended){return}t.each(this.aBindings,function(t,n){a=e[t];if(a!==undefined){n.setValue(a)}});this.getDataState().setValue(this.getValue())};r.prototype.getValue=function(){var e=[],a;t.each(this.aBindings,function(t,n){a=n.getValue();e.push(a)});return e};r.prototype.getOriginalValue=function(){var e=[],a;t.each(this.aBindings,function(t,n){a=n.getDataState().getOriginalValue();e.push(a)});return e};r.prototype.setExternalValue=function(a){var n,i,s=this.sInternalType&&e.getType(this.sInternalType),h=this;if(this.fnFormatter){t.sap.log.warning("Tried to use twoway binding, but a formatter function is used");return}var r=this.getDataState();if(this.oType){try{if(this.oType.getParseWithValues()){i=[];if(this.bRawValues){i=this.getValue()}else{t.each(this.aBindings,function(t,e){i.push(e.getExternalValue())})}}n=this.oType.parseValue(a,this.sInternalType,i);this.oType.validateValue(n)}catch(t){r.setInvalidValue(a);this.checkDataState();throw t}}else if(Array.isArray(a)&&s instanceof e&&s.isArrayType()){n=a}else if(typeof a=="string"){n=a.split(" ")}else{n=[a]}if(this.bRawValues){this.setValue(n)}else{t.each(this.aBindings,function(t,e){a=n[t];if(a!==undefined){if(h.bInternalValues){e.setInternalValue(a)}else{e.setExternalValue(a)}}})}r.setValue(this.getValue());r.setInvalidValue(undefined)};r.prototype.getExternalValue=function(){var t=[];if(this.bRawValues){t=this.getValue()}else{this.aBindings.forEach(function(e){t.push(this.bInternalValues?e.getInternalValue():e.getExternalValue())}.bind(this))}return this._toExternalValue(t)};r.prototype._toExternalValue=function(t){var a,n=this.sInternalType&&e.getType(this.sInternalType);if(this.fnFormatter){a=this.fnFormatter.apply(this,t)}else if(this.oType){a=this.oType.formatValue(t,this.sInternalType)}else if(n instanceof e&&n.isArrayType()){a=t}else if(t.length>1){a=t.join(" ")}else{a=t[0]}return a};r.prototype.getBindings=function(){return this.aBindings};r.prototype.hasValidation=function(){if(this.getType()){return true}var t=this.getBindings();for(var e=0;e<t.length;++e){if(t[e].hasValidation()){return true}}return false};r.prototype.attachChange=function(e,n){var i=this;this.fChangeHandler=function(t){if(i.bSuspended){return}var e=t.getSource();if(e.getBindingMode()==a.OneTime){e.detachChange(i.fChangeHandler)}i.checkUpdate(true)};this.attachEvent("change",e,n);if(this.aBindings){t.each(this.aBindings,function(t,e){e.attachChange(i.fChangeHandler)})}};r.prototype.detachChange=function(e,a){var n=this;this.detachEvent("change",e,a);if(this.aBindings){t.each(this.aBindings,function(t,e){e.detachChange(n.fChangeHandler)})}};r.prototype.attachDataStateChange=function(e,n){var i=this;this.fDataStateChangeHandler=function(t){var e=t.getSource();if(e.getBindingMode()==a.OneTime){e.detachDataStateChange(i.fChangeHandler)}i.checkDataState()};this.attachEvent("DataStateChange",e,n);if(this.aBindings){t.each(this.aBindings,function(t,e){e.attachEvent("DataStateChange",i.fDataStateChangeHandler)})}};r.prototype.detachDataStateChange=function(e,a){var n=this;this.detachEvent("DataStateChange",e,a);if(this.aBindings){t.each(this.aBindings,function(t,e){e.detachEvent("DataStateChange",n.fDataStateChangeHandler)})}};r.prototype.attachAggregatedDataStateChange=function(e,n){var i=this;if(!this.fDataStateChangeHandler){this.fDataStateChangeHandler=function(t){var e=t.getSource();if(e.getBindingMode()==a.OneTime){e.detachDataStateChange(i.fChangeHandler)}i.checkDataState()}}this.attachEvent("AggregatedDataStateChange",e,n);if(this.aBindings){t.each(this.aBindings,function(t,e){e.attachEvent("DataStateChange",i.fDataStateChangeHandler)})}};r.prototype.detachAggregatedDataStateChange=function(e,a){var n=this;this.detachEvent("AggregatedDataStateChange",e,a);if(this.aBindings){t.each(this.aBindings,function(t,e){e.detachEvent("DataStateChange",n.fDataStateChangeHandler)})}};r.prototype.updateRequired=function(e){var a=false;t.each(this.aBindings,function(t,n){a=a||n.updateRequired(e)});return a};r.prototype.initialize=function(){this.bPreventUpdate=true;if(this.aBindings){t.each(this.aBindings,function(t,e){e.initialize()})}this.bPreventUpdate=false;if(!this.bSuspended){this.checkUpdate(true)}return this};r.prototype.getDataState=function(){if(!this.oDataState){this.oDataState=new h(this.aBindings.map(function(t){return t.getDataState()}))}return this.oDataState};r.prototype.suspend=function(){this.bSuspended=true;t.each(this.aBindings,function(t,e){e.suspend()})};r.prototype.resume=function(){t.each(this.aBindings,function(t,e){e.resume()});this.bSuspended=false;this.checkUpdate(true)};r.prototype.checkUpdate=function(e){var a=false;if(this.bPreventUpdate||this.bSuspended&&!e){return}var i=this.getDataState();var s=this.getOriginalValue();if(e||!t.sap.equal(s,this.aOriginalValues)){this.aOriginalValues=s;i.setOriginalValue(s);a=true}var h=this.getValue();if(!t.sap.equal(h,this.aValues)||e){this.aValues=h;i.setValue(h);this._fireChange({reason:n.Change});a=true}if(a){this.checkDataState()}};return r});