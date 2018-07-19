/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/routing/Target","./async/Target","./sync/Target","jquery.sap.global"],function(r,t,e,a){"use strict";var n=r.extend("sap.m.routing.Target",{constructor:function(n,i,s,o){this._oTargetHandler=o;function u(){if(a.sap.getUriParameters().get("sap-ui-xx-asyncRouting")==="true"){a.sap.log.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","MobileTarget");return true}return false}if(n._async===undefined){n._async=u()}r.prototype.constructor.apply(this,arguments);var c=n._async?t:e;this._super={};for(var p in c){this._super[p]=this[p];this[p]=c[p]}}});return n});