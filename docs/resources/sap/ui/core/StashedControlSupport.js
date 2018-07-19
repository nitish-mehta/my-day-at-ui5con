/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Element"],function(t,e){"use strict";var s={},a={},n=e.extend("sap.ui.core._StashedControl",{constructor:function(s,a){e.apply(this,arguments);a.stashed=true;t.sap.extend(this,a);this._stash(a.sParentId,a.sParentAggregationName);return this},metadata:{specialSettings:{stashed:{type:"boolean",visibility:"hidden"},sParentId:{type:"string",visibility:"hidden"},sParentAggregationName:{type:"string",visibility:"hidden"},fnCreate:{type:"function",visibility:"hidden"}}}});n.prototype.setParent=function(){t.sap.log.error("Cannot set parent on a StashedControl",this.getId())};n.prototype.clone=function(){var t=e.prototype.clone.apply(this,arguments);a[t.getId()]=t;return t};n.prototype.destroy=function(){delete a[this.getId()];e.prototype.destroy.apply(this,arguments)};r(n,true);s.mixInto=function(e,s){t.sap.assert(!e.getMetadata().hasProperty("stashed"),"StashedControlSupport: fnClass already has property 'stashed', sideeffects possible",e.getMetadata().getName());t.sap.assert(!e.prototype.setStashed,"StashedControlSupport: fnClass already has method 'setStashed', sideeffects possible",e.getMetadata().getName());r(e,s)};function r(e,s){e.getMetadata().addSpecialSetting("stashed",{type:"boolean",defaultValue:!!s});e.prototype.setStashed=function(e){if(this.stashed===true&&!e){if(this.sParentId){var s=o(this,sap.ui.getCore().byId(this.sParentId));s.stashed=false;return}}else if(e){t.sap.log.warning("Cannot re-stash a control",this.getId())}};e.prototype.getStashed=function(){return this.stashed};var n=e.prototype.destroy;e.prototype.destroy=function(){delete a[this.getId()];n.apply(this,arguments)};e.prototype._stash=function(t,e){this.sParentId=t;this.sParentAggregationName=e;a[this.getId()]=this}}function o(t,e){if(t instanceof n){var s,r,o,i=t.fnCreate,d=t.sParentAggregationName;t.destroy();r=sap.ui.require("sap/ui/core/Component");o=r&&r.getOwnerComponentFor(e);if(o){s=o.runAsOwner(i)}else{s=i()}s.forEach(function(t){e.getMetadata().getAggregation(d).add(e,t)})}delete a[t.getId()];return t}function i(t,e){var s=[];for(var n in a){var r=t?a[n]:a[n].getId();if(!e||a[n].sParentId===e){s.push(r)}}return s}s.getStashedControlIds=function(t){return i(false,t)};s.getStashedControls=function(t){return i(true,t)};s.createStashedControl=function(t,e){return new n(t,e)};return s});